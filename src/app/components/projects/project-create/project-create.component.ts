import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { ActivatedRoute, ParamMap } from "@angular/router";

import { ProjectService } from "../../../shared/services/project.service";
import { Project } from "src/app/shared/models/project.model";

@Component({
  selector: "app-project-create",
  templateUrl: "./project-create.component.html",
  styleUrls: ["./project-create.component.css"]
})
export class ProjectCreateComponent implements OnInit {
  //modo form puede ser create o edit, para crear o editar proyectos, usamos el mismo formulario
  private mode = "";
  private projectId: string;
  project: Project;

  //para spinner
  isLoading: boolean = false;

  constructor(
    public projectService: ProjectService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((paramMap: ParamMap) => {
      if (paramMap.has("projectId")) {
        this.mode = "edit";
        this.projectId = paramMap.get("projectId");
        this.isLoading = true;
        this.projectService
          .getProjectById(this.projectId)
          .subscribe(projectData => {
            this.isLoading = false;
            this.project = {
              id: projectData._id,
              title: projectData.title,
              description: projectData.description
            };
          });
      } else {
        this.mode = "create";
        this.projectId = null;
      }
    });
  }

  //Recibe datos del formulario
  onSaveProject(form: NgForm) {
    if (form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.projectService.addProject(form.value.title, form.value.description);
    } else if (this.mode === "edit") {
      this.projectService.updateProject(
        this.projectId,
        form.value.title,
        form.value.description
      );
    }
    form.resetForm();
  }
}
