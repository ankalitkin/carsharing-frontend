export class PersistentStorageService {
    public static getItem<T>(key: string): T | null {
        try {
            return JSON.parse(localStorage.getItem(key) || 'null');
        } catch (error) {
            return null;
        }
    }

    public static setItem<T>(key: string, value: T | null): void {
        localStorage.setItem(key, JSON.stringify(value));
    }

    public static removeItem(key: string): void {
        localStorage.removeItem(key);
    }
}
