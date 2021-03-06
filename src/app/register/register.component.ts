import { Component, OnInit } from '@angular/core';
import { AuthUtil } from '@app/util/auth.util';
import { Router } from '@angular/router';
import { Guid } from "guid-typescript";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    email = "";
    user = "";
    password = "";
    error = "";

    constructor(private authUtil: AuthUtil, private router: Router) { }

    ngOnInit(): void {
    }

    register(){
      if(this.email != "" && this.user != "" && this.password != ""){
        this.error = "";
        this.authUtil.register(
          {
            id: Guid.raw(),
            role: "basic",
            email: this.email,
            username: this.user,
            password: this.password,
            created: null
          }
        )
        .subscribe(message => {
          if(message == ""){
            this.router.navigate(['/index']);
          } else {
            this.error = message;
          }
        });
      } else {
        this.error = "Please fill in all the fields";
      }
    }

}
