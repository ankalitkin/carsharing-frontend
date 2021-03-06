<i18n src="./EditView.yaml"/>
<template>
  <div class="mx-auto" style="max-width: 1000px;">
    <h1>{{ $t('title') }}</h1>
    <v-card class="card my-4" style="max-width: 440px;">
      <v-card-text>
        <v-form
            :key="$i18n.locale"
            ref="form"
            v-model="valid"
            class="mx-auto"
        >
          <v-text-field
              v-model="options.name"
              :label="$t('form.label.name')"
              :rules="[v => !!v || $t('form.error.name_required')]"
              required
              type="name"
              @keydown.enter="edit"
          ></v-text-field>
          <v-text-field
              v-model="options.login"
              :label="$t('form.label.login')"
              :rules="[v => !!v || $t('form.error.login_required')]"
              required
              @keydown.enter="edit"
          ></v-text-field>
          <v-text-field
              v-model="options.oldPassword"
              :label="$t('form.label.old_password')"
              type="password"
              @keydown.enter="edit"
          ></v-text-field>
          <v-text-field
              v-model="options.newPassword"
              :label="$t('form.label.new_password')"
              type="password"
              @keydown.enter="edit"
          ></v-text-field>
          <v-text-field
              :label="$t('form.label.confirm_password')"
              :rules="[v => v === options.newPassword || !v && !options.newPassword || $t('form.error.password_mismatch')]"
              type="password"
              @keydown.enter="edit"
          ></v-text-field>
          <v-btn :disabled="submitDisabled"
                 :loading="isLoading"
                 class="white--text"
                 color="primary"
                 raised
                 @click="edit">
            {{ $t('form.button') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <v-alert v-if="isSuccess" type="success">
      {{ $t('success') }}
    </v-alert>
    <v-alert v-if="isLoading" type="info">
      {{ $t('loading') }}
    </v-alert>
    <div :key="errCode">
      <v-alert v-if="isError" type="error">
        {{ getErrorDescription }}
      </v-alert>
    </div>
  </div>
</template>

<script lang="ts">
import {Component, Vue, Watch} from "vue-property-decorator";
import {State} from "@/enum/State";
import {UpdateEmployeeModel} from "@/models/UpdateEmployeeModel";
import {TitleService} from "@/services/TitleService";
import {EmployeeService} from "@/services/EmployeeService";
import {EditService} from "@/security/EditService";

@Component({})
export default class LoginView extends Vue {
  private state = State.None;
  private errCode = 0;
  private errorDict!: Record<number, string>;
  private valid = false;
  private options = new class implements UpdateEmployeeModel {
    name = "";
    login = "";
    newPassword = "";
    oldPassword = "";
  };

  get getErrorDescription(): string {
    const error = this.errorDict[this.errCode];
    if (error)
      return error;
    else
      return this.$t('error.default', {errCode: this.errCode}).toString();
  }

  get isLoading(): boolean {
    return this.state == State.Loading;
  }

  get isSuccess(): boolean {
    return this.state == State.Success;
  }

  get isError(): boolean {
    return this.state == State.Error;
  }

  get submitDisabled(): boolean {
    return this.isLoading || !this.valid;
  }

  created() {
    this.setTitle();
    EmployeeService.getCurrentEmployee().then(value => {
      this.options.login = value.login;
      this.options.name = value.name;
    }).catch(reason => {
      console.error(reason);
    });

    this.errorDict = {
      400: this.$t('error.400').toString(),
      409: this.$t('error.409').toString(),
    };
  }

  @Watch("$i18n.locale")
  private setTitle() {
    TitleService.setTitle(this.$t('title').toString());
  }

  private edit(): void {
    if (this.submitDisabled)
      return;
    this.state = State.Loading;
    EditService.edit(this.options).then(() => {
      this.state = State.Success;
    }).catch(reason => {
      console.error("Reason: " + reason);
      this.errCode = reason.response.status;
      this.state = State.Error;
    });
  }
}
</script>

<style scoped>

</style>
