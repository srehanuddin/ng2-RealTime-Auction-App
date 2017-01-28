import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import UserModel from "../models/user.model";
import ProductModel, { AuctionModel } from "../models/product.model";
//import BookingModel from "../models/booking.model";
import * as firebase from 'firebase';

@Injectable()
export class ProductsService {

  storage;
  storageRef;
  filesRef;

  products: FirebaseListObservable<ProductModel[]>;
  productSubject: Subject<any>;
  product: FirebaseObjectObservable<ProductModel>;
  auctions: FirebaseListObservable<AuctionModel[]>;
  //bookings: FirebaseListObservable<BookingModel[]>;
  //bookingsLocationSlotSubject: Subject<any>;

  constructor(public af: AngularFire) {
    this.productSubject = new Subject();

    this.storage = firebase.storage();
    this.storageRef = this.storage.ref();
    this.filesRef = this.storageRef.child('files');

    this.products = this.af.database.list('/products');

    /*this.bookings = this.af.database.list('/bookings', {
      query: this.bookingsLocationSlotSubject
    });*/

    /*, {
        query: {
          orderByChild: 'AccountType',
          equalTo: this.accountTypeSubject
        }
      }*/
  }

  /*fetchLocations(jobCompany){
    let self = this;
  }*/

  fetchProducts(obj){
    let self = this;

    this.products = this.af.database.list('/products', {
      query: obj
    });

    /*setTimeout(function(){
      self.bookingsLocationSlotSubject.next(obj);
    },100);*/
  }

  fetchProductObj(id){
    this.product = this.af.database.object('/products/' + id);
    this.auctions = this.af.database.list('/auctions', {
      query: {
        orderByChild: 'pid',
        equalTo: id
      }
    });
  }

  addProduct(job: ProductModel) {
    this.products.push(job);
  }

  deleteProduct(key: string) {    
    this.products.remove(key); 
  }

  /*addBooking(job: BookingModel) {
    this.bookings.push(job);
  }

  deleteBooking(key: string) {    
    this.bookings.remove(key); 
  }
  */

}
