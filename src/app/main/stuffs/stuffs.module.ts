import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StuffsComponent } from './stuffs.component';
import { DetailsComponent } from './details/details.component';

import { RouterModule } from '@angular/router';
import { NgChartjsModule } from 'ng-chartjs';

import { MatIconModule } from '@angular/material/icon';
import { BasketComponent } from './basket/basket.component';

import { BasketDetailsComponent } from './basket/basket-details/basket-details.component'
import { SocketIoModule } from 'ngx-socket-io';

import { data } from 'src/app/api_data/api_data';

@NgModule({
  declarations: [
    StuffsComponent,
    DetailsComponent,
    BasketComponent,
    BasketDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    NgChartjsModule,
    MatIconModule,
    SocketIoModule.forRoot({url: data.socket, options: {transports: ["websocket"], autoConnect: true}})
  ]
})
export class StuffsModule { }
