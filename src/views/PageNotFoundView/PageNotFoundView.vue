<i18n src="./PageNotFoundView.yaml"/>
<template>
  <v-container>
    <v-row class="text-center">
      <v-col class="mb-4">
        <h1 class="display-2 font-weight-bold mb-3">
          404
        </h1>

        <p class="subheading font-weight-regular">
          {{ $t('description') }}
        </p>

        <p class="subheading font-weight-regular">
          <router-link class="accent--text" to="/">{{ $t('home_link') }}</router-link>
        </p>

      </v-col>
    </v-row>
  </v-container>
</template>

<script lang="ts">
import Vue from 'vue'
import {Component, Watch} from "vue-property-decorator";
import {TitleService} from "@/services/TitleService";

@Component
export default class PageNotFoundView extends Vue {
  created() {
    this.setTitle();
  }

  @Watch("$i18n.locale")
  private setTitle() {
    TitleService.setTitle(this.$t('title').toString());
  }
}
</script>
