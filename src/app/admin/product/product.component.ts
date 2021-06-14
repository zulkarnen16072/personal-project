import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { MatDialog } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';
import { DialogConfirmComponent } from '../dialog-confirm/dialog-confirm.component';
import { ImageUploaderComponent } from '../image-uploader/image-uploader.component';
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
  isDeleted: boolean = false;


  constructor( 
    public dialog: MatDialog,
    public fbService: ApiService,
    public db: AngularFirestore, 
    public auth: AngularFireAuth
   ) { }

  ngOnInit(): void {
    this.getProduct();
    console.log(this.products)
      this.auth.user.subscribe(res => {
      this.userData = res;
      console.log("User.auth.uid: From product.ts UserData.UID : " + this.userData.uid)
    })
  } // edn onInit

  title: String = 'Product';

//   getProducts()
// {
//   this.products = [
//     {name: 'Hydrogen', price: 1.0079, kategori: 'product', desc: 'baju', size: 'H'},
//     {name: 'Helium', price: 4.0026, desc: 'baju', size: 'He'},
//     {name: 'Lithium', price: 6.941, desc: 'baju', size: 'Li'},
//     {name: 'Beryllium', price: 9.0122, desc: 'baju', size: 'Be'}
//   ];
// }

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

deleteProduct(id) 
{
  let dialog = this.dialog.open(DialogConfirmComponent, {

  });

  dialog.afterClosed().subscribe(res => {
    if (res) 
    {
      this.db.collection("products").doc(id).delete().then(res => {
        this.isDeleted = true;
        alert("Berhasil" + res);
      }).catch(e => {
        this.isDeleted = false;
        alert("Tidak dapat Hapus" + e)
      })
    }
    
  })

}


getBooksFire() {
  // get Data Using Firebase;
  this.db.collection('products', ref => {
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

getProduct()
{
  this.isLoading = true;
  this.db.collection("products").valueChanges({idField : 'id'}).subscribe(res => {
    console.log(res);
    this.products = res;
    this.isLoading = false;
    console.log(res);
    }, error => {
      this.isLoading = false;
    console.log(error)
  });

}


  simpleQuery()
  {
    this.db.collection('products', ref => 
      ref.where('kategori', '==', 'tees')).valueChanges({idField : 'id'}).subscribe(res => { 
        console.log(res[0].id);
        this.products = res;
      }, error => {
        console.log("Error: " + error);
      })
  }
  
  exportComponent()
  {
    return console.log("product");
  }

  // getDataSelected(idx)
  // {
  //   var idProduct = this.products[idx].id;
  //   this.fbService.uploadImage(idProduct, "www.google.com");
  // }

  uploadImage(data) 
  {
    this.dialog.open(ImageUploaderComponent, {
      width: '400px',
      data: data
    })
  }
  
}
