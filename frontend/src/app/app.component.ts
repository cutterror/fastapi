import { Component, OnInit } from '@angular/core';
import { HelloService } from './services/hello.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
    title = 'frontend';

    constructor(
        private helloService: HelloService
    ) {
    }

    ngOnInit() {
        this.helloService.getHello().subscribe((response) => {
            console.log(response);
        });
    }
}
