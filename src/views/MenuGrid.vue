<template>
  <div class="mx-3">
    <div v-if="menuKeys > 0">
      <custom-toolbar>
        <v-spacer></v-spacer>
        <div class="mr-3">
          <v-btn icon to="/basket">
            <v-badge
              v-if="mainStore.countAllInBasket > 0"
              :content="mainStore.countAllInBasket"
              color="error"
            >
              <v-icon large>mdi-cart-variant</v-icon>
            </v-badge>
            <v-icon large v-else>mdi-cart-variant</v-icon>
          </v-btn>
        </div>
      </custom-toolbar>
      <v-row>
        <v-col cols="6" v-for="(item, index) in mainStore.menu.meals">
          <menu-item-card :meal="item" :key="index" />
        </v-col>
      </v-row>
    </div>
    <div
      class="d-flex align-center height-with-toolbar justify-center text-center"
      v-else
    >
      <v-progress-circular
        indeterminate
        :size="125"
        v-if="menuKeys == 0 && isLoading"
      ></v-progress-circular>
      <p v-else>На сегодня мы не смогли разместить меню :(</p>
    </div>
  </div>
</template>

<script setup>
  import { ref, inject, computed } from "vue";
  import { useMainStore } from "../stores/main";
  import MenuItemCard from "../components/MenuItemCard.vue";
  import CustomToolbar from "../components/CustomToolbar.vue";
  import { API_URL } from "../utils/constants";

  const axios = inject("axios");

  let mainStore = useMainStore();
  let isLoading = ref(true);
  const menuKeys = computed(() => Object.keys(mainStore.menu).length);

  if (menuKeys.value == 0) {
    axios.get(API_URL + "/menu").then(
      (response) => {
        mainStore.setMenu(response.data);
        isLoading.value = false;
      },
      (error) => {}
    );
  }
</script>