<template>
    <span :key="$i18n.locale">
        {{formatted}}
    </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class Datetime extends Vue {
  @Prop() timeStr?: string;
  private dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  get formatted(): string | null {
    if (!this.timeStr)
      return null;
    const dateTimeFormat = new Intl.DateTimeFormat(this.$i18n.locale.toString(), this.dateTimeFormatOptions);
    return dateTimeFormat.format(new Date(this.timeStr));
  }
}
</script>

<style scoped>

</style>
