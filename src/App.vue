<template>
  <v-container fluid class="pa-0">
    <RouterView />
  </v-container>
</template>

<script setup>
  import { RouterView, useRouter } from "vue-router";
  import { useTheme } from "vuetify";
  import { tg } from "@/utils/telegram-sdk";
  import { useMainStore } from "@/stores/main";
  import { CUSTOM_THEMES } from "@/utils/constants";

  const theme = useTheme();
  const router = useRouter();
  const mainStore = useMainStore();

  const mobilePlatforms = ["android", "ios"];

  const isMobile = mobilePlatforms.includes(tg.platform.toLowerCase())
    ? true
    : false;
  mainStore.setMobile(isMobile);

  tg.onEvent("themeChanged", function () {
    theme.global.name.value =
      theme.global.name.value == CUSTOM_THEMES.DARK
        ? CUSTOM_THEMES.LIGHT
        : CUSTOM_THEMES.DARK;
  });

  if (tg.colorScheme === "light") {
    theme.global.name.value = CUSTOM_THEMES.LIGHT;
  } else {
    theme.global.name.value = CUSTOM_THEMES.DARK;
  }

  tg.BackButton.onClick(() => {
    router.back();
  });
</script>