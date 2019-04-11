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
  MatFormFieldModule
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

// Firebase services + enviorment module
import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { environment } from '../environments/environment';

// Auth service
import { AuthService } from './shared/services/auth.service';
import { UserService } from './shared/user-service/user.service';
import { from } from 'rxjs';
import { SignInComponent } from './components/sign-in/sign-in.component';
import { MenuComponent } from './components/menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { SaveListComponent } from './components/save-list/save-list.component';
import { MemoryBoardComponent } from './components/memory-board/memory-board.component';

// Services
import { CardService } from './shared/services/card.service';
import { ChatBoardComponent } from './components/chat-board/chat-board.component';

import { SocketIoModule, SocketIoConfig } from 'ngx-socket-io';
import { ChatService } from './shared/services/chat-service/chat.service';
import { CheckersService } from './shared/services/checkers-service/checkers.service';

import { HttpClientModule } from '@angular/common/http'; 
import { HttpModule } from '@angular/http';

const config: SocketIoConfig = { url: 'http://localhost:3000', options: {} };

import { ConfigGameIAComponent } from './components/config-game-ia/config-game-ia.component';
import { ConfigGamePlayersComponent } from './components/config-game-players/config-game-players.component';
import { ConfigGamePlayersCheckersComponent } from './components/config-game-players-checkers/config-game-players-checkers.component';
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
    ConfigGameIAComponent,
    ConfigGamePlayersComponent,
    ConfigGamePlayersCheckersComponent
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
    HttpModule,
    HttpClientModule
  ],
  providers: [AuthService, UserService, CardService, ChatService, CheckersService],
  bootstrap: [AppComponent],
  entryComponents: [ConfigGameIAComponent, ConfigGamePlayersComponent]
})
export class AppModule {}
