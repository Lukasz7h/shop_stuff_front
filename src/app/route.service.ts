import { Injectable } from '@angular/core';
import { NavigationEnd, NavigationStart, Router } from '@angular/router';

import { filter } from 'rxjs';
import { init, request } from './cursor';

@Injectable({
  providedIn: 'root'
})
export class RouteService
{

  constructor(
    private route: Router
  ){}

  listenRoute(): void
  {
    this.route.events
    .pipe(
      filter(event => event instanceof NavigationEnd)  
    )
    .subscribe((event: NavigationStart) => {
      if(request.value) cancelAnimationFrame(request.value);
      init(event.id);
    });
  }
}
