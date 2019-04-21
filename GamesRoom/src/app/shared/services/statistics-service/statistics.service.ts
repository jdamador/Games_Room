import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  public idPlayer;
  url = environment.localServer;
  config = {
    uid: this.authService.userInfo().uid
  };
  constructor(private http: HttpClient, private authService: AuthService) { }

  getStatistics(id) {
    var config = {
      uid: id
    }
    return this.http.post(`${this.url}/estadisticas/obtener`, config);
  }

  getStatisticsPlayers() {
    return this.http.post(`${this.url}/estadisticas/obtener`, this.config);
  }

  setidPlayer(idPlayer: any) {
    this.idPlayer = idPlayer;
  }
}
