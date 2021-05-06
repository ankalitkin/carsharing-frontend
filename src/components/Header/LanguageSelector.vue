<template>
    <span :key="key" class="text-center">
        <v-menu offset-y>
            <template v-slot:activator="{on}">
                <v-btn v-on="on" color="primary" dark depressed large>
                    <div class="ma-n2 text--white">
                        <flag :iso="getFlagCode(getCurrentLanguageCode())" :squared='false'/>
                        {{ getCurrentLanguage().nativeName }}
                        <v-icon>mdi-menu-down</v-icon>
                    </div>
                </v-btn>
            </template>
            <v-list>
                <v-list-item v-for="lang in getRestLanguages()" :key="lang.code" @click="() => setLanguage(lang.code)">
                    <v-list-item-title>
                        <flag :iso="getFlagCode(lang.code)" :squared='false'/>
                        {{ lang.nativeName }}
                    </v-list-item-title>
                </v-list-item>
            </v-list>
        </v-menu>
    </span>
</template>

<script lang="ts">
import {Component, Vue} from "vue-property-decorator";
import {Language} from "@/models/Language";
import {CurrentLanguageService} from "@/services/CurrentLanguageService";

@Component
export default class LanguageSelector extends Vue {
  key = 0;

  getCurrentLanguageCode(): string {
    return CurrentLanguageService.getLanguage();
  }

  setLanguage(code: string) {
    CurrentLanguageService.setLanguage(code);
    setTimeout(() => this.key++);
  }

  getRestLanguages(): Language[] {
    return CurrentLanguageService.languages.filter(el => el.code != this.getCurrentLanguageCode());
  }

  getCurrentLanguage(): Language {
    return CurrentLanguageService.languages.filter(el => el.code === this.getCurrentLanguageCode())[0];
  }

  getFlagCode(lang: string): string {
    if (lang == 'en')
      return 'gb';
    return lang;
  }
}

</script>

<style scoped>
</style>
