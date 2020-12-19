import { Component, OnInit } from '@angular/core';
import { AuthUtil } from '@app/util/auth.util';
import { Router } from '@angular/router';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  username = "";
  password = "";

  constructor(private authUtil: AuthUtil) { }

  ngOnInit(): void {
  }

  login() {
    let value = null;
    this.authUtil.salt({username: this.username})
      .pipe(
        mergeMap(response => {
          return this.authUtil.login({username: this.username, password: this.password, salt: response});
        })
      )
      .subscribe(response => {
        console.log(response);
      });
  }
}
