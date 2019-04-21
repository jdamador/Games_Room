import { Component, HostListener } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../shared/services/auth.service';
import { StatusService } from 'src/app/shared/services/status-service/status.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent {
  showFiller = false;
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(map(result => result.matches));

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService: AuthService,
    public statusService: StatusService
  ) {}

  @HostListener('window:beforeunload', ['$event'])
  unloadHandler(event: Event) {
    const user = JSON.parse(localStorage.getItem('user'));
    var uidJugador = user['uid']
    this.statusService.estadoAusente(uidJugador).subscribe(
      data => {
      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }
}
