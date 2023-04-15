<template>
  <v-btn variant="flat" class="big-btn d-flex align-center justify-center primary-btn text-none">
    <slot></slot></v-btn>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .big-btn {
    height: 50px;
    width:90%;
    max-width: 356px;
    border-radius: var(--border-radius-btn);  
    font-size: 20px;
    font-weight: 700;
    margin: 0 auto;
    letter-spacing: initial !important;
  }
</style>