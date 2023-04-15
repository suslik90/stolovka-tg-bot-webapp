<template>
  <div class="wrapper details-view">
    <div class="item-image" >
      <v-img :src="menuItem?.binaryUrl" alt="" min-height="100">
        <template v-slot:placeholder>
          <v-row class="fill-height ma-0 align-center justify-center">
            <v-progress-circular
              indeterminate
              color="primary"
              :size="60"
              :width="3"
            ></v-progress-circular>
          </v-row>
        </template>
      </v-img>
      <div class="item-mark item-mark__cold" v-if="false"></div>
    </div>
    <div class="item-name">{{ menuItem.name }}</div>
    <div class="item-description">{{ menuItem.description }}</div>
    <div class="item-order">
      <div class="item-order__amount">
        {{ $filters.numberFormat(menuItem.price, [0, " "]) }}₽
      </div>
      <div class="item-order__btns" v-if="countInBasket(menuItem.name) > 0">
        <div
          class="item-order__minus"
          v-ripple
          @click="removeFromBasket(menuItem)"
        >
          <svg
            width="13"
            height="2"
            viewBox="0 0 12 2"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M1 1L11 1"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
        <div class="item-order__count">{{ countInBasket(menuItem.name) }}</div>
        <div class="item-order__plus" v-ripple @click="addToBasket(menuItem)">
          <svg
            width="13"
            height="13"
            viewBox="0 0 12 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 1V11M1 6H11"
              stroke-linecap="round"
              stroke-linejoin="round"
            />
          </svg>
        </div>
      </div>
      <div
        class="item-order-add-btn"
        v-else
        v-ripple
        @click="addToBasket(menuItem)"
      >
        Добавить
      </div>
    </div>
    <div v-if="showDetails">
      <div class="item-order-title">Выберите размер порции:</div>
      <div class="item-type item-type-curent">
        <div class="item-type__name">Средняя 0.5 л</div>
        <div class="item-type__price">150.00 ₽</div>
      </div>
      <div class="item-type">
        <div class="item-type__name">Большая 1 л</div>
        <div class="item-type__price">200.00 ₽</div>
      </div>
      <div class="item-order-title">Дополнительно:</div>
      <div class="item-type">
        <div class="item-type__name">Стаканы 0.25</div>
        <div class="item-type__price">+5.00 ₽</div>
      </div>
      <div class="item-type">
        <div class="item-type__name">Ложки 1 шт.</div>
        <div class="item-type__price">+2.00 ₽</div>
      </div>
    </div>
  </div>
</template>

<script setup>
  import { useMainStore } from "@/stores/main";
  import { useRoute, useRouter } from "vue-router";
  import { tg } from "@/utils/telegram-sdk";

  tg.BackButton.show();
  tg.BackButton.onClick(() => {
    goBack();
  });

  const route = useRoute();
  const router = useRouter();

  const mainStore = useMainStore();

  let menuItem = mainStore.getItemByKey(route.params.key);

  if(menuItem == undefined){
    goBack();
  }

  let itemImageStyle = menuItem != undefined
      ? `background-image: url("${menuItem.binaryUrl}");background-size: contain;`
      : "";

  const showDetails = false;

  function addToBasket(_menuItem) {
    mainStore.addToBasket(_menuItem);
  }

  function removeFromBasket(_menuItem) {
    mainStore.removeFromBasket(_menuItem);
  }

  function goBack() {
    router.back();
  }

  let countInBasket = mainStore.countInBasket;
</script>

<style lang="scss" scoped>
  @import "@/assets/width.scss";
  /*Страница товара*/

  .details-view{
   .item-image {
    position: relative;
    max-width: 250px;    
    width: 100%;
    margin: auto auto 12px auto;
    // border-radius: 15px;
    // overflow: hidden;
    .v-img, img {
      width: 100%;
      border-radius: 15px;
    }
  }
  .item-mark {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: rgb(var(--v-theme-primary)) !important;
    width: 38.5px;
    height: 33px;
    border-radius: 28px;
    flex: none;
    z-index: 10;
  }
  .item-mark__cold {
    background: url("/img/cold.svg") no-repeat center/21px;
  }
  .item-name {
    font-size: 20px;
    font-weight: 700;
    color: rgb(var(--v-theme-head-title-color));
  }
  .item-description {
    font-size: 15px;
    font-weight: 400;
    line-height: 18.15px;
    color: rgb(var(--v-theme-head-title-color));
    margin: 12px 0 22px 0;
  }
  .item-order {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
  .item-order__amount {
    font-size: 20px;
    font-weight: 600;
    color: rgb(var(--v-theme-primary));
  }
  .item-order-add-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 160px;
    width: 100%;
    height: 31px;
    font-size: 20px;
    font-weight: 600;
    color: rgb(var(--v-theme-white));
    background: rgb(var(--v-theme-primary));
    border-radius: 28px;
  }
  .item-order__btns {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-column-gap: 20px;
  }
  .item-order__count {
    font-weight: 600;
    font-size: 20px;
    color: rgb(var(--v-theme-head-title-color));
  }
  .item-order__plus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background: rgb(var(--v-theme-primary));
    svg {
      stroke: rgb(var(--v-theme-white));
    }
  }
  .item-order__minus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 31px;
    height: 31px;
    border-radius: 50%;
    background: rgb(var(--v-theme-btn-minus-background));
    svg {
      stroke: rgb(var(--v-theme-btn-minus-color));
    }
  }
  .item-order-title {
    position: relative;
    font-size: 15px;
    font-weight: 400;
    color: rgb(var(--v-theme-white));
    margin: 36px 0 14px 0;
    &:before {
      position: absolute;
      top: -13px;
      content: "";
      width: 100%;
      height: 2px;
      background: rgb(var(--v-theme-white));
    }
  }
  .item-type {
    display: flex;
    align-items: center;
    justify-content: space-between;
    color: rgb(var(--v-theme-white));
    font-size: 15px;
    font-weight: 600;
    padding: 7px 16px;
    border-radius: 28px;
    background: rgba(var(--v-theme-primary), 0.25);
    margin-bottom: 14px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .item-type-curent {
    background: rgb(var(--v-theme-primary));
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
  }
}
</style>