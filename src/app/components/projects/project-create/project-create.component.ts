import { Component, OnInit, EventEmitter, Output } from "@angular/core";
import { NgForm } from "@angular/forms";

import { Project } from "../../../shared/project.model";

import { ProjectService } from "../../../shared/services/project.service";

@Component({
  selector: "app-project-create",
  templateUrl: "./project-create.component.html",
  styleUrls: ["./project-create.component.css"]
})
export class ProjectCreateComponent implements OnInit {
  @Output() projectCreated = new EventEmitter<Project>();

  constructor() {}

  ngOnInit() {}

  addProject(form: NgForm) {
    const project: Project = {
      title: form.value.title,
      description: form.value.description
    };
    this.projectCreated.emit(project);
  }
}
