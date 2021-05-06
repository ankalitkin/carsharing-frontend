import Vue from 'vue';
import VueI18n from 'vue-i18n';
import {CurrentLanguageService} from "@/services/CurrentLanguageService";

Vue.use(VueI18n);
export const i18n = new VueI18n({
  locale: CurrentLanguageService.getLanguage(),
  fallbackLocale: 'en'
});
