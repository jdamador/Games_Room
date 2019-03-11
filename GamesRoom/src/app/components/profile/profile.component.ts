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
    console.log(this.users);
    for (let elemento of this.users) 
    {
      console.log("pep")
      if(elemento.uid==id){
        this.wins= elemento.wins;
        this.defeats= elemento.defeats;
        this.draws= elemento.draws;
      }
    }
  }
 

}
