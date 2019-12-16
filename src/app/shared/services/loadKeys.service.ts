import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LoadKeysService {

  public mock: string = './assets/data/modulor.json';

  constructor(private http: HttpClient, private router: Router) {}

    //Obtiene todas las claves
    getKeys():Observable<any[]>{
        return this.http.get<any[]>(this.mock);
    }
  }
