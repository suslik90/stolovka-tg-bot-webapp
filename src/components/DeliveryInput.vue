<template>
  <div class="delivery-address__item rounded-btn px-6 py-3 mb-5">
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
      font-size: inherit !important;
      font-weight: 400;
      color: rgb(var(--v-theme-menu-item-color));
    }

    &__input {
      font-size: inherit !important;
      font-weight: 300;
      color: rgb(var(--v-theme-menu-item-color));

      .v-field__input {
        padding-top: 0 !important;
      }
      .v-field__input::-webkit-input-placeholder, .v-field__input::placeholder {
        font-style: italic;
      }
    }
  }
</style>