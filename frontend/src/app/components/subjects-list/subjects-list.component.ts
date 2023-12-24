import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TeacherModel } from '../../models/teacher.model';

@Component({
    selector: 'app-subjects-list',
    templateUrl: './subjects-list.component.html',
    styleUrls: ['./subjects-list.css']
})
export class SubjectsListComponent implements OnInit {
    public teachers: TeacherModel[] = [];

    private readonly backendUrl: string = 'http://127.0.0.1:8000';

    constructor(
        protected http: HttpClient
    ) {
    }

    public ngOnInit(): void {
        this.http.get(`${this.backendUrl}/subjects/students/${localStorage['id']}/teachers`).subscribe((response: any) => {
            this.teachers = <TeacherModel[]>response;
        });
    }
}
