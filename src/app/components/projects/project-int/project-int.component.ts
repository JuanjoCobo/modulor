import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../../../shared/models/project.model';

import { ProjectService } from '../../../shared/services/project.service';

@Component({
  selector: 'app-project-int',
  templateUrl: './project-int.component.html',
  styleUrls: ['./project-int.component.css']
})
export class ProjectIntComponent implements OnInit, OnDestroy {
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

  onDelete(projectId: string) {
    this.projectService.deleteProject(projectId);
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
  }
}
