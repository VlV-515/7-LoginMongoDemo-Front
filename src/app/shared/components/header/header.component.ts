import { LoginService } from './../../../pages/login/services/login.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent {
  constructor(public readonly loginSvc:LoginService) {}
}
