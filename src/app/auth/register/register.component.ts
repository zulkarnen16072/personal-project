import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public router: Router
    ) { }

  ngOnInit(): void {
  }

  loading: boolean;
  hide: boolean = true;
  user: any = {};


  register(user) {
    this.loading = true;
    this.auth.createUserWithEmailAndPassword(user.email, user.password).then(res => {
      this.loading = false;
      alert('Berhasil');
      this.router.navigate(['/login'])
    })
  }

}
