import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-project-create",
  templateUrl: "./project-create.component.html",
  styleUrls: ["./project-create.component.css"]
})
export class ProjectCreateComponent implements OnInit {
  title: string = "";
  description: string = "";

  total: string = "";

  constructor() {}

  ngOnInit() {}

  addProject() {
    this.total = this.title + " " + this.description;
  }

  reset() {
    this.title = "";
    this.description = "";
    this.total = "";
  }
}
