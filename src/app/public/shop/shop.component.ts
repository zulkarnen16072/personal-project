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
  public isGetData: boolean;

  
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

  query(where)
  {
    this.service.query(where).valueChanges().subscribe(res => 
      {
        this.isGetData = true;
        this.products = res;
        console.log(this.products)
        this.isGetData = false;
      }, e => {
        this.isGetData = false;
        alert("Error " + e)
      });
  }

  formatRupiah(angka)
  {
    
    var	number_string = angka.toString(),
      sisa 	= number_string.length % 3,
      rupiah 	= number_string.substr(0, sisa),
      ribuan 	= number_string.substr(sisa).match(/\d{3}/g);
        
    if (ribuan) {
      var separator = sisa ? '.' : '';
      rupiah += separator + ribuan.join('.');
    }
    
    return rupiah
  }

  

 

}
