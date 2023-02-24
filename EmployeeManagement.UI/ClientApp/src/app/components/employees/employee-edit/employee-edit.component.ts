import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ApiUrl } from 'src/app/models/constants/AppConstants';
import { MaritalStatus } from 'src/app/models/constants/enum-data';
import { EmployeeViewModel } from 'src/app/models/data/employee-view-model';
import { NotifyService } from 'src/app/services/common/notify.service';
import { EmployeeDataService } from 'src/app/services/data/employee-data.service';

@Component({
  selector: 'app-employee-edit',
  templateUrl: './employee-edit.component.html',
  styleUrls: ['./employee-edit.component.css']
})
export class EmployeeEditComponent implements OnInit{
  imgPath= ApiUrl+'/Pictures/';
  employee:EmployeeViewModel={};
  employeeForm:FormGroup= new FormGroup({
    userName:new FormControl('', Validators.required),
    email:new FormControl('', [Validators.required, Validators.email]),
    phoneNumber:new FormControl('', Validators.required),
    homeAddress: new FormControl(''),
    permanentAddress:new FormControl(''),
    picture:new FormControl(''),
    maritalStatus:new FormControl(undefined, Validators.required),
    joinDate:new FormControl(undefined),
    currentPostion: new FormControl(''),
    department:new FormControl('')
  });
  maritalStatusOptions: { label: string, value: number }[] = [];

  get f(){
    return this.employeeForm.controls;
  }
  uploadFile(event: Event) {
    console.log(this.employee.userName);
    const element = event.currentTarget as HTMLInputElement;
    let f= element.files?.length ? element.files[0]: null;
    if(f){
      const reader = new FileReader();
      this.employeeDataService.uploadImage(<string>this.employee.userName, f)
      .subscribe({
        next:r=>{
          this.employee.picture=r.savedImageName;
          this.employeeForm.patchValue({picture: r.savedImageName});
          console.log(r)
        }, error:err=>{
          this.notifyService.fail("Picture upload failed", "DISMISS")
        }
      })
      reader.readAsArrayBuffer(f);
    }
  }
  constructor(
    private employeeDataService:EmployeeDataService,
    private notifyService:NotifyService,
    private activatedRoute:ActivatedRoute
  ){}
  save(){
    if(this.employeeForm.invalid) return;
    
    Object.assign(this.employee, this.employeeForm.value);
    console.log(this.employee);
    this.employeeDataService.put(this.employee)
    .subscribe({
      next:r=>{
        this.notifyService.success('Data updated', "DISMISS")
      },
      error:err=>{
        this.notifyService.fail("Data update failed", "DISMISS");
      }
    })
  }
  ngOnInit(): void {
    let username:string = this.activatedRoute.snapshot.params['username'];
    this.employeeDataService.get(username)
    .subscribe({
      next:r=>{
        this.employee=r;
        console.log(this.employee);
        this.employeeForm.patchValue(this.employee)
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
