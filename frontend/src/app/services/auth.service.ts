import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateStudent, SignInStudent, Student } from '../models/student.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public student$: BehaviorSubject<Student | null> = new BehaviorSubject<Student | null>(null);

    private signInUrl = 'http://127.0.0.1:8000/student/signin';
    private signUpUrl = 'http://127.0.0.1:8000/students/';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        if (localStorage['id']) {
            this.student$.next(<Student>{
                id: localStorage['id'],
                name: localStorage['name'],
                email: localStorage['email']
            });
        }
    }

    public signIn(studentData: SignInStudent) {
        return this.http.post(this.signInUrl, studentData);
    }

    public signUp(studentData: CreateStudent) {
        return this.http.post(this.signUpUrl, studentData);
    }

    public signOut(): void {
        localStorage.clear();
        this.router.navigate(['/auth']).then(() => {
            this.student$.next(null);
        });
    }
}
