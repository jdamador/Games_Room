import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort,MatTableDataSource } from '@angular/material';
import { SaveListDataSource } from './save-list-datasource';
import { SaveGamesService } from 'src/app/shared/services/save-games-service/save-games.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-save-list',
  templateUrl: './save-list.component.html',
  styleUrls: ['./save-list.component.css']
})
export class SaveListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource = new MatTableDataSource<any>();

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = ['name', 'nivel' , 'player1', 'player2', 'delete', 'charge'];

  constructor(public gamesSaved: SaveGamesService,
    public authService: AuthService) { }

  ngOnInit() {
    var jugador= this.authService.userData.uid;
    var nombre = this.authService.userData.displayName;
    this.gamesSaved.getPartidasGuardadas(jugador, nombre).subscribe(
      data => {
          this.dataSource= data

      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
    
    
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  

}
