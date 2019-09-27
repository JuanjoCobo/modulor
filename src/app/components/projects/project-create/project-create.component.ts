import { Component, OnInit } from "@angular/core";
import { NgForm, FormGroup, Validators, FormControl } from "@angular/forms";
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

  //
  form: FormGroup;
  //Vista previa de la imagen seleccionada antes de crear/editar el proyecto
  imagePreview: string;

  constructor(
    public projectService: ProjectService,
    public route: ActivatedRoute
  ) {}

  ngOnInit() {
    //Validaciones en el formulario
    this.form = new FormGroup({
      title: new FormControl(null, {
        validators: [Validators.required, Validators.minLength(3)]
      }),
      description: new FormControl(null, {
        validators: [Validators.required]
      }),
      image: new FormControl(null, {
        validators: [Validators.required]
      })
    });
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
            this.form.setValue({
              title: this.project.title,
              description: this.project.description
            });
          });
      } else {
        this.mode = "create";
        this.projectId = null;
      }
    });
  }

  //Se ejecuta al seleccionar la imagen, antes de subirla
  onFilePicked(event: Event) {
    const file = (event.target as HTMLInputElement).files[0];
    this.form.patchValue({ image: file });
    this.form.get("image").updateValueAndValidity();
    const fileReader = new FileReader();
    fileReader.onload = () => {
      this.imagePreview = fileReader.result as string;
    };
    fileReader.readAsDataURL(file);
  }

  //Recibe datos del formulario
  onSaveProject() {
    if (this.form.invalid) {
      return;
    }
    this.isLoading = true;
    if (this.mode === "create") {
      this.projectService.addProject(
        this.form.value.title,
        this.form.value.description
      );
    } else if (this.mode === "edit") {
      this.projectService.updateProject(
        this.projectId,
        this.form.value.title,
        this.form.value.description
      );
    }
    this.form.reset();
  }
}
