import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  //private apiUrl: string = 'http://localhost:3000/api/v1/breed/';
  private apiUrl: string = 'http://localhost:3000/api/login';
  
  constructor(private http: HttpClient) { }
  

  getData(): Observable<any>{
    
    return this.http.get(this.apiUrl)
  }
  
  login(email:string,password:string):Observable<any> {
    const body = { email, password };
    return this.http.post(this.apiUrl, body);
  }

}
