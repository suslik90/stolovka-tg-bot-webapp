<template>
  <div class="slide-btn w-100" v-if="isMobile">
    <swipe-list ref="list" class="card" :items="[[menuItem]]" item-key="id">
      <template
        v-slot="{
          item,
          index,
          revealLeft,
          revealRight,
          close,
          revealed,
          disabled,
        }"
      >
        <div ref="content" class="card-content">
          <div
            class="d-flex justify-space-between justify-center align-center px-3 cart-item w-100"
          >
            <div class="cart-item__left pl-3">
              <div class="name">
                {{ menuItem.name.substring(0, 42) }}
              </div>
              <div class="price">{{ menuItem.price }} ₽</div>
            </div>
            <div class="cart-item__right">
              <MenuItemCounter :menuItem="menuItem"></MenuItemCounter>
            </div>
          </div>
        </div>
      </template>
      <template v-slot:right="{ item, close }">
        <div
          class="swipeout-action px-5"
          @click="removeForceFromBasket(menuItem)"
        >
          Удалить
        </div>
      </template>
    </swipe-list>
  </div>
  <div class="desktop-item d-flex align-center justify-center px-5" v-else>
    <div
      class="d-flex justify-space-between justify-center align-center px-3 cart-item"
    >
      <div class="cart-item__left pl-3">
        <div class="name">
          {{ menuItem.name }}
        </div>
        <div class="price">{{ menuItem.price }} ₽</div>
      </div>
      <div class="cart-item__right">
        <MenuItemCounter :menuItem="menuItem"></MenuItemCounter>
      </div>
    </div>
    <v-btn
      variant="flat"
      icon="mdi-close"
      class="toolbar-btn-icon-size primary-btn toolbar-btn ml-6"
      @click="removeForceFromBasket(item)"
    ></v-btn>
  </div>
</template>

<script setup>
  import MenuItemCounter from "./MenuItemCounter.vue";
  import { useMainStore } from "../stores/main";
  import { tg } from "../utils/telegram-sdk";
  import { SwipeList, SwipeOut } from "vue-swipe-actions";
  import "vue-swipe-actions/src/styles/vue-swipe-actions.css";

  const props = defineProps({
    menuItem: {
      name: String,
      description: String,
      price: Number,
      image: String,
    },
  });

  const mainStore = useMainStore();
  const mobilePlatforms = ["android", "ios"];

  const isMobile = mobilePlatforms.includes(tg.platform.toLowerCase()) ? true : false;

  function removeForceFromBasket(_item) {
    mainStore.removeForceFromBasket(props.menuItem);
  }
</script>

<style lang="scss">
  .swipeout-list-item {
    border-radius: var(--border-radius-card-item);
  }
  .swipeout-action {
    color: rgb(var(--v-theme-font-color-over-primary));
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  .slide-btn {
    background-color: rgb(var(--v-theme-primary));
    height: var(--input-height);
    border-radius: 32px;
    border-style: none;
  }
  .cart-item {
    height: var(--input-height);
    border-radius: var(--border-radius-card-item);
    background-color: rgb(var(--v-theme-background-white));
    width: calc(100% - 70px);
    min-width: 300px;

    &__left {
      width: 66%;

      .name {
        font-weight: 400;
        font-size: 15px;
        color: rgb(var(--v-theme-menu-item-color));
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        color: rgb(var(--v-theme-menu-item-color));
        font-size: 15px;
        font-weight: 600;
      }
    }
    &__right {
    }
  }
  .desktop-item {
    min-width: 360px;
    width: 80%;
    max-width: 554px;
  }
  .w-100 {
    width: 100% !important;
  }
</style>