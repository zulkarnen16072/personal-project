import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

  products: any = [];
  isUser: boolean;
  

  constructor(
    public service: ApiService
    ) { }

  
  ngOnInit(): void {
    this.getData();
    this.isUser = this.service.isAppToken();
    console.log(this.isUser)
  }

  getData() {
   this.service.get().subscribe(res => {
     this.products = res;
   });
  }

 

}
