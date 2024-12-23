import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, ObservedValueOf, tap } from 'rxjs';
import { I_NewRaza, I_Raza } from 'src/app/interfaces/interfaces';

@Injectable({
  providedIn: 'root',
})
export class ApiRazaService {
  private baseURL: string = 'http://localhost:3000/api/razas/';
  private raza?: I_Raza;
  private allRazas?: Array<I_Raza>;
  constructor(private http: HttpClient) {}

  // metodo get para obtener la raza actual
  get currentRaza(): I_Raza | undefined {
    if (!this.raza) return undefined;
    return structuredClone(this.raza);
  }
  //metodo para obtener la raza medante el id
  requestRazaById(id: number): Observable<I_Raza> {
    return this.http.get<I_Raza>(`${this.baseURL}/${id}`).pipe(
      tap((dataRaza) => {
        this.raza = dataRaza;
        localStorage.setItem('razaToken', dataRaza.id.toString());
      })
    );
  }

  // Esta mal tendremos q ver despues
  createtRazaPost(body: I_Raza): Observable<Array<I_Raza>> {
    return this.http.post<Array<I_Raza>>(this.baseURL, body);
  }

  get currentAllRazas(): Array<I_Raza> | undefined {
    if (this.allRazas?.length == 0) return undefined;
    return structuredClone(this.allRazas);
  }
  //-----------

  //--------------

  // Obreniendo todas las razas
  // Obteniendo todos los datos de la tabla
  getAllData(): Observable<Array<any>> {
    return this.http.get<Array<any>>(this.baseURL);
  }
  /* crear Data */
  createData(body: { nombre: string; descripcion: string ,id_especie:number}): Observable<any> {
    return this.http.post(this.baseURL, body);
  }
  /* Actulizar Data */
  updateData(body: {
    id: number;
    nombre: string;
    descripcion: string;
    id_especie:number
  }): Observable<any> {
    return this.http.put(`${this.baseURL}${body.id}`, body);
  }
  /* Eliminando Data */
  deleteData(id: number): Observable<any> {
    return this.http.delete(`${this.baseURL}${id}`);
  }
}//end ApiRazaService
