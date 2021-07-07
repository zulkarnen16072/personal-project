import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth'
import { Router } from '@angular/router';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    public auth: AngularFireAuth,
    public router: Router,
    public fbService: ApiService
    ) { }

  ngOnInit(): void {
  }

  loading: boolean;
  hide: boolean = true;
  user: any = {};


  register(user) {
    this.loading = true;
    this.auth.createUserWithEmailAndPassword(this.user.email, this.user.password).then(res => {
      this.loading = false;
      this.fbService.notifcation("Berhasil Mendaftar", "OK");
      this.router.navigate(['/login'])
    }).catch(error => {
      this.loading = false;
      alert(error);
      this.fbService.notifcation("Tidak bisa mendaftar", null);
    })
  }

}
