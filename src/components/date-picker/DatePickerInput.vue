<script setup lang="ts">
import IconCalendary from '@/components/icons/IconCalendary.vue'
import AppInput from '@/components/inputs/AppInput.vue'

const modelValue = defineModel()

defineProps<{
  isTime?: boolean
}>()

const emit = defineEmits(['toggle'])

const toggleCalendar = () => emit('toggle')
</script>

<template>
  <AppInput
    v-model="modelValue"
    v-bind="$attrs"
  >
    <template #icons>
      <span
        class="calendar-icon"
        @click="toggleCalendar"
      >
        <IconCalendary />
      </span>
    </template>
  </AppInput>
</template>

<style scoped lang="scss"></style>
