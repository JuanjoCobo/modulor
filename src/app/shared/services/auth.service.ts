import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { map } from "rxjs/operators";

import { AuthData } from "../models/auth-data.model";

@Injectable({ providedIn: "root" })
export class AuthService {
  private users: AuthData[] = [];

  public url: string = "http://localhost:3000/api/users";

  constructor(private http: HttpClient) {}

  //Obtiene todos los usuarios
  getUsers() {
    this.http
      .get<{ message: string; users: any }>(this.url)
      .pipe(
        map(userData => {
          return userData.users.map(user => {
            return {
              name: user.name,
              email: user.email,
              id: user._id
            };
          });
        })
      )
      .subscribe(transformedUsers => {
        this.users = transformedUsers.users;
      });
  }

  createUser(name: string, email: string, pass: string) {
    const authData: AuthData = {
      name: name,
      email: email,
      pass: pass
    };
    this.http.post(this.url + "/signup", authData).subscribe(response => {
      console.log(response);
    });
  }
}
