import {root} from "@/api";
import axios from "axios";
import {SecurityService} from "@/security/SecurityService";
import {LoginOptions} from "@/models/LoginOptions";

export class AuthService {
    private static base = `${root}/auth/pass`;

    public static async authorize(loginOptions: LoginOptions): Promise<void> {
        return await axios.post(`${AuthService.base}/`, loginOptions).then(value => {
            const data = value.data;
            if (data) {
                SecurityService.authUser(data);
            } else {
                throw 'No data provided';
            }
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }
}
