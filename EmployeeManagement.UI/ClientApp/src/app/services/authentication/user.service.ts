import { Injectable } from '@angular/core';

import { User } from 'src/app/models/authentication/user';
import { AuthenticationService } from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user!: User;
  constructor(
    private authenticationService: AuthenticationService
  ) {
    this.load();
    this.authenticationService.getEmitter().subscribe(x => {
      if (x === "login") {
        //console.log("login");
        this.load();
      }
      if (x === "logout") {
        this.user = new User();
      }
      if (x === "refresh") {
        console.log('refresh');
        this.load();
      }
    });
  }
  get isLogged() {
    return this.user?.userName != null;
  }
  get userName() {
    return this.user?.userName ?? '';
  }
  get token() {
    return this.user?.accessToken ?? '';
  }
  get role() {
    return this.user?.role;
  }

  load() {
    this.user = this.authenticationService.currentUserValue;
  }
  logout() {
    this.authenticationService.logout();
  }
  roleMatch(allowedRoles: string[]) {
    console.log(allowedRoles);
    let isMatch = false;
    for (const r of allowedRoles) {
      console.log(r);
      console.log(this.role);
      let i = this.role?.indexOf(r);
      console.log(i);
      if (i != undefined && i >= 0) {
        isMatch = true;
        break;
      }
    }
    console.log(`$Math: ${isMatch}`);
    return isMatch;
  }

}
