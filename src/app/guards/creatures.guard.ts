import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthUtil } from '@app/util/auth.util';

@Injectable({
  providedIn: 'root'
})
export class CreaturesGuard implements CanActivate {
  constructor(private authUtil: AuthUtil, private router: Router){ }

  canActivate() {
    if(!this.authUtil.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
    return this.authUtil.isLoggedIn();
  }
}
