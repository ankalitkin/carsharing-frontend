<template>
  <div>
    <h1>Администрирование</h1>
    <table>
      <tr>
        <td>
          <v-navigation-drawer permanent width="280px">
            <v-list>
              <v-list-item :key="item.name" @click="() => set(item.name)"
                           v-for="item in allDeclarationsList.filter(a => !a.adminOnly || isAdmin)">
                <v-list-item-content>
                  <v-list-item-title>{{ item.displayName }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-navigation-drawer>
        </td>
        <td class="td2">
          <v-toolbar color="white" flat>
            <v-toolbar-title>{{ declaration && declaration.displayName || "Пожалуйста, выберите таблицу" }}
            </v-toolbar-title>
            <v-spacer></v-spacer>
            <v-text-field
                append-icon="mdi-magnify"
                hide-details
                label="Поиск"
                single-line
                style="margin-left: 10px; margin-right: 10px; max-width: 200px;"
                v-model="search"
            ></v-text-field>
            <v-btn @click="editItem" class="mb-2" color="primary" v-if="declaration && !declaration.readOnly">Добавить</v-btn>
            <EditDialog :attribute-type="AttributeType" :close="close" :declaration="declaration" :dialog="dialog"
                          :edited-item="editedItem" :err-code="errCode" :form-title="formTitle" :save="save"
                          :tmp-attributes="tmpAttributes"/>
          </v-toolbar>
          <v-data-table
              :headers="headers"
              :items="items"
              :search="search"
              class="elevation-1"
          >
            <template v-slot:items="props">
              {{ props.item.name }}
            </template>

            <template
                v-for="a1 in declaration ? declaration.attributes.filter(value => 'reference' in value) : []"
                v-slot:[`item.${a1.name}`]="prop">
              <reference :base="a1.reference.name" :id="prop.value" :key="a1.name + prop.value"/>
            </template>

            <template
                v-for="a2 in declaration ? declaration.attributes.filter(value => value.type === AttributeType.Date) : []"
                v-slot:[`item.${a2.name}`]="prop">
              <span :key="a2.name + prop.value" v-if="!prop.value" class="text--disabled">null</span>
              <datetime :key="a2.name + prop.value" v-else :time-str="new Date(prop.value)"/>
            </template>

            <template
                v-for="a3 in declaration ? declaration.attributes.filter(value => value.type === AttributeType.Boolean) : []"
                v-slot:[`item.${a3.name}`]="prop">
              <span :key="a3.name + prop.value">{{ prop.value ? "Да" : "Нет" }}</span>
            </template>

            <template v-if="declaration && !declaration.readOnly" v-slot:item.actions="{ item }">
              <icon-button-tooltip icon="mdi-pencil" hint="Изменить" :callback="() => editItem(item)"/>
              <icon-button-tooltip icon="mdi-delete" hint="Удалить" :callback="() => deleteItem(item)"/>
            </template>
          </v-data-table>
        </td>
      </tr>
    </table>
  </div>
</template>


<script lang="ts">
import {Component, Mixins, Watch} from "vue-property-decorator";
import Reference from "@/components/Reference.vue";
import Datetime from "@/components/Datetime.vue";
import ReferenceSelector from "@/components/ReferenceSelector.vue";
import DatePicker from "@/components/DatePicker.vue";
import {CrudService} from "@/services/CrudService";
import {allDeclarationsList, allDeclarationsMap} from "@/definitions/AllDeclarations";
import {DeclarationService} from "@/services/DeclarationService";
import {EntityDeclaration} from "@/models/crud/EntityDeclatarion";
import {AttributeType} from "@/models/crud/AttributeType";
import {ReferenceDeclaration} from "@/models/crud/ReferenceDeclaration";
import {AttributeDeclaration} from "@/models/crud/AttributeDeclaration";
import IconButtonTooltip from "@/components/IconButtonTooltip.vue";
import SecurityMixin from "@/security/SecurityMixin";
import EditDialog from "@/components/EditDialog.vue";
import {TitleService} from "@/services/TitleService";

@Component({
  components: {EditDialog, IconButtonTooltip, DatePicker, ReferenceSelector, Datetime, Reference}
})
export default class Home extends Mixins(SecurityMixin) {
  name = 'Home';
  allDeclarationsList = allDeclarationsList;
  allDeclarationsMap = allDeclarationsMap;
  declaration: EntityDeclaration | null = null;
  headers: any[] = [];
  items: any[] = [];
  AttributeType = AttributeType;
  tmpAttributes: Record<string, AttributeDeclaration | ReferenceDeclaration> = {};
  errCode = 0;
  search = '';

  dialog = false;
  editedIndex = -1;
  editedItem: any = {}
  defaultItem: any = {}

  created() {
    TitleService.setTitle("Администрирование");
  }

  get formTitle() {
    return this.editedIndex === -1 ? 'Новый элемент' : 'Изменить элемент'
  }

  async set(base: string): Promise<void> {
    await CrudService.getAll(base).then(value => {
      this.preloadReferencesDesc(base).then(() => {
        this.setHeaders(base);
        this.items = value;
      })
    });
  }

  setHeaders(base: string): void {
    if (!this.headers || !(base in allDeclarationsMap))
      return;
    this.declaration = allDeclarationsMap[base];
    this.headers = this.declaration.attributes
        .filter(value => !("type" in value && value.type == AttributeType.Password))
        .map(value => {
          const text = "reference" in value ? value.displayName || value.reference.displayName : value.displayName;
          return {text: text, value: value.name}
        });
    if (!this.declaration.readOnly) {
      this.headers.push({text: 'Действия', value: 'actions', sortable: false});
    }
  }

  @Watch("dialog")
  dialoga(val: string) {
    val || this.close()
  }

  editItem(item: any | undefined) {
    this.editedIndex = item ? this.items.indexOf(item) : 0;
    this.editedItem = {}
    if (this.declaration) {
      this.declaration.attributes.forEach(value => this.editedItem[value.name] = null);
      this.tmpAttributes = {};
      this.declaration.attributes.forEach(attribute => this.tmpAttributes[attribute.name] = attribute);
    }
    Object.keys(item).filter(key => item[key]).forEach(key => this.editedItem[key] = item[key]);
    this.dialog = true;
    this.errCode = 0;
  }

  deleteItem(item: any) {
    if (this.declaration == null)
      return;
    if (confirm('Вы действительно хотите удалить элемент?')) {
      CrudService.deleteById(this.declaration.name, item.id).then(value => {
        this.items = this.items.filter(value => value.id != item.id);
      }).catch(reason => {
        console.error(reason);
        const status = reason.response.status;
        if (status == 500) {
          alert("Невозможно удалить объект пока на него существуют другие ссылки");
        } else {
          alert("Произошла непредвиденная ошибка");
        }
      })
    }
  }

  close() {
    this.dialog = false
    setTimeout(() => {
      this.editedItem = Object.assign({}, this.defaultItem)
      this.editedIndex = -1
    }, 300)
  }

  save() {
    if (this.declaration == null)
      return;
    CrudService.save(this.declaration.name, this.editedItem).then(value => {
      if (this.editedIndex > -1) {
        for (const member in this.items[this.editedIndex]) {
          delete this.items[this.editedIndex][member];
        }
        Object.assign(this.items[this.editedIndex], value)
      } else {
        this.items.push(value)
      }
      CrudService.clearDescCache();
      this.close();
    }).catch(reason => {
      this.errCode = reason.response.status;
      console.error(reason);
    })
  }

  private getReferences(base: string): string[] {
    return DeclarationService.getReferences(this.allDeclarationsMap[base]);
  }

  private async preloadReferencesDesc(base: string): Promise<void> {
    await Promise.all(this.getReferences(base).map(value => CrudService.getDesc(value)));
  }
}
</script>

<style scoped>
td {
  vertical-align: top;
  padding: 20px;
}

.td2 {
  width: 100%;
  padding: 20px;
}
</style>

<style>
.v-btn {
  text-transform: none !important;
  font-size: 1rem !important;
  letter-spacing: normal !important;
  font-weight: normal !important;
}
</style>
