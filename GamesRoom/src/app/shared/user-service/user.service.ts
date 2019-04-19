import { Injectable, NgZone } from '@angular/core';
import { User } from 'src/app/shared/user-service/user.model';
import { firestore } from 'firebase';
import { AngularFirestore } from '@angular/fire/firestore';
import { AuthService } from '../../shared/services/auth.service';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(public afs: AngularFirestore,
    public ngZone: NgZone,
    public authService: AuthService,
    private http: HttpClient
  ) { }

  getUsers(id) {
    console.log(id)
    return this.afs.collection('users').snapshotChanges();
  }

  getPlayers() {
    return this.http.get('https://gameroomapi.herokuapp.com/perfiles');
  }
}
