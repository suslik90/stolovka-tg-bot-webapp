<template>
  <div class="d-flex custom-toolbar justify-space-between">
    <div class="custom-toolbar__title">
      <slot name="title"></slot>
    </div>
    <div class="d-inline-flex custom-toolbar__actions  justify-end">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .custom-toolbar {
    &__title {
      color: rgb(var(--v-theme-head-title-color));
      font-size: 32px;
      font-weight: 700;
    } 
    &__actions {
      width: 100%;
    }
  }
</style>