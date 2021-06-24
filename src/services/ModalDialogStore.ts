import {Vue} from 'vue-property-decorator';
import ModalDialogState from '@/models/ModalDialogState';

export default class ModalDialogStore {

    public static get dialog() {
        return this.state.dialog;
    }

    public static setModalDialog(dialog: ModalDialogState) {
        this.state.dialog = dialog;
    }
    private static state: InternalModalDialogState = Vue.observable({
        dialog: null,
    });
}

interface InternalModalDialogState {
    dialog: ModalDialogState | null;
}

