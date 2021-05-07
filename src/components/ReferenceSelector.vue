<template>
    <v-select :items="items" :label="label" item-text="value" item-value="id" v-if="items" v-model="id"/>
</template>

<script lang="ts">
    import {Component, Prop, Vue, Watch} from "vue-property-decorator";
    import {CrudService} from "@/services/CrudService";

    @Component({})
    export default class ReferenceSelector extends Vue {
        @Prop() base!: string;
        @Prop() label?: string;
        @Prop() value!: number;
        id = this.value || 0;
        items: { id: number; value: string }[] | null = null;

        created(): void {
            CrudService.getDesc(this.base).then(v => {
                this.items = Object.entries(v).map(([k, v]) => {
                    return {id: +k, value: v}
                })
            }).catch(e => {
                console.error(e);
            });
        }

        @Watch("id")
        private push(val: number): void {
            this.$emit('input', val);
        }
    }
</script>

<style scoped>

</style>
