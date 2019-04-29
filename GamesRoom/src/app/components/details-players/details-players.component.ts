import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'src/app/shared/user-service/user.model';
import { StatisticsService } from 'src/app/shared/services/statistics-service/statistics.service';
import { AuthService } from 'src/app/shared/services/auth.service';
import { MatDialogRef } from '@angular/material'

@Component({
  selector: 'app-details-players',
  templateUrl: './details-players.component.html',
  styleUrls: ['./details-players.component.css']
})
export class DetailsPlayersComponent implements OnInit {
  images = {
    silver: '../../assets/images/silver.png',
    bronze: '../../assets/images/bronze.png',
    iron: '../../assets/images/gold.png',
    gold: '../../assets/images/gold.png',
    platinum: '../../assets/images/platinum.png',
    diamond: '../../assets/images/diamond.png'
  };
  resulImage = '';
  wins = 0;
  defeats = 0;
  draws = 0;
  users: User[];

  constructor(public statistic: StatisticsService,
    public authService: AuthService, public dialogRef: MatDialogRef<DetailsPlayersComponent>, ) { }

  ngOnInit() {
    this.obtenerEstadistica();
  }

  obtenerEstadistica() {
    var total = 50;
    this.statistic.getStatisticsPlayers().subscribe(
      data => {
        this.wins = data['ganadas'];
        this.defeats = data['perdidas'];
        this.draws = data['empatadas'];
        total = total + this.wins * 5;
        total = total - this.defeats * 8;
        total = total + this.draws * 2;
        if (total < 15) {
          this.resulImage = this.images.iron;
        } else if (total < 40) {
          this.resulImage = this.images.bronze;
        } else if (total < 55) {
          this.resulImage = this.images.silver;
        } else if (total < 70) {
          this.resulImage = this.images.gold;
        } else if (total < 85) {
          this.resulImage = this.images.platinum;
        } else {
          this.resulImage = this.images.diamond;
        }
      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }

  onClose() {
    this.dialogRef.close();
  }

}
