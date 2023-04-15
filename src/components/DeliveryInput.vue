<template>
  <div class="delivery-address__item rounded-btn px-6 pt-3 pb-1 mb-5">
    <div class="delivery-address__item__label">
      <slot name="label"></slot>
    </div>
    <div class="delivery-address__item__input">
      <slot name="input"></slot>
    </div>
  </div>
</template>
<style lang="scss">
  .delivery-address__item {
    width: 100%;
    background-color: var(--background-color-white);
    font-size: 15px;

    &__label {
      font-size: 15px !important;
      font-weight: 400;
      color: rgb(var(--v-theme-menu-item-color));
    }

    &__input {
      color: rgb(var(--v-theme-menu-item-color));

      .v-field__input {
        padding-top: 0 !important;
        font-size: 15px !important;
        font-weight: 300;
      }
      .v-field__input::-webkit-input-placeholder,
      .v-field__input::placeholder {
        font-style: italic;
        font-size: 15px !important;
        color: rgb(var(--v-theme-menu-item-color));
      }

      .v-input__details{
        min-height: 0 !important;
        padding-bottom: 7px;
      }
    }
  }
</style>