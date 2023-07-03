import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { CreateAccountModule } from './createAccount/create-account/create-account.module';

import { MainComponent } from './main.component';
import { AppRoutingModule } from '../app-routing.module';

import { LogModule } from './log/log.module';
import { AddStuffModule } from './add-stuff/add-stuff.module';

import { ResetComponent } from './reset/reset.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    MainComponent,
    ResetComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    CreateAccountModule,
    AppRoutingModule,
    LogModule,
    AddStuffModule,
    FormsModule
  ]
})
export class MainModule { }
