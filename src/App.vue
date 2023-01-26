<template>
  <v-container fluid class="pa-0">    
    <RouterView />
  </v-container>
</template>

<script setup>
  import { RouterLink, RouterView } from "vue-router";
  import { useBasketStore } from "./stores/basket";
  import { useRoute } from "vue-router";

  const basketStore = useBasketStore();
</script>