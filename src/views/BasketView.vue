<template>
  <div class="wrapper">
    <div class="app-title">
      <div class="app-header__title">Корзина</div>
      <v-btn
        size="small"
        class="clear-cart-btn text-none primary-btn"
        @click="clearBasket"
        v-if="mainStore.countAllInBasket > 0"
        >Очистить корзину</v-btn
      >
    </div>
    <div class="cart-items-wrapper" v-if="mainStore.basket.length > 0"></div>
    <div v-else class="d-flex align-center justify-center basket-empty">
      Вы ничего не положили в корзину...<br />
      Не голодны?
    </div>
  </div>
  <div
    v-if="mainStore.basket.length > 0"
    class="cart-list d-flex flex-column align-center pt-5 pb-10"
    :class="{ 'px-5': isMobile }"
  >
    <CartItem
      v-for="basketItem in mainStore.basket"
      :menuItem="basketItem"
      :isMobile="isMobile"
      class="mb-5"
    />
  </div>
  <div class="footer" v-if="mainStore.countAllInBasket > 0">
    <BigButton @click="toDelivery"
      >Заказать за
      {{ $filters.numberFormat(mainStore.totalOrderPrice + DELIVERY_AMOUNT, [2, " "]) }}
      ₽</BigButton
    >
    <div class="delivery-price">Доставка {{ DELIVERY_AMOUNT }} ₽</div>
  </div>
</template>

<script setup>
  import BigButton from "@/components/BigButton.vue";
  import CartItem from "@/components/CartItem.vue";
  import { useRouter } from "vue-router";
  import { DELIVERY_AMOUNT } from "@/utils/constants";
  import { useMainStore } from "@/stores/main";
  import { tg } from "@/utils/telegram-sdk";

  if (!tg.BackButton.isVisible) tg.BackButton.show();

  const router = useRouter();

  const mainStore = useMainStore();

  const isMobile = mainStore.getMobile;

  function toDelivery() {
    router.push({ name: "delivery" });
  }

  function clearBasket() {
    mainStore.clearBasket();
  }
</script>

<style lang="scss">
  @import "@/assets/width.scss";

  .slide-btn:last-child,
  .desktop-item:last-child {
    margin-bottom: 110px !important;
  }
  .cart-list {
    min-width: 340px;
    margin: 0 auto;
    max-width: var(--max-width);
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

  /*Страница корзна*/

  //title
  .app-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .app-header__title {
    font-size: 25px;
    font-weight: 700;
    color: rgb(var(--v-theme-head-title-color));
  }
  .clear-cart-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 31px !important;
    padding: 0 10px;
    background: rgb(var(--v-theme-primary));
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 28px;
    font-size: 15px !important;
    font-weight: 700;
    color: rgb(var(--v-theme-font-color-over-primary));
    letter-spacing: 0 !important;
  }
  //items

  .cart-items-wrapper {
    margin-top: 23px;
  }
  .cart-item {
    max-width: 100%;
    width: 100%;
    position: relative;
  }
  .cart-item__wrapper {
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgb(var(--v-theme-font-color-over-primary));
    height: 68px;
    box-sizing: border-box;
    margin-bottom: 21px;
    padding: 12px 24px;
    border-radius: 28px;
    transition: 0.3s ease-in-out;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .cart-item__deleted {
    position: relative;
    transform: translateX(-106px);
    .del-background {
      display: flex;
    }
  }
  .del-background {
    position: absolute;
    top: 0;
    right: -106px;
    display: none;
    align-items: center;
    justify-content: flex-end;
    font-weight: 700;
    font-size: 15px;
    color: rgb(var(--v-theme-font-color-over-primary));
    width: 130px;
    height: 68px;
    border-radius: 28px;
    z-index: -1;
    padding-right: 25px;
    background: rgb(var(--v-theme-primary));
  }
  .del-btn {
    display: none;
  }

  .cutlery {
    height: 50px;
  }
  .cart-item__name {
    font-weight: 400;
    font-size: 15px;
    color: rgb(var(--v-theme-menu-item-color));
    line-height: 18px;
  }
  .cart-item__price {
    margin-top: 3px;
    font-weight: 400;
    font-size: 15px;
    color: rgb(var(--v-theme-primary));
  }
  .cart-item__btns {
    max-width: 100px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-column-gap: 20px;
  }
  .cart-item__amount {
    font-weight: 500;
    font-size: 15px;
    color: rgb(var(--v-theme-menu-item-color));
  }
  .cart-item__plus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgb(var(--v-theme-primary));
    svg {
      stroke: rgb(var(--v-theme-font-color-over-primary));
    }
  }
  .cart-item__minus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: rgba(var(--v-theme-primary), 0.25);
    svg {
      stroke: rgb(var(--v-theme-primary));
    }
  }

  .order-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 90%;
    margin: auto;
    height: 50px;
    background: rgb(var(--v-theme-primary));
    font-size: 20px;
    color: rgb(var(--v-theme-font-color-over-primary));
    font-weight: 700;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 28px;
  }
  .delivery-price {
    font-weight: 700;
    font-size: 15px;
    color: rgb(var(--v-theme-head-title-color));
    text-align: center;
    margin-top: 10px;
  }
</style>