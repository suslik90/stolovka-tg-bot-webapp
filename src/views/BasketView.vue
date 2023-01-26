<template>
  <!-- <v-toolbar class="pt-3 px-2 toolbar__fixed">
    <v-btn icon to="/basket">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
    <v-spacer></v-spacer>    
  </v-toolbar> -->
  <custom-toolbar>
    <v-btn icon to="/">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-spacer></v-spacer>
  </custom-toolbar>
  <v-card v-if="basketStore.basket.length > 0" elevation="5">
    <v-list>
      <v-list-item v-for="basketItem in basketStore.basket">
        <v-list-item-title>
          {{ basketItem.name }}
        </v-list-item-title>
        <template v-slot:append>
          <v-btn variant="plain" icon @click="removeFromBasket(basketItem)"
            ><v-icon>mdi-minus</v-icon></v-btn
          >
          <div class="meal-count">
            {{ basketStore.countInBasket(basketItem.name) }}
          </div>
          <v-btn variant="plain" icon @click="addToBasket(basketItem)"
            ><v-icon>mdi-plus</v-icon></v-btn
          >
          <div class="meal-total-price d-flex justify-end ml-4">
            {{ basketItem.totalPrice }}р
          </div>
          <v-btn variant="plain" icon @click="removeForceFromBasket(basketItem)"
            ><v-icon color="error">mdi-close</v-icon></v-btn
          >
        </template>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="list-item-order-total">
        <v-list-item-title> К оплате: </v-list-item-title>
        <template v-slot:append>
          <div class="order-total">{{ basketStore.totalOrderPrice }}р</div>
        </template>
      </v-list-item>
    </v-list>
    <div class="order-total"></div>
  </v-card>
  <div
    v-else
    class="d-flex align-center justify-center empty-basket text-center"
  >
    Вы ничего не положили в корзину...<br />
    Не голодны?
  </div>
</template>

<script setup>
  import { useBasketStore } from "../stores/basket";
  import CustomToolbar from "../components/CustomToolbar.vue";

  const basketStore = useBasketStore();
   
  function addToBasket(meal) {
    basketStore.addToBasket(meal);
  }

  function removeFromBasket(meal) {
    basketStore.removeFromBasket(meal);
  }

  function removeForceFromBasket(meal) {
    basketStore.removeForceFromBasket(meal);
  }
</script>

<style lang="scss" scoped>
  .list-item-order-total {
    font-size: 22px;
  }
  .v-list-item-title {
    white-space: unset !important;
  }
  .meal-total-price {
    width: 70px;
  }
  .empty-basket {
    height: 100vw;
  }
</style>