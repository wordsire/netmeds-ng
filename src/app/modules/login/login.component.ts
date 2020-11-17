import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
import {Router} from "@angular/router"
import { FormBuilder } from '@angular/forms';
import { FormGroup, FormControl } from '@angular/forms';
import { Validators } from '@angular/forms';
import { Config } from './../../config';
import { Globals } from './../../globals';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  
  constructor(public globals: Globals, private toastr: ToastrService, private formBuilder: FormBuilder, private http:HttpClient, private router: Router) { }

  loading: Boolean = false;
  loginForm = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  ngOnInit(): void {
    if(this.globals.token && this.globals.token != ''){
      this.router.navigate(['/test'])
    }
  }

  async login(){
    console.log('called', this.loginForm.value);
    try{
      let response = await this.http.post<any>(Config.API_URL+'/auth/login', this.loginForm.value, httpOptions).toPromise();
      this.globals.token = response.token;
      this.globals.user = response.user;
      localStorage.setItem('token', response.token);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.router.navigate(['/test'])
    }
    catch(resp){
      this.toastr.error(resp.error.message);
      //console.log(resp.error.message);
    }
  }

}
