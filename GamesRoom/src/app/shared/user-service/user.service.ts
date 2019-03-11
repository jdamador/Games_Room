import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { User } from 'src/app/shared/user-service/user.model';
import { firestore } from 'firebase';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    console.log(this.firestore.doc('users/fxTkUsDtKCcAEYBwjShBphOp4jG3').ref['id']);
    return this.firestore.collection('users').snapshotChanges();
  }
}
