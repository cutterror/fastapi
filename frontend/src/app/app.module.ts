import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebSocketService } from './services/web-socket.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms'
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';

const components = [
    AppComponent,
    SubjectsListComponent
]

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        FormsModule
    ],
    providers: [
        WebSocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
