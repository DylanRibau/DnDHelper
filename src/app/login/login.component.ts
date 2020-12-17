import { Component, OnInit } from '@angular/core';
import { AuthUtil } from '@app/util/auth.util';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user = "";
  password = "";

  constructor(private authUtil: AuthUtil) { }

  ngOnInit(): void {
  }

  login(){
    if(this.authUtil.login({username: this.user, password: this.password})){
      console.log("logged in");
    } else {
      console.log("oof");
    }
  }
}
