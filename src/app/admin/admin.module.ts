import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProductComponent } from './product/product.component';



@NgModule({
  declarations: [
    DashboardComponent,
    ProductComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AdminModule { }
