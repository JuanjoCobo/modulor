import { Component, OnInit, OnDestroy } from "@angular/core";
import { Subscription } from "rxjs";

import { Project } from "../../../shared/project.model";

import { ProjectService } from "../../../shared/services/project.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  private projectsSub: Subscription;

  constructor(public projectService: ProjectService) {}

  ngOnInit() {
    this.projectService.getProjects();
    this.projectsSub = this.projectService
      .getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.projects = projects;
      });
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }
}
