import { Component } from '@angular/core';
import { RouteService } from './route.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent
{
  title = 'shop_stuff_front';

  constructor(private routeService: RouteService){
    routeService.listenRoute();
  }
}