<script setup lang="ts">
import IconDarkTheme from '@/components/icons/IconDarkTheme.vue'
import IconLightTheme from '@/components/icons/IconLightTheme.vue'
import useTheme from '@/composables/useTheme.ts'

const { isDark, toggleTheme } = useTheme()
</script>

<template>
  <button @click="toggleTheme">
    <IconDarkTheme v-if="isDark" />
    <IconLightTheme v-else />
  </button>
</template>

<style scoped lang="scss">
button {
  padding: 5px;
  background: transparent;
  cursor: pointer;
}
</style>
