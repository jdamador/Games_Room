import { Injectable, NgZone } from '@angular/core';
import { auth } from 'firebase/app';
import { AngularFireAuth } from '@angular/fire/auth';
import {
  AngularFirestore,
  AngularFirestoreDocument
} from '@angular/fire/firestore';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { StatusService } from './status-service/status.service';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private url = environment.localServer;
  userData: any; // Save logged in user data
  statisticsData: any;

  constructor(
    public afs: AngularFirestore, // Inject Firestore service
    public afAuth: AngularFireAuth, // Inject Firebase auth service
    public router: Router,
    public ngZone: NgZone, // NgZone service to remove outside scope warning
    private http: HttpClient,
    public statusService: StatusService
  ) {
    /* Saving user data in localstorage when logged in and setting up null when logged out */
    this.afAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
        JSON.parse(localStorage.getItem('user'));
      } else {
        localStorage.setItem('user', null);
        JSON.parse(localStorage.getItem('user'));
      }
    });
  }

  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.afAuth.auth.currentUser.sendEmailVerification().then(() => {
      this.router.navigate(['verify-email-address']);
    });
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user !== null && user.emailVerified !== false) {
      this.statusService.stateOnline(user['uid']).subscribe(
        data => {
        },
        error => {
          console.log('Get fail' + error);
        }
      );
      return true;
    } else {
      return false;
    }
  }

  // Sign in with Google
  GoogleAuth(lado: number) {
    return this.AuthLogin(new auth.GoogleAuthProvider(), lado);
  }

  // Auth logic to run auth providers
  AuthLogin(provider, lado: number) {
    return this.afAuth.auth
      .signInWithPopup(provider)
      .then(result => {
        this.ngZone.run(() => {
          this.router.navigate(['home']);
        });

        this.SetUserData(result.user, lado);
      })
      .catch(error => {
        window.alert(error);
      });
  }

  /* Setting up user data when sign in with username/password,
  sign up with username/password and sign in with social auth
  provider in Firestore database using AngularFirestore + AngularFirestoreDocument service */
  SetUserData(user, lado: number) {

    const userRef: AngularFirestoreDocument<any> = this.afs.doc(
      `users/${user.uid}`
    );
    this.userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      emailVerified: user.emailVerified
    };
    localStorage.setItem('user', this.userData);
    if (lado === 1) {
      this.CreateStatistics(user.uid);
    }

    return userRef.set(this.userData, {
      merge: true
    });
  }

  // Sign out
  SignOut() {
    return this.afAuth.auth.signOut().then(() => {
      this.statusService.estadoAusente(this.userData.uid).subscribe(
        data => {
          this.router.navigate(['sign-in']);
          localStorage.removeItem('user');
        },
        error => {
          console.log('error de consulta ' + error);
        }
      );

    });
  }

  // Function for create statistics when user registered
  CreateStatistics(idUser) {
    const config = {
      uid: idUser
    };
    this.callCreateStatistics(config).subscribe(
      data => {
        this.statisticsData = data;
      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }
  callCreateStatistics(config: any): Observable<any> {
    return this.http.post(`${this.url}/statistics/add`, config);
  }

  // Home
  Home() {
    return this.router.navigate(['home']);
  }

  // Saves Games View
  SavedGames() {
    return this.router.navigate(['saveGames']);
  }

  // Personal Profile View
  MyProfile() {
    return this.router.navigate(['myProfile']);
  }

  // Other players view
  ViewPlayers() {
    return this.router.navigate(['viewPlayers']);
  }

  // Get user registered
  getPeople() {
    return this.afAuth.auth;
  }

  // Get all information from current user.
  userInfo() {
    return JSON.parse(localStorage.getItem('user'));
  }

  // Navigate to checkers board.
  goCheckers() {
    return this.router.navigate(['checkers']);
  }

  // Navigate to memory board.
  goMemory() {
    return this.router.navigate([`/memory/`, '']);
  }
}
