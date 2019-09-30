import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLoading: boolean = false;

  constructor(public authService: AuthService) {}

  ngOnInit() {}

  onLogin(form: NgForm) {
    if (form.invalid) {
      return;
    }
    console.log('usuario ' + form.value.user);
    console.log('pass ' + form.value.pass);
    this.authService.loginUser(form.value.user, form.value.pass);
  }
}
