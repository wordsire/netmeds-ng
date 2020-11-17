import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductItemComponent } from 'src/app/components/product-item/product-item.component';
import { HttpClient } from '@angular/common/http';
import { Config } from './../../config';
import { Globals } from './../../globals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @ViewChild(ProductItemComponent)
  private productItem: ProductItemComponent;
  loading: Boolean = false;
  testList: any = [];
  payment: any = {
    netAmount: 0,
    charges: 0,
    final: 0
  }

  constructor(private http:HttpClient, private toastr: ToastrService, public globals: Globals) { }

  ngOnInit(): void {
    this.getCartItems();
  }

  async getCartItems(){
    this.loading = true;
    try{
      let response = await this.http.get<any>(Config.API_URL+'/cart', this.globals.headers()).toPromise();
      this.testList = response;
      this.globals.cartItemCount = response.length;
      this.calPayableAmount();
    }
    catch(resp){
      this.toastr.error(resp.error.message);
      console.log(resp);
    }
    this.loading = false;
  }

  updateStatus(item_id){
    let index = this.testList.findIndex(el=>{return el.item_id==item_id});
    if(index >= 0){
      this.testList.splice(index, 1);
    }
    this.calPayableAmount();
  }

  calPayableAmount(){
    this.payment.netAmount = 0;
    this.testList.map((item)=>{
      this.payment.netAmount+=parseFloat(item.price);
    });
    this.payment.charges = Math.round((this.payment.netAmount*0.18)*100)/100;
    this.payment.final = Math.round((this.payment.netAmount+this.payment.charges)*100)/100;
  }

}
