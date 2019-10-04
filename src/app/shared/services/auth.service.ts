import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

//modelo AuthData para autenticar/logar
import { AuthData } from '../models/auth-data.model';
//modelo User para registrar/crear
import { User } from '../models/user.model';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  public url: string = 'http://localhost:3000/api/users';

  private isAuthenticated = false;
  private token: string;
  private tokenTimer: NodeJS.Timer;
  private authStatusListener = new Subject<boolean>();

  constructor(private http: HttpClient, private router: Router) {}

  getToken() {
    return this.token;
  }

  getIsAuthenticated() {
    return this.isAuthenticated;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

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
    this.http
      .post<{ token: string; expiresIn: number }>(this.url + '/login', authData)
      .subscribe(response => {
        var token = response.token;
        this.token = token;
        if (token) {
          const expiresInDuration = response.expiresIn;
          this.setAuthTimer(expiresInDuration);
          this.isAuthenticated = true;
          this.authStatusListener.next(true);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + expiresInDuration * 1000
          );
          console.log(expirationDate); // expirationDate --> expira 1h despues de la actual
          this.saveAuthData(token, expirationDate);
          this.router.navigate(['/proyectos-int']);
        }
      });
  }

  //verifica que existe el token y que la expiracion del mismo todavia no ha llegado
  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next(true);
    }
  }

  logOut() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next(false);
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(['/login']);
  }

  private setAuthTimer(duration: number) {
    console.log('Setting timer: ' + duration);
    this.tokenTimer = setTimeout(() => {
      this.logOut();
    }, duration * 1000);
  }

  //almacena el token en el 'local storage'
  private saveAuthData(token: string, expirationDate: Date) {
    localStorage.setItem('token', token);
    localStorage.setItem('expiration', expirationDate.toISOString());
  }

  private clearAuthData() {
    localStorage.removeItem('token');
    localStorage.removeItem('expiration');
  }

  //devuelve token y fecha si ambos existen, es decir, si estamos logados correctamente
  private getAuthData() {
    var token = localStorage.getItem('token');
    var expirationDate = localStorage.getItem('expiration');
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate)
    };
  }
}
