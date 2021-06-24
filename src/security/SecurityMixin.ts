import {Component, Vue} from 'vue-property-decorator';
import {SecurityService} from '@/security/SecurityService';
import {EmployeeModel} from "@/models/EmployeeModel";
import {CustomerModel} from "@/models/CustomerModel";

@Component
export default class SecurityMixin extends Vue {
    protected get isAuthorized(): boolean {
        return SecurityService.isAuthorized();
    }

    protected get tokenData(): string | null {
        return SecurityService.getTokenData();
    }

    protected get user(): EmployeeModel | CustomerModel | null {
        return SecurityService.getUser();
    }

    protected get authorities(): string[] | null {
        return SecurityService.getAuthorities();
    }

    protected get isAdmin(): boolean {
        return SecurityService.isAdmin();
    }

    protected get isEmployee(): boolean {
        return SecurityService.isEmployee();
    }
}
