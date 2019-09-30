import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Project } from '../models/project.model';

/**
 * Esto (@Injectable) hace que el servicio sea inyectable,
 * es decir, puede ser usado por el resto de los componentes,
 * sin necesidad de importarlo en el app.module.ts
 */
@Injectable({ providedIn: 'root' })
export class ProjectService {
  private projects: Project[] = [];
  private projectsUpdated = new Subject<Project[]>();

  public url: string = 'http://localhost:3000/api/projects';

  constructor(private http: HttpClient, private router: Router) {}

  //Obtiene todos los proyectos
  getProjects() {
    this.http
      .get<{ message: string; projects: any }>(this.url)
      .pipe(
        map(projectData => {
          return projectData.projects.map(project => {
            return {
              title: project.title,
              description: project.description,
              id: project._id,
              imagePath: project.imagePath
            };
          });
        })
      )
      .subscribe(transformedProjects => {
        this.projects = transformedProjects;
        this.projectsUpdated.next([...this.projects]);
      });
  }

  getProjectUpdateListener() {
    return this.projectsUpdated.asObservable();
  }

  getProjectById(id: string) {
    return this.http.get<{ _id: string; title: string; description: string }>(
      this.url + '/' + id
    );
  }

  //Añadir un proyecto
  addProject(title: string, description: string, image: File) {
    const projectData = new FormData();
    projectData.append('title', title);
    projectData.append('description', description);
    projectData.append('image', image, title);
    this.http
      .post<{ message: string; project: Project }>(this.url, projectData)
      .subscribe(responseData => {
        //prueba
        const project: Project = {
          id: responseData.project.id,
          title: title,
          description: description,
          imagePath: responseData.project.imagePath
        };
        //
        this.projects.push(project);
        this.projectsUpdated.next([...this.projects]);
        //redirige a listado proyectos
        this.router.navigate(['/proyectos']);
      });
  }

  //Editar un proyecto
  updateProject(id: string, title: string, description: string) {
    const project: Project = {
      id: id,
      title: title,
      description: description,
      imagePath: null
    };
    this.http
      .put<{ message: string }>(this.url + '/' + id, project)
      .subscribe(responseData => {
        this.projects.push(project);
        this.projectsUpdated.next([...this.projects]);
        console.log(responseData.message);
        //redirige a listado proyectos
        this.router.navigate(['/proyectos']);
      });
  }

  deleteProject(projectId: string) {
    this.http.delete(this.url + '/' + projectId).subscribe(response => {
      console.log(response);
    });
  }
}
