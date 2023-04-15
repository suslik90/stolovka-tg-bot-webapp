<template>
  <div class="item-card">
    <div
      class="item-image"
      :style="itemImageStyle"
      @click="goToDetails(menuItem.key)"
    >
      <!-- <div class="item-mark item-mark__cold"></div> -->
      <div class="add-to-cart" v-show="countInBasket(menuItem.name) > 0">
        {{ countInBasket(menuItem.name) }}
      </div>
    </div>
    <div class="item-name">{{ menuItem.name }}</div>
    <div
      class="item-order-btn"
      v-ripple
      v-if="countInBasket(menuItem.name) > 0"
    >
      <div class="item-order-btn__plus" @click="removeFromBasket">
        <svg
          width="13"
          height="3"
          viewBox="0 0 12 2"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M1 1L11 1" stroke-linecap="round" stroke-linejoin="round" />
        </svg>
      </div>
      {{ $filters.numberFormat(menuItem.price, [0, " "]) }} ₽
      <div class="item-order-btn__minus" @click="addToBasket">
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
    <div class="item-order-btn" v-ripple v-else @click="addToBasket">
      <div class="item-order-btn__plus"></div>
      {{ $filters.numberFormat(menuItem.price, [0, " "]) }} ₽
      <div class="item-order-btn__minus"></div>
    </div>
  </div>
</template>

<script>
  import MenuItemCounter from "@/components/MenuItemCounter.vue";
  import { useMainStore } from "@/stores/main";
  import router from "@/router";

  export default {
    props: {
      menuItem: {
        name: String,
        description: String,
        price: Number,
        image: String,
        binaryUrl: String,
        count: Number,
      },
    },
    components: { MenuItemCounter },
    setup(props) {
      const mainStore = useMainStore();

      const propsImage = props.menuItem?.image;
      let imageString =
        propsImage.length > 0 ? "data:image/png;base64," + propsImage : "";

      let itemImageStyle = `background-image: url("${props.menuItem?.binaryUrl}");`;

      function addToBasket() {
        mainStore.addToBasket(props.menuItem);
      }

      function removeFromBasket() {
        mainStore.removeFromBasket(props.menuItem);
      }

      function goToDetails(itemKey) {
        router.push({ path: `/${itemKey}/details` });
      }

      return {
        addToBasket,
        removeFromBasket,
        goToDetails,
        imageString,
        itemImageStyle,
        countInBasket: mainStore.countInBasket,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .item-card {
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    align-items: center;
    width: 100%;
    background: rgb(var(--v-theme-background-white));
    border-radius: 28px;
    padding: 8px 14px;
    box-sizing: border-box;
    margin-bottom: 15px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .item-image {
    position: relative;
    grid-row: 1 / span 2;
    grid-column: 1 / span 1;
    width: 150px;
    height: 150px;
    margin-right: 14px;
    border-radius: 15px;
    overflow: hidden;
    background-size: cover;
    background-position: center;
    img {
      width: 100%;
    }
  }
  .item-name {
    grid-row: 1 / span 1;
    grid-column: 2 / span 1;
    color: rgb(var(--v-theme-menu-item-color));
    font-size: 15px;
    font-weight: 600;
    line-height: 18.15px;
  }
  .item-order-btn {
    display: flex;
    align-items: center;
    justify-content: space-between;
    grid-row: 2 / span 1;
    grid-column: 2 / span 1;
    height: 35px;
    background: rgb(var(--v-theme-primary));
    text-align: center;
    color: rgb(var(--v-theme-white));
    border-radius: 28px;
    box-shadow: 0 4px 4px rgba(0, 0, 0, 0.25);
    font-weight: 400;
  }
  .item-order-btn__plus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-left: 9px;
    opacity: 1;
    pointer-events: auto;
    user-select: auto;
    svg {
      stroke: rgb(var(--v-theme-white));
    }
  }
  .item-order-btn__minus {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    margin-right: 9px;
    opacity: 1;
    pointer-events: auto;
    user-select: auto;
    svg {
      stroke: rgb(var(--v-theme-white));
    }
  }
  .add-to-cart {
    position: absolute;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: rgb(var(--v-theme-white));
    font-size: 70px;
    font-weight: 600;
    background: rgba(var(--v-theme-primary), 0.5);
  }
  .in-cart {
    .add-to-cart {
      display: flex;
    }
    .item-order-btn__plus {
      opacity: 1;
      pointer-events: auto;
      user-select: auto;
    }
    .item-order-btn__minus {
      opacity: 1;
      pointer-events: auto;
      user-select: auto;
    }
  }
  .item-mark {
    position: absolute;
    top: 5px;
    left: 5px;
    background-color: rgb(var(--v-theme-primary)) !important;
    width: 25px;
    height: 22px;
    border-radius: 28px;
    flex: none;
    z-index: 10;
  }
  .item-mark__cold {
    background: url("/img/cold.svg") no-repeat center/14px;
  }
</style>