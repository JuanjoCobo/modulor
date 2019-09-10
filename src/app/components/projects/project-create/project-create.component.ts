import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Project } from "../../../shared/project.model";

import { ProjectService } from "../../../shared/services/project.service";

@Component({
  selector: "app-project-create",
  templateUrl: "./project-create.component.html",
  styleUrls: ["./project-create.component.css"]
})
export class ProjectCreateComponent implements OnInit {
  constructor(public projectService: ProjectService) {}

  ngOnInit() {}

  addProject(form: NgForm) {
    if (form.invalid) {
      return;
    }

    this.projectService.addProject(form.value.title, form.value.description);
    form.resetForm();
  }
}
