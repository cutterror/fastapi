export interface SignInStudent {
    email: string;
    password: string;
}

export interface CreateStudent extends SignInStudent {
    name: string;
}
