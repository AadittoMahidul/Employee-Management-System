import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiUrl } from 'src/app/models/constants/AppConstants';
import { MaritalStatus } from 'src/app/models/constants/enum-data';
import { EmployeeViewModel } from 'src/app/models/data/employee-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { EmployeeDataService } from 'src/app/services/data/employee-data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  employee:EmployeeViewModel={};
  imgPath= ApiUrl+'/Pictures/';
  maritalStatusOptions: { label: string, value: number }[] = [];

  constructor(
    private employeeDataService:EmployeeDataService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ){{}}
 getStatusName(value:any):string{
  return MaritalStatus[Number(value)];
 }
  ngOnInit(): void {
    let username:string = this.activatedRoute.snapshot.params['username'];
    this.employeeDataService.get(username)
    .subscribe({
      next:r=>{
        this.employee=r;
        console.log(this.employee);
       
      },
      error:err=>{
        this.notifyService.fail("Failed to load profile", "DISMISS");
      }
    });
    Object.keys(MaritalStatus).filter(
      (type) => isNaN(<any>type) && type !== 'values'
    ).forEach((v: any, i) => {
      this.maritalStatusOptions.push({ label: v, value: Number(MaritalStatus[v]) });
    });
  }
}
