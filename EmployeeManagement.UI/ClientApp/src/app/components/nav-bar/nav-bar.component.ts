import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { UserService } from 'src/app/services/authentication/user.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );
    get isLogged(){
      return this.userService.isLogged;
    }
    get userName():string{
      return this.userService.userName;
    }
    logout(){
      this.loginService.logout();
      this.router.navigateByUrl("/home");
    }
  
  constructor(private breakpointObserver: BreakpointObserver,
    private userService: UserService,
    private loginService:AuthenticationService,
    private router:Router
    ) {}

}
