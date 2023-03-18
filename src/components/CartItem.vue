<template>
  <div class="slide-btn" v-if="isMobile">
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
  <div class="desktop-item d-flex align-center px-5  w-100" v-else>
    <div
      class="d-flex justify-space-between justify-center align-center px-3 cart-item w-100"
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
      icon="mdi-close"
      class="toolbar-btn-icon-size primary-btn toolbar-btn ml-6"
      @click="removeForceFromBasket(item)"
    ></v-btn>
  </div>
</template>

<script setup>
  import MenuItemCounter from "./MenuItemCounter.vue";
  import { defineProps } from "vue";
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
  const mobilePlatforms = ['android','ios'];

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
    color: var(--font-color-over-primary);
    display: flex;
    align-items: center;
    font-size: 20px;
    font-weight: 700;
  }
  .slide-btn {
    background-color: var(--primary-color);
    height: var(--input-height);
    border-radius: 30px var(--border-radius-card-item)
      var(--border-radius-card-item) 30px;
    border-style: none;
    width: 373px;
  }
  .cart-item {
    height: var(--input-height);
    border-radius: var(--border-radius-card-item);
    background-color: var(--background-color-white);
    width: 373px;

    &__left {
      width: 66%;

      .name {
        font-weight: 400;
        font-size: 15px;
        color: var(--menu-item-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        color: var(--primary-color);
        font-size: 15px;
        font-weight: 600; //
      }
    }
    &__right {
    }
  }
  .w-100{
    width:100% !important;
  }
</style>