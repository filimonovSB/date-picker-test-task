<script setup lang="ts">
import AppButton from '@/components/buttons/AppButton.vue'

const emit = defineEmits(['confirm', 'cancel'])

const confirmSelection = () => emit('confirm')
const cancelSelection = () => emit('cancel')
</script>

<template>
  <div class="calendar-footer">
    <AppButton @click="confirmSelection">Подтвердить</AppButton>
    <AppButton
      theme="secondary"
      @click="cancelSelection"
    >
      Отменить
    </AppButton>
  </div>
</template>

<style scoped lang="scss">
.calendar-footer {
  display: flex;

  & :deep(button) {
    width: 100%;
  }
}
</style>
