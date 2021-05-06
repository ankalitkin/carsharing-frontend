<template>
    <span :key="$i18n.locale" :class="{'error--text': isOver, 'warning--text': isDeadlineToday, 'default': !date}">
        <v-icon v-if="clock !== false" size="medium">mdi-clock-outline</v-icon>
        {{ formatted || defaultMessage }}
    </span>
</template>

<script lang="ts">
import {Component, Prop, Vue} from "vue-property-decorator";

@Component({})
export default class Datetime extends Vue {
  @Prop() timeStr?: string;
  @Prop() clock?: boolean;
  @Prop() defaultMessage?: string;
  private dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  get date(): Date | null {
    return this.timeStr ? new Date(this.timeStr) : null;
  }

  get isOver(): boolean | null {
    const td = new Date();
    td.setDate(td.getDate() - 1);
    return this.date ? this.date < td : null;
  }

  get isPlusOneOver(): boolean | null {
    return this.date ? this.date < new Date() : null;
  }

  get isDeadlineToday(): boolean | null {
    return !this.isOver && this.isPlusOneOver;
  }

  get formatted(): string | null {
    if (!this.date)
      return null;
    const dateTimeFormat = new Intl.DateTimeFormat(this.$i18n.locale.toString(), this.dateTimeFormatOptions);
    return dateTimeFormat.format(this.date);
  }
}
</script>

<style scoped>
span {
  display: inline-block;
}

.default {
  opacity: 0.5;
}
</style>
