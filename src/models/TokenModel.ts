import {EmployeeModel} from "@/models/EmployeeModel";

export interface TokenModel {
    tokenData: string;
    employee: EmployeeModel;
    authorities: string[];
}
