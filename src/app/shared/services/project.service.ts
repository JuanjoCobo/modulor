import { Injectable } from "@angular/core";
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

  //Obtiene todos los proyectos
  getProjects() {
    return this.projects;
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  //Añade un proyecto
  addProject(title: string, description: string) {
    const project: Project = { title: title, description: description };
    this.projects.push(project);
    this.projectsUpdated.next([...this.projects]);
  }
}
