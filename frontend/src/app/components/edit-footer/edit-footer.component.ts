import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '../../directives/destroyable.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { TeacherModel } from '../../models/teacher.model';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
    selector: 'app-edit-footer',
    templateUrl: './edit-footer.component.html',
    styleUrls: ['./edit-footer.css']
})
export class EditFooterComponent extends DestroyableComponent implements OnInit {
    public isTeacherDialogOpen = false;
    public isSubjectDialogOpen = false;

    public teacherForm: FormGroup = new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'email': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'description': new FormControl('', [Validators.required, Validators.minLength(3)]),
    });

    public subjectForm: FormGroup = new FormGroup({
        'title': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'description': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'mark': new FormControl(4, [Validators.required, Validators.pattern("^[0-9]*$")]),
        'isGrade': new FormControl(false),
    });

    public teacherSubjectForm: FormGroup = new FormGroup({
        'teacher': new FormControl(null, [Validators.required])
    });

    public possibleTeachers: TeacherModel[] = [];
    public teacherNames: string[] = [];

    private readonly backendUrl: string = 'http://127.0.0.1:8000';
    private studentId: string = localStorage['id'];

    constructor(
        private http: HttpClient,
        private websocket: WebSocketService
    ) {
        super();
    }

    ngOnInit() {
        this.http.get(`${this.backendUrl}/teachers/`)
            .subscribe((response) => {
                this.possibleTeachers = <TeacherModel[]>response;
                this.teacherNames = this.possibleTeachers.map(teacher => teacher.name);
            });
    }

    public addTeacher(): void {
        this.isTeacherDialogOpen = true;
    }

    public addSubject(): void {
        this.isSubjectDialogOpen = true;
    }

    public sendTeacher(): void {
        const data = this.teacherForm.value;
        this.http.post(`${this.backendUrl}/teachers/`, data)
            .subscribe((response) => {
                console.log(response);
            });
    }

    public sendSubject(): void {
        const teacherName = this.teacherSubjectForm.get('teacher')?.value;
        const teacherId = this.possibleTeachers
            .find((teacher: TeacherModel) => teacher.name === teacherName)?.id;
        const data = this.subjectForm.value;
        this.http.post(`${this.backendUrl}/students/${this.studentId}/teachers/${teacherId}/subjects/`, data)
            .subscribe((response) => {
                // отправляем изменение всем активным клиентам
                this.websocket.sendMessage(response);
                console.log(response);
            });
    }
}
