import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  private url = environment.base;
  constructor(private http: HttpClient) { }

  estadoOnline(uid: any): Observable<any> {
    let config = {
      jugador: uid,
      estado: 'online'
    };
    return this.http.post(`${this.url}/estado/editar`, config);
  }

  estadoAusente(uid: any): Observable<any> {
    let config = {
      jugador: uid,
      estado: 'ausente'
    };
    return this.http.post(`${this.url}/estado/editar`, config);
  }
}
