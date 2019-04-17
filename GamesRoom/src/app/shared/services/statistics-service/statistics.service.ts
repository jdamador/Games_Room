import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  config = {
    uid: this.authService.userInfo().uid
  };
  constructor(private http: HttpClient, private authService: AuthService) { }

  getStatistics() {
    return this.http.post('http://localhost:3000/estadisticas/obtener', this.config);
  }
  // This method save a win into firebase for this user.
  postWin() {
    this.http.post('http://localhost:3000/postWin', this.config);
  }
  postDefeat() {
    this.http.post('http://localhost:3000/postDefeat', this.config);
  }
  postDraw() {
    this.http.post('http://localhost:3000/postDraw', this.config);
  }
}
