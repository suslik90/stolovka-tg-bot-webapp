<template>
  <v-container fluid class="pa-0">
    <RouterView />
  </v-container>
</template>

<script setup>
  import { RouterView } from "vue-router";
  import { useTheme } from "vuetify";
  import { tg } from "@/utils/telegram-sdk";

  const theme = useTheme();

  tg.onEvent("themeChanged", function () {
    theme.global.name.value = theme.global.name.value == "customDarkTheme"
      ? "customLightTheme"
      : "customDarkTheme";
  });

  if (tg.colorScheme === "light") {
    theme.global.name.value = "customLightTheme";    
  } else {
    theme.global.name.value = "customDarkTheme";
  }
</script>