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
  image= "";
  iron= require("./images/iron.png");
  bronze= require("./images/bronze.png");
  silver= require("./images/silver.png");
  gold= require("./images/gold.png");
  platinum= require("./images/platinum.png");
  diamond= require("./images/diamond.png");
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
    var id= this.authService.userData['uid'];
    for (let elemento of this.users)
    {
      if(elemento.uid==id){
        this.wins= elemento.wins;
        this.defeats= elemento.defeats;
        this.draws= elemento.draws;
      }
    }
    this.image= this.silver;
  }
 

}
