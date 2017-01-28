import { Injectable } from '@angular/core';
import { AngularFire, FirebaseObjectObservable, FirebaseListObservable } from 'angularfire2';
import { Subject } from 'rxjs';
import UserModel from "../models/user.model";
import ProductModel from "../models/product.model";
//import BookingModel from "../models/booking.model";
import * as firebase from 'firebase';

@Injectable()
export class ProductsService {

  storage;
  storageRef;
  filesRef;

  products: FirebaseListObservable<ProductModel[]>;
  productSubject: Subject<any>;
  //location: FirebaseObjectObservable<LocationModel>;
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

  fetchBookings(obj){
    let self = this;

    /*this.bookings = this.af.database.list('/bookings', {
      query: obj
    });*/

    /*setTimeout(function(){
      self.bookingsLocationSlotSubject.next(obj);
    },100);*/
  }

  fetchLocationObj(id){
    //this.location = this.af.database.object('/locations/' + id);
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
