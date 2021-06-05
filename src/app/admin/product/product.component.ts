import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { ProductDetailComponent } from '../product-detail/product-detail.component';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})



export class ProductComponent implements OnInit {

  products: any = [];
  userData: any= {};
  isLoading: boolean;


  constructor( 
    public dialog: MatDialog,
    public api: ApiService,
    public db: AngularFirestore, 
    public auth: AngularFireAuth
   ) { }

  ngOnInit(): void {
    this.test();
    // this.simpleQuery();
    // console.log(this.api.get());
    // this.getProducts();
      this.auth.user.subscribe(res => {
      this.userData = res;
      console.log("User.auth.uid: From product.ts UserData.UID : " + this.userData.uid)
      // this.getBooksFire();
    })
  } // edn onInit

  title: String = 'Product';

  getProducts()
{
  this.products = [
    {name: 'Hydrogen', price: 1.0079, kategori: 'Test', desc: 'baju', size: 'H'},
    {name: 'Helium', price: 4.0026, desc: 'baju', size: 'He'},
    {name: 'Lithium', price: 6.941, desc: 'baju', size: 'Li'},
    {name: 'Beryllium', price: 9.0122, desc: 'baju', size: 'Be'}
  ];
}

productDetail(data, idx)
{
  let dialog = this.dialog.open(ProductDetailComponent, {
    width: '400px',
    data: data
  });

  dialog.afterClosed().subscribe(res => {
    if (res) 
    {
      return
    }
  })
} // end productDetail()

deleteProduct(id, idx) 
{
  var conf = confirm('Delete Product? ');
  if (conf) 
  {
    console.log(id)
    this.db.collection("test").doc(id).delete().then(res => {
      this.products.splice(idx, 1);
    }).catch(res => {
      alert("Tidak dapat Hapus")
    })
  }
}

getBooksFire() {
  // get Data Using Firebase;
  this.db.collection('test', ref => {
    this.isLoading = true;
    console.log("Loadings..." + this.userData.uid);
    return ref.where('uid', '==', this.userData.uid);
  }).valueChanges({idField : 'id' }).subscribe(res => {
    alert("Berhasil");
    this.products = res;
    this.isLoading = false;
  }, error => {
    this.isLoading = false;
    alert('Error not reach get products ' + error);    
  })
}

test()
{
  this.db.collection("test").valueChanges({idField : 'id'}).subscribe(res => {
    console.log(res);
    this.products = res;
    }, error => {
    console.log(error)
  });

}


  simpleQuery()
  {
    this.db.collection('test', ref => 
      ref.where('kategori', '==', 'tees')).valueChanges({idField : 'id'}).subscribe(res => { 
        console.log(res[0].id);
        this.products = res;
      }, error => {
        console.log("Error: " + error);
      })
  }
  
  exportComponent()
  {
    return console.log("Test");
  }


 
}
