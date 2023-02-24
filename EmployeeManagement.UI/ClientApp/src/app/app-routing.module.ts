import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeEditComponent } from './components/employees/employee-edit/employee-edit.component';
import { EmployeeCreateComponent } from './components/employees/employee-create/employee-create.component';
import { EmployeeListComponent } from './components/employees/employee-list/employee-list.component';
import { ProfileComponent } from './components/employees/profile/profile.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './guards/auth-guard';

const routes: Routes = [
  {path:'', component:HomeComponent},
  {path:'home', component:HomeComponent},
  {path:'login', component:LoginComponent},
  {path:'profile/:username', component:ProfileComponent, canActivate:[AuthGuard],data: { AllowedRoles: ["Employees", "Administrators"] }},
  {path:'employees', component:EmployeeListComponent, canActivate:[AuthGuard],data: { AllowedRoles: ["Administrators"] }},
  {path:'employee-create', component:EmployeeCreateComponent, canActivate:[AuthGuard],data: { AllowedRoles: ["Administrators"] }},
  {path:'employee-edit/:username', component:EmployeeEditComponent, canActivate:[AuthGuard],data: { AllowedRoles: ["Administrators"] }}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
