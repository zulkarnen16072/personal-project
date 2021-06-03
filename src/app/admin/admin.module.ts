import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RouterModule, Routes } from '@angular/router';
import { ProductComponent } from './product/product.component';
import { MaterialDesign } from 'src/Material/material';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { FormsModule } from '@angular/forms';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [
      {
        path: 'dashboard',
        component: DashboardComponent
      },
      {
        path: 'product',
        component: ProductComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    AdminComponent,
    DashboardComponent, 
    ProductComponent,
    ProductDetailComponent

  ],
  imports: [
    CommonModule,
    MaterialDesign,
    FormsModule,
    RouterModule.forChild(routes)
  ]
})
export class AdminModule { }
