<template>
  <v-container fluid class="pa-0">
    <RouterView />
  </v-container>
</template>

<script setup>
  import { RouterView, useRouter } from "vue-router";
  import { useTheme } from "vuetify";
  import { tg } from "@/utils/telegram-sdk";

  const theme = useTheme();
  const router = useRouter();

  const isProd = import.meta.env.PROD;

  if (isProd) {
    if (tg.initData.length === 0) {
      router.replace({ name: "forbidden" });
    }
  }

  tg.onEvent("themeChanged", function () {
    theme.global.name.value =
      theme.global.name.value == "customDarkTheme"
        ? "customLightTheme"
        : "customDarkTheme";
  });

  if (tg.colorScheme === "light") {
    theme.global.name.value = "customLightTheme";
  } else {
    theme.global.name.value = "customDarkTheme";
  }

  tg.BackButton.onClick(() => {
    router.back();
  });
</script>