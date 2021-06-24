export default interface ModalDialogState {
    visible: boolean;
    title: string;
    okButtonText?: string;
    cancelButtonText?: string;
    okCallback: (() => void) | null;
    cancelCallback: (() => void) | null;
}
