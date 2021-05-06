import {Component, Vue} from 'vue-property-decorator';
import {SecurityService} from '@/security/SecurityService';
import {EmployeeModel} from "@/models/EmployeeModel";

@Component
export default class SecurityMixin extends Vue {
    protected get isAuthorized(): boolean {
        return SecurityService.isAuthorized();
    }

    protected get tokenData(): string | null {
        return SecurityService.getTokenData();
    }

    protected get user(): EmployeeModel | null {
        return SecurityService.getUser();
    }

    protected get authorities(): string[] | null {
        return SecurityService.getAuthorities();
    }

    protected get isAdmin(): boolean {
        return SecurityService.isAdmin();
    }

    protected get isModerator(): boolean {
        return SecurityService.isModerator();
    }

    protected get isModeratorOrAdmin(): boolean {
        return this.isAdmin || this.isModerator;
    }

    protected get isUser(): boolean {
        return SecurityService.isUser();
    }
}
