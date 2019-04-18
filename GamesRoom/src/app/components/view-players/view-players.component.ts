import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatDialogRef,  MatTableDataSource, MatSort } from '@angular/material';
import { UserService } from 'src/app/shared/user-service/user.service';
import { StatisticsService } from 'src/app/shared/services/statistics-service/statistics.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { DetailsPlayersComponent } from 'src/app/components/details-players/details-players.component';

@Component({
  selector: 'app-view-players',
  templateUrl: './view-players.component.html',
  styleUrls: ['./view-players.component.css']
})
export class ViewPlayersComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns = ['Player', 'Condition', 'View Details'];
  playersTable = new MatTableDataSource<any>();
  
  constructor(public userService: UserService, public statistics: StatisticsService, private dialog: MatDialog) { }

  ngOnInit() {
    this.userService.getPlayers().subscribe(
      (sessions: any[]) => {
        let formedData = [];
        for (let key in sessions) {
          sessions[key]['id'] = key;
          formedData.push(sessions[key]);
        }
        this.playersTable.data = formedData;
      },
      err => {
        console.log(err);
      }
    );
  }

  viewPlayer(id:any): void {
    this.statistics.setidPlayer(id);
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.width = '60%';
    this.dialog.open(DetailsPlayersComponent, dialogConfig);
  }

}
