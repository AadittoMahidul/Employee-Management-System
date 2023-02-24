import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiUrl } from 'src/app/models/constants/AppConstants';
import { EmployeeViewModel } from 'src/app/models/data/employee-view-model';
import { ImagePathResponse } from 'src/app/models/data/viewmodels/image-path-response';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {
  params: any;

  constructor(private http:HttpClient) { }
  getVM():Observable<EmployeeViewModel[]>{
    return this.http.get<EmployeeViewModel[]>(`${ApiUrl}/api/Employees/VM`);
  }
  get(username:string):Observable<EmployeeViewModel>{
    return this.http.get<EmployeeViewModel>(`${ApiUrl}/api/Employees/VM/${username}`)
  }
  getById(id:number):Observable<EmployeeViewModel>{
    return this.http.get<EmployeeViewModel>(`${ApiUrl}/api/Employees/VM${id}`);
  }
  insert(data:EmployeeViewModel):Observable<EmployeeViewModel>{
    return this.http.post<EmployeeViewModel>(`${ApiUrl}/api/Employees/VM`, data);
  }
  put(data:EmployeeViewModel):Observable<EmployeeViewModel>
  {
    return this.http.put<EmployeeViewModel>(`${ApiUrl}/api/Employees`, data)
  }
  uploadImage(username: string, f: File): Observable<ImagePathResponse> {
    const formData = new FormData();

    formData.append('file', f);
    return this.http.post<ImagePathResponse>(`${ApiUrl}/api/Employees/Upload/${username}`, formData);
  }

}
