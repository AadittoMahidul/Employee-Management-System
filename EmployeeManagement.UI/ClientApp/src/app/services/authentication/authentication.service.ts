import { HttpClient, HttpHeaders } from '@angular/common/http';
import { EventEmitter, Injectable, Output } from '@angular/core';
import { BehaviorSubject, empty, Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { ApiUrl } from "src/app/models/constants/AppConstants";
import { LoginModel } from 'src/app/models/authentication/login-model';
import { User } from 'src/app/models/authentication/user';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  refreshToken() {
    throw new Error("Method not implemented.");
  }
  private currentUserSubject: BehaviorSubject<User>;
  private currentUser: Observable<User>;
  @Output() loginEvent: EventEmitter<string> = new EventEmitter<string>();
  constructor(
    private http: HttpClient
  ) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(sessionStorage.getItem("user-data") as string));
    this.currentUser = this.currentUserSubject.asObservable();
  }
  get currentUserValue() {
    return this.currentUserSubject.value;
  }
  login(data: LoginModel) {
    let noTokenHeader = { headers: new HttpHeaders({ 'notoken': 'no token' }) }
    return this.http.post<any>(`${ApiUrl}/api/Account/Login`, data, noTokenHeader)
      .pipe(map(data => {
        let user = this.save(data);
        this.currentUserSubject.next(user);
        this.loginEvent.emit('login');
      }),
        catchError((err, caught) => {

          this.currentUserSubject.next(new User());
          return throwError(err);
        }));
  }

  logout() {
    sessionStorage.removeItem("user-data");
    this.currentUserSubject.next(new User());
    this.loginEvent.emit('logout');
  }
  save(data: any): User {
    const userdata = new User();
    userdata.accessToken = data.token;

    const payload = JSON.parse(window.atob(data.token.split('.')[1]));
    userdata.userName = payload.userName;
    userdata.role = payload.role
    console.log(payload)
    sessionStorage.setItem("user-data", JSON.stringify(userdata));
    return userdata;
  }
  getEmitter() {
    return this.loginEvent;
  }
}
