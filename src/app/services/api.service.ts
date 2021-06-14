import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireStorage } from '@angular/fire/storage';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(
    public db: AngularFirestore,
    public router: Router,
    public auth: AngularFireAuth,
    public snackBar: MatSnackBar,
    public storage: AngularFireStorage
  ) { }

  
  get()
  {
     return this.db.collection('products')
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
    this.auth.signOut();
    // this.router.navigate(['/home']);
  }


  uploadImage(id, data)
  {
    return this.db.collection("products").doc(id).update({
      url: data
    }).then( res => {
      console.log("Berhasil", res);
    } ).catch(err => {
      console.error("error", err);
    })
  }

  query(where)
  {
   return this.db.collection('products', ref => 
     ref.where('category', '==', where)
   )
  }


  notifcation(message, action)
  {
    this.snackBar.open(message, action, {
      duration: 3000,
    })
  }

  deleteStorage(path)
  {
    return this.storage.ref(path)
  }
  
  
}
