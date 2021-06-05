import { AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

import { ApiService } from 'src/app/services/api.service';
import { ShopComponent } from '../shop/shop.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  @ViewChild(ShopComponent) shopReferences;

  isHome: boolean;
  user: any = {};
  isUser = this.fbService.isAppToken();

  

  constructor(
    public router: Router,
    public auth: AngularFireAuth,
    public fbService: ApiService, 
    
  ) { }

  ngOnInit(): void {

    this.isHome = true;
    
     this.auth.user.subscribe(res => {this.user = res});
     alert(this.fbService.isAppToken())
     
    }

    ngAfterViewInit() {
      this.isHome = this.shopReferences.isHome;
    }

    

    sign()
    {
      if (this.isUser)
      {
        if ( confirm('Yakin ?') )
        {
          this.fbService.signOut();
        }
        
      } else {
        alert("Sign In")
        this.router.navigate(['login'])
      }
    }

    
}
