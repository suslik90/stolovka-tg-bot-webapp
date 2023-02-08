<template>
  <custom-toolbar>
    <v-btn icon to="/">
      <v-icon>mdi-arrow-left</v-icon>
    </v-btn>
    <v-toolbar-title>Оформление заказа</v-toolbar-title>
    <v-spacer></v-spacer>
  </custom-toolbar>
  <v-card v-if="mainStore.basket.length > 0" elevation="5" class="px-8 pt-4">
    <div class="order">
      <h2>Заказ:</h2>
      <v-list>
        <v-list-item v-for="basketItem in mainStore.basket">
          <v-list-item-title>
            {{ basketItem.name }}
          </v-list-item-title>
          <template v-slot:append>
            <v-btn variant="plain" icon @click="removeFromBasket(basketItem)"
              ><v-icon>mdi-minus</v-icon></v-btn
            >
            <div class="meal-count">
              {{ mainStore.countInBasket(basketItem.name) }}
            </div>
            <v-btn variant="plain" icon @click="addToBasket(basketItem)"
              ><v-icon>mdi-plus</v-icon></v-btn
            >
            <div class="meal-total-price d-flex justify-end ml-4">
              {{ basketItem.totalPrice }}р
            </div>
            <v-btn
              variant="plain"
              icon
              @click="removeForceFromBasket(basketItem)"
              ><v-icon color="error">mdi-close</v-icon></v-btn
            >
          </template>
        </v-list-item>
        <v-divider class="mb-2"></v-divider>
      </v-list>
    </div>
    <div class="delivery">
      <h2>Доставка:</h2>
      <v-row>
        <v-col>
          <v-form>
            <v-text-field
              v-model="orderForm.street"
              placeholder="Улица и дом"
              bg-color="white"
              :error-messages="v$.street.$errors.map((e) => e.$message)"
              required
            ></v-text-field>
            <v-text-field
              v-model="orderForm.apartment"
              placeholder="№ квартиры/офиса"
              bg-color="white"
              :error-messages="v$.apartment.$errors.map((e) => e.$message)"
              required
            ></v-text-field>
            <v-text-field
              v-model="orderForm.entrance"
              placeholder="Подъезд"
              bg-color="white"
              required
            ></v-text-field>
            <v-text-field
              v-model="orderForm.level"
              placeholder="Этаж"
              bg-color="white"
              required
            ></v-text-field>
            <v-text-field
              v-model="orderForm.name"
              placeholder="Имя"
              bg-color="white"
              :error-messages="v$.name.$errors.map((e) => e.$message)"
              required
            ></v-text-field>
            <v-text-field
              v-model="orderForm.phone"
              placeholder="Телефон"
              bg-color="white"
              :error-messages="v$.phone.$errors.map((e) => e.$message)"
              required
            ></v-text-field>
            <input
              class="d-none"
              v-maska
              data-maska="+7(###)-###-##-##"
              type="text"
              v-model="orderForm.phone"
            />
            <v-text-field
              v-model="orderForm.email"
              placeholder="Email"
              bg-color="white"
              :error-messages="v$.email.$errors.map((e) => e.$message)"
              required
            ></v-text-field>
            <v-textarea
              v-model="orderForm.comment"
              placeholder="Комментарий курьеру"
              bg-color="white"
            ></v-textarea>
          </v-form>
        </v-col>
      </v-row>
    </div>
    <v-divider class="mb-2"></v-divider>
    <div class="payment">
      <h2>Оплата:</h2>
      <v-radio-group inline :model-value="orderForm.payment">
        <v-radio label="Наличные" value="cash"></v-radio>
        <v-radio label="Онлайн" value="online"></v-radio>
      </v-radio-group>
    </div>
    <v-divider class="mb-2"></v-divider>
    <div class="order-total d-flex justify-space-between mb-8">
      <div class="label">Итого:</div>
      <div class="amount">{{ mainStore.totalOrderPrice }}р</div>
    </div>
    <div class="d-flex justify-center mb-10">
      <v-btn size="large" block @click="send">Заказать</v-btn>
    </div>
  </v-card>
  <div
    v-else
    class="d-flex align-center justify-center height-with-toolbar text-center"
  >
    Вы ничего не положили в корзину...<br />
    Не голодны?
  </div>
</template>

<script setup>
  import { useMainStore } from "../stores/main";
  import CustomToolbar from "../components/CustomToolbar.vue";
  import { inject, ref, reactive } from "vue";
  import { API_URL } from "../utils/constants";
  import { useVuelidate } from "@vuelidate/core";
  import { helpers, required, email, minLength } from "@vuelidate/validators";
  import { useRouter } from "vue-router";

  const axios = inject("axios");

  const mainStore = useMainStore();
  const router = useRouter();

  const errorMessages = {
    required: "Поле должно быть заполнено",
    noValidEmail: "Некорректно указан email",
    badPhone: "Некорректно указан контактный телефон",
  };

  let orderForm = reactive({
    street: "",
    apartment: "",
    entrance: "",
    level: "",
    name: "",
    phone: "",
    email: "",
    comment: "",
    payment: "cash",
  });
  const rules = {
    street: { required: helpers.withMessage(errorMessages.required, required) },
    apartment: {
      required: helpers.withMessage(errorMessages.required, required),
    },
    name: { required: helpers.withMessage(errorMessages.required, required) },
    phone: {
      required: helpers.withMessage(errorMessages.required, required),
      minLength: helpers.withMessage(errorMessages.badPhone, minLength(17)),
    },
    email: {
      required: helpers.withMessage(errorMessages.required, required),
      email: helpers.withMessage(errorMessages.noValidEmail, email),
    },
  };

  let v$ = useVuelidate(rules, orderForm);

  function addToBasket(meal) {
    mainStore.addToBasket(meal);
  }

  function removeFromBasket(meal) {
    mainStore.removeFromBasket(meal);
  }

  function removeForceFromBasket(meal) {
    mainStore.removeForceFromBasket(meal);
  }

  function send() {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      axios
        .post(API_URL + "/order", {
          order: mainStore.basket,
          delivery: orderForm,
          orderTotalPrice: mainStore.totalOrderPrice,
        })
        .then(
          (response) => {
            mainStore.clearBasket();
            router.back();
          },
          (error) => {}
        );
    }
  }
</script>

<style lang="scss" scoped>
  .order-total {
    font-size: 26px;
  }
  .v-list-item-title {
    white-space: unset !important;
  }
  .meal-total-price {
    width: 70px;
  }
</style>