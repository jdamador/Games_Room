import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule} from '@angular/material/card';
import { MatButtonModule, MatToolbarModule, MatSidenavModule, MatIconModule, MatListModule } from '@angular/material'
import { BrowserAnimationsModule} from '@angular/platform-browser/animations';

// Reactive Form
import { ReactiveFormsModule, FormsModule } from "@angular/forms";

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent} from './components/sign-up/sign-up.component';
import { VerifyEmailComponent} from './components/verify-email/verify-email.component';

// Firebase services + enviorment module
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from "./shared/services/auth.service";
import { from } from 'rxjs';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SavedGamesComponent } from './components/saved-games/saved-games.component';


@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    VerifyEmailComponent,
    SavedGamesComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    AngularFireModule.initializeApp({
      apiKey: "AIzaSyA5P5GimK9Sy7zhWUCFgoWHe-0LNLtnsfA",
      authDomain: "proyect1design.firebaseapp.com",
      databaseURL: "https://proyect1design.firebaseio.com",
      projectId: "proyect1design",
      storageBucket: "proyect1design.appspot.com",
      messagingSenderId: "965759997972"
    }),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule
  ],
  providers: [AuthService],
  bootstrap: [AppComponent]
})

export class AppModule { }
