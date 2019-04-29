import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SaveGamesService {
  // Server Address.
  url = environment.localServer;
  constructor(private http: HttpClient) { }

  // Get all save matches.
  getSaveGames(uid: any, name: string): Observable<any> {
    const config = {
      player: uid,
      name: name
    };
    return this.http.post(`${this.url}/saveGames`, config);
  }

  // Delete some saved match.
  deleteGame(uid, key, id): Observable<any> {
    const config = {
      player: uid,
      key: key,
      idRoom: id
    };
    return this.http.post(`${this.url}/deleteJuego`, config);
  }
}
