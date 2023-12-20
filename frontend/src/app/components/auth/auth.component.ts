import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '../destroyable-component/destroyable.component';
import { AbstractControl, FormControl, FormGroup } from '@angular/forms';

type Titles = 'Зарегистрироваться' | 'Войти в аккаунт';

@Component({
    selector: 'app-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.css']
})
export class AuthComponent extends DestroyableComponent implements OnInit {
    public isSignIn: boolean = true;
    public title: Titles = 'Войти в аккаунт';
    public buttonText: Titles = 'Зарегистрироваться';

    private curForm: FormGroup;
    private signInForm: FormGroup = new FormGroup<any>({
        'email': new FormControl(''),
        'password': new FormControl('')
    });
    private signUpForm: FormGroup = new FormGroup<any>({
        'name': new FormControl(''),
        'email': new FormControl(''),
        'password': new FormControl('')
    });

    constructor(
    ) {
        super();
        this.curForm = this.signInForm;
    }

    ngOnInit() {
    }

    getControls(): AbstractControl[] {
        const curForm: FormGroup = this.isSignIn ? this.signInForm : this.signUpForm;
        return Object.values(curForm);
    }

    toggleForm(): void {
        this.isSignIn = !this.isSignIn;
        this.curForm = this.isSignIn ? this.signInForm : this.signUpForm;
        this.title = this.isSignIn ? 'Войти в аккаунт' : 'Зарегистрироваться';
        this.buttonText = this.isSignIn ? 'Зарегистрироваться' : 'Войти в аккаунт';
    }
}
