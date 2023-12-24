import { Component, Input, OnInit } from '@angular/core';
import { TeacherModel } from '../../models/teacher.model';
import { SubjectModel } from '../../models/subject.model';

@Component({
    selector: 'app-subject',
    templateUrl: './subject.component.html',
    styleUrls: ['./subject.css']
})
export class SubjectComponent implements OnInit {
    @Input() teacher!: TeacherModel;
    @Input() subject!: SubjectModel;

    public isHomeworkOpen: boolean = false;

    ngOnInit() {
    }

    public toggleHomeworkOpening(): void {
        if (this.subject.homeworks?.length) {
            this.isHomeworkOpen = !this.isHomeworkOpen;
        }
    }
}
