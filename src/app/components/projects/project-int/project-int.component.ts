import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Project } from '../../../shared/models/project.model';

import { ProjectService } from '../../../shared/services/project.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-project-int',
  templateUrl: './project-int.component.html',
  styleUrls: ['./project-int.component.css']
})
export class ProjectIntComponent implements OnInit, OnDestroy {
  projects: Project[] = [];
  isLoading: boolean = false;
  userIsAuthenticated = false;
  private projectsSub: Subscription;
  private authStatusSub: Subscription;

  constructor(
    public projectService: ProjectService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.isLoading = true;
    this.projectService.getProjects();
    this.projectsSub = this.projectService
      .getProjectUpdateListener()
      .subscribe((projects: Project[]) => {
        this.isLoading = false;
        this.projects = projects;
      });

    this.userIsAuthenticated = this.authService.getIsAuthenticated();
    this.authStatusSub = this.authService
      .getAuthStatusListener()
      .subscribe(isAuthenticated => {
        this.userIsAuthenticated = isAuthenticated; //true
      });
  }

  onDelete(projectId: string) {
    this.projectService.deleteProject(projectId);
  }

  ngOnDestroy() {
    this.projectsSub.unsubscribe();
    this.authStatusSub.unsubscribe();
  }
}
