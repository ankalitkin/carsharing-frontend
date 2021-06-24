import SnackbarStore from '@/services/SnackbarStore';

export default class SnackbarService {
    public static showSnackbar(text: string, color: string, background: string) {
        SnackbarStore.setSnackbar({visible: true, text, color, background});
    }

    public static showSuccessSnackbar(text: string): void {
        this.showSnackbar(text, 'white', 'green');
    }

    public static showErrorSnackbarAndLog(text: string, ...optionalParams: any[]): void {
        this.showSnackbar(text, 'white', 'red');
        console.error(text, optionalParams);
    }
}
