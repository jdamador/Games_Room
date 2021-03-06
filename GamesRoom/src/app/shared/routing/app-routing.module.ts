import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Required components for which route services to be activated
import { SignInComponent } from '../../components/sign-in/sign-in.component';
import { SignUpComponent } from '../../components/sign-up/sign-up.component';
import { VerifyEmailComponent } from '../../components/verify-email/verify-email.component';
import { HomeComponent } from '../../components/home/home.component';
import { CheckersBoardComponent } from '../../components/checkers-board/checkers-board.component';

// Import canActivate guard services
import { AuthGuard } from '../../shared/guard/auth.guard';
import { SecureInnerPagesGuard } from '../../shared/guard/secure-inner-pages.guard';

import { ProfileComponent } from 'src/app/components/profile/profile.component';
import { SaveListComponent } from 'src/app/components/save-list/save-list.component';
import { ChatBoardComponent } from 'src/app/components/chat-board/chat-board.component';
import { MemoryBoardComponent } from 'src/app/components/memory-board/memory-board.component';
import { ViewPlayersComponent } from 'src/app/components/view-players/view-players.component';

// Include route guard in routes array
const routes: Routes = [
  { path: '', redirectTo: '/sign-in', pathMatch: 'full' },
  {
    path: 'sign-in',
    component: SignInComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'register-user',
    component: SignUpComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  {
    path: 'verify-email-address',
    component: VerifyEmailComponent,
    canActivate: [SecureInnerPagesGuard]
  },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'saveGames', component: SaveListComponent, canActivate: [AuthGuard] },
  { path: 'myProfile', component: ProfileComponent, canActivate: [AuthGuard] },
  {
    path: 'checkers',
    component: CheckersBoardComponent,
    canActivate: [AuthGuard]
  },
  { path: 'chat', component: ChatBoardComponent, canActivate: [AuthGuard] },
  { path: 'memory/:id', component: MemoryBoardComponent, canActivate: [AuthGuard] },
  { path: 'viewPlayers', component: ViewPlayersComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
