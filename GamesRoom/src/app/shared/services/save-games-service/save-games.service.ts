import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveGamesService {
  url = environment.serverHeroku;
  constructor(private http: HttpClient) { }

  getPartidasGuardadas(uid: any, nombre: string): Observable<any> {
    const config = {
      jugador: uid,
      nombre: nombre
    };
    return this.http.post(`${this.url}/partidasGuardadas`, config);
  }

  eliminarPartida(uid, key, id): Observable<any> {
    const config = {
      jugador: uid,
      clave: key,
      idSala: id
    };
    return this.http.post(`${this.url}/eliminarJuego`, config);
  }
}
