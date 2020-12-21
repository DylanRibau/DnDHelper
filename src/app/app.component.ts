import { Component } from '@angular/core';
import { AuthUtil } from '@app/util/auth.util';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isLoggedIn: boolean;

  constructor(private authUtil: AuthUtil, private router: Router){
    router.events.subscribe(result => {
      this.checkLoggedIn();
    });
  }

  ngOnInit():void {
    this.checkLoggedIn();
  }

  checkLoggedIn() {
    this.isLoggedIn = this.authUtil.isLoggedIn();
  }

  logout() {
    this.authUtil.doLogoutUser();
    this.isLoggedIn = false;
    this.router.navigate(['/index']);
  }
}
