import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeacherModel } from '../../models/teacher.model';
import { WebSocketService } from '../../services/web-socket.service';

@Component({
    selector: 'app-subjects-list',
    templateUrl: './subjects-list.component.html',
    styleUrls: ['./subjects-list.css']
})
export class SubjectsListComponent implements OnInit {
    public teachers: TeacherModel[] = [];
    public isShowMessage: boolean = false;

    private readonly backendUrl: string = 'https://fastapi--strongfoxspirit.repl.co';

    constructor(
        protected http: HttpClient,
        private webSocketService: WebSocketService
    ) {
        // при сообщении из веб сокета об изменении таблиц предметов
        webSocketService.data$.subscribe((data) => {
            if (!data) {
                return;
            }
            this.getTeachers();
            this.isShowMessage = true;
            setTimeout(() => this.isShowMessage = false, 5000)
        });
    }

    public ngOnInit(): void {
        this.getTeachers();
    }

    private getTeachers(): void {
        this.http.get(`${this.backendUrl}/subjects/students/${localStorage['id']}/teachers`).subscribe((response: any) => {
            this.teachers = <TeacherModel[]>response;
        });
    }
}
