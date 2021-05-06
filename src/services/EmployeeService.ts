import axios from 'axios';
import {EmployeeModel} from "@/models/EmployeeModel";
import {root} from "@/api";
import store from "@/store"

export class EmployeeService {
    public static async getCurrentEmployee(): Promise<EmployeeModel> {
        let employee = store.getters.getUser;
        if (employee != null)
            return employee;
        employee = await axios.get(`${root}/employeeProfile`);
        this.saveEmployee(employee);
        return employee;
    }

    public static saveEmployee(employee: EmployeeModel): void {
        store.commit('saveUser', employee);
    }
}
