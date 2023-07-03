import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { data } from 'src/app/api_data/api_data';

@Injectable({
  providedIn: 'root'
})
export class GuardResetService implements CanActivate {

  constructor(private httpClient: HttpClient, private router: Router){}

  async canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
    const that = this;

      return new Promise((resolve) => {
        this.httpClient.get(data.url+"account/reset/guard/"+route.paramMap.get("id"))
        .subscribe((e) => {
          if(!e) this.router.navigate(['']);
          return resolve(!!e);
        })
      });
  }
}
