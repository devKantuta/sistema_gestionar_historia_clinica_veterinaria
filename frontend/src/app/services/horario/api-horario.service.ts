import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root',
})
export class ApiHorarioService {
  private baseURL: string = 'http://localhost:3000/api/turnos';

  constructor(private http: HttpClient) {}

  // Obteniendo todos los datos de la tabla
  getApiHorarios(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: {
    nombre: string;
    hora_ini: string;
    hora_fin: string;
  }): Observable<any> {
    return this.http.post(this.baseURL, body);
  }
  /* Actulizar Data */
  updateData(body: {
    id: number;
    nombre: string;
    hora_ini: string;
    hora_fin: string;
  }): Observable<any> {
    
    return this.http.put(`${this.baseURL}/${body.id}`, body).pipe(
      tap(() => {
        console.log(body)
        
      }),
    );
  }
  /* Eliminando Data */
  service_DeleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}/${id}`);
  }

  /* Creando Data */
}
