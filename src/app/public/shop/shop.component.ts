import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { HomeComponent } from '../home/home.component';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {

 

  isHome: boolean = false;


  
  products: any = [];
  isUser: boolean;
  

  constructor(
    public service: ApiService,
    public home: HomeComponent
    ) { }

  
  ngOnInit(): void {
    this.getData();
    this.isUser = this.service.isAppToken();
    console.log(this.isUser)
    this.home.isHome = false;
  }

  getData() {
   this.service.get().subscribe(res => {
     this.products = res;
   });
  }

 

}
