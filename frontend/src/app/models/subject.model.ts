export interface SubjectModel {
    title: string,
    description: string,
    mark: number,
    isGrade: boolean,
    id?: number,
    student_id?: number,
    teacher_id?: number,
    homeworks?: any[]
}
