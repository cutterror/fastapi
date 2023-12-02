import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class HelloService {
    public readonly url: string = 'http://127.0.0.1:8000';

    constructor(
        protected http: HttpClient
    ) {
    }

    public getHello() {
        return this.http.get(this.url);
    }
}
