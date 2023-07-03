import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LogComponent } from './log.component';
import { LogService } from './log.service';

import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    LogComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatIconModule
  ],
  providers:[
    LogService
  ]
})
export class LogModule {}