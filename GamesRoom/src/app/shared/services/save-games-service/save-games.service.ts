import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveGamesService {

  constructor(private http: HttpClient) { }

  getPartidasGuardadas(uid: any, nombre: string): Observable<any> {
    const config = {
      jugador: uid,
      nombre: nombre
    };
    return this.http.post('https://gameroomapi.herokuapp.com/partidasGuardadas', config);
  }

  eliminarPartida(uid, key, id): Observable<any> {
    const config = {
      jugador: uid,
      clave: key,
      idSala: id
    };
    return this.http.post('https://gameroomapi.herokuapp.com/eliminarJuego', config);
  }
}
