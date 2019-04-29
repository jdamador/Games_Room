import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatusService {
  // Server address.
  private url = environment.localServer;
  constructor(private http: HttpClient) { }

  // Set online state when some player is connected to web page.
  stateOnline(uid: any): Observable<any> {
    const config = {
      player: uid,
      state: 'online'
    };
    return this.http.post(`${this.url}/state/edit`, config);
  }

  // Set disconnect state when some player left the page.
  estadoAusente(uid: any): Observable<any> {
    const config = {
      player: uid,
      state: 'disconected'
    };
    return this.http.post(`${this.url}/state/edit`, config);
  }
}
