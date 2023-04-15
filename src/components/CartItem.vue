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
  <div class="desktop-item d-flex align-center justify-center" v-else>
    <div class="d-flex justify-space-between align-center px-6 cart-item">
      <div class="cart-item__left d-flex">
        <div class="name">
          {{ menuItem.name }}
        </div>
        <div class="price">
          {{ $filters.numberFormat(menuItem.price, [2, " "]) }} ₽
        </div>
      </div>
      <div class="cart-item__right d-flex">
        <MenuItemCounter :menuItem="menuItem"></MenuItemCounter>
      </div>
    </div>
    <v-btn
      size="small"
      variant="flat"
      icon="mdi-close"
      class="toolbar-btn-icon-size primary-btn toolbar-btn ml-6"
      @click="removeForceFromBasket(item)"
    ></v-btn>
  </div>
</template>

<script setup>
  import MenuItemCounter from "@/components/MenuItemCounter.vue";
  import { useMainStore } from "@/stores/main";
  import { SwipeList, SwipeOut } from "vue-swipe-actions";
  import "vue-swipe-actions/src/styles/vue-swipe-actions.css";

  const props = defineProps({
    menuItem: {
      name: String,
      description: String,
      price: Number,
      image: String,
    },
    isMobile: Boolean,
  });

  const mainStore = useMainStore();

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
    justify-content: flex-end;
    font-size: 15px;
    font-weight: 700;
  }
  .slide-btn {
    background-color: rgb(var(--v-theme-primary));
    height: var(--input-height);
    border-radius: var(--border-radius-card-item);
    border-style: none;
  }
  .cart-item {
    height: var(--input-height);
    border-radius: var(--border-radius-card-item);
    background-color: rgb(var(--v-theme-background-white));
    width: calc(100% - 92px);
    min-width: 240px;

    &__left {
      width: 60%;
      flex-direction: column;

      .name {
        font-weight: 400;
        font-size: 15px;
        color: rgb(var(--v-theme-menu-item-color));
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .price {
        color: rgb(var(--v-theme-primary));
        font-size: 15px;
        font-weight: 400;
      }
    }
    &__right {
      width: 110px;
    }
  }
  .desktop-item {
    min-width: 360px;
    width: calc(100% - 40px);
    max-width: 554px;
  }
  .w-100 {
    width: 100% !important;
  }
</style>