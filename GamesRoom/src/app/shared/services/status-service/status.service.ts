import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StatusService {

  constructor(private http: HttpClient) { }

  estadoOnline(uid: any): Observable<any> {
    let config = {
      jugador: uid,
      estado: 'online'
    };
    return this.http.post('https://gameroomapi.herokuapp.com/estado/editar', config);
  }

  estadoAusente(uid: any): Observable<any> {
    let config = {
      jugador: uid,
      estado: 'ausente'
    };
    return this.http.post('https://gameroomapi.herokuapp.com/estado/editar', config);
  }
}
