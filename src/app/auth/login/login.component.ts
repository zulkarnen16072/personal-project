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
  isLoading: boolean;

  public cekUser = this.auth.user;
  
  constructor(
    public router: Router,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    
    this.cekUser.subscribe(res => {
      console.log("This User.Uid on Login Comp: " + res.uid)
      console.log(this.user.uid)
    }, error => {
      console.log("Error From auth.user " + error.message() )
    });

  }

  login()
  {
    this.isLoading = true;
    this.auth.signInWithEmailAndPassword(this.user.email, this.user.password).then(res => {
      alert("Login Success !");
      this.cekUser.subscribe(user => {
        localStorage.setItem("appToken", user.uid) // set app token to local storage
        this.router.navigate(['admin/dashboard'])
      })
      // this.router.navigate(['admin/dashboard']);
      this.isLoading = false;
    }).catch(error => {
      this.isLoading = false;
      alert("Tidak Dapat Login" + error);
    })
  }



}
