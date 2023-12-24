from fastapi import Depends, FastAPI, HTTPException, WebSocket, WebSocketDisconnect
from sqlalchemy.orm import Session
from starlette.middleware.cors import CORSMiddleware
import logging

from . import crud, models, schemas
from .connection_manager import ConnectionManager
from .database import SessionLocal, engine

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger("FastAPI app")

models.Base.metadata.create_all(bind=engine)

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:4200/",
    "http://localhost:4200"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# DB connect
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


# WebSocket

manager = ConnectionManager()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # Accept the connection from a client.
    await manager.connect(websocket)

    try:
        while True:
            # Receive the JSON data sent by a client.
            data = await websocket.receive_json()
            message_processed = data.get("message", "")
            # Send JSON data to the client.
            await websocket.send_json(
                {
                    "message": message_processed,
                }
            )
    except WebSocketDisconnect:
        manager.disconnect(websocket)
        logger.info("The connection is closed.")


# RestAPI

# Homework
@app.get("/homeworks/{homework_id}", response_model=list[schemas.Homework])
def read_homework(homework_id: int, db: Session = Depends(get_db)):
    db_homework = crud.get_homework(db, homework_id)
    if db_homework is None:
        raise HTTPException(status_code=404, detail="Homework not found")
    return db_homework


@app.get("/homeworks/", response_model=list[schemas.Homework])
def read_homeworks(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    homeworks = crud.get_homeworks(db, skip=skip, limit=limit)
    return homeworks


@app.post("/subjects/{subject_id}/homeworks/", response_model=schemas.Homework)
def create_subject_homework(
    subject_id: int, homework: schemas.HomeworkCreate, db: Session = Depends(get_db)
):
    return crud.create_subject_homework(db=db, homework=homework, subject_id=subject_id)


@app.put("/homeworks/{homework_id}", response_model=schemas.Homework)
def update_homework(homework_id: int, homework: schemas.HomeworkCreate, db: Session = Depends(get_db)):
    return crud.update_homework(db=db, homework_id=homework_id, homework=homework)


@app.delete("/homeworks/{homework_id}", response_model=schemas.Homework)
def delete_homework(homework_id: int, db: Session = Depends(get_db)):
    return crud.delete_homework(db=db, homework_id=homework_id)


# Subject
@app.get("/subjects/{subject_id}", response_model=schemas.Subject)
def read_subject(subject_id: int, db: Session = Depends(get_db)):
    db_subject = crud.get_subject(db, subject_id=subject_id)
    if db_subject is None:
        raise HTTPException(status_code=404, detail="Subject not found")
    return db_subject


@app.get("/subjects/", response_model=list[schemas.Subject])
def read_subjects(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    subjects = crud.get_subjects(db, skip=skip, limit=limit)
    return subjects


@app.get("/subjects/students/{student_id}", response_model=list[schemas.Subject])
def read_student_subjects(student_id: int, db: Session = Depends(get_db)):
    db_subject = crud.get_student_subjects(db, student_id=student_id)
    return db_subject


@app.get("/subjects/students/{student_id}/teachers", response_model=list[schemas.Teacher])
def read_student_teacher_subject(student_id: int, db: Session = Depends(get_db)):
    db_subject = crud.get_student_teachers_subjects(db, student_id=student_id)
    return db_subject


@app.get("/subjects/teachers/{teacher_id}", response_model=list[schemas.Subject])
def read_student_subjects(teacher_id: int, db: Session = Depends(get_db)):
    db_subject = crud.get_teacher_subjects(db, teacher_id=teacher_id)
    return db_subject


@app.post("/students/{student_id}/teachers/{teacher_id}/subjects/", response_model=schemas.Subject)
def create_subject_for_student_teacher(
    student_id: int, teacher_id: int, subject: schemas.SubjectCreate, db: Session = Depends(get_db)
):
    db_subject = crud.create_student_teacher_subject(db=db, subject=subject, student_id=student_id, teacher_id=teacher_id)
    manager.broadcast(db_subject)
    return db_subject


@app.put("/subjects/{subject_id}", response_model=schemas.Subject)
def update_subject(subject_id: int, subject: schemas.SubjectCreate, db: Session = Depends(get_db)):
    return crud.update_subject(db=db, subject_id=subject_id, subject=subject)


@app.delete("/subjects/{subject_id}", response_model=schemas.Subject)
def delete_subject(subject_id: int, db: Session = Depends(get_db)):
    return crud.delete_subject(db=db, subject_id=subject_id)


# Student
@app.get("/students/{student_id}", response_model=schemas.Student)
def read_student(student_id: int, db: Session = Depends(get_db)):
    db_student = crud.get_student(db, student_id=student_id)
    if db_student is None:
        raise HTTPException(status_code=404, detail="Student not found")
    return db_student


@app.get("/students/", response_model=list[schemas.Student])
def read_students(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    students = crud.get_students(db, skip=skip, limit=limit)
    return students


@app.post("/students/", response_model=schemas.Student)
def create_student(student: schemas.StudentCreate, db: Session = Depends(get_db)):
    db_student = crud.get_student_by_email(db, email=student.email)
    if db_student:
        raise HTTPException(status_code=400, detail="Данный email уже используется")
    return crud.create_student(db=db, student=student)


@app.post("/student/signin", response_model=schemas.Student)
def login_student(student: schemas.StudentSignIn, db: Session = Depends(get_db)):
    db_student = crud.get_student_by_email(db, email=student.email)
    if not db_student:
        raise HTTPException(status_code=400, detail="Аккаунта с данным email не существует")
    if db_student.hashed_password != (student.password + "notreallyhashed"):
        raise HTTPException(status_code=400, detail="Неверный пароль")
    return db_student


@app.put("/students/{student_id}", response_model=schemas.Student)
def update_student(student_id: int, student: schemas.StudentCreate, db: Session = Depends(get_db)):
    return crud.update_student(db=db, student_id=student_id, student=student)


@app.delete("/students/{student_id}", response_model=schemas.Student)
def delete_student(student_id: int, db: Session = Depends(get_db)):
    return crud.delete_student(db=db, student_id=student_id)


# Teacher
@app.get("/teachers/{teacher_id}", response_model=schemas.Teacher)
def read_teacher(teacher_id: int, db: Session = Depends(get_db)):
    db_teacher = crud.get_teacher(db, teacher_id=teacher_id)
    if db_teacher is None:
        raise HTTPException(status_code=404, detail="Teacher not found")
    return db_teacher


@app.get("/teachers/", response_model=list[schemas.Teacher])
def read_teachers(skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    teachers = crud.get_teachers(db, skip=skip, limit=limit)
    return teachers


@app.post("/teachers/", response_model=schemas.Teacher)
def create_teacher(teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    return crud.create_teacher(db=db, teacher=teacher)


@app.put("/teachers/{teacher_id}", response_model=schemas.Teacher)
def update_teacher(teacher_id: int, teacher: schemas.TeacherCreate, db: Session = Depends(get_db)):
    return crud.update_teacher(db=db, teacher_id=teacher_id, teacher=teacher)


@app.delete("/teachers/{teacher_id}", response_model=schemas.Teacher)
def delete_teacher(teacher_id: int, db: Session = Depends(get_db)):
    return crud.delete_teacher(db=db, teacher_id=teacher_id)
