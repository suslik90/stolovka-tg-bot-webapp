<template>
  <v-dialog v-model="showErrorDialog" max-width="380">
    <v-card>
      <v-card-text>
        К сожалению, мы не смогли принять заказ и уже разбираемся с этой
        проблемой.<br />
        Попробуйте оформить заказ позже или оформите заказ по телефону.
      </v-card-text>
      <v-card-actions class="justify-center">
        <v-btn variant="outlined" @click="closeErrorDialog()">Хорошо</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
  <CustomToolbarNew class="px-5 pt-4">
    <template v-slot:title>Доставка</template>
    <template v-slot:actions>
      <v-btn
        variant="flat"
        icon="mdi-close"
        class="toolbar-btn-icon-size primary-btn toolbar-btn"
        @click="goMain"
      ></v-btn>
    </template>
  </CustomToolbarNew>
  <div class="delivery-title d-flex justify-space-between px-5 mt-5">
    <div
      class="d-flex align-center jystify-center title primary-btn rounded-btn"
    >
      Адрес:
    </div>
    <v-btn
      variant="flat"
      class="d-flex align-center jystify-center go-back secondary-btn rounded-btn text-none"
      @click="goBack"
    >
      Вернуться назад
    </v-btn>
  </div>
  <div class="delivery-address d-flex flex-column justify-center px-5 mt-5">
    <DeliveryInput>
      <template v-slot:label>Город</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите город"
          v-model="orderForm.city"
          :error-messages="v$.city.$errors.map((e) => e.$message)"
          required
        ></v-text-field>
      </template>
    </DeliveryInput>
    <DeliveryInput>
      <template v-slot:label>Улица и дом</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите улицу и дом"
          v-model="orderForm.street"
          :error-messages="v$.street.$errors.map((e) => e.$message)"
          required
        ></v-text-field>
      </template>
    </DeliveryInput>
    <DeliveryInput>
      <template v-slot:label>Квартира/офис</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите квартиру/офис"
          v-model="orderForm.apartment"
          :error-messages="v$.apartment.$errors.map((e) => e.$message)"
          required
        ></v-text-field>
      </template>
    </DeliveryInput>
    <DeliveryInput>
      <template v-slot:label>Подъезд</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите номер подъезда"
          v-model="orderForm.entrance"
          required
        ></v-text-field>
      </template>
    </DeliveryInput>
    <DeliveryInput>
      <template v-slot:label>Этаж</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите этаж"
          v-model="orderForm.level"
        ></v-text-field>
      </template>
    </DeliveryInput>
    <DeliveryInput>
      <template v-slot:label>ФИО</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите ФИО"
          v-model="orderForm.name"
          :error-messages="v$.name.$errors.map((e) => e.$message)"
        ></v-text-field>
      </template>
    </DeliveryInput>
    <DeliveryInput>
      <template v-slot:label>Телефон</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите телефон"
          v-model="orderForm.phone"
          :error-messages="v$.phone.$errors.map((e) => e.$message)"
        ></v-text-field>
        <input
          class="d-none"
          v-maska
          data-maska="+7(###)-###-##-##"
          type="text"
          v-model="orderForm.phone"
        />
      </template>
    </DeliveryInput>
    <DeliveryInput>
      <template v-slot:label>Email</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите электронную почту"
          v-model="orderForm.email"
          :error-messages="v$.email.$errors.map((e) => e.$message)"
          required
        ></v-text-field>
      </template>
    </DeliveryInput>
    <DeliveryInput>
      <template v-slot:label>Комментарий</template>
      <template v-slot:input
        ><v-text-field
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Введите комментарий к заказу"
          v-model="orderForm.comment"
        ></v-text-field>
      </template>
    </DeliveryInput>
  </div>
  <div class="delivery-title d-flex px-5 mt-5">
    <div
      class="d-flex align-center jystify-center title primary-btn rounded-btn"
    >
      Оплата:
    </div>
  </div>
  <div class="delivery-payment px-5 mt-5">
    <v-radio-group inline v-model="orderForm.payment">
      <v-radio label="Наличные" value="cash"></v-radio>
      <v-radio label="Онлайн" value="online"></v-radio>
    </v-radio-group>
    <div class="hitback d-flex" v-if="orderForm.payment === 'cash'">
      <v-radio label="Сдача" v-model="orderForm.hitBack" :value="true" />
      <div class="hitback__input-wrapper rounded-btn ml-4">
        <v-text-field
          type="number"
          class="hitback__input-wrapper__input pl-4"
          density="compact"
          hide-details="auto"
          variant="plain"
          placeholder="Выдать сдачу с"
          v-model.trim.number="orderForm.hitBackSum"
        ></v-text-field>
      </div>
    </div>
  </div>
  <div class="delivery-total d-flex px-5 mt-5">
    <div
      class="d-flex align-center jystify-center title primary-btn rounded-btn px-5"
    >
      Итого:
    </div>
    <div class="d-flex align-center justify-center order-total ml-4">
      {{ $filters.numberFormat(mainStore.totalOrderPrice, [2, " "]) }} ₽
    </div>
  </div>
  <div class="delivery-action d-flex justify-center my-5 px-5">
    <BigButton @click="send">
      {{ orderForm.payment == "online" ? "Оплатить" : "Заказать" }}
    </BigButton>
  </div>
</template>

<script setup>
  import { useVuelidate } from "@vuelidate/core";
  import { email, helpers, minLength, required } from "@vuelidate/validators";
  import CustomToolbarNew from "../components/CustomToolbar.vue";
  import BigButton from "../components/BigButton.vue";
  import router from "../router";
  import DeliveryInput from "../components/DeliveryInput.vue";
  import { inject, computed, ref, reactive } from "vue";
  import { useMainStore } from "../stores/main";
  import { API_URL } from "../utils/constants";
  import { tg } from "../utils/telegram-sdk";

  const axios = inject("axios");

  const mainStore = useMainStore();

  const errorMessages = {
    required: "Поле должно быть заполнено",
    noValidEmail: "Некорректно указан email",
    badPhone: "Некорректно указан контактный телефон",
  };

  let orderForm = reactive({
    city: "",
    street: "",
    apartment: "",
    entrance: "",
    level: "",
    name: "",
    phone: "",
    email: "",
    comment: "",
    payment: "cash",
    hitBack: true,
  });
  const rules = {
    city: { required: helpers.withMessage(errorMessages.required, required) },
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

  let showErrorDialog = ref(false);

  let paymentIsCash = computed(() => {
    return orderForm.value.payment == "cash";
  });

  function goBack() {
    router.back();
  }
  function goMain() {
    router.replace("/");
  }

  function send() {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      axios
        .post(API_URL + "/order", {
          order: mainStore.basket,
          delivery: orderForm,
          orderTotalPrice: mainStore.totalOrderPrice,
          queryId: tg.initDataUnsafe?.query_id,
        })
        .then(
          (response) => {
            mainStore.clearBasket();
            goMain();
            tg.close();
          },
          (error) => {
            showErrorDialog.value = true;
          }
        )
        .catch((error) => {
          showErrorDialog.value = true;
        });
    }
  }
</script>

<style lang="scss">
  .delivery-title {
    height: 36px;
    width: 100%;

    .title,
    .go-back {
      font-size: 20px;
      font-weight: 700;
      padding: 0 10px;
    }
  }
  .delivery-address {
    width: 100%;
  }
  .delivery-payment {
    .v-selection-control__input {
      color: var(--primary-color);
    }
    .v-input {
      font-size: 20px;
    }
    .v-radio {
      .v-label {
        color: rgb(var(--v-theme-head-title-color));
        font-size: 20px;
        font-weight: 700;
        opacity: 1;
      }
    }

    .hitback {
      .v-selection-control {
        flex: inherit !important;
      }
      .v-radio {
        font-size: 20px;
      }
      &__input-wrapper {
        width: 175px;
        background-color: var(--background-color-white);
        font-size: 15px;
        font-style: italic;

        &__input input {
          padding-top: 8px !important;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
      }
    }
  }
  .delivery-total {
    margin-bottom: 150px;
    .title {
      font-size: 20px;
      font-weight: 700;
      padding: 0 10px;
    }

    .order-total {
      font-size: 20px;
      font-weight: 700;
      color: rgb(var(--v-theme-head-title-color));
    }
  }
  .delivery-action {
    width: 100%;
    position: fixed;
    bottom: 20px;
  }
</style>