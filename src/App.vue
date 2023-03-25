<template>
  <v-container fluid class="pa-0">
    <RouterView />
  </v-container>
</template>

<script setup>
  import { RouterView } from "vue-router";
  import { useTheme } from "vuetify";

  const theme = useTheme();

  // function changeTheme() {
  //   theme.global.name.value = theme.global.current.value.dark ? "light" : "dark";
  // }
</script>