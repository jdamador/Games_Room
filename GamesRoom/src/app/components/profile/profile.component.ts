import { Component, OnInit, NgZone } from '@angular/core';
import { User } from 'src/app/shared/user-service/user.model';
import { StatisticsService } from 'src/app/shared/services/statistics-service/statistics.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
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
    public authService: AuthService) {}

  ngOnInit() {
    this.obtenerEstadistica();
  }

  obtenerEstadistica() {
    var total = 50;
    this.statistic.getStatistics().subscribe(
      data => {
        console.log(data);
        this.wins = data['ganadas'];
        this.defeats = data['perdidas'];
        this.draws = data['empatadas'];
        total = total + this.wins * 5;
        total = total - this.defeats * 8;
        total = total + this.draws * 2;
        console.log(total);
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
          0;
        }
      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }
}
