import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {


  products: any = [];

  constructor() { }

  ngOnInit(): void {
    this.getProduct();
  }

  getProduct()
  {
    this.products = [
      {
        name: 'Apha'
      },
      {
        name: 'Beta'
      }
    ]
  };

}
