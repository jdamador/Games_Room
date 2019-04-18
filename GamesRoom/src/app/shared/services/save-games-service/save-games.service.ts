import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class SaveGamesService {

  constructor(private http: HttpClient) { }

  getPartidasGuardadas(uid: any, nombre: string): Observable<any> {
    let config={
      jugador: uid,
      nombre: nombre
    }
    return this.http.post('http://localhost:3000/partidasGuardadas',config);
  }

  eliminarPartida(uid, key, id): Observable<any>{
    let config={
      jugador: uid,
      clave: key,
      idSala: id
    }
    return this.http.post('http://localhost:3000/eliminarJuego',config);
  }
}
