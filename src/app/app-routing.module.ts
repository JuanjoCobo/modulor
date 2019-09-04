import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProjectListComponent } from "./components/projects/project-list/project-list.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "inicio", component: HomeComponent },
  { path: "proyectos", component: ProjectListComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
