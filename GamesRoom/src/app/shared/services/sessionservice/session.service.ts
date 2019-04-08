import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable()
export class SessionService {
  private base = environment.base;
  constructor(private http: HttpClient) {}
  getAllSessions() {
    return this.http.get(`${this.base}/gameTables.json`);
  }
  getSession(sessionId: string) {
    return this.http.get(`${this.base}/gameTables/${sessionId}.json`);
  }
  createSession(params: any) {
    return this.http.post(`${this.base}/gameTables.json?`, params);
  }
}

@Injectable()
export class UserService {
  private base = environment.base;
  private options = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) {}
  getUserProfile(user_uid: string) {
    this.options['params'] = {
      orderBy: '"user_uid"',
      equalTo: `"${user_uid}"`
    };
    return this.http.get(`${this.base}/users.json`, this.options);
  }
  createUserProfile(params: any) {
    return this.http.post(`${this.base}/users.json?`, params);
  }
}
