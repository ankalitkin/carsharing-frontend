<template>
  <div class="mx-auto" style="max-width: 1000px;">
    <h1>Добро пожаловать в Каршеринг</h1>
    <v-card class="card my-4" style="max-width: 440px;">
      <v-card-text>
        <v-form
            :key="$i18n.locale"
            ref="form"
            v-model="valid"
            class="mx-auto"
        >
          <template v-if="isCustomer">
            <v-text-field
                v-if="!isSmsSent"
                v-model="smsRequest.phoneNumber"
                label="Номер телефона"
                :rules="[v => !!v || 'Необходимо ввести номер телефона']"
                autofocus
                required
                @keydown.enter="sendSMS"
            ></v-text-field>
            <v-text-field
                v-else
                v-model="smsRequest.code"
                label="Код подтверждения"
                :rules="[v => !!v || 'Необходимо ввести код подтверждения']"
                required
                autofocus
                @keydown.enter="authSMS"
            ></v-text-field>
          </template>
          <template v-else>
            <v-text-field
                v-model="options.login"
                label="Логин"
                :rules="[v => !!v || 'Необходимо ввести логин']"
                autofocus
                required
                @keydown.enter="authorize"
            ></v-text-field>
            <v-text-field
                v-model="options.password"
                label="Пароль"
                :rules="[v => !!v || 'Пароль']"
                required
                type="password"
                @keydown.enter="authorize"
            ></v-text-field>
          </template>
          <v-btn :disabled="submitDisabled"
                 :loading="isLoading"
                 class="white--text"
                 color="primary"
                 raised
                 @click="process">
            Далее
          </v-btn>
          <span class="ml-4">
            <a v-if="isCustomer" @click="isCustomer = false">Вход для сотрудников</a>
            <a v-else @click="isCustomer = true">Вход для клиентов</a>
          </span>
        </v-form>
      </v-card-text>
    </v-card>
    <v-alert v-if="isSuccess" type="success">
      Авторизация пройдена успешно!
    </v-alert>
    <v-alert v-if="isLoading" type="info">
      Загрузка...
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
import {AuthService} from "@/security/AuthService";
import {LoginOptions} from "@/models/LoginOptions";
import {TitleService} from "@/services/TitleService";
import SmsAuthRequest from "@/models/SmsAuthRequest";

@Component({})
export default class LoginView extends Vue {
  private state = State.None;
  private errCode = 0;
  private errorDict!: Record<number, string>
  private smsErrorDict!: Record<number, string>
  private valid = false;
  private isCustomer = true;
  private isSmsSent = false;
  private options = new class implements LoginOptions {
    login = "";
    password = "";
  };

  private smsRequest = new class implements SmsAuthRequest {
    phoneNumber = "";
    code = "";
  };

  get getErrorDescription(): string {
    const dict = this.isCustomer ? this.smsErrorDict : this.errorDict;
    const error = dict[this.errCode];
    if (error)
      return error;
    else
      return `Произошла непредвиденная ошибка (${this.errCode})`;
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
      401: "Введён неверный логин",
      403: "Введён неверный пароль",
    };
    this.smsErrorDict = {
      400: "Невалидный номер телефона",
      429: "Отправлено слишком много СМС",
    };
  }

  @Watch("$i18n.locale")
  private setTitle() {
    TitleService.setTitle("Добро пожаловать в Каршеринг");
  }

  private process(): void {
    if (this.isCustomer) {
      if (!this.isSmsSent) {
        this.sendSMS();
      } else {
        this.authSMS();
      }
    } else {
      this.authorize();
    }
  }

  private sendSMS() {
    if (this.submitDisabled)
      return;
    this.state = State.Loading;
    AuthService.sendSMS(this.smsRequest).then(() => {
      this.isSmsSent = true;
      this.state = State.None;
    }).catch(reason => {
      console.error("Reason: " + reason);
      this.errCode = reason.response.status;
      this.state = State.Error;
    });
  }

  private authSMS() {
    if (this.submitDisabled)
      return;
    this.state = State.Loading;
    AuthService.authorizeSMS(this.smsRequest).then(() => {
      this.isSmsSent = true;
      this.state = State.Success;
      this.$router.push("/map");
    }).catch(reason => {
      console.error("Reason: " + reason);
      this.errCode = reason.response.status;
      this.state = State.Error;
    });
  }

  private authorize(): void {
    if (this.submitDisabled)
      return;
    this.state = State.Loading;
    AuthService.authorize(this.options).then(() => {
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
