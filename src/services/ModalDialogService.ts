import ModalDialogState from '@/models/ModalDialogState';
import ModalDialogStore from '@/services/ModalDialogStore';

export default class ModalDialogService {
    public static showModalDialog(title: string, okCallback: (() => void) | null,
                                  cancelCallback: (() => void) | null = null,
                                  okButtonText: string | null = null, cancelButtonText: string | null = null) {
        ModalDialogStore.setModalDialog({
            visible: true,
            title,
            okCallback,
            cancelCallback,
            okButtonText,
            cancelButtonText,
        } as ModalDialogState);
    }

    public static hideModalDialog(): void {
        const newState = {...ModalDialogStore.dialog, visible: false} as ModalDialogState;
        ModalDialogStore.setModalDialog(newState);
    }
}
