<template>
    <span>
        {{ value }}
    </span>
</template>

<script lang="ts">
    import {Component, Prop, Vue} from "vue-property-decorator";
    import {CrudService} from "@/services/CrudService";

    @Component({})
    export default class Reference extends Vue {
        @Prop() base!: string;
        @Prop() id!: number;
        value = "Loading...";

        created(): void {
            CrudService.getDescById(this.base, this.id).then(v => {
                this.value = v;
            }).catch(e => {
                console.error(e);
                this.value = "Error..."
            });
        }
    }
</script>

<style scoped>

</style>
