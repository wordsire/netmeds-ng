import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Config } from './../../config';
import { Globals } from './../../globals';
import { ProductItemComponent } from 'src/app/components/product-item/product-item.component';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-lab-test',
  templateUrl: './lab-test.component.html',
  styleUrls: ['./lab-test.component.scss']
})
export class LabTestComponent implements OnInit {
  @ViewChild(ProductItemComponent)
  private productItem: ProductItemComponent;

  loading: Boolean = true;
  testList: any[];
  searchText: string = '';

  constructor(private http:HttpClient, private toastr: ToastrService, public globals: Globals) { }

  ngOnInit(): void {
    this.get_tests()
  }

  async get_tests(){
    this.loading = true;
    try{
      let response = await this.http.get<any>(Config.API_URL+'/labtest?q='+this.searchText, this.globals.headers()).toPromise();
      this.testList = response;
    }
    catch(resp){
      this.toastr.error(resp.error.message);
      //console.log(resp.error.message);
    }
    this.loading = false;
  }

  updateStatus(item_id){
    let index = this.testList.findIndex(el=>{return el.item_id==item_id});
    if(index >= 0){
      this.testList[index].cart_item_id = item_id;
    }
  }

}
