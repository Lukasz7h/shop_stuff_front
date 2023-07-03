import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule } from '@angular/forms';
import { AddStuffComponent } from './add-stuff.component';

import { NgxDropzoneModule } from 'ngx-dropzone-v14';
import { MatIconModule } from '@angular/material/icon';


@NgModule({
  declarations: [
    AddStuffComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    NgxDropzoneModule,
    MatIconModule
  ]
})
export class AddStuffModule { }
