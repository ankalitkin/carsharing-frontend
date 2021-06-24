<template>
    <v-snackbar :color="snackbar.background" top transition="fade-transition" v-if="snackbar"
                :key="key" v-model="snackbar.visible">
      {{ snackbar.text }}
      <v-btn text class="float-right" @click="snackbar.visible = false">
        Close
      </v-btn>
    </v-snackbar>

</template>

<script lang="ts">
import {SnackbarState} from '@/models/SnackbarState';
import {Component, Vue} from 'vue-property-decorator';
import SnackbarStore from '@/services/SnackbarStore';

@Component
export default class Snackbar extends Vue {
  get snackbar(): SnackbarState | null {
    return SnackbarStore.snackbar;
  }

  get key(): number {
    return SnackbarStore.key;
  }
}
</script>

<style scoped>

</style>
