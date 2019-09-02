import { Project } from "./project.model";

export class ProjectService {
  private projects: Project[] = [];

  getProject() {
    return this.projects;
  }

  addProject(name: string, content: string) {
    const project: Project = { name: name, content: content };
    this.projects.push(project);
  }
}
