import { Component, OnInit } from '@angular/core';
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


  constructor( 
    public dialog: MatDialog,
    public api: ApiService
   ) { }

  ngOnInit(): void {

    console.log(this.api.get());

    this.getProducts();
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
  var conf = confirm('Deletw Product? ');
  if (conf) 
  {
    this.products.splice(idx, 1)
  }
}


 


}
