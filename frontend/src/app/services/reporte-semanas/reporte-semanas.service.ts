import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReporteSemanasService {
  private baseURL: string = 'http://localhost:3000/api/reporte/cobros/general';

  constructor(private http: HttpClient) {}

  // Obteniendo todos los datos de la tabla
  getAllData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: {
    fecha_ini: string;
    fecha_fin: string;
  }): Observable<any> {
    return this.http.post(this.baseURL, body);
  }
}
