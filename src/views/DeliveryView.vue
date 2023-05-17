<template>
  <v-dialog persistent v-model="showErrorDialog" max-width="380">
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
  <div
    class="wrapper"
    :class="{ 'bottom-empty-space': !isKeyboardHidden && isIOS }"
    @click.self="onClickOutside"
  >
    <div class="app-title">
      <div class="app-header__title">Доставка</div>
      <!-- <v-btn
        variant="flat"
        size="small"
        class="clear-cart-btn text-none primary-btn"
        >Самовывоз</v-btn
      > -->
    </div>
    <div class="info-title primary-btn">Адрес:</div>
    <div class="delivery-address d-flex flex-column justify-center mt-5">
      <DeliveryInput>
        <template v-slot:label>Город<span class="text-red">*</span></template>
        <template v-slot:input
          ><v-text-field
            density="compact"
            hide-details="auto"
            variant="plain"
            placeholder="Введите город"
            v-model="orderForm.city"
            :error-messages="v$.city.$errors.map((e) => e.$message)"
            required
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
          ></v-text-field>
        </template>
      </DeliveryInput>
      <DeliveryInput>
        <template v-slot:label
          >Улица и дом<span class="text-red">*</span></template
        >
        <template v-slot:input
          ><v-text-field
            density="compact"
            hide-details="auto"
            variant="plain"
            placeholder="Введите улицу и дом"
            v-model="orderForm.street"
            :error-messages="v$.street.$errors.map((e) => e.$message)"
            required
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
          ></v-text-field>
        </template>
      </DeliveryInput>
      <DeliveryInput>
        <template v-slot:label
          >Квартира/офис<span class="text-red">*</span></template
        >
        <template v-slot:input
          ><v-text-field
            density="compact"
            hide-details="auto"
            variant="plain"
            placeholder="Введите номер квартиры или офиса"
            v-model="orderForm.apartment"
            :error-messages="v$.apartment.$errors.map((e) => e.$message)"
            required
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
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
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
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
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
          ></v-text-field>
        </template>
      </DeliveryInput>
      <DeliveryInput>
        <template v-slot:label>ФИО<span class="text-red">*</span></template>
        <template v-slot:input
          ><v-text-field
            density="compact"
            hide-details="auto"
            variant="plain"
            placeholder="Введите ФИО"
            v-model="orderForm.name"
            :error-messages="v$.name.$errors.map((e) => e.$message)"
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
          ></v-text-field>
        </template>
      </DeliveryInput>
      <DeliveryInput>
        <template v-slot:label>Телефон<span class="text-red">*</span></template>
        <template v-slot:input
          ><v-text-field
            density="compact"
            hide-details="auto"
            variant="plain"
            placeholder="Введите телефон"
            v-model="orderForm.phone"
            :error-messages="v$.phone.$errors.map((e) => e.$message)"
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
          ></v-text-field>
          <input
            class="d-none"
            v-maska
            data-maska="+7(###)-###-##-##"
            type="text"
            v-model="orderForm.phone"
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
          />
        </template>
      </DeliveryInput>
      <DeliveryInput>
        <template v-slot:label>Email<span class="text-red">*</span></template>
        <template v-slot:input
          ><v-text-field
            density="compact"
            hide-details="auto"
            variant="plain"
            placeholder="Введите электронную почту"
            v-model="orderForm.email"
            :error-messages="v$.email.$errors.map((e) => e.$message)"
            required
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
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
            @blur="onMouseLeaveBlur"
            @focus="setPaddingBottom"
          ></v-text-field>
        </template>
      </DeliveryInput>
      <div class="info-title primary-btn">Оплата:</div>
      <div class="radio-btns">
        <div class="radio-input-group">
          <label>
            <input
              type="radio"
              v-model="orderForm.payment"
              value="cash"
              class="real-radio-btn"
              @change="onChangeTypePay"
            />
            <span class="custom-radio-btn"></span>
            Наличные
          </label>
        </div>
        <div class="radio-input-group">
          <label>
            <input
              type="radio"
              v-model="orderForm.payment"
              value="card"
              class="real-radio-btn"
              @change="onChangeTypePay"
            />
            <span class="custom-radio-btn"></span>
            Карта
          </label>
        </div>
      </div>

      <div
        class="radio-input-group odd-money mt-5"
        v-if="orderForm.payment === 'cash'"
      >
        <label>
          <input
            type="checkbox"
            v-model="orderForm.hitBack"
            class="real-radio-btn odd-money-radio"
            @change="onChangeHitback"
          />
          <span class="custom-radio-btn"></span>
          Сдача
        </label>
        <v-slide-x-transition>
          <div class="odd-money-input" v-show="orderForm.hitBack">
            <v-text-field
              type="number"
              density="compact"
              hide-details="auto"
              variant="plain"
              placeholder="Выдать сдачу с"
              v-model.trim="orderForm.hitBackSum"
              @blur="onMouseLeaveBlur"
              @focus="setPaddingBottom"
            ></v-text-field>
            <input
              class="d-none"
              v-maska
              data-maska="0.99"
              data-maska-tokens="0:\d:multiple|9:\d:optional"
              type="text"
              v-model="orderForm.hitBackSum"
            />
          </div>
        </v-slide-x-transition>
      </div>
      <div class="radio-input-group mt-5" v-if="false">
        <label>
          <input
            type="radio"
            name="courier"
            value="courier"
            class="real-radio-btn"
          />
          <span class="custom-radio-btn"></span>
          Оплата курьеру
        </label>
      </div>
      <div class="delivery-amount-wrapper">
        <div class="info-title primary-btn">Доставка:</div>
        <div class="delivery-amount">
          {{
            mainStore.freeDelivery
              ? `Бесплатно`
              : `${$filters.numberFormat(DELIVERY_AMOUNT, [2, " "])} ₽`
          }}          
        </div>
      </div>
      <div class="privacy">
        Нажимая на кнопку
        {{ orderForm.payment == "online" ? `“Оплатить”` : `“Заказать”` }} вы
        даете согласие на обработку и хранение персональных данных в
        соответствии с Политикой конфиденциальности и условиями.
        <a href="#">Подробнее</a>
      </div>
    </div>
    <div class="padding-order-btn">
      <BigButton @click="send" :loading="processRequest">
        {{
          orderForm.payment == "online"
            ? `Оплатить ${$filters.numberFormat(
                mainStore.freeDelivery
                  ? mainStore.totalOrderPrice
                  : mainStore.totalOrderPrice + DELIVERY_AMOUNT,
                [2, " "]
              )}`
            : `Заказать за ${$filters.numberFormat(
                mainStore.freeDelivery
                  ? mainStore.totalOrderPrice
                  : mainStore.totalOrderPrice + DELIVERY_AMOUNT,
                [2, " "]
              )}`
        }}
      </BigButton>
    </div>
  </div>
</template>

<script setup>
  import { useVuelidate } from "@vuelidate/core";
  import { email, helpers, minLength, required } from "@vuelidate/validators";
  import { inject, onUnmounted, reactive, ref } from "vue";
  import BigButton from "@/components/BigButton.vue";
  import DeliveryInput from "@/components/DeliveryInput.vue";
  import { useRouter } from "vue-router";
  import { useMainStore } from "@/stores/main";
  import { API_URL, DELIVERY_AMOUNT } from "@/utils/constants";
  import { tg } from "@/utils/telegram-sdk";

  if (!tg.BackButton.isVisible) tg.BackButton.show();

  const axios = inject("axios");

  const mainStore = useMainStore();
  const router = useRouter();

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
    hitBack: false,
    hitBackSum: null,
    deliveryAmount: mainStore.freeDelivery ? 0 : DELIVERY_AMOUNT,
  });
  let processRequest = ref(false);
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

  function onClickOutside() {
    if (document.activeElement) {
      document.activeElement.blur();
    }
  }

  function setPaddingBottom() {
    if (isIOS) {
      isKeyboardHidden.value = false;
    }
  }

  let v$ = useVuelidate(rules, orderForm);

  let showErrorDialog = ref(false);
  const isIOS = tg.platform.toLowerCase() == "ios";

  const RESIZE_EVENT_NAME = "resize";
  const isKeyboardHidden = ref(true);
  const resizeListener = (event) => {
    isKeyboardHidden.value = window.innerHeight / window.screen.availHeight > 0.6;
  };
  window.addEventListener(RESIZE_EVENT_NAME, resizeListener, false);
  onUnmounted(() => {
    window.removeEventListener(RESIZE_EVENT_NAME, resizeListener, false);
  });

  function onMouseLeaveBlur(e) {
    e.target.blur();
    isKeyboardHidden.value = true;
  }

  function goMain() {
    router.replace("/");
  }

  function onChangeHitback() {
    if (!orderForm.hitBack) {
      orderForm.hitBackSum = null;
    }
  }

  function onChangeTypePay() {
    if (orderForm.payment === "card") {
      orderForm.hitBack = false;
      orderForm.hitBackSum = null;
    }
  }
  function closeErrorDialog() {
    showErrorDialog.value = false;
  }

  function send() {
    v$.value.$touch();
    if (!v$.value.$invalid) {
      processRequest.value = true;
      axios
        .post(API_URL + "/order?" + tg.initData, {
          order: mainStore.basket,
          delivery: orderForm,
          orderTotalPrice: mainStore.freeDelivery
                  ? mainStore.totalOrderPrice
                  : mainStore.totalOrderPrice + DELIVERY_AMOUNT,
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
        })
        .finally(() => {
          processRequest.value = false;
        });
    }
  }
</script>

<style lang="scss">
  .bottom-empty-space {
    padding-bottom: 280px !important;
  }
  .app-title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .app-header__title {
    font-size: 25px;
    font-weight: 700;
    color: rgb(var(--v-theme-head-title-color));
  }
  .clear-cart-btn {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 31px !important;
    padding: 0 10px;
    background: rgb(var(--v-theme-primary));
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
    border-radius: 28px;
    font-size: 15px;
    font-weight: 700;
    color: rgb(var(--v-theme-head-title-color));
    letter-spacing: initial;
  }
  .info-title {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 31px;
    width: fit-content;
    padding: 0 15px;
    background: rgb(var(--v-theme-primary));
    border-radius: 28px;
    font-size: 15px;
    font-weight: 700;
    color: rgb(var(--v-theme-head-title-color));
    margin: 22px 0;
  }

  .delivery-address {
    width: 100%;
  }
  .padding-order-btn {
    padding-top: 10px;
  }

  .radio-btns {
    display: flex;
    align-items: center;
  }
  .radio-input-group {
    &:first-child {
      margin-right: 60px;
    }
    label {
      display: flex;
      align-items: center;
      font-size: 15px;
      font-weight: 700;
      color: rgb(var(--v-theme-head-title-color));
    }
  }
  @media screen and (max-width: 345px) {
    .radio-input-group {
      &:first-child {
        margin-right: 20px;
      }
    }
  }
  .real-radio-btn {
    width: 0;
    height: 0;
    position: absolute;
    opacity: 0;
    z-index: -1;
  }
  .custom-radio-btn {
    position: relative;
    display: inline-block;
    width: 24px;
    height: 24px;
    background: transparent;
    border: 2px solid rgb(var(--v-theme-head-title-color));
    border-radius: 50%;
    vertical-align: text-top;
    margin-right: 19px;
  }
  .custom-radio-btn::before {
    content: "";
    display: inline-block;
    width: 18px;
    height: 18px;
    background: rgb(var(--v-theme-primary));
    border-radius: 50%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) scale(0);
    transition: 0.2s ease-in;
  }
  .real-radio-btn:checked + .custom-radio-btn::before {
    transform: translate(-50%, -50%) scale(1);
  }
  .odd-money {
    display: flex;
    align-items: center;
    height: 32px;
  }
  .odd-money-input {
    max-width: 173px;
    margin-left: 20px;
    transition: 0.3s ease-in-out;
    input {
      box-sizing: border-box;
      display: block;
      border: none;
      width: 100%;
      background: var(--background-color-white);
      color: rgb(var(--v-theme-menu-item-color));
      outline: none;
      padding: 3px 16px;
      font-size: 15px;
      font-weight: 300;
      border-radius: 28px;
      &::placeholder {
        color: rgb(var(--v-theme-menu-item-color));
        font-style: italic;
      }
    }
    input::-webkit-outer-spin-button,
    input::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  .delivery-amount-wrapper {
    display: flex;
    align-items: center;
  }
  .delivery-amount {
    font-size: 15px;
    font-weight: 700;
    color: rgb(var(--v-theme-head-title-color));
    margin-left: 15px;
  }
  .privacy {
    font-size: 13px;
    font-weight: 300;
    line-height: 15.6px;
    margin: 10px 0 20px 0;
    color: rgb(var(--v-theme-head-title-color));
    a {
      font-weight: 600;
      color: inherit;
      text-decoration: none;
    }
  }

  .delivery-payment {
    .v-selection-control__input {
      color: rgb(var(--v-theme-primary));
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
          color: rgb(var(--v-theme-menu-item-color));
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