<template>
  <v-app-bar app color="primary" dark>
    <router-link tag="span" :to="isEmployee ? '/' : '/map'">
      <div class="myTitle">
        Каршеринг
      </div>
    </router-link>
    <span v-if="isAuthorized">
            <router-link tag="span" to="/" v-if="isEmployee">
                      <v-btn color="primary" dark depressed>Администрирование</v-btn>
                  </router-link>
                  <router-link tag="span" to="/cars" v-if="isEmployee">
                      <v-btn color="primary" dark depressed>Машины на карте</v-btn>
                  </router-link>
                  <router-link tag="span" to="/docs" v-if="isEmployee">
                      <v-btn color="primary" dark depressed>Валидация документов</v-btn>
                  </router-link>
        </span>
    <span class="right">
            <router-link v-if="!isAuthorized" tag="span" to="/login">
                <v-btn color="primary" dark depressed>Войти</v-btn>
            </router-link>
            <span v-if="isAuthorized" class="text-center">
                <v-menu offset-y>
                    <template v-slot:activator="{on}">
                        <v-btn
                            v-on="on" color="primary" dark depressed large>
                            <div class="ma-n2 text--white">
                                <!--suppress HtmlUnknownTarget -->
                                <img :src="user.userPhotoUrl || '/nophoto.png'" alt="avatar" class="ava"/>
                                {{ displayName }}
                                <v-icon>mdi-menu-down</v-icon>
                            </div>
                        </v-btn>
                    </template>
                    <v-list>
                        <router-link tag="span" to="/editProfile">
                            <v-list-item @click="() => true" v-if="isEmployee">
                                <v-list-item-title>Редактирование профиля</v-list-item-title>
                            </v-list-item>
                        </router-link>
                        <router-link tag="span" to="/logout">
                            <v-list-item @click="() => true">
                                <v-list-item-title>Выход</v-list-item-title>
                            </v-list-item>
                        </router-link>
                    </v-list>
                </v-menu>
            </span>
        </span>
  </v-app-bar>
</template>

<script lang="ts">
import {Component, Mixins} from "vue-property-decorator";
import SecurityMixin from "@/security/SecurityMixin";

@Component
export default class Header extends Mixins(SecurityMixin) {
  get displayName(): string {
    return !!this.user && this.user.name || 'Неизвестно';
  }
}

</script>

<style scoped>
.myTitle {
  font-size: 20pt;
}

.right {
  margin-left: auto;
}

.ava {
  width: 40px;
  height: 40px;
  border-radius: 100%;
  display: inline;
  vertical-align: middle;
  margin: 4px;
}
</style>
