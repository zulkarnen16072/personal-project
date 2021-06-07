import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  

  isHome: boolean;
  user: any = {};
  isUser: boolean;

  products: any = [];

  

  constructor(
    public router: Router,
    public auth: AngularFireAuth,
    public fbService: ApiService, 
    
  ) { }

  ngOnInit(): void {
    this.fbService.get()
      .subscribe(res => {
        this.products = res; console.log(this.products);
      }, e => console.error("Error " + e))

    this.isHome = true;

     this.auth.user.subscribe(res => {this.user = res});
     alert(this.fbService.isAppToken())

     this.isUser = this.fbService.isAppToken();

    
    
    }

   
 

    sign()
    {
      if (this.isUser)
      {
        if ( confirm('Yakin ?') )
        {
          this.fbService.signOut();
          this.isUser = false;
        }
        
      } else {
        alert("Sign In")
        this.router.navigate(['login'])
      }
    }

    
}
