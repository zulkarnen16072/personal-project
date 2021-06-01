import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {

  juduls: any = [];

  constructor(  ) { }

  ngOnInit(): void {

    this.getJudul();
    

  }

  title: String = 'Product';

  getJudul() {
    this.juduls = [
    {
      card : 'Hai'
    },
    {
      card : 'Hai'
    },
    {
      card : 'Hai'
    }
    ]
  }

 


}
