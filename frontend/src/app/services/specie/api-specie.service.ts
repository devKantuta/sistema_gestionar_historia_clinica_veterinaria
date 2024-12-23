import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiSpecieService {
  private baseURL: string = ' http://localhost:3000/api/especies/';

  constructor(private http: HttpClient) {}

  // Obteniendo todos los datos de la tabla
  getAllData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: { nombre: string; descripcion: string }): Observable<any> {
    return this.http.post(this.baseURL, body);
  }
  /* Actulizar Data */
  updateData(body: {
    id: number;
    nombre: string;
    descripcion: string;
  }): Observable<any> {
    return this.http.put(`${this.baseURL}${body.id}`, body);
  }
  /* Eliminando Data */
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}${id}`);
  }
}
