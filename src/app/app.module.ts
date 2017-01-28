import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, Routes } from '@angular/router';
import 'hammerjs';
import { AngularFireModule, AuthProviders, AuthMethods } from 'angularfire2';
import { MaterialModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';

import { appReducer } from './app.store';
import { myFirebaseAuthConfig, firebaseConfig } from './app.config';


import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { SampleComponent } from './components/sample/sample.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { UserService } from './services/user.service';
import { LoggedInGuardService } from './services/logged-in-guard.service';
import { AccountsService } from './services/accounts.service';
import { ProductsService } from './services/products.service';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';

import { ProductsComponent } from './components/products/products.component';
import { ProductsAddComponent } from './components/products-add/products-add.component';
import { ProductsDetailComponent } from './components/products-detail/products-detail.component';
import { MyAwardedBidsComponent } from './components/my-awarded-bids/my-awarded-bids.component';

export const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [LoggedInGuardService] },
  { path: 'Home', component: HomeComponent, canActivate: [LoggedInGuardService]  },
  { path: 'Login', component: LoginComponent },
  { path: 'Register', component: RegisterComponent },

  { path: 'ProductsAdd', component: ProductsAddComponent, data: {access : ["Admin", "User"]}, canActivate: [LoggedInGuardService]  },
  { path: 'Products', component: ProductsComponent, data: {access : ["Admin", "User"]}, canActivate: [LoggedInGuardService]  },
  { path: 'Products/:id', component: ProductsComponent, data: {access : ["Admin", "User"]}, canActivate: [LoggedInGuardService]  },
  { path: 'ProductsDetail/:id', component: ProductsDetailComponent, data: {access : ["Admin", "User"]}, canActivate: [LoggedInGuardService]  },
  { path: 'MyAwardedBids', component: MyAwardedBidsComponent, data: {access : ["Admin", "User"]}, canActivate: [LoggedInGuardService]  },


  { path: 'Sample', component: SampleComponent },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SampleComponent,
    PageNotFoundComponent,
    RegisterComponent,
    LoginComponent,
    UsersComponent,
    ProductsComponent,
    ProductsAddComponent,
    ProductsDetailComponent,
    MyAwardedBidsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule.forRoot(),
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, myFirebaseAuthConfig),
    StoreModule.provideStore({ appStore: appReducer })
  ],
  providers: [
    UserService,
    AccountsService,
    LoggedInGuardService,
    ProductsService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
