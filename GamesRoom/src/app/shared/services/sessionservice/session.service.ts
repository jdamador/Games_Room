import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewSession } from 'src/app/interfaces/table/table.module';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionService {
  private base = environment.base;
  private auth = environment.secret;

  constructor(private http: HttpClient) { }

  getAllSessions() {
    return this.http.get(`${this.base}/gameTables.json?${this.auth}`);
  }

  getSession(sessionId: string) {
    return this.http.get(`${this.base}/gameTables/${sessionId}.json?${this.auth}`);
  }

  createSession(params: NewSession) {
    return this.http.post(`${this.base}/gameTables.json?${this.auth}`, params);
  }
}
