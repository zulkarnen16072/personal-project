import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { ShopComponent } from './shop/shop.component';
import { ProductComponent } from '../admin/product/product.component';
import { MaterialDesign } from 'src/Material/material';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'shop',
        component: ShopComponent
      }
    ]
  }
  
]

@NgModule({
  declarations: [
    HomeComponent,
    ShopComponent,
  ],
  imports: [
    CommonModule,
    MaterialDesign,
    RouterModule.forChild(routes)
  ]
})
export class PublicModule { }
