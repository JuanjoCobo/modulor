import { Component, OnInit } from "@angular/core";

import { Project } from "../project.model";

@Component({
  selector: "app-project-list",
  templateUrl: "./project-list.component.html",
  styleUrls: ["./project-list.component.css"]
})
export class ProjectListComponent implements OnInit {
  projects = [
    { title: "Proyecto 1", description: "Info 1" },
    { title: "Proyecto 220", description: "Info 2" }
  ];

  //@Input() projects: Project[] = [];

  constructor() {}

  ngOnInit() {}
}
