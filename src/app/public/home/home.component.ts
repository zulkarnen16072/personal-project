import { Component, OnInit} from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogConfirmComponent } from 'src/app/admin/dialog-confirm/dialog-confirm.component';

import { ApiService } from 'src/app/services/api.service';


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
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fbService.get()
      .subscribe(res => {
        this.products = res; console.log(this.products);
      }, e => console.error("Error " + e))

    this.isHome = true;
   
    this.auth.user.subscribe(res => {this.user = res});

     this.isUser = this.fbService.isAppToken();
    
    }

   
 

    sign()
  {
    if (this.isUser) // jika login
    {
      let dialog = this.dialog.open(DialogConfirmComponent, {
        data: {
          title: 'Sign Out',
          message: 'Are you sure you want to Sign Out',
          action: 'Sign Out'
        },

        width: '400px'

      })

      dialog.afterClosed().subscribe(res => {
        if (res) 
        {
          this.fbService.signOut();
          this.isUser = false;
          this.router.navigate(['/login']);
        }
      })
    } else { this.router.navigate(['login']) }
    
  
  }

    
}
