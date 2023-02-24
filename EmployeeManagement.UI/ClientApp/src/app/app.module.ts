import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavBarComponent } from './components/nav-bar/nav-bar.component';
import { LayoutModule } from '@angular/cdk/layout';

import { HomeComponent } from './components/home/home.component';
import { MatImportModule } from './modules/common/mat-import/mat-import.module';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthenticationService } from './services/authentication/authentication.service';
import { UserService } from './services/authentication/user.service';
import { AuthGuard } from './guards/auth-guard';
import { EmployeeDataService } from './services/data/employee-data.service';
import { JwtTokenInterceptor } from './interceptors/jwt-token-interceptor';
import { NotifyService } from './services/common/notify.service';
import { LoginComponent } from './components/login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { ProfileComponent } from './components/employees/profile/profile.component';
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    LoginComponent,
    EmployeeListComponent,
    ProfileComponent,
    EmployeeCreateComponent,
    EmployeeEditComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    LayoutModule,
    MatImportModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
    
  ],
  providers: [HttpClient,AuthenticationService, UserService,AuthGuard,EmployeeDataService,NotifyService,
    { provide: HTTP_INTERCEPTORS, useClass: JwtTokenInterceptor, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
