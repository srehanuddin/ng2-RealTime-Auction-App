import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductsService } from '../../services/products.service';
import UserModel, { UserType } from "../../models/user.model";
import ProductModel, {Categories} from "../../models/product.model";
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-my-awarded-bids',
  templateUrl: './my-awarded-bids.component.html',
  styleUrls: ['./my-awarded-bids.component.css']
})
export class MyAwardedBidsComponent implements OnInit {

  user : UserModel;
  products : FirebaseListObservable<ProductModel[]>;
  id : String;
  productsArr : ProductModel[];

  constructor(
    private productsService : ProductsService,
    private userService : UserService, 
    private store: Store<UserModel>,
    private router: Router,
    private route: ActivatedRoute
    ) {

    route.params.subscribe(params => { 
      this.id = params['id']; 

      console.log("ID", this.id);

      store.select('appStore').subscribe((data : UserModel) => {
      
        this.user = data;
        
        if(!(data && data.uid)){
          this.router.navigate(['/Login']);
          return;
        }

        productsService.fetchProducts({
          orderByChild: 'AuctionAwardedToUID',
          equalTo: this.user.uid
        });
        
        this.products = productsService.products;

        this.products.subscribe(data => {

          console.log("data - products", data)
          this.productsArr = data;
        })
      });


    });
 
  }

  ngOnInit() {
  }

  canDelete(item : ProductModel){
    if(item.Status == "Awarded" || item.Status == "Cancelled"){
      return false;
    } else if(this.user.AccountType == "Admin"){
      return true;
    } else if(this.user.uid == item.uid){
      return true;
    } else {
      return false;
    }
  }

  delete(key : string){
    console.log("key : ", key);
    this.productsService.deleteProduct(key)
  }

}
