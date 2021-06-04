import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireAuth } from '@angular/fire/auth';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {

  userData: any = {};
  datas: any = [];

  constructor(
    public dialogRef:MatDialogRef<ProductDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public db: AngularFirestore,
    public auth: AngularFireAuth
  ) { }

  ngOnInit(): void {
    this.auth.user.subscribe(res => {
      this.userData = res;
    })

    for (var i in this.data)
    {
      this.datas = i;
      console.log(i)
    }

    
   

    console.log("ini adalah Data: " + this.datas);

  }

  saveData() {
    this.dialogRef.close(this.data);
    
  }

  save()
  {
    if (this.data.id == undefined)
    {
      let doc = new Date().getTime().toString();
      this.data.uid = this.userData.uid;
      this.db.collection('test').doc(doc).set(this.data).then(res => {
        alert("Document successfully written!");
        this.dialogRef.close(this.data);
      }).catch(error => {
        console.log(error);
        alert("Error" + error)
      })
   } else
   {
     this.db.collection('test').doc(this.data.id).update(this.data).then(res => {
       alert("Data has Modified !")
       this.dialogRef.close(this.data);
     }).catch(error => {
       alert("Tidak dapat update Data " + error)
     })
   }
  }

}
