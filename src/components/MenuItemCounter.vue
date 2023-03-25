<template>
  <div class="d-flex">
    <v-btn
      variant="flat"
      icon="mdi-minus"
      class="menu-item__actions__buttons__minus secondary-btn rounded-btn"
      @click="removeFromBasket"
    ></v-btn>
    <div class="menu-item__actions__buttons__count d-flex align-center">
      {{ countInBasket(menuItem.name) }}
    </div>
    <v-btn
      variant="flat"
      icon="mdi-plus"
      class="menu-item__actions__buttons__plus primary-btn rounded-btn ml-0"
      @click="addToBasket"
    ></v-btn>
  </div>
</template>

<script>
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
    setup(props) {
      const mainStore = useMainStore();

      function addToBasket() {
        mainStore.addToBasket(props.menuItem);
      }

      function removeFromBasket() {
        mainStore.removeFromBasket(props.menuItem);
      }

      return {
        addToBasket,
        removeFromBasket,
        countInBasket: mainStore.countInBasket,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .menu-item__actions {
    &__buttons {
      &__add {
        width: 160px;
        height: 31px;
        font-size: 16px;
        font-weight: 600;
        text-transform: none !important;
      }

      &__minus,
      &__plus {
        width: 31px;
        height: 31px;
      }
      &__count {
        font-size: 20px;
        font-weight: 600;
        padding: 0 10px;
      }
    }
  }
</style>