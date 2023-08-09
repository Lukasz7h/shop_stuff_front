import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AddStuffComponent } from './main/add-stuff/add-stuff.component';
import { GuardAddStuffService } from './main/add-stuff/guard-add-stuff.service';

import { CreateAccountComponent } from './main/createAccount/create-account/create-account.component';
import { LogComponent } from './main/log/log.component';

import { MainComponent } from './main/main.component';
import { StuffsComponent } from './main/stuffs/stuffs.component';

import { DetailsComponent } from './main/stuffs/details/details.component';
import { BasketDetailsComponent } from './main/stuffs/basket/basket-details/basket-details.component';

import { ResetComponent } from './main/reset/reset.component';
import { GuardResetService } from './main/reset/guard-reset.service';

const routes: Routes = [
  {path: "createAccount", component: CreateAccountComponent},
  {path: "log", component: LogComponent},

  {path: "stuffs", component: StuffsComponent},
  {path: "add_stuff", canActivate: [GuardAddStuffService], component: AddStuffComponent},

  {path: "stuffs/detail/:id", component: DetailsComponent},
  {path: "basket/:id", component: BasketDetailsComponent},

  {path: "reset/:id", canActivate: [GuardResetService], component: ResetComponent},
  {path: "**", component: MainComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
