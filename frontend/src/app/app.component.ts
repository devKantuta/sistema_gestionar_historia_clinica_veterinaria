import { Component } from '@angular/core';
import { LoginService } from './services/auth/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  standalone: false,
})
export class AppComponent {
  title = 'appVet';
  islogeado:boolean = false;
  // Variable para controlar si el usuario está logueado o no
  isLoggedIn: boolean = false;

  constructor(private serviceLogin:LoginService){}
  // Método que se ejecuta al hacer clic en el botón de enviar del formulario de login
  get getUSer() {
    return this.serviceLogin.currentUserBoolean;
  }
  onLoginSubmit() { 
    
    // Aquí podrías agregar la lógica para autenticar al usuario
    // Si la autenticación es exitosa:
    this.isLoggedIn = false;
  }
}
