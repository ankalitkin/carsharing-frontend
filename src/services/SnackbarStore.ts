import {Vue} from 'vue-property-decorator';
import {SnackbarState} from '@/models/SnackbarState';

export default class SnackbarStore {

    public static get snackbar() {
        return this.state.snackbar;
    }

    private static state: InternalSnackbarState = Vue.observable({
        snackbar: null,
        key: 0,
    });

    public static get key() {
        return this.state.key;
    }

    public static setSnackbar(snackbar: SnackbarState) {
        this.state.snackbar = snackbar;
        this.state.key++;
    }
}

interface InternalSnackbarState {
    snackbar: SnackbarState | null;
    key: number;
}
