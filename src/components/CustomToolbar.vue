<template>
  <v-toolbar class="pt-3 px-2 toolbar__fixed">
    <slot></slot>
  </v-toolbar>
</template>

<script setup>
</script>

<style lang="scss" scoped>
  .toolbar__fixed {
    position: sticky;
    top: 0;
    z-index: 100;
    background: transparent;
    backdrop-filter: blur(5px) drop-shadow(4px 0 10px blue);
  }
</style>