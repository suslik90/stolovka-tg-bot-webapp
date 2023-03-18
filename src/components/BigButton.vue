<template>
  <v-btn class="big-btn d-flex align-center justify-center primary-btn">
    <slot></slot></v-btn>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .big-btn {
    height: 75px;
    width:100%;
    max-width: 373px;
    text-transform: initial !important;
    border-radius: var(--border-radius-big-btn);
    padding: 15px 20px;

    font-size: 30px;
    font-weight: 700;
  }
</style>