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
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

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

        if(this.id && Categories.indexOf(<any>this.id) != -1){
          productsService.fetchProducts({
            orderByChild: 'Category',
            equalTo: this.id
          });
        } else if (this.id){
          productsService.fetchProducts({
            orderByChild: 'uid',
            equalTo: this.id
          });
        } else {
          productsService.fetchProducts({});
        }
        
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
