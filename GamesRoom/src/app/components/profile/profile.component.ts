import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
import { Router } from "@angular/router";

import { UserService } from 'src/app/shared/user-service/user.service';
import { User } from 'src/app/shared/user-service/user.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})

export class ProfileComponent implements OnInit {
  images={
    silver: '../../assets/images/silver.png',
    bronze: '../../assets/images/bronze.png',
    iron: '../../assets/images/gold.png',
    gold: '../../assets/images/gold.png',
    platinum: '../../assets/images/platinum.png',
    diamond: '../../assets/images/diamond.png'
  }
  resulImage="";
  wins=0;
  defeats=0;
  draws=0;
  users: User[];
  constructor(private userService: UserService,
    public authService: AuthService) { }

  ngOnInit() {
    this.userService.getUsers().subscribe(data => {
      this.users = data.map(e => {
        return {
          uid: e.payload.doc.id,
          ...e.payload.doc.data()
        } as User;
      })
      this.iniciar();
    });
    
  }

  iniciar(){
    var total=50;
    var id= this.authService.userData['uid'];
    for (let elemento of this.users)
    {
      if(elemento.uid==id){
        this.wins= elemento.wins;
        this.defeats= elemento.defeats;
        this.draws= elemento.draws;
        total= total+this.wins*5;
        total= total-this.defeats*8;
        total= total +this.draws*2;
        console.log(total);
        if(total<15){
          this.resulImage= this.images.iron;
        }
        else if(total<40){
          this.resulImage= this.images.bronze;
        }
        else if(total<55){
          this.resulImage= this.images.silver;
        }
        else if(total<70){
          this.resulImage= this.images.gold;
        }
        else if(total <85){
          this.resulImage= this.images.platinum;
        }
        else{
          this.resulImage= this.images.diamond;0
        }
      }
    }

  }
 

}
