import { Component, Input, OnInit } from '@angular/core';
import { DestroyableComponent } from '../../directives/destroyable.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TuiSizeL, TuiSizeM, TuiSizeS } from '@taiga-ui/core';
import { AuthService } from '../../services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { StudentModel } from '../../models/student.model';
import { Router } from '@angular/router';

type Titles = 'Зарегистрироваться' | 'Войти в аккаунт';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.css']
})
export class AuthComponent extends DestroyableComponent implements OnInit {
    @Input() public inputSize: TuiSizeS | TuiSizeM | TuiSizeL = 'm';

    public isSignIn: boolean = true;
    public title: Titles = 'Войти в аккаунт';
    public buttonText: Titles = 'Зарегистрироваться';
    public errorMessage: string | null = null;

    public signInForm: FormGroup = new FormGroup<any>({
        'email': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required])
    });
    public signUpForm: FormGroup = new FormGroup<any>({
        'name': new FormControl('', [Validators.required]),
        'email': new FormControl('', [Validators.required]),
        'password': new FormControl('', [Validators.required])
    });

    public curForm: FormGroup;

    constructor(
        private authService: AuthService,
        private router: Router
    ) {
        super();
        this.curForm = this.signInForm;
    }

    ngOnInit() {
    }

    toggleForm(): void {
        this.isSignIn = !this.isSignIn;
        this.signInForm.reset();
        this.signUpForm.reset();
        this.errorMessage = null;
        this.curForm = this.isSignIn ? this.signInForm : this.signUpForm;
        this.title = this.isSignIn ? 'Войти в аккаунт' : 'Зарегистрироваться';
        this.buttonText = this.isSignIn ? 'Зарегистрироваться' : 'Войти в аккаунт';
    }

    submitForm(): void {
        if (this.curForm.invalid) {
            this.errorMessage = 'Заполните все поля'
            return;
        }
        const data = this.curForm.value;
        const postObs = this.isSignIn ? this.authService.signIn(data) : this.authService.signUp(data);
        postObs.subscribe((response) => {
            if (response) {
                const student: any = <StudentModel>response;
                localStorage['id'] = student?.id;
                localStorage['name'] = student?.name;
                localStorage['email'] = student?.email;
                this.authService.student$.next(student);
                this.router.navigate(['']).then();
            }
        }, (e) => {
            if (e instanceof HttpErrorResponse) {
                this.errorMessage = e.error.detail;
            }
        });
    }
}
