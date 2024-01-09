import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CreateStudent, SignInStudent, StudentModel } from '../models/student.model';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    public student$: BehaviorSubject<StudentModel | null> = new BehaviorSubject<StudentModel | null>(null);

    private signInUrl = 'https://2c2d3343-c262-4f72-99af-16ca0546bbc6-00-39iswdjpx6x14.sisko.replit.dev/student/signin';
    private signUpUrl = 'https://2c2d3343-c262-4f72-99af-16ca0546bbc6-00-39iswdjpx6x14.sisko.replit.dev/students/';

    constructor(
        private http: HttpClient,
        private router: Router
    ) {
        if (localStorage['id']) {
            this.student$.next(<StudentModel>{
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
