import { Component, ViewChild } from '@angular/core';
import { UserHeaderComponent } from './components/user-header/user-header.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'netmeds';
  @ViewChild('userHeader') UserHeaderComponent: UserHeaderComponent;
}
