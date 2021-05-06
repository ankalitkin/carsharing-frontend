<i18n src="./RegistrationView.yaml"/>
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
              autofocus
              required
              type="name"
              @keydown.enter="register"
          ></v-text-field>
          <v-text-field
              v-model="options.login"
              :label="$t('form.label.login')"
              :rules="[v => !!v || $t('form.error.login_required')]"
              required
              @keydown.enter="register"
          ></v-text-field>
          <v-text-field
              v-model="options.password"
              :label="$t('form.label.password')"
              :rules="[v => !!v || $t('form.error.password_required')]"
              required
              type="password"
              @keydown.enter="register"
          ></v-text-field>
          <v-text-field
              :label="$t('form.label.password2')"
              :rules="[v => v === options.password || $t('form.error.password_mismatch')]"
              required
              type="password"
              @keydown.enter="register"
          ></v-text-field>
          <v-btn :disabled="submitDisabled"
                 :loading="isLoading"
                 class="white--text"
                 color="primary"
                 raised
                 @click="register">
            {{ $t('form.button') }}
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
    <p>
      {{ $t('text_lower') }}
    </p>
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
import {RegistrationOptions} from "@/models/RegistrationOptions";
import {TitleService} from "@/services/TitleService";
import {RegistrationService} from "@/security/RegistrationService";

@Component({})
export default class LoginView extends Vue {
  private state = State.None;
  private errCode = 0;
  private errorDict!: Record<number, string>;
  private valid = false;
  private options = new class implements RegistrationOptions {
    name = "";
    login = "";
    password = "";
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
    this.errorDict = {
      400: this.$t('error.400').toString(),
    };
  }

  @Watch("$i18n.locale")
  private setTitle() {
    TitleService.setTitle(this.$t('title').toString());
  }

  private register(): void {
    if (this.submitDisabled)
      return;
    this.state = State.Loading;
    RegistrationService.register(this.options).then(() => {
      this.state = State.Success;
      this.$router.push("/");
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
