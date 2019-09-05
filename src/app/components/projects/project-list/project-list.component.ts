import { Component, OnInit, Input } from "@angular/core";

import { Project } from "../../../shared/project.model";

import { ProjectService } from "../../../shared/services/project.service";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit {
  @Input() projects: Project[] = [];

  constructor() {}

  ngOnInit() {}
}
