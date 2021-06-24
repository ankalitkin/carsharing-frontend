import {root} from "@/api";
import axios from "axios";
import {SecurityService} from "@/security/SecurityService";
import {LoginOptions} from "@/models/LoginOptions";
import SmsAuthRequest from "@/models/SmsAuthRequest";

export class AuthService {
    public static async authorize(loginOptions: LoginOptions): Promise<void> {
        await axios.post(`${root}/auth/pass/`, loginOptions).then(value => {
            const data = value.data;
            if (data) {
                SecurityService.authUser(data);
            } else {
                throw new Error('No data provided');
            }
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }

    public static async sendSMS(smsRequest: SmsAuthRequest) {
        await axios.post(`${root}/auth/sendSMS/`, smsRequest);
    }

    public static async authorizeSMS(smsRequest: SmsAuthRequest): Promise<void> {
        await axios.post(`${root}/auth/authSMS/`, smsRequest).then(value => {
            const data = value.data;
            if (data) {
                SecurityService.authUser(data);
            } else {
                throw new Error('No data provided');
            }
        }).catch(reason => {
            return Promise.reject(reason);
        });
    }
}
