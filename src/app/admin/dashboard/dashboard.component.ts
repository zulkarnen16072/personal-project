import { Component, OnInit } from '@angular/core';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { ApiService } from 'src/app/services/api.service';
import { ProductComponent } from '../product/product.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})


export class DashboardComponent implements OnInit {



  public products = [];

  public title: any = "Dashboard"

  constructor(
    public fbService: ApiService
  ) { }

  ngOnInit(): void {

   this.fbService.get().subscribe(res => this.products = res);

    console.log(this.products)
    
  }


}
