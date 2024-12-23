import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ReporteDiaService {
  private baseURL: string = 'http://localhost:3000/api/reporte/dia/';

  constructor(private http: HttpClient) { }

  // Obteniendo todos los datos de la tabla
  getAllData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: {
    id: number; 
    fecha: string;
    
  }): Observable<any> {
    return this.http.post(this.baseURL, body);
  }
}
