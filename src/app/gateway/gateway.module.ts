import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GatewayRoutingModule } from './gateway-routing.module';
import { GatewayComponent } from './gateway.component';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { MealplanComponent } from '../mealplan/mealplan.component';
import { FormsModule } from '@angular/forms';
import { TestComponent } from '../test/test.component';


@NgModule({
  declarations: [
    GatewayComponent,
    DashboardComponent,
    MealplanComponent,
    TestComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    GatewayRoutingModule
  ]
})
export class GatewayModule { }
