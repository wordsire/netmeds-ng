import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { ToastrModule } from 'ngx-toastr';
import { Globals } from './globals';

import { AppComponent } from './app.component';
import { LoginComponent } from './modules/login/login.component';
import { LabTestComponent } from './modules/lab-test/lab-test.component';
import { CartComponent } from './modules/cart/cart.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NotFoundComponent } from './modules/not-found/not-found.component';
import { ProductItemComponent } from './components/product-item/product-item.component';
import { UserHeaderComponent } from './components/user-header/user-header.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LabTestComponent,
    CartComponent,
    NotFoundComponent,
    ProductItemComponent,
    UserHeaderComponent
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
  ],
  providers: [Globals],
  bootstrap: [AppComponent]
})
export class AppModule { }
