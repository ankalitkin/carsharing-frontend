import {PersistentStorageService} from "@/services/PersistentStorageService";
import {TokenModel} from "@/models/TokenModel";
import {EmployeeModel} from "@/models/EmployeeModel";

export interface AuthModuleState {
    auth: TokenModel | null;
}

export const authModule = {
    state: {
        auth: PersistentStorageService.getItem('auth'),
    } as AuthModuleState,
    mutations: {
        authUser(state: AuthModuleState, tokenModel: TokenModel): void {
            state.auth = tokenModel;
            PersistentStorageService.setItem('auth', tokenModel);
            console.log(state);
        },
        saveUser(state: AuthModuleState, employeeModel: EmployeeModel): void {
            if (state.auth) {
                state.auth.employee = employeeModel;
                PersistentStorageService.setItem('auth', state.auth);
                console.log(state);
            } else {
                console.warn("Not authorized, can't update user")
            }
        },
        clearToken(state: AuthModuleState): void {
            state.auth = null;
            PersistentStorageService.removeItem('auth');
        },
        resetState(state: AuthModuleState): void {
            state.auth = PersistentStorageService.getItem('auth');
        }
    },
    actions: {},
    modules: {},
    getters: {
        getTokenData(state: AuthModuleState): string | null {
            if (!state.auth)
                return null
            return state.auth.tokenData;
        },
        getUser(state: AuthModuleState): EmployeeModel | null {
            if (!state.auth)
                return null
            return state.auth.employee;
        },
        getAuthorities(state: AuthModuleState): string[] | null {
            if (!state.auth)
                return null
            return state.auth.authorities;
        }
    }
};
