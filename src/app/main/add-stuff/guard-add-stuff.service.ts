import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { catchError, of } from 'rxjs';
import { data } from 'src/app/api_data/api_data';

@Injectable({
  providedIn: 'root'
})
export class GuardAddStuffService 
{

  constructor(private httpClient: HttpClient){}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const that = this;

    function getData(): Promise<boolean>
    {
      return new Promise((resolve) => {
        that.httpClient.get(data.url + "log/is_log/", {withCredentials: true})
        .pipe(
          catchError((err: any, data: any): any => {
            if(err) {
              resolve(false);
              return of([])
            };

          })
          )
        .subscribe((e) => {
          resolve(!!e);
        });
        
      });
    }
    
    return await getData();
  }
}
