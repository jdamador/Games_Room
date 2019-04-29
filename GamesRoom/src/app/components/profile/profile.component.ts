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

  // Default imagene to each category where a player is place.
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
  intervalo: any;
  id: string;

  constructor(public statistic: StatisticsService,
    public authService: AuthService) { }

  // When start the window get perfil data from current user.
  ngOnInit() {
    this.startTrackingLoop();
    const user = JSON.parse(localStorage.getItem('user'));
    this.id = user['uid'];
    this.getStatistics();
  }

  // Stop tracking loop when the window is closed.
  ngOnDestroy() {
    this.stopTrackingLoop();
  }

  // Interval to update perfil data.
  startTrackingLoop() {
    this.intervalo = setInterval(() => {
      this.getStatistics();
    }, 1000);
  }
  stopTrackingLoop() {
    clearInterval(this.intervalo);
    this.intervalo = null;
  }

  // Get statistics for current user.
  getStatistics() {
    let total = 50;
    this.statistic.getStatistics(this.id).subscribe(
      data => {
        this.wins = data['wins'];
        this.defeats = data['defeats'];
        this.draws = data['draws'];
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
        console.log('Error getting data!' + error);
      }
    );
  }
}
