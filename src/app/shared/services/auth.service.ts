import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

//modelo AuthData para autenticar/logar
import { AuthData } from '../models/auth-data.model';
//modelo User para registrar/crear
import { User } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public url: string = 'http://localhost:3000/api/users';

  constructor(private http: HttpClient, private router: Router) {}

  //Obtiene todos los usuarios (PROBAR)
  getUsers() {}
  /**
   * Método crear/registrar usuario
   * Se usa como modelo User porque se quieren introducir todos estos campos
   * @param name
   * @param email
   * @param pass
   */
  createUser(name: string, email: string, pass: string, rol: string) {
    const user: User = {
      name: name,
      email: email,
      pass: pass,
      rol: rol
    };
    this.http.post(this.url + '/signup', user).subscribe(response => {
      console.log(response);
    });
  }

  /**
   * Método logar/autenticar usuario
   * Se usa como modelo AuthData porque solo necesitamos dos campos,
   * user, que puede ser name o email del usuario, y pass.
   * @param user puede ser name o email del usuario
   * @param pass
   */
  loginUser(user: string, pass: string) {
    const authData: AuthData = {
      user: user,
      pass: pass
    };
    this.http.post(this.url + '/login', authData).subscribe(response => {
      console.log(response);
      //enviar response a componente login (login.component.ts)
      this.router.navigate(['/proyectos-int']);
    });
  }
}
