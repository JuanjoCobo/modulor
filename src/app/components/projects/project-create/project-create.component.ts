import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { ProjectService } from "../../../shared/services/project.service";
import { ActivatedRoute, ParamMap } from "@angular/router";
import { Project } from "src/app/shared/project.model";

@Component({
  selector: "app-project-create",
  templateUrl: "./project-create.component.html",
  styleUrls: ["./project-create.component.css"]
})
export class ProjectCreateComponent implements OnInit {
  private mode = "create";
  private projectId: string;

  public project: Project;

  constructor(
    public projectService: ProjectService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("projectId")) {
        this.mode = "edit";
        this.projectId = paramMap.get("projectId");
        this.project = this.projectService.getProjectById(this.projectId);
      } else {
        this.mode = "create";
        this.projectId = null;
      }
    });
  }

  addProject(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.projectService.addProject(form.value.title, form.value.description);
    form.resetForm();
  }

  onSaveProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    if (this.mode === "create") {
      this.projectService.addProject(form.value.title, form.value.description);
    } else {
      this.projectService.updateProject(
        this.projectId,
        form.value.title,
        form.value.description
      );
    }

    form.resetForm();
  }
}
