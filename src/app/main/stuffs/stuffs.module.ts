import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StuffsComponent } from './stuffs.component';
import { DetailsComponent } from './details/details.component';

import { RouterModule } from '@angular/router';
import { NgChartjsModule } from 'ng-chartjs';

import { MatIconModule } from '@angular/material/icon';
import { BasketComponent } from './basket/basket.component';

import { BasketDetailsComponent } from './basket/basket-details/basket-details.component'

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
    MatIconModule
  ]
})
export class StuffsModule { }
