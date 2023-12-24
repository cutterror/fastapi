import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '../../directives/destroyable.component';
import { AuthService } from '../../services/auth.service';
import { StudentModel } from '../../models/student.model';
import { takeUntil } from 'rxjs';

@Component({
    selector: 'app-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.css']
})
export class HeaderComponent extends DestroyableComponent implements OnInit {
    public student: StudentModel | null = null;

    constructor(
        public authService: AuthService
    ) {
        super();
        authService.student$.pipe(
            takeUntil(this.destroy$)
        ).subscribe((student) => this.student = student);
    }
    ngOnInit() {
    }
}
