import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { ApiPlaceholder, I_UserLogin, I_Raza, I_ResUserLogin } from 'src/app/interfaces/interfaces';


@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseURL = 'http://localhost:3000/api/v1/breed/';
  private user?: I_UserLogin;
  private raza?: I_Raza;
  private isLogueadoUser: I_ResUserLogin = {
    status: false,
    message:''
  };

  constructor(private http: HttpClient) {}

  get currentUser(): I_UserLogin | undefined {
    if (!this.user) return undefined;
    return structuredClone(this.user);
  }

  login(email: string, password: string): Observable<I_UserLogin> {
    //en una aplicación real se haría:
    //return this.http.post('login', {email,password})
    return this.http.get<I_UserLogin>(`${this.baseURL}/users/1`).pipe(
      tap((data) => {
        //Asigna la respuesta (data) a una variable de clase this.user
        this.user = data;
        //Guarda el id del usuario en el localStorage como token
        localStorage.setItem('token', data.id.toString());
      })
    );
  }
  //Por aprendizaje, lo manejaremos con get, en una aplicación real se usa post
  //Esto lo veremos más adelante
  userURL = 'http://localhost:3000/api/v1/users/';
  loggedInLogin(body: {}): Observable<any> {
    return this.http.post<I_ResUserLogin>(this.userURL, body).pipe(
      tap((res) => {
        this.isLogueadoUser = res;
        console.log(res);
      })
    );
  }

  get currentUserBoolean():I_ResUserLogin | undefined  {
    if (!this.isLogueadoUser) return undefined;
    return structuredClone(this.isLogueadoUser);
  }
}
