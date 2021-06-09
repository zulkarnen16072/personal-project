import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  
  public isUser: boolean;

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    public fbService: ApiService,
    
    ) { }

  ngOnInit(): void {
    this.isUser = this.fbService.isAppToken();
  }

  mode: any = 'side';

  sign()
  {
    if (this.isUser)
    {
      if ( confirm('Yakin untuk Keluar?') )
      {
        this.fbService.signOut();
        this.isUser = false;
        this.router.navigate(['/login'])
      }
      
    } else {
      this.router.navigate(['login'])
    }
  }

}
