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
  error = "";

  constructor(private authUtil: AuthUtil, private router: Router) { }

  ngOnInit(): void {

  }

  login() {
    if(this.username != "" && this.password != ""){
      this.error = "";
      let value = null;
      this.authUtil.salt({username: this.username})
      .pipe(
        mergeMap(response => {
          return this.authUtil.login({username: this.username, password: this.password, salt: response});
        })
      )
      .subscribe(response => {
        if(response == "Logged in"){
          this.router.navigate(['/index']);
        } else {
          this.error = response;
        }
      });
    } else {
        this.error = "Please fill in all the fields";
    }
  }
}
