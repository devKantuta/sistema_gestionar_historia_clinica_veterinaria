import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiHcService {
  private baseURL: string = 'http://localhost:3000/api/historias/';

  constructor(private http: HttpClient) {}

  // Obteniendo todos los datos de la tabla
  getAllData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: {
    id_mascota: number;
    fecha_reg: string;
    num_hc: string;
    t_sangre: string;
    alergia: string;
  }): Observable<any> {
    return this.http.post(this.baseURL, body);
  }
  /* Actulizar Data */
  updateData(body: {
    id: number;
    id_mascota: number;
    num_hc: number;
    fecha_reg: string;
    t_sangre: string;
    alergia: string;
  }): Observable<any> {
    return this.http.put(`${this.baseURL}${body.id}`, body);
  }
  /* Eliminando Data */
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}${id}`);
  }
  /* obtiendo el ultima ficha clinica */
  getNroFicha(): Observable<any>{
    return this.http.get(`${this.baseURL}num_hc`)
  }
}
