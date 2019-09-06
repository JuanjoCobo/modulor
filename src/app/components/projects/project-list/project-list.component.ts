import { Component, OnInit } from "@angular/core";

import { Project } from "../../../shared/project.model";

import { ProjectService } from "../../../shared/services/project.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];

  constructor(public projectService: ProjectService) {}

  ngOnInit() {
    this.projects = this.projectService.getProjects();
    this.projectService
      .getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });
  }
}
