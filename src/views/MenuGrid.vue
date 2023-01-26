<template>
  <div class="mx-3">
    <custom-toolbar>
      <v-spacer></v-spacer>
      <div class="mr-3">
        <v-btn icon to="/basket">
          <v-badge
            v-if="basketStore.countAllInBasket > 0"
            :content="basketStore.countAllInBasket"
            color="error"
          >
            <v-icon large>mdi-cart-variant</v-icon>
          </v-badge>
          <v-icon large v-else>mdi-cart-variant</v-icon>
        </v-btn>
      </div>
    </custom-toolbar>
    <v-row>
      <v-col cols="6" v-for="(item, index) in menu.meals">
        <menu-item-card :meal="item" :key="index" />
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
  import { ref } from "vue";
  import { useBasketStore } from "../stores/basket";
  import MenuItemCard from "../components/MenuItemCard.vue";
  import CustomToolbar from "../components/CustomToolbar.vue";

  const basketStore = useBasketStore();

  const menu = ref({
    name: "Меню на 12.01.2023",
    meals: [
      {
        name: "Борщ",
        cost: 120.5,
      },
      {
        name: "Салат витаминный со всякими вкусными овощами будет, и заправлен жгучим соусом",
        cost: 84.34,
      },
      {
        name: "Хлеб",
        cost: 5.6,
      },
      {
        name: "Чай",
        cost: 25,
      },
      {
        name: "Пюре",
        cost: 50,
      },
      {
        name: "Мясо по-французски",
        cost: 130,
      },
      {
        name: "Гуляш",
        cost: 70,
      },
    ],
  });
</script>