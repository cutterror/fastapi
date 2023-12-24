import { SubjectModel } from './subject.model';

export interface TeacherBase {
    id: number;
    name: string;
    description: string;
    email: string;
}

export interface TeacherModel extends TeacherBase{
    subjects: SubjectModel[];
}
