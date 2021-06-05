import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  mode: any = 'side';

  logout()
  {
    localStorage.removeItem('appToken');
    this.auth.signOut();
    this.router.navigate(['/login']);
  };


}
