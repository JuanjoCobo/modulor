import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";
import { Router } from "@angular/router";

import { Project } from "../project.model";

/**
 * Esto (@Injectable) hace que el servicio sea inyectable,
 * es decir, puede ser usado por el resto de los componentes,
 * sin necesidad de importarlo en el app.module.ts
 */
@Injectable({ providedIn: "root" })
export class ProjectService {
  private projects: Project[] = [];
  private projectsUpdated = new Subject<Project[]>();

  public url: string = "http://localhost:3000/api/projects";

  constructor(private http: HttpClient, private router: Router) {}

  //Obtiene todos los proyectos
  getProjects() {
    this.http
      .get<{ message: string; projects: Project[] }>(this.url)
      .subscribe(projectData => {
        this.projects = projectData.projects;
        this.projectsUpdated.next([...this.projects]);
      });
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  getProjectById(id: string) {
    return this.http.get<{ _id: string; title: string; description: string }>(
      this.url + "/" + id
    );
  }

  //Añadir un proyecto
  addProject(title: string, description: string) {
    const project: Project = {
      id: null,
      title: title,
      description: description
    };
    this.http
      .post<{ message: string }>(this.url, project)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.projects.push(project);
        this.projectsUpdated.next([...this.projects]);
        //spinner
        this.router.navigate(["/proyectos"]);
      });
  }

  //Editar un proyecto
  updateProject(id: string, title: string, description: string) {
    const project: Project = {
      id: id,
      title: title,
      description: description
    };
    this.http
      .put<{ message: string }>(this.url + "/" + id, project)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.projects.push(project);
        this.projectsUpdated.next([...this.projects]);
        //spinner
        this.router.navigate(["/proyectos"]);
      });
  }

  deleteProject(projectId: string) {
    this.http.delete(this.url + "/" + projectId).subscribe(() => {
      console.log("deleted");
    });
  }
}
