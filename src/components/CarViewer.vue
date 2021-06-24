<template>
  <v-card
      class="mx-auto my-12"
      max-width="100%"
  >
    <template slot="progress">
      <v-progress-linear
          color="deep-purple"
          height="10"
          indeterminate
      ></v-progress-linear>
    </template>

      <v-carousel
          cycle
          height="300"
          tile
          v-if="car.photoFilenames"
      >
        <v-carousel-item
            v-for="(photo, i) in car.photoFilenames"
            :key="i"
            :src="`/api/downloadFile/car/${car.id}/${photo}`"
        />
      </v-carousel>

    <v-card-title>{{car.model}}</v-card-title>

    <v-card-text class="mt-0 mb-0">
      <div class="my-4 text-subtitle-1">
        Тариф: 400 рублей в час
      </div>
    </v-card-text>

    <v-card-actions>
      <v-btn
          color="deep-purple lighten-2"
          text
          @click="rent"
      >
        Арендовать
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import {Component, Prop, Vue} from 'vue-property-decorator';
import {CarModel} from "@/models/CarModel";

@Component
export default class CarViewer extends Vue {
  @Prop() private car!: CarModel;

  rent(): void {
    //
  }
}
</script>

<style scoped>

</style>
