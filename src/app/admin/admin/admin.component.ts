import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  public isUser: boolean;
  public dataUser;

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    public fbService: ApiService,
    public dialog: MatDialog
    
    ) { }

  ngOnInit(): void {
    this.isUser = this.fbService.isAppToken();
    this.auth.user.subscribe(res => this.dataUser = res);
  }

  mode: any = 'side';

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
