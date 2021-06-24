<template>
    <v-dialog v-if="modalDialog" v-model="modalDialog.visible" max-width="500px">
        <v-card>
            <v-card-title style="word-break: break-word">
                {{modalDialog.title}}
            </v-card-title>

            <v-card-actions>
                <v-spacer/>

                <v-btn color="red" text @click="processOk">
                    {{this.modalDialog.okButtonText || "ОК"}}
                </v-btn>
                <v-btn color="primary" text @click="processCancel">
                    {{this.modalDialog.cancelButtonText || "Отмена"}}
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>

</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import ModalDialogService from "@/services/ModalDialogService";
    import ModalDialogStore from "@/services/ModalDialogStore";
    import ModalDialogState from "@/models/ModalDialogState";

    @Component
    export default class ModalDialog extends Vue {
        processOk(): void {
            if (!this.modalDialog) {
                return;
            }
            ModalDialogService.hideModalDialog();
            if (!this.modalDialog.okCallback) {
                return;
            }
            this.modalDialog.okCallback();
        }

        processCancel(): void {
            if (!this.modalDialog) {
                return;
            }
            ModalDialogService.hideModalDialog();
            if (!this.modalDialog.cancelCallback) {
                return;
            }
            this.modalDialog.cancelCallback();
        }

        get modalDialog(): ModalDialogState | null {
            return ModalDialogStore.dialog;
        }
    }
</script>

<style scoped>

</style>
