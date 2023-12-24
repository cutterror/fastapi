import { Component, Input, OnInit } from '@angular/core';
import { TeacherModel } from '../../models/teacher.model';
import { SubjectModel } from '../../models/subject.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { HomeworkModel } from '../../models/homework.model';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.css']
})
export class SubjectComponent implements OnInit {
    @Input() teacher!: TeacherModel;
    @Input() subject!: SubjectModel;

    public isHomeworkOpen: boolean = false;
    public isHomeworkDialogOpen: boolean = false;

    public homeworkForm: FormGroup = new FormGroup({
        'title': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'description': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'deadline': new FormControl('', [Validators.required, Validators.minLength(3)]),
        'is_done': new FormControl(false),
    });

    private readonly backendUrl: string = 'http://127.0.0.1:8000';
    private isDisabled: boolean = false;

    constructor(
        private http: HttpClient,
        private webSocketService: WebSocketService
    ) {
    }

    ngOnInit() {
    }

    public onHomeworkClick(): void {
        if (this.subject.homeworks?.length && !this.isDisabled) {
            this.isHomeworkOpen = true;
        } else {
            this.addHomework();
        }
    }

    public addHomework(): void {
        if (this.isDisabled) {
            return;
        }
        this.isHomeworkDialogOpen = true;
    }

    public sendHomework(): void {
        this.isDisabled = true;
        const subjectId = this.subject.id;
        const data = this.homeworkForm.value;
        this.http.post(`${this.backendUrl}/subjects/${subjectId}/homeworks`, data)
            .subscribe((response) => {
                this.isHomeworkOpen = true;
                this.subject.homeworks?.push(<HomeworkModel>response);
                this.webSocketService.sendMessage(response);
                this.isDisabled = false;
            });
    }
}
