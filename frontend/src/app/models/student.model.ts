export interface SignInStudent {
    email: string;
    password: string;
}

export interface CreateStudent extends SignInStudent {
    name: string;
}

export interface StudentModel {
    email: string;
    name: string;
    subjects: any[];
    id: number;
}
