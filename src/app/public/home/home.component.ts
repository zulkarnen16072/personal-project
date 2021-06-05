import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ProductComponent } from 'src/app/admin/product/product.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

 
  user: any = {};
  isUser = this.fbService.isAppToken();

  constructor(
    public router: Router,
    public auth: AngularFireAuth,
    public fbService: ApiService, 
    
  ) { }

  ngOnInit(): void {
     this.auth.user.subscribe(res => {this.user = res});
     alert(this.fbService.isAppToken())
     
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
