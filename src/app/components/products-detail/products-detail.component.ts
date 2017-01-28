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
  auctionNotCompleted = false;
  bidAmount : number = null;
  ErrorMessage = "";

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

        this.auctions.subscribe((data : AuctionModel[]) => {
          console.log("auctionDetail : ", data)
          this.auctionsDetail = data;

          this.checkFn();

        });

      });

    });
 
  }

  checkFn(){
    let currentDate = new Date();
    if(this.productDetail.Status == "Awarded" || this.productDetail.Status == "Cancelled"){
      return;
    }

    let bidEndDate = new Date(<any>this.productDetail.AutionEndTimeStamp);
    if(bidEndDate <= currentDate){

      if(this.auctionsDetail && this.auctionsDetail.length){
        let lastObj = this.auctionsDetail[this.auctionsDetail.length - 1];

        var obj = {
          Status : "Awarded",
          AuctionAwardedToUID : lastObj.uid,
          AuctionAwardedToFirstName : lastObj.FirstName,
          AuctionAwardedToLastName : lastObj.LastName,
          AuctionAwardedToAmount : lastObj.Bid,
        }   
        this.productsService.updateProduct(obj);   
      } else {
        this.productsService.updateProduct({ Status : "Cancelled" });
      }
    } else {
      this.auctionNotCompleted = true;
    }

  }

  displayableDate(dt){
    let date = new Date(dt);
    return date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate() + " " + date.getHours() + ":" + date.getMinutes();
  }

  submitBid(){
    if(!this.bidAmount){
      this.ErrorMessage = "Please Enter Bid Amount";
      return;
    }
    this.bidAmount = Number(this.bidAmount);
    if(isNaN(this.bidAmount)){
      this.ErrorMessage = "Please Enter Bid Amount in Number";
      return;
    }

    let lastBid = this.productDetail.BidStartingAmount;
    if(this.auctionsDetail && this.auctionsDetail.length){
      lastBid = this.auctionsDetail[this.auctionsDetail.length - 1].Bid;
    }

    if(this.bidAmount <= lastBid){
      this.ErrorMessage = "Bid amount should be greater then " + lastBid;
      return;
    }

    let currentDate = new Date();
    let bidEndDate = new Date(<any>this.productDetail.AutionEndTimeStamp);
    if(bidEndDate <= currentDate){
      this.ErrorMessage = "Bid Closed";
      this.checkFn();
      return;
    }

    let obj : AuctionModel = {
      uid : this.user.uid,
      pid : this.id,
      FirstName : this.user.FirstName,
      LastName : this.user.LastName,
      Bid : this.bidAmount,
      TimeStamp : Date.now(),
      DateTime : (new Date()).toString()
    }
    this.productsService.addAuction(obj);
    this.bidAmount = null;
    this.ErrorMessage = "";
  }

  ngOnInit() {
  }

}
