import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

import { LoadKeysService } from '../services/loadKeys.service';

@Injectable()
export class ContentResolver implements Resolve<any> {

  constructor(
    private loadKeysService: LoadKeysService
  ) {}

  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<any> {
    // Hacemos un forkJoin para lanzar peticiones en paralelo y no navegar
    // hasta que no hayan finalizado todas
    return this.loadKeysService.getKeys().pipe(
      map((results) => {
        return this.parseContentData( results, route );
      }),
      catchError(err => {
        // En caso de error devolvemos un observable vacio para que la
        // navegación concluya a la pagina, si no devolvieramos nada no se realizaría la navegación.
        return of({});
      })
    );
  }

  /**
   * Devuelve una estructura con el contenido para la vista a la que se está navegando y el contenido comun de la aplicación
   */
  parseContentData( results, route ) {
    const contentData = results;
    let contentDataView = {}
    if( contentData["yu-literales"] && contentData["yu-literales"]["view"] &&
      contentData["yu-literales"]["view"][route.routeConfig.data.name] ) {
        contentDataView = contentData["yu-literales"]["view"][route.routeConfig.data.name];
    }
    let contentDataCommon = {};
    if( contentData["yu-literales"] && contentData["yu-literales"]["common"] ) {
        contentDataCommon = contentData["yu-literales"]["common"];
    }
    const contentDataWithCommon = { ...contentDataView, ...contentDataCommon };
    return contentDataWithCommon;
  }
}