import { Component, OnInit } from '@angular/core';
import { Globals } from './../../globals';

@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {

  constructor(public globals: Globals) { }

  ngOnInit(): void {
  }

}
