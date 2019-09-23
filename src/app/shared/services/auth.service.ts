import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

@Injectable({ providedIn: "root" })
export class AuthService {
  public url: string = "http://localhost:3000/api/users";

  constructor(private http: HttpClient) {}

  createUser(name: string, email: string, pass: string, rol: string) {}
}
