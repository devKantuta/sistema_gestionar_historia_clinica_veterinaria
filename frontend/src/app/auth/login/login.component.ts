import { Component,EventEmitter,Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ApiPlaceholder, SignupRequest } from 'src/app/interfaces/interfaces';
import { LoginService } from 'src/app/services/auth/login.service';
import { SignupService } from 'src/app/services/auth/signup.service';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: false,
})
export class LoginComponent {
  //VARIABLES 
 
  resMessage: string = '👋🏽';


  // private :significa q solo lo vamos utlizar en esta clase
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private signupAuth: SignupService,
    private loginSerive: LoginService
  ) {}

  //#region

  /* FORMA 2 */
  formLogin = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  get email() {
    return this.formLogin.get('email') as FormControl;
  }
  get password() {
    return this.formLogin.get('password');
  }

  submitLogin() {
    
    /* this.loginSerive.loggedInLogin(this.formLogin.value)
      .subscribe(
        (data) => {
          console.log(data)
          if (data.status) {
            this.resMessage = data.message;
            this.router.navigate(['/dashboard']);
            this.formLogin.reset();
          } else {
            this.router.navigate(['/login'])
          } 
          
          this.resMessage = data.message;
          
        }
      ) */
      
      this.router.navigate(['/dashboard']);
    
  }

//#endregion
 
  
/* FORM SIGNUP */
//#region

  formSignup = this.fb.group({
    username: ['', Validators.required],
    email2: ['', [Validators.required, Validators.email]],
    password2: ['', Validators.required],
    state: [true, Validators.required],
  });
  /* Se crea estps getter es un metodo para obtener el username
    del forumulario de forma corta para no estar escribiendo 
    "this.formSignup.get('username')" en los 
  */
  get username() {
    return this.formSignup.get('username');
  }
  get email2() {
    return this.formSignup.get('email2') as FormControl;
  }

  // CREAMOS UNA VARIABLE DE TIPO OBSERVABLE
  getaData$!: Observable<ApiPlaceholder>;
  getaData1$!: any;

  testBtn() {
    //CONSUMIENDO LA API DE PLACEHOLDER
    this.getaData$ = this.signupAuth.getUser();
    
    this.getaData$.subscribe((value) => {
      console.log(value);
      this.getaData1$ = value;
    });
  }
  /* METODO PARA ENVIAR EL SIGNUP */
  submitSignup() {
    /* if (this.formSignup.valid) {
      const response = this.signupAuth.serviceSignup(
        this.formSignup.value as SignupRequest
      );
      // la respuesta q dara el backend
      if (response.ok) {
        alert(response.message);
        // forma#1 de ir a otra ruta
        this.router.navigate(['/home']);
        // forma#2 de ir a otra ruta
        //this.router.navigateByUrl('/dashboard')
        this.formSignup.reset();
      } else {
        alert('USUARIO NO REGISTRADO...!');
      }
    }
    this.formSignup.markAllAsTouched(); // pone como a todos marcado */

    this.router.navigate(['/dashboard'])
  }
  //#endregion

  /* MANDANDO DEL PADRE AL HIJO DATOS*/
  rol: string = 'kantuta.com';
  /* RECIBIENDO DEL HIJO AL PADRE DATOS */
  newValor: string = '';
  getDataHijo(valor: string) {
    this.newValor = valor;
  }
}
