import { Component, OnDestroy } from '@angular/core';
import { WebSocketService } from './services/web-socket.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
    constructor(
        private webSocketService: WebSocketService
    ) {
        this.webSocketService.connect();
    }

    ngOnDestroy() {
        this.webSocketService.close();
    }
}
