import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../../../shared/models/project.model';

import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  isLoading: boolean = false;
  private projectsSub: Subscription;

  constructor(public projectService: ProjectService) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectService.getProjects();
    this.projectsSub = this.projectService
      .getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.isLoading = false;
        this.projects = projects;
      });
  }
}
