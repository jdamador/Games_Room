import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { Observable, observable } from 'rxjs';
import { messaging } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class MemoryService {
  private url = 'http://localhost:3000';
  private socket;

  constructor() {
    this.socket = io(this.url);
  }
  getCurrentBoard() {
    let socket = this.socket;
    let observable = new Observable(function(observer) {
      socket.on('currentboard', function(data) {
        observer.next(data);
      });
    });

    return observable;
  }
  getInitialBoard() {
    let socket = this.socket;
    let observable = new Observable(function(observer) {
      socket.on('initialboard', function(data) {
        observer.next(data);
      });
    });

    return observable;
  }
}
