import {CarModel} from "@/models/CarModel";
import axios from "axios";
import {root} from "@/api";

export class CarService {
    static async getAllCars(): Promise<CarModel[]> {
        return (await axios.get<CarModel[]>(`${root}/car/`)).data;
    }
}
