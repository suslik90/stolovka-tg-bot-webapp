<template>
  <v-card width="360px" class="menu-item-card pa-3 pb-0 mt-5">
    <v-img
      :src="imageString"
      height="142px"
      class="menu-item-card__image"
      cover
    ></v-img>

    <v-card-title class="menu-item-card__title px-0">
      {{ menuItem.name }}
    </v-card-title>

    <v-card-text class="menu-item-card__text px-0">
      {{ menuItem.description }}
    </v-card-text>
    <v-card-actions
      class="menu-item-card__actions d-flex justify-space-between px-0"
    >
      <div class="menu-item-card__actions__price">{{ $filters.numberFormat(menuItem.price,[2, " "]) }} ₽</div>
      <div class="menu-item-card__actions__buttons">
        <v-btn
          v-if="countInBasket(menuItem.name) == 0"
          class="menu-item-card__actions__buttons__add primary-btn rounded-btn text-none"
          @click="addToBasket"
          >Добавить</v-btn
        >
        <MenuItemCounter :menuItem="menuItem" v-else></MenuItemCounter>
      </div>
    </v-card-actions>
  </v-card>
</template>

<script>
  import MenuItemCounter from "./MenuItemCounter.vue";
  import CartItem from "./CartItem.vue";
  import { useMainStore } from "../stores/main";

  export default {
    props: {
      menuItem: {
        name: String,
        description: String,
        price: Number,
        image: String,
      },
    },
    components: { MenuItemCounter },
    setup(props) {
      const mainStore = useMainStore();

      const propsImage = props.menuItem?.image;
      const imageString =
        propsImage.length > 0 ? "data:image/png;base64," + propsImage : "";

      function addToBasket() {
        mainStore.addToBasket(props.menuItem);
      }

      function removeFromBasket() {
        mainStore.removeFromBasket(props.menuItem);
      }

      return {
        addToBasket,
        removeFromBasket,
        imageString,
        countInBasket: mainStore.countInBasket,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .menu-item-card {
    border-radius: var(--border-radius-btn);
    margin: 0 auto;
    background-color: var(--background-color-white);

    &__image {
      border-radius: 15px;
    }
    &__title {
      font-weight: 600;
      color: var(--menu-item-color);
      white-space: normal !important;
      line-height: initial !important;
    }
    &__text {
      font-weight: 400;
      color: var(--menu-item-color);
    }
    &__actions {
      &__price {
        color: var(--primary-color);
        font-size: 20px;
        font-weight: 600;
      }
      &__buttons {
        &__add {
          width: 160px;
          font-size: 20px;
          font-weight: 600;
        }
      }
    }
  }
</style>