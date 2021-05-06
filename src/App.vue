<template>
  <v-app id="app">
    <Header/>
    <v-content>
      <v-container>
        <router-view/>
      </v-container>
    </v-content>
  </v-app>
</template>
<script lang="ts">
import prepareAxios from '@/axios';
import {Component, Vue} from "vue-property-decorator";
import Header from "@/components/Header/Header.vue";

prepareAxios();
@Component({
  components: {Header}
})
export default class App extends Vue {
}
</script>
<style>
@import '~@mdi/font/css/materialdesignicons.css';
@import "~typeface-roboto-multilang/latin-ext.css";
@import "~typeface-roboto-multilang/cyrillic-ext.css";
@import "~toastr/toastr.scss";

.toast-with-offset {
  top: 100px;
  right: 12px;
}

#toast-container > div {
  opacity: 1;
}

.v-btn, .v-tab {
  text-transform: none !important;
  font-size: 1rem !important;
  letter-spacing: normal !important;
  font-weight: normal !important;
}

.v-btn::before {
  background-color: gray;
}

</style>
