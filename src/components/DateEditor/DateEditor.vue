<i18n src="./DateEditor.yaml"/>
<template>
  <v-menu
      ref="menu"
      v-model="menu"
      :close-on-content-click="false"
      :return-value.sync="date"
      min-width="290px"
      offset-y
      transition="scale-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-text-field
          v-bind="attrs"
          v-on="on"
          :label="label"
          :value="formatted"
          prepend-icon="mdi-calendar"
          readonly
          style="max-width: 300px"
      ></v-text-field>
    </template>
    <v-date-picker
        v-model="date"
        :first-day-of-week="1"
        :locale="$i18n.locale"
        no-title
        scrollable
    >
      <v-spacer></v-spacer>
      <v-btn
          color="primary"
          text
          @click="menu = false"
      >
        {{ $t('cancel-button') }}
      </v-btn>
      <v-btn
          color="primary"
          text
          @click="$refs.menu.save(date)"
      >
        {{ $t('ok-button') }}
      </v-btn>
    </v-date-picker>
  </v-menu>
</template>

<script lang="ts">
import {Component, Prop, Vue, Watch} from "vue-property-decorator";

@Component({})
export default class DateEditor extends Vue {
  @Prop() label?: string;
  @Prop() value?: Date
  date: Date | null = this.value || null;
  menu = false;

  private dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };

  get formatted(): string {
    if (!this.date)
      return '';
    const dateTimeFormat = new Intl.DateTimeFormat(this.$i18n.locale.toString(), this.dateTimeFormatOptions);
    return dateTimeFormat.format(new Date(this.date.toString()));
  }

  @Watch("date")
  private push(val: Date | null): void {
    this.$emit('input', val);
  }
}
</script>

<style scoped>
</style>
