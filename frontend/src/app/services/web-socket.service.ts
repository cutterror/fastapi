import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { webSocket } from 'rxjs/webSocket';
import { environment } from '../../environments/environment';

interface MessageData {
    message: string;
}

@Injectable()
export class WebSocketService {
    private socket$!: WebSocketSubject<any>;
    public receivedData: MessageData[] = [];
    public readonly url: string = 'http://127.0.0.1:8000';

    constructor(
        protected http: HttpClient
    ) {
    }

    public connect(): void {
        if (!this.socket$ || this.socket$.closed) {
            this.socket$ = webSocket(environment.webSocketUrl);

            this.socket$.subscribe((data: MessageData) => {
                this.receivedData.push(data);
            });
        }
    }

    sendMessage(message: string) {
        this.socket$.next({ message });
    }

    close() {
        this.socket$.complete();
    }
}
