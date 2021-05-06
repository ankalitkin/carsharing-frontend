import {root} from "@/api";
import axios from "axios";
import {UpdateEmployeeModel} from "@/models/UpdateEmployeeModel";
import {EmployeeModel} from "@/models/EmployeeModel";
import {EmployeeService} from "@/services/EmployeeService";

export class EditService {
    private static base = `${root}/employeeProfile`;

    public static async edit(options: UpdateEmployeeModel): Promise<EmployeeModel> {
        try {
            const employee = (await axios.post<EmployeeModel>(`${EditService.base}/`, options)).data;
            EmployeeService.saveEmployee(employee);
            return employee;
        } catch (reason) {
            return Promise.reject(reason);
        }
    }
}