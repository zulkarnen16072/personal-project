import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  userData: any = {};
  datas: any = [];
  isSave: boolean;

  constructor(
    public dialogRef:MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public db: AngularFirestore,
    public auth: AngularFireAuth,
    public fbService: ApiService
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      this.userData = res;
      console.log("onInit")
      console.log(res)
    })
  }

  saveData() {
    this.dialogRef.close(this.data);
    
  }

  save()
  {
    if (this.data.id == undefined)
    {
      this.isSave = true;
      let doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.db.collection('products').doc(doc).set(this.data).then(res => {
        this.fbService.notifcation("Berhasil Menambahkan Produk", "OK");
        this.dialogRef.close(this.data);
        this.isSave = false;
      }).catch(error => {
        this.isSave = false;
        console.log(error);
        alert("Error" + error)
      })
   } else
   {
     this.isSave = true;
     this.db.collection('products').doc(this.data.id).update(this.data).then(res => {
      this.fbService.notifcation("Produk Berhasil di Edit", "OK");
       this.dialogRef.close();
       this.isSave = false;
     }).catch(error => {
      this.isSave = false;
       alert("Tidak dapat update Data " + error)
     })
   }
  }

}
