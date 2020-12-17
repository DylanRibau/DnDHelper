import { Component, OnInit } from '@angular/core';
import { AuthUtil } from '@app/util/auth.util';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
    user = "";
    password = "";

    constructor(private authUtil: AuthUtil) { }

    ngOnInit(): void {
    }

    register(){
      if(this.authUtil.login({username: this.user, password: this.password})){
        console.log("logged in");
      }
    }

}
