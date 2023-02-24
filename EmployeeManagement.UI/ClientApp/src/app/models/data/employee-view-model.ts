import { MaritalStatus } from "../constants/enum-data";

export interface EmployeeViewModel {
    id?:string;
    userName?:string|undefined;
    email?:string|undefined;
    phoneNumber?:string;
    homeAddress?:string;
    permanentAddress?:string;
    picture?:string;
    maritalStatus?:MaritalStatus;
    joinDate?:Date;
    department?:string;
    currentPostion?:string;
    roles?:string;
}
