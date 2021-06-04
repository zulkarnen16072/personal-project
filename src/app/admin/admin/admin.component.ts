import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
  }

  mode: any = 'side';

  logout()
  {
    this.auth.signOut();
  };


}
