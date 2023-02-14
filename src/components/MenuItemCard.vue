<template>
  <v-card class="mx-auto" max-width="344">
    <v-img v-if="imageString.length" :src="imageString" cover></v-img>
    <div v-else class="d-flex align-center justify-center image-content">
      <v-icon class="image-off">mdi-image-off-outline</v-icon>
    </div>

    <v-card-title class="d-flex justify-center"> {{ meal.name }} </v-card-title>

    <v-card-subtitle class="d-flex justify-center">
      {{ meal.price }}р
    </v-card-subtitle>
    <v-card-actions class="justify-center">
      <template v-if="countInBasket(meal.name) == 0">
        <v-btn class="mt-2 mb-1" variant="outlined" @click="addToBasket">
          Добавить
        </v-btn>
      </template>
      <template v-else>
        <v-btn variant="plain" icon @click="removeFromBasket"
          ><v-icon>mdi-minus</v-icon></v-btn
        >
        <div class="meal-count">{{ countInBasket(meal.name) }}</div>
        <v-btn variant="plain" icon @click="addToBasket"
          ><v-icon>mdi-plus</v-icon></v-btn
        >
      </template>
    </v-card-actions>
  </v-card>
</template>

<script>
  import { useMainStore } from "../stores/main";
  export default {
    props: {
      meal: {
        name: String,
        price: Number,
        image: String,
      },
    },
    setup(props) {
      const mainStore = useMainStore();

      function addToBasket() {
        mainStore.addToBasket(props.meal);
      }

      function removeFromBasket() {
        mainStore.removeFromBasket(props.meal);
      }

      const propsImage = props.meal?.image;
      const imageString =
        propsImage.length > 0 ? "data:image/png;base64," + propsImage : "";

      return {
        addToBasket,
        removeFromBasket,
        countInBasket: mainStore.countInBasket,
        imageString,
      };
    },
  };
</script>

<style lang="scss" scoped>
  .image-content {
    height: 200px;
  }
  .image-off {
    font-size: 4rem;
  }
  .v-card-title {
    line-height: inherit !important;
    font-size: 0.9rem !important;
    letter-spacing: inherit !important;
    white-space: normal !important;
  }
  .v-card-actions {
    .v-btn {
      margin-inline-start: 0 !important;
    }
    .meal-count {
      margin-inline: 1em;
    }
  }
</style>