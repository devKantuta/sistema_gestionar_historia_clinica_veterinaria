import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { I_UserLogin } from 'src/app/interfaces/interfaces';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: false,
})
export class HeaderComponent {
  private user?: I_UserLogin;
  constructor(private location: Location,private router:Router) {}
  retroceder() {
    this.location.back();
  }

  logOut():void {
    this.user = undefined;
    localStorage.clear()
    this.router.navigate(['/login'])
  }
}
