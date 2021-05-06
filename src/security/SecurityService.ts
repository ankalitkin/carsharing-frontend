import {TokenModel} from "@/models/TokenModel";
import {EmployeeModel} from "@/models/EmployeeModel";
import store from "@/store"

export class SecurityService {
    public static getTokenData(): string | null {
        return store.getters.getTokenData;
    }

    public static getUser(): EmployeeModel | null {
        return store.getters.getUser;
    }

    public static getAuthorities(): string[] {
        return store.getters.getAuthorities;
    }

    public static authUser(data: TokenModel): void {
        store.commit('authUser', data);
    }

    public static saveUser(data: EmployeeModel): void {
        store.commit('saveUser', data);
    }

    public static clearToken(): void {
        store.commit('clearToken');
    }

    public static resetState(): void {
        store.commit('resetState');
    }

    public static isAuthorized(): boolean {
        return !!this.getTokenData() && !!this.getUser();
    }

    public static isAdmin(): boolean {
        return this.checkAuthority("Admin");
    }

    public static isModerator(): boolean {
        return this.checkAuthority("Moderator");
    }

    public static isUser(): boolean {
        return this.checkAuthority("User");
    }

    private static checkAuthority(authority: string) {
        const authorities = store.getters.getAuthorities;
        return authorities != null && authorities.indexOf(authority) >= 0;
    }
}
