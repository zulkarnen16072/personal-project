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

    // console.log(this.api.get());

    // this.getProducts();
    

    this.auth.user.subscribe(res => {
      this.userData = res;
      console.log("User.auth.uid: From product.ts UserData.UID : " + this.userData.uid)
      this.getBooksFire();
      // this.test();
      
    })
    

    
  }

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
      // jika idx = -1 = add data
      if (idx == -1 ) this.products.push(res);
      // jika tidak, maka perbarui data
      else this.products[idx] = res;
    }
  })
} // end productDetail()

deleteProduct(idx) 
{
  var conf = confirm('Delete Product? ');
  if (conf) 
  {
    this.products.splice(idx, 1)
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
  this.db.collection('test').get().subscribe(res => {
    console.log("this Test" + res);
    this.products = res;
  })
}

 
}
