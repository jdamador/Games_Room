import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

import {
  MatButtonModule,
  MatToolbarModule,
  MatSidenavModule,
  MatIconModule,
  MatListModule,
  MatTableModule,
  MatPaginatorModule,
  MatSortModule,
  MatRadioModule,
  MatGridListModule,
  MatDialogModule,
  MatFormFieldModule,
  MatProgressSpinnerModule,
  MatSnackBarModule
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// Reactive Form
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

// App routing modules
import { AppRoutingModule } from './shared/routing/app-routing.module';

// App components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { VerifyEmailComponent } from './components/verify-email/verify-email.component';
import { CheckersBoardComponent } from './components/checkers-board/checkers-board.component';
import { SaveListComponent } from './components/save-list/save-list.component';
import { MemoryBoardComponent } from './components/memory-board/memory-board.component';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MenuComponent } from './components/menu/menu.component';
import { ChatBoardComponent } from './components/chat-board/chat-board.component';

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/user-service/user.service';
import { from } from 'rxjs';
import { LayoutModule } from '@angular/cdk/layout';
import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './shared/services/chat-service/chat.service';
import { CheckersService } from './shared/services/checkers-service/checkers.service';

import { ConfigGamePlayersCheckersComponent } from './components/config-game-players-checkers/config-game-players-checkers.component';
import { ConfigGameIaCheckersComponent } from './components/config-game-ia-checkers/config-game-ia-checkers.component';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { MemoryService } from './shared/services/memory/memory.service';
// TODO: change when someone is going to do tests.
const config: SocketIoConfig = { url: environment.serverHeroku, options: {} };

import { ConfigGamePlayersMemoryComponent } from './components/config-game-players-memory/config-game-players.component';
import { SessionService } from './shared/services/sessionservice/session.service';
import { ViewPlayersComponent } from './components/view-players/view-players.component';
import { DetailsPlayersComponent } from './components/details-players/details-players.component';
import { ConfigGameIAComponent } from './components/config-game-ia/config-game-ia.component';
@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    SignInComponent,
    SignUpComponent,
    HomeComponent,
    ProfileComponent,
    VerifyEmailComponent,
    SaveListComponent,
    MemoryBoardComponent,
    CheckersBoardComponent,
    ChatBoardComponent,
    ConfigGamePlayersCheckersComponent,
    ConfigGameIaCheckersComponent,
    ConfigGamePlayersMemoryComponent,
    ViewPlayersComponent,
    DetailsPlayersComponent,
    ConfigGameIAComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    FormsModule,
    MatCardModule,
    MatButtonModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatRadioModule,
    MatGridListModule,
    MatDialogModule,
    MatFormFieldModule,
    SocketIoModule.forRoot(config),
    HttpClientModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],
  providers: [
    AuthService,
    UserService,
    ChatService,
    MemoryService,
    SessionService
  ],
  bootstrap: [AppComponent],
  entryComponents: [
    ConfigGameIaCheckersComponent,
    ConfigGamePlayersCheckersComponent,
    ConfigGamePlayersMemoryComponent,
    DetailsPlayersComponent,
    ConfigGameIAComponent
  ]
})
export class AppModule { }
