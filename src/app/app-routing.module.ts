import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

import { ProjectListComponent } from "./components/projects/project-list/project-list.component";
import { ProjectCreateComponent } from "./components/projects/project-create/project-create.component";
import { HomeComponent } from "./components/home/home.component";

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "inicio", component: HomeComponent },
  { path: "proyectos", component: ProjectListComponent },
  { path: "crear-proyecto", component: ProjectCreateComponent },
  { path: "editar-proyecto/:projectId", component: ProjectCreateComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
