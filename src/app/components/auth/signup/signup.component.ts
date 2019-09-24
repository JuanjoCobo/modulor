import { Component, OnInit } from "@angular/core";
import { NgForm } from "@angular/forms";
import { AuthService } from "src/app/shared/services/auth.service";
import { User } from "src/app/shared/models/user.model";

@Component({
  selector: "app-signup",
  templateUrl: "./signup.component.html",
  styleUrls: ["./signup.component.css"]
})
export class SignupComponent implements OnInit {
  isLoading = false;

  users: any = [];

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onSignUp(form: NgForm) {
    if (form.invalid) {
      return;
      //Código para probar que los campos se pasaban bien
      /*
      console.log("mal");
      console.log(
        " usuario: " +
          form.value.name2 +
          " correo: " +
          form.value.email +
          " pass: " +
          form.value.pass
      );
      */
    }
    this.authService.createUser(
      form.value.name2,
      form.value.email,
      form.value.pass
    );
    //console.log(form.value);
  }
}
