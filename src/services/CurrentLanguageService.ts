import {Language} from "@/models/Language";

export class CurrentLanguageService {
    public static readonly languages: Language[] = [
        {code: 'en', nativeName: 'English'},
        {code: 'ru', nativeName: 'Русский'},
    ];

    public static getLanguage(): string {
        const lang = localStorage.getItem('lang') || this.getBrowserLanguage();
        if (this.languages.findIndex(el => el.code == lang) >= 0)
            return lang;
        return (this.getDefaultLanguage());
    }

    public static setLanguage(lang: string) {
        import('@/i18n.ts').then(value => {
            const i18n = value.i18n;
            if (!lang) {
                localStorage.removeItem('lang');
                i18n.locale = this.getDefaultLanguage();
            } else if (this.languages.findIndex(el => el.code == lang) >= 0) {
                localStorage.setItem('lang', lang);
                i18n.locale = lang;
            } else {
                console.error(`Cannot set '${lang}' language`);
            }
        });
    }

    private static getBrowserLanguage(): string {
        return navigator.language.split('-')[0];
    }

    private static getDefaultLanguage(): string {
        return this.languages[0].code;
    }
}
