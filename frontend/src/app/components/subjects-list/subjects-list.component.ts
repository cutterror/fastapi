import { Component, OnInit } from '@angular/core';
import { SubjectModel } from '../../models/subject.model';
import { HttpClient } from '@angular/common/http';

@Component({
    selector: 'app-subjects-list',
    templateUrl: './subjects-list.component.html',
    styleUrls: ['./subjects-list.css']
})
export class SubjectsListComponent implements OnInit {
    public subjects: SubjectModel[] = [];

    private readonly backendUrl: string = 'http://127.0.0.1:8000';

    private teacherId = 534;
    private studentId = 234;

    constructor(
        protected http: HttpClient
    ) {
    }

    public ngOnInit(): void {
        this.http.get(`${this.backendUrl}/subjects/`).subscribe((response: any) => {
            console.log(response);
        });
        this.http.get(`${this.backendUrl}/teachers/`).subscribe((response: any) => {
            console.log(response);
        });
    }

    // public createSubject(): void {
    //     this.http.post(`${this.backendUrl}/students/${this.studentId}/teachers/${this.teacherId}/subjects/`)
    // }
}
