from pydantic import BaseModel


# Homework
class HomeworkBase(BaseModel):
    title: str
    description: str
    deadline: str
    is_done: bool = False


class HomeworkCreate(HomeworkBase):
    pass


class Homework(HomeworkBase):
    id: int
    subject_id: int

    class Config:
        orm_mode = True


# Subject
class SubjectBase(BaseModel):
    title: str
    description: str | None = None
    mark: int | None = None
    isGrade: bool = False


class SubjectCreate(SubjectBase):
    pass


class Subject(SubjectBase):
    id: int
    student_id: int
    teacher_id: int
    homeworks: list[Homework]

    class Config:
        from_attributes = True


# Student
class StudentBase(BaseModel):
    email: str
    name: str


class StudentCreate(StudentBase):
    password: str


class Student(StudentBase):
    id: int
    is_active: bool
    subjects: list[Subject] = []

    class Config:
        from_attributes = True


# Teacher
class TeacherBase(BaseModel):
    name: str
    description: str
    email: str


class TeacherCreate(TeacherBase):
    pass


class Teacher(TeacherBase):
    id: int
    subjects: list[Subject] = []

    class Config:
        orm_mode = True
