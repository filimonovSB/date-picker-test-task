<script setup lang="ts">
import { DAYS_OF_WEEK, MONTHS } from '@/constants'
import type { ICalendarDays } from '@/types'

defineProps<{
  calendarDays: ICalendarDays[]
  viewMode: 'days' | 'months' | 'years'
  yearsRange: number[]
}>()

const emit = defineEmits(['onSelect', 'onSelectMonth', 'onSelectYear'])

const select = (date: Date) => emit('onSelect', date)

const selectMonth = (index: number) => emit('onSelectMonth', index)
const selectYear = (year: any) => emit('onSelectYear', year)
</script>

<template>
  <div
    class="calendar-body"
    :class="viewMode"
  >
    <template v-if="viewMode === 'days'">
      <div
        v-for="day in DAYS_OF_WEEK"
        :key="day"
        class="calendar-body__day-header"
      >
        {{ day }}
      </div>
      <button
        v-for="date in calendarDays"
        :key="date.value.toISOString()"
        class="calendar-body__day"
        :class="{
          selected: date.isActive
        }"
        @click="select(date.value)"
      >
        {{ date.value.getDate() }}
      </button>
    </template>
    <template v-if="viewMode === 'months'">
      <button
        v-for="(month, index) in MONTHS"
        :key="month"
        class="calendar-body__month"
        @click="selectMonth(index)"
      >
        {{ month }}
      </button>
    </template>
    <template v-if="viewMode === 'years'">
      <button
        v-for="year in yearsRange"
        :key="year"
        class="calendar-body__year"
        @click="selectYear(year)"
      >
        {{ year }}
      </button>
    </template>
  </div>
</template>

<style scoped lang="scss">
.calendar-body {
  display: grid;

  padding: 12px 8px;
  border-bottom: 1.5px solid #6a7180;
  background: var(--app-bg-primary-color);

  &.days {
    grid-template-columns: repeat(7, 1fr);
  }

  &.months {
    grid-template-columns: repeat(3, 1fr);
  }

  &.years {
    grid-template-columns: repeat(3, 1fr);
  }

  &__month {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 61px;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: -0.03em;
    background: transparent;

    &:hover {
      background: var(--input-bg);
    }
  }

  &__year {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 84px;
    height: 61px;
    font-weight: 500;
    font-size: 12px;
    letter-spacing: -0.03em;
    background: transparent;

    &:hover {
      background: var(--input-bg);
    }
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 36px;
    height: 37px;
    font-weight: 500;
    cursor: pointer;
    color: var(--app-text-primary-color);
    font-size: 12px;
    letter-spacing: -0.03em;
    text-align: center;
    background: transparent;

    &:hover {
      background: var(--input-bg);
    }

    &.selected {
      background: #6f7dad;
      color: white;
    }
  }

  &__day-header {
    margin-bottom: 4px;
    font-weight: 400;
    font-size: 12px;
    line-height: 133%;
    letter-spacing: -0.04em;
    text-align: center;
    color: #9096a3;
  }
}
</style>
