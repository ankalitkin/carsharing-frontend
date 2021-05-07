<template>
  <v-tooltip bottom transition="fade-transition">
    <template v-slot:activator="{ on }">
      <v-btn icon class="mx-0" v-on="on">
        <v-icon small class="mr-1" @click="callback">
          {{icon}}
        </v-icon>
      </v-btn>
    </template>
    {{hint}}
  </v-tooltip>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';

@Component({})
export default class IconButtonTooltip extends Vue {
  name = 'IconButtonTooltip';
  @Prop() icon!: string;
  @Prop() hint!: string;
  @Prop() callback!: void;
}
</script>

<style scoped>

</style>
