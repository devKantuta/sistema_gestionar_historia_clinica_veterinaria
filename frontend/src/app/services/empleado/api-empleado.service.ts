import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiEmpleadoService {
  private baseURL: string = ' http://localhost:3000/api/empleados/';

  constructor(private http: HttpClient) {}

  // Obteniendo todos los datos de la tabla
  getAllData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: {
    nombre: string;
    direccion: string;
    celular: string;
    correo: string;
    sexo: string;
    rol: string;
    id_turno: number;
    fecha_reg: string;
  }): Observable<any> {
    return this.http.post(this.baseURL, body).pipe(
      tap((data) => {
        console.log('frontend', body);
        console.log('backend', data);
      })
    );
  }
  /* Actulizar Data */
  updateData(body: {
    id: number;
    nombre: string;
    direccion: string;
    celular: string;
    correo: string;
    sexo: string;
    rol: string;
    id_turno: number;
    fecha_reg: string;
  }): Observable<any> {
    return this.http.put(`${this.baseURL}${body.id}`, body).pipe(
      tap((data) => {
        console.log(this.baseURL);
        console.log('frontend', body);
        console.log('backend', data);
      })
    );
  }
  /* Eliminando Data */
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}${id}`);
  }
}
