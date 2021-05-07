<template>
    <v-menu
            :close-on-content-click="false"
            :label="label"
            :return-value.sync="date"
            min-width="290px"
            offset-y
            ref="menu"
            transition="scale-transition"
            v-model="menu"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-text-field
                    :label="label"
                    :value="formatted"
                    prepend-icon="mdi-calendar"
                    readonly
                    v-bind="attrs"
                    v-on="on"
            ></v-text-field>
        </template>
        <v-date-picker
                :first-day-of-week="1"
                :locale="this.locale"
                no-title
                scrollable
                v-model="date"
        >
            <v-spacer></v-spacer>
            <v-btn
                    @click="menu = false"
                    color="primary"
                    text
            >
                Отмена
            </v-btn>
            <v-btn
                    @click="$refs.menu.save(date)"
                    color="primary"
                    text
            >
                OK
            </v-btn>
        </v-date-picker>
    </v-menu>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";

    @Component({})
    export default class DatePicker extends Vue {
        @Prop() value?: Date;
        @Prop() label?: string;
        date: Date | null = this.value ? new Date(this.value) : null;
        menu = false;
        locale = 'ru';

        private dateTimeFormatOptions: Intl.DateTimeFormatOptions = {
            day: "numeric",
            month: "long",
            year: "numeric"
        };

        get formatted(): string {
            if (!this.date)
                return '';
            const dateTimeFormat = new Intl.DateTimeFormat(this.locale, this.dateTimeFormatOptions);
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
