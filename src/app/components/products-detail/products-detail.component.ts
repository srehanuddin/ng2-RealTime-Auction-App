import { Component, OnInit } from '@angular/core';
import { FirebaseListObservable, FirebaseObjectObservable } from 'angularfire2';
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import UserModel, { UserType } from "../../models/user.model";
import { UserService } from '../../services/user.service';
import { AccountsService } from '../../services/accounts.service';
import { ProductsService } from "../../services/products.service";
import ProductModel, {AuctionModel} from "../../models/product.model";


@Component({
  selector: 'app-products-detail',
  templateUrl: './products-detail.component.html',
  styleUrls: ['./products-detail.component.css']
})
export class ProductsDetailComponent implements OnInit {

  user : UserModel;
  product : FirebaseObjectObservable<ProductModel>;
  productDetail : ProductModel;
  auctions : FirebaseListObservable<AuctionModel[]>;
  auctionsDetail : AuctionModel[];
  id : String;

  constructor(
    private productsService : ProductsService,
    private userService : UserService, 
    private accountsService : AccountsService, 
    private store: Store<UserModel>,
    private router: Router,
    private route: ActivatedRoute
    ) {

    route.params.subscribe(params => { 
      this.id = params['id']; 

      console.log("ID", this.id);

      store.select('appStore').subscribe((data : UserModel) => {
        this.user = data;

        if(this.user && this.user.uid){
          productsService.fetchProductObj(this.id);
          this.product = productsService.product;
          this.auctions = productsService.auctions;
        }

      });

      this.product.subscribe((data : ProductModel) => {
        console.log("productDetail : ", data)
        this.productDetail = data;
      });

      this.auctions.subscribe((data : AuctionModel[]) => {
        console.log("auctionDetail : ", data)
        this.auctionsDetail = data;
      });

    });
 
  }

  ngOnInit() {
  }

}
