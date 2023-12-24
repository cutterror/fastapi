import { HomeworkModel } from './homework.model';

export interface SubjectBase {
    title: string;
    description: string;
    mark: number;
    isGrade: boolean;
    id: number;
    homeworks?: HomeworkModel[];
}

export interface SubjectModel extends SubjectBase {
    student_id: number;
    teacher_id?: number;
}
