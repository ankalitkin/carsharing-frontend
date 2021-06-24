<template>
  <v-dialog max-width="500px" v-if="declaration && !declaration.readOnly" v-model="dialog">
    <v-card>
      <v-card-title>
        <span class="headline">{{ formTitle }}</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-list>
            <v-list-item :key="key" v-for="key in Object.keys(editedItem)">
              <template v-if="tmpAttributes[key]">
                <v-text-field :label="tmpAttributes[key].displayName"
                              disabled
                              v-if="tmpAttributes[key].name === 'id' && editedItem.id"
                              v-model="editedItem.id"/>
                <reference-selector :base="tmpAttributes[key].reference.name"
                                    :label="tmpAttributes[key].reference.displayName"
                                    v-else-if="'reference' in tmpAttributes[key]"
                                    v-model="editedItem[key]"/>
                <date-picker :label="tmpAttributes[key].displayName"
                             v-else-if="tmpAttributes[key].type === AttributeType.Date"
                             v-model="editedItem[key]"/>
                <v-checkbox :label="tmpAttributes[key].displayName"
                            v-else-if="tmpAttributes[key].type === AttributeType.Boolean"
                            v-model="editedItem[key]"/>
                <v-text-field :label="tmpAttributes[key].displayName"
                              v-else-if="tmpAttributes[key].name !== 'id'"
                              v-model="editedItem[key]"/>
              </template>
            </v-list-item>
          </v-list>
          <car-photo-uploader :car-id="editedItem.id" v-if="declaration.name === 'car'"/>
        </v-container>
        <span :key="errCode" class="error--text" v-if="errCode">
          Введены неверные данные
        </span>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn @click="close" color="blue darken-1" text>Отмена</v-btn>
        <v-btn @click="save" color="blue darken-1" text>Сохранить</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script lang="ts">
import DatePicker from "@/components/DatePicker.vue"
import ReferenceSelector from "@/components/ReferenceSelector.vue"
import CarPhotoUploader from "@/components/CarPhotoUploader.vue";

export default {
  name: 'EditDialog',
  components: {CarPhotoUploader, DatePicker, ReferenceSelector},
  props: {
    AttributeType: {},
    close: {},
    declaration: {},
    dialog: {},
    editedItem: {},
    errCode: {},
    formTitle: {},
    save: {},
    tmpAttributes: {}
  }
}
</script>
<style scoped>
td {
  vertical-align: top;
  padding: 20px;
}

</style>
