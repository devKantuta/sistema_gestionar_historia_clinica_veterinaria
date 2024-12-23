import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { I_UserLogin } from 'src/app/interfaces/interfaces';
import { LoginService } from 'src/app/services/auth/login.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent {
  id_route: string = '10';
  userLoginOn: boolean = true;


  private user?: I_UserLogin;

  constructor(private router:Router, private serviceLogin:LoginService){}

  get getUser() {
    return this.serviceLogin.currentUserBoolean
  }
  logOut(): void{
    this.userLoginOn = false;
    this.user = undefined;
    localStorage.clear();
    this.router.navigate(['/login']).then(() => {
      window.location.reload();
    })
  }


}
