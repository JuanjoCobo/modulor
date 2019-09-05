import { Project } from "../project.model";

export class ProjectService {
  private projects: Project[] = [];

  getProject() {
    return this.projects;
  }

  addProject(name: string, content: string) {
    const project: Project = { title: name, description: content };
    this.projects.push(project);
  }
}
