import { Component, OnInit } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AngularFireAuth } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide: boolean = true;
  user: any = {};
  loading: boolean;
  
  constructor(
    public router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.test();
  }

  login()
  {
    this.loading = true;
    this.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res => {
      alert("Login Success !" + res);
      this.router.navigate(['admin/dashboard']);
    }).catch(error => {
      this.loading = false;
      alert("Tidak Dapat Login" + error);
    })
  }

  test() {
    let doc = new Date().getTime().toString();
    console.log("ini adalah doc" + doc)
  }

}
