import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiPlaceholder, ResponseApi, SignupRequest } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class SignupService {
  constructor(private http: HttpClient) {}

  serviceSignup(credentials: SignupRequest): ResponseApi {
    alert(JSON.stringify(credentials));
    const response: ResponseApi = {
      ok: false,
      message: 'Bienvinido usuario X ',
    };
    return response;
  }
  //ulrPlaceholder: string = 'https://jsonplaceholder.typicode.com/posts/1';
  ulrPlaceholder: string ='https://jsonplaceholder.typicode.com/posts/1/comments';
  getUser(): Observable<ApiPlaceholder> {
    return this.http.get<ApiPlaceholder>(this.ulrPlaceholder);
  }
}
