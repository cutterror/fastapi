import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';
import { BehaviorSubject } from 'rxjs';

interface MessageData {
    message: string;
}

@Injectable()
export class WebSocketService {
    private socket$!: WebSocketSubject<any>;
    public receivedData: MessageData[] = [];
    public data$: BehaviorSubject<any> = new BehaviorSubject<any>(null);

    constructor(
        protected http: HttpClient
    ) {
    }

    public connect(): void {
        if (!this.socket$ || this.socket$.closed) {
            this.socket$ = webSocket(environment.webSocketUrl);

            this.socket$.subscribe((data: any) => {
                this.receivedData.push(data);
                this.data$.next(data);
            });
        }
    }

    sendMessage(message: any) {
        this.socket$.next({ message });
    }

    close() {
        this.socket$.complete();
    }
}
