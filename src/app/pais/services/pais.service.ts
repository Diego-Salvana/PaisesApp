import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { Pais } from '../interfaces/pais.interface';

@Injectable({
   providedIn: 'root',
})
export class PaisService {
   private apiUrl: string = 'https://restcountries.com/v3.1';

   private httpParams = new HttpParams().set('fields', 'name,capital,flags,population,cca2');

   constructor(private http: HttpClient) {}

   buscarPais(termino: string): Observable<Pais[]> {
      return this.http.get<Pais[]>(`${this.apiUrl}/name/${termino}`, {
         params: this.httpParams,
      });
   }

   buscarCapital(termino: string): Observable<Pais[]> {
      return this.http.get<Pais[]>(`${this.apiUrl}/capital/${termino}`, {
         params: this.httpParams,
      });
   }

   getPaisPorAlpha(id: string): Observable<Pais> {
      return this.http.get<Pais>(`${this.apiUrl}/alpha/${id}`);
   }

   buscarRegion(region: string): Observable<Pais[]> {
      return this.http.get<Pais[]>(`${this.apiUrl}/region/${region}`);
   }
}
