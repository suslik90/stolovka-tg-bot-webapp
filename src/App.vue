<template>
  <v-container fluid class="pa-0 pt-2">
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