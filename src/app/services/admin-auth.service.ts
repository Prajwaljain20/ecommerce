import { Injectable } from '@angular/core';
import { CanActivate, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService implements CanActivate {
  currentUser = false;
  user$: string | undefined;

  constructor(private user: UserService, private auth: AuthService) {
    this.auth.currentUser$.subscribe((res) => (this.user$ = res?.uid));
  }

  canActivate():
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    if (this.user$) {
      this.user
        .getUser(this.user$)
        .subscribe((res) => (this.currentUser = res['isAdmin']));
    }
    return this.currentUser;
  }
}
