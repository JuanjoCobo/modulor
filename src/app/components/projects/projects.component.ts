import { Component, OnInit, Input } from "@angular/core";

import { Project } from "./project.model";

@Component({
  selector: "app-projects",
  templateUrl: "./projects.component.html",
  styleUrls: ["./projects.component.css"]
})
export class ProjectsComponent implements OnInit {
  projects = [
    { name: "Proyecto 1", content: "Info 1" },
    { name: "Proyecto 220", content: "Info 2" }
  ];

  //@Input() projects: Project[] = [];
  constructor() {}

  ngOnInit() {}
}
