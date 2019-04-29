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

  // Server address.
  url = environment.localServer;
  constructor(private http: HttpClient, private authService: AuthService) { }

  // Get all statistics from API.
  getStatistics(id) {
    const config = {
      uid: id
    };
    return this.http.post(`${this.url}/statistics/get`, config);
  }

  // Get statistics for an specific player.
  getStatisticsPlayers() {
    const config = {
      uid: this.idPlayer
    };
    return this.http.post(`${this.url}/statistics/get`, config);
  }

  // Set id to get statistics for a specific player.
  setidPlayer(idPlayer: any) {
    this.idPlayer = idPlayer;
  }
}
