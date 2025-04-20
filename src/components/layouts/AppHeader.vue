<script setup lang="ts">
import ToggleTheme from '@/components/buttons/ToggleTheme.vue'
</script>

<template>
  <header class="header">
    <div class="container">
      <div class="header__content">
        <ToggleTheme />
      </div>
    </div>
  </header>
</template>

<style scoped lang="scss">
.header {
  padding: 20px 0;

  &__content {
    display: flex;
    justify-content: flex-end;
  }
}
</style>
