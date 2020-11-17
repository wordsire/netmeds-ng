import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from './../../config';
import { Globals } from './../../globals';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss']
})
export class ProductItemComponent implements OnInit {

  constructor(private http:HttpClient, private toastr: ToastrService, public globals: Globals) { }

  @Input() data: any[];
  @Input() gridView: Boolean = true;
  @Input() cartView: Boolean = false;
  @Output() emitter: EventEmitter<any[]> = new EventEmitter();

  ngOnInit(): void {
  }

  async addToCart(item_id){
    console.log(item_id);
    try{
      let response = await this.http.post<any>(Config.API_URL+'/cart/'+item_id,{},this.globals.headers()).toPromise();
      this.toastr.success(response.message);
      this.globals.cartItemCount++;
      this.emitter.emit(item_id);
    }
    catch(resp){
      this.toastr.error(resp.error.message);
      //console.log(resp.error.message);
    }
  }

  async removeFromCart(item_id){
    console.log(item_id);
    try{
      let response = await this.http.post<any>(Config.API_URL+'/cart/remove/'+item_id,{},this.globals.headers()).toPromise();
      this.toastr.success(response.message);
      this.globals.cartItemCount--;
      this.emitter.emit(item_id);
    }
    catch(resp){
      this.toastr.error(resp.error.message);
      //console.log(resp.error.message);
    }
  }

}
