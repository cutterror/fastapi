import { Component, OnInit } from '@angular/core';
import { DestroyableComponent } from '../../directives/destroyable.component';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.css']
})
export class HomeComponent extends DestroyableComponent implements OnInit {
    ngOnInit() {
    }
}
