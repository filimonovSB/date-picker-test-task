<script setup lang="ts">
const modelValue = defineModel()
</script>

<template>
  <div class="input-wrapper">
    <input
      v-bind="$attrs"
      v-model="modelValue"
      autocomplete="off"
      class="app-input"
    />
    <div class="input-icons">
      <span
        v-if="modelValue"
        class="clear-icon"
        @click="modelValue = ''"
      >
        ×
      </span>
      <slot name="icons" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.input-wrapper {
  position: relative;
  width: fit-content;
}

.input-icons {
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  gap: 2px;

  & :deep(span) {
    display: block;
    padding: 4px;
    cursor: pointer;
  }
}

.app-input {
  padding: 10px;
  border: none;
  background: var(--input-bg);
  color: var(--input-text);

  &::placeholder {
    color: var(--input-text-placeholder);
  }
}
</style>
