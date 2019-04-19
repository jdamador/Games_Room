import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  private url = environment.base;
  public idPlayer;
  config = {
    uid: this.authService.userInfo().uid
  };
  constructor(private http: HttpClient, private authService: AuthService) { }

  getStatistics(id) {
    const config = {
      uid: id
    };
    return this.http.post(this.url+'/estadisticas/obtener', config);
  }

  getStatisticsPlayers() {
    const config = {
      uid: this.idPlayer
    };
    return this.http.post(this.url+'/estadisticas/obtener', config);
  }

  setidPlayer(idPlayer: any) {
    this.idPlayer = idPlayer;
  }
}
