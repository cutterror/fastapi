import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateStudent, SignInStudent } from '../models/student.model';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private signInUrl = 'http://127.0.0.1:8000/student/signin';
    private signUpUrl = 'http://127.0.0.1:8000/students/';

    constructor(
        private http: HttpClient
    ) {
    }

    public signIn(studentData: SignInStudent) {
        return this.http.post(this.signInUrl, studentData);
    }

    public signUp(studentData: CreateStudent) {
        return this.http.post(this.signUpUrl, studentData);
    }
}
