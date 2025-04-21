<script setup lang="ts">
import IconClock from '@/components/icons/IconClock.vue'
import IconTriangle from '@/components/icons/IconTriangle.vue'

defineProps<{
  month: string
  year: number
  withTime?: boolean
}>()

const emit = defineEmits(['changeMod', 'prev', 'next', 'toggleTimePicker'])

const changeModeHandler = (mode: 'days' | 'months' | 'years'): void =>
  emit('changeMod', mode)

const prevHandler = (mode: 'months' | 'years') => emit('prev', mode)

const nextHandler = (mode: 'months' | 'years') => emit('next', mode)

const toggleTimePicker = (): void => emit('toggleTimePicker')
</script>

<template>
  <div class="calendar-header">
    <div class="calendar-header__container">
      <button
        class="button-arrow"
        @click="prevHandler('months')"
      >
        <IconTriangle />
      </button>
      <button
        class="flex-grow-1 flex-shrink-0"
        @click="changeModeHandler('months')"
      >
        {{ month }}
      </button>
      <button
        class="button-arrow reverse"
        @click="nextHandler('months')"
      >
        <IconTriangle />
      </button>
    </div>

    <div class="calendar-header__container">
      <button
        class="button-arrow"
        @click="prevHandler('years')"
      >
        <IconTriangle />
      </button>
      <button
        class="flex-grow-1 flex-shrink-0"
        @click="changeModeHandler('years')"
      >
        {{ year }}
      </button>
      <button
        class="button-arrow reverse"
        @click="nextHandler('years')"
      >
        <IconTriangle />
      </button>
    </div>
    <button
      v-if="withTime"
      :disabled="!withTime"
      class="calendar-header__container"
      @click="toggleTimePicker"
    >
      <IconClock />
    </button>
  </div>
</template>

<style scoped lang="scss">
.calendar-header {
  display: grid;
  grid-template-columns: 139px auto max-content;
  align-items: center;
  height: 36px;
  width: 100%;

  &__container {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    min-width: 36px;
    height: 36px;
    border-bottom: 1px solid #43577e;
    border-right: 1px solid #43577e;
    background: var(--input-bg);

    &:last-child {
      border-right: none;
    }

    & button {
      background: transparent;
    }
  }
}

.button-arrow {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  &.reverse {
    transform: rotate(180deg);
  }
}
</style>
