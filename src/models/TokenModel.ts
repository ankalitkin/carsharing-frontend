import {EmployeeModel} from "@/models/EmployeeModel";
import {CustomerModel} from "@/models/CustomerModel";

export interface TokenModel {
    tokenData: string;
    employee: EmployeeModel;
    customer: CustomerModel;
    authorities: string[];
}
