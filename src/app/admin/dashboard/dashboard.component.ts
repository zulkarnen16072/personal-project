import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
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
    public fbService: ApiService,
    public auth: AngularFireAuth,
    public db: AngularFirestore
  ) { }

  ngOnInit(): void {

   this.fbService.get().subscribe(res => this.products = res);

   this.db.collection('users').doc().get().subscribe(res => console.log(res));

    console.log(this.products)
    
  }


}
