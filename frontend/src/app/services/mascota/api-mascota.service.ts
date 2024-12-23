import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiMascotaService {
  private baseURL: string = 'http://localhost:3000/api/mascotas/';

  constructor(private http: HttpClient) {}

  // Obteniendo todos los datos de la tabla
  getAllData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: {
    id_cliente: number;//en realidad es id_persona
    id_raza: number;
    nombre: string;
    edad: string;
    sexo: string;
    color: string;
    fecha_reg: string;
  }): Observable<any> {
    return this.http.post(this.baseURL, body);
  }
  /* Actulizar Data */
  updateData(body: {
    id: number;
    id_cliente: number;
    id_raza: number;
    nombre: string;
    edad: string;
    sexo: string;
    color: string;
    fecha_reg: string;
    id_especie:number
  }): Observable<any> {
    return this.http.put(`${this.baseURL}${body.id}`, body);
  }
  /* Eliminando Data */
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}${id}`);
  }
}
