import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiConsultaService {
  private baseURL: string = 'http://localhost:3000/api/consultas/';

  constructor(private http: HttpClient) {}

  // Obteniendo todos los datos de la tabla
  getAllData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: {
    id_hc: number;
    id_empleado: number; //en realidad es id_persona
    fecha_reg: string;
    peso: string;
    temperatura: string;
    motivo: string;
    diagnostico: string;
    tratamiento: string;
    precio: number;
  }): Observable<any> {
    return this.http.post(this.baseURL, body);
  }
  /* Actulizar Data */
  updateData(body: {
    id: number;
    id_hc: number;
    id_empleado: number;
    fecha_reg: string;
    peso: string;
    temperatura: string;
    motivo: string;
    diagnostico: string;
    tratamiento: string;
    precio: number;
  }): Observable<any> {
    return this.http.put(`${this.baseURL}${body.id}`, body);
  }
  /* Eliminando Data */
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}${id}`);
  }
}
