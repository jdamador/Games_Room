import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/shared/user-service/user.model';
import { StatisticsService } from 'src/app/shared/services/statistics-service/statistics.service';
import { AuthService } from 'src/app/shared/services/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
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
  intervalo: any
  id: string

  constructor(public statistic: StatisticsService,
    public authService: AuthService) {}

  ngOnInit() {
    this.startTrackingLoop();
    this.id= this.authService.userData.uid;
    this.obtenerEstadistica();
  }

  ngOnDestroy() {
    this.stopTrackingLoop();
  }

  startTrackingLoop() {
    this.intervalo = setInterval(() => {
        //run code
        this.obtenerEstadistica()
    }, 1000);
  }
  stopTrackingLoop() {
      clearInterval(this.intervalo);
      this.intervalo = null;
   }

  obtenerEstadistica() {
    var total = 50;
    this.statistic.getStatistics(this.id).subscribe(
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
          0;
        }
      },
      error => {
        console.log('error de consulta ' + error);
      }
    );
  }
}
