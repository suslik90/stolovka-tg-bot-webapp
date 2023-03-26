<template>
  <CustomToolbarNew class="px-5 pt-4">
    <template v-slot:title>Корзина</template>
    <template v-slot:actions>
      <v-btn
        variant="flat"
        icon="mdi-close"
        class="toolbar-btn-icon-size primary-btn toolbar-btn"
        @click="goBack"
      ></v-btn>
    </template>
  </CustomToolbarNew>
  <div
    class="order-title d-flex justify-space-between px-5 mt-5"
    v-if="mainStore.basket.length > 0"
  >
    <div
      class="d-flex align-center jystify-center title primary-btn rounded-btn"
    >
      Заказ:
    </div>
    <v-btn
      variant="flat"
      class="d-flex align-center jystify-center clear-basket secondary-btn rounded-btn text-none"
      @click="clearBasket"
    >
      Очистить корзину
    </v-btn>
  </div>
  <div v-if="mainStore.basket.length > 0">
    <div class="cart-list d-flex flex-column align-center pt-5 px-5">
      <CartItem
        v-for="basketItem in mainStore.basket"
        :menuItem="basketItem"
        class="mb-5"
      />
    </div>
    <div class="next-section d-flex justify-center">
      <BigButton @click="toDelivery"
        >Далее ({{
          $filters.numberFormat(mainStore.totalOrderPrice, [2, " "])
        }}
        ₽)</BigButton
      >
    </div>
  </div>
  <div v-else class="d-flex align-center justify-center basket-empty">
    Вы ничего не положили в корзину...<br />
    Не голодны?
  </div>
</template>

<script setup>
  import CustomToolbarNew from "../components/CustomToolbar.vue";
  import CartItem from "../components/CartItem.vue";
  import BigButton from "../components/BigButton.vue";
  import router from "../router";
  import { useMainStore } from "../stores/main";
  import { SwipeList, SwipeOut } from "vue-swipe-actions";
  import { tg } from "../utils/telegram-sdk";

  tg.BackButton.show();
  tg.BackButton.onClick(() => {
    goBack();
  });

  const mainStore = useMainStore();

  function goBack() {
    router.back();
  }

  function toDelivery() {
    router.push({ name: "delivery" });
  }

  function clearBasket() {
    mainStore.clearBasket();
  }
</script>

<style lang="scss">
  .order-title {
    height: 36px;
    width: 100%;

    .title,
    .clear-basket {
      font-size: 20px;
      font-weight: 700;
      padding: 0 10px;
    }
  }
  .slide-btn:last-child,
  .desktop-item:last-child {
    margin-bottom: 110px !important;
  }
  .next-section {
    width: 100%;
    position: fixed;
    bottom: 20px;
  }
  .basket-empty {
    color: rgb(var(--v-theme-head-title-color));
    height: 55vh;
    text-align: center;
    font-size: 18px;
    font-weight: 700;
  }
</style>