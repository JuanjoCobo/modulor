import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { ReactiveFormsModule } from "@angular/forms";

import { FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import {
  MatInputModule,
  MatFormFieldModule,
  MatButtonModule,
  MatExpansionModule
} from "@angular/material";

import { AppComponent } from "./app.component";
import { HomeComponent } from "./components/home/home.component";
import { MenuComponent } from "./components/menu/menu.component";
import { FooterComponent } from "./components/footer/footer.component";
import { AppRoutingModule } from "./app-routing.module";
import { ProjectCreateComponent } from "./components/projects/project-create/project-create.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { ProjectNavComponent } from "./components/projects/project-nav/project-nav.component";
import { ProjectListComponent } from "./components/projects/project-list/project-list.component";
//import { ProjectService } from "./shared/services/project.service";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuComponent,
    FooterComponent,
    ProjectCreateComponent,
    ProjectNavComponent,
    ProjectListComponent
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
    MatExpansionModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
