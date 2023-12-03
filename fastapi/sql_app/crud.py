from sqlalchemy.orm import Session

from . import models, schemas


# Homework
def get_homework(db: Session, homework_id: int):
    return db.query(models.Homework).filter(models.Homework.id == homework_id).first()


def get_homeworks(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Homework).offset(skip).limit(limit).all()


def create_subject_homework(db: Session, homework: schemas.HomeworkCreate, subject_id: int):
    db_homework = models.Homework(**homework.dict(), subject_id=subject_id)
    db.add(db_homework)
    db.commit()
    db.refresh(db_homework)
    return db_homework


def update_homework(db: Session, homework_id: int, homework: schemas.HomeworkCreate):
    updated_homework: models.Homework = db.query(models.Homework).get(homework_id)
    updated_homework.title = homework.title
    updated_homework.description = homework.description
    updated_homework.deadline = homework.deadline
    updated_homework.is_done = homework.is_done
    db.add(updated_homework)
    db.commit()
    db.refresh(updated_homework)
    return updated_homework


# Subject
def get_subject(db: Session, subject_id: int):
    return db.query(models.Subject).filter(models.Subject.id == subject_id).first()


def get_subjects(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Subject).offset(skip).limit(limit).all()


def create_student_teacher_subject(db: Session, subject: schemas.SubjectCreate, student_id: int, teacher_id: int):
    db_subject = models.Subject(**subject.dict(), student_id=student_id, teacher_id=teacher_id)
    db.add(db_subject)
    db.commit()
    db.refresh(db_subject)
    return db_subject


def update_subject(db: Session, subject_id: int, subject: schemas.SubjectCreate):
    updated_subject: models.Subject = db.query(models.Subject).get(subject_id)
    updated_subject.title = subject.title
    updated_subject.description = subject.description
    updated_subject.mark = subject.mark
    updated_subject.isGrade = subject.isGrade
    db.add(updated_subject)
    db.commit()
    db.refresh(updated_subject)
    return updated_subject


# Student
def get_student(db: Session, student_id: int):
    return db.query(models.Student).filter(models.Student.id == student_id).first()


def get_student_by_email(db: Session, email: str):
    return db.query(models.Student).filter(models.Student.email == email).first()


def get_students(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Student).offset(skip).limit(limit).all()


def create_student(db: Session, student: schemas.StudentCreate):
    fake_hashed_password = student.password + "notreallyhashed"
    db_student = models.Student(email=student.email, name=student.name, hashed_password=fake_hashed_password)
    db.add(db_student)
    db.commit()
    db.refresh(db_student)
    return db_student


def update_student(db: Session, student_id: int, student: schemas.StudentCreate):
    updated_student: models.Student = db.query(models.Student).get(student_id)
    updated_student.email = student.email
    updated_student.name = student.name
    updated_student.hashed_password = student.password
    db.add(updated_student)
    db.commit()
    db.refresh(updated_student)
    return updated_student


# Teacher
def get_teacher(db: Session, teacher_id: int):
    return db.query(models.Teacher).filter(models.Teacher.id == teacher_id).first()


def get_teachers(db: Session, skip: int = 0, limit: int = 100):
    return db.query(models.Teacher).offset(skip).limit(limit).all()


def create_teacher(db: Session, teacher: schemas.TeacherCreate):
    db_teacher = models.Teacher(**teacher.dict())
    db.add(db_teacher)
    db.commit()
    db.refresh(db_teacher)
    return db_teacher


def update_teacher(db: Session, teacher_id: int, teacher: schemas.TeacherCreate):
    updated_teacher: models.Teacher = db.query(models.Teacher).get(teacher_id)
    updated_teacher.email = teacher.email
    updated_teacher.name = teacher.name
    updated_teacher.description = teacher.description
    db.add(updated_teacher)
    db.commit()
    db.refresh(updated_teacher)
    return updated_teacher
