import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { NewSession } from 'src/app/interfaces/table/table.module';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionService {

  // Credential to connect with Firebase.
  private base = environment.base;
  private auth = environment.secret;

  constructor(private http: HttpClient) { }

  // Get all sessions from firebase.
  getAllSessions() {
    return this.http.get(`${this.base}/Memory.json?${this.auth}`);
  }

  // Get a specific session to match two players.
  getSession(sessionId: string) {
    return this.http.get(`${this.base}/Memory/${sessionId}.json?${this.auth}`);
  }

  // Create a new session.
  createSession(params: NewSession) {
    return this.http.post(`${this.base}/Memory.json?${this.auth}`, params);
  }
}
