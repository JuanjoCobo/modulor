import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatExpansionModule,
  MatProgressSpinnerModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectCreateComponent } from './components/projects/project-create/project-create.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectNavComponent } from './components/projects/project-nav/project-nav.component';
import { ProjectListComponent } from './components/projects/project-list/project-list.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { ProjectIntComponent } from './components/projects/project-int/project-int.component';
import { AuthInterceptor } from './shared/utils/auth-interceptor';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    ProjectCreateComponent,
    ProjectNavComponent,
    ProjectListComponent,
    LoginComponent,
    SignupComponent,
    ProjectIntComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatExpansionModule,
    MatProgressSpinnerModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
