import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class Globals {
  token: string = '';
  user: any = {};
  cartItemCount: number = 0;

  constructor(){
    this.token = localStorage.getItem('token');
    let user = JSON.parse(localStorage.getItem('user'));
    if(user && user.user_id){
      this.user = user;
    }
  }

  headers(){
    if(this.token != ''){
      return {headers: new HttpHeaders({ 'Content-Type': 'application/json', 'Authorization': this.token })}
    }
    else{
      return {headers: new HttpHeaders({ 'Content-Type': 'application/json' })}
    }
  }
  
}