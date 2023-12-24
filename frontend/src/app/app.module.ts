import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { WebSocketService } from './services/web-socket.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { SubjectsListComponent } from './components/subjects-list/subjects-list.component';
import { RouterOutlet } from '@angular/router';
import { TuiErrorModule, TuiModeModule, TuiRootModule, TuiTextfieldControllerModule } from '@taiga-ui/core';
import { AuthComponent } from './components/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { TuiInputModule } from '@taiga-ui/kit';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './components/header/header.component';
import { SubjectComponent } from './components/subject/subject.component';

const components = [
    AppComponent,
    SubjectsListComponent,
    AuthComponent,
    HomeComponent,
    HeaderComponent,
    SubjectComponent
]

@NgModule({
    declarations: [
        ...components
    ],
    imports: [
        HttpClientModule,
        BrowserModule,
        FormsModule,
        RouterOutlet,
        TuiRootModule,
        TuiModeModule,
        AppRoutingModule,
        ReactiveFormsModule,
        TuiInputModule,
        TuiTextfieldControllerModule,
        TuiErrorModule
    ],
    providers: [
        WebSocketService
    ],
    bootstrap: [AppComponent]
})
export class AppModule {
}
