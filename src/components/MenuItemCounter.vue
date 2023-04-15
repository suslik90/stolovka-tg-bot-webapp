<template>
  <div class="menu-item-wrapper d-flex justify-space-between">
    <v-btn
      variant="flat"
      icon="mdi-minus"
      class="menu-item__actions__buttons__minus secondary-btn rounded-btn"
      @click="removeFromBasket"
    >
    </v-btn>
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
  import { useMainStore } from "@/stores/main";

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
  .menu-item-wrapper {
    width: 100%;
  }
  .menu-item__actions {
    &__buttons {
      &__minus,
      &__plus {
        width: 24px;
        height: 24px;
        font-size: 11px;
        display: flex;
        justify-content: center;
        align-items: center;
        padding-top: 2px;
      }
      &__minus {
        color: rgb(var(--v-theme-primary)) !important;
      }
      &__count {
        font-size: 15px;
        font-weight: 400;
        padding: 0 10px;
        color: rgb(var(--v-theme-menu-item-color));
      }
    }
  }
</style>