<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    theme?: 'primary' | 'secondary'
  }>(),
  {
    theme: 'primary'
  }
)

const classes = computed(() => [`app-button--${props.theme}`])
</script>

<template>
  <button
    class="app-button"
    :class="classes"
  >
    <slot />
  </button>
</template>

<style scoped lang="scss">
.app-button {
  padding: 11px 30px;
  font-weight: 400;
  font-size: 12px;
  border-radius: 2px;
  border: none;

  &--primary {
    border: 1px solid #647cab;
    background: #6484c5;
    color: white;
  }

  &--secondary {
    background: #d9dbe1;
    color: #687793;
  }
}
</style>
