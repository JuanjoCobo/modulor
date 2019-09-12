import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Subject } from "rxjs";

import { Project } from "../project.model";

/**
 * Esto hace que el servicio sea inyectable,
 * es decir, pueda ser usado por el resto de los componentes,
 * sin necesidad de importarlo en el app.module.ts
 */
@Injectable({ providedIn: "root" })
export class ProjectService {
  private projects: Project[] = [];
  private projectsUpdated = new Subject<Project[]>();

  constructor(private http: HttpClient) {}

  //Obtiene todos los proyectos
  getProjects() {
    this.http
      .get<{ message: string; projects: Project[] }>(
        "http://localhost:3000/api/projects"
      )
      .subscribe(projectData => {
        this.projects = projectData.projects;
        this.projectsUpdated.next([...this.projects]);
      });
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  //Añade un proyecto
  addProject(title: string, description: string) {
    const project: Project = {
      id: null,
      title: title,
      description: description
    };
    this.http
      .post<{ message: string }>("http://localhost:3000/api/projects", project)
      .subscribe(responseData => {
        console.log(responseData.message);
        this.projects.push(project);
        this.projectsUpdated.next([...this.projects]);
      });
  }
}
