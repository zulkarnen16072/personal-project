import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public db: AngularFirestore,
    private router: Router
  ) { }

  
  get()
  {
     return this.db.collection('test')
    .valueChanges({ idField : 'id' })
  }


  isAppToken()
  {
    var token =  localStorage.getItem('appToken');
    if ( token != null)
    {
      return true
    } else {
      return false
    }
  }

  signOut()
  {
    localStorage.removeItem('appToken');
    this.router.navigate(['login'])
  }
  
  
}
