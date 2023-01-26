<template>
  <v-card class="mx-auto" max-width="344">
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/sunshine.jpg"
      height="200px"
      cover
    ></v-img>

    <v-card-title class="d-flex justify-center"> {{ meal.name }} </v-card-title>

    <v-card-subtitle class="d-flex justify-center">
      {{ meal.cost }}р
    </v-card-subtitle>
    <v-card-actions class="justify-center">
      <template v-if="countInBasket(meal.name) == 0">
        <v-btn class="mt-2 mb-1" variant="outlined" @click="addToBasket"> Добавить </v-btn>
      </template>
      <template v-else>
        <v-btn variant="plain" icon @click="removeFromBasket"><v-icon>mdi-minus</v-icon></v-btn>
        <div class="meal-count">{{ countInBasket(meal.name) }}</div>
        <v-btn variant="plain" icon @click="addToBasket"><v-icon>mdi-plus</v-icon></v-btn>
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { useBasketStore } from "../stores/basket";
  export default {
    props: {
      meal: {
        name: String,
        cost: Number,
      },
    },
    setup(props) {
      const basketStore = useBasketStore();

      function addToBasket() {
        basketStore.addToBasket(props.meal);
      }

      function removeFromBasket() {
        basketStore.removeFromBasket(props.meal);
      }

      return {
        addToBasket,
        removeFromBasket,
        countInBasket: basketStore.countInBasket,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .v-card-actions {
    .v-btn {
      margin-inline-start: 0 !important;
    }
    .meal-count {
      margin-inline: 1em;
    }
  }
</style>