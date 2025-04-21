<script setup lang="ts">
import { ref } from 'vue'

import DatePickerBody from '@/components/date-picker/DatePickerBody.vue'
import DatePickerFooter from '@/components/date-picker/DatePickerFooter.vue'
import DatePickerHeader from '@/components/date-picker/DatePickerHeader.vue'
import DatePickerInput from '@/components/date-picker/DatePickerInput.vue'
import TimePicker from '@/components/date-picker/TimePicker.vue'
import useDatePicker from '@/composables/use-date-picker.ts'
import formatDate from '@/utils/format-date.ts'
import formatDateAndTime from '@/utils/format-date-and-time.ts'

const props = withDefaults(
  defineProps<{
    withTime?: boolean
  }>(),
  {
    withTime: false
  }
)

const { tempDate, calendarDays, currentMonth, currentYear, yearsRange } =
  useDatePicker()

const modelValue = defineModel()
const isVisibleCalendar = ref(false)
const isVisibleTimePicker = ref(false)

const viewMode = ref<'days' | 'months' | 'years'>('days')

const toggleCalendar = () =>
  (isVisibleCalendar.value = !isVisibleCalendar.value)

const selectDate = (date: Date) => {
  tempDate.value = date
}

const confirmSelection = () => {
  modelValue.value = props.withTime
    ? formatDateAndTime(tempDate.value)
    : formatDate(tempDate.value)
  isVisibleCalendar.value = false
}

const cancelSelection = () => {
  tempDate.value = new Date()
  isVisibleCalendar.value = false
}

const changeModeHandler = (newMode: 'days' | 'months' | 'years') => {
  if (viewMode.value === 'months' && newMode === 'months') {
    viewMode.value = 'days'
    return
  }
  if (viewMode.value === 'years' && newMode === 'years') {
    viewMode.value = 'days'
    return
  }
  viewMode.value = newMode
}

const selectMonthHandler = (index: number) => {
  tempDate.value = new Date(tempDate.value.getFullYear(), index)
  viewMode.value = 'days'
}

const selectYearHandler = (year: number) => {
  tempDate.value = new Date(year, tempDate.value.getMonth())
  viewMode.value = 'days'
}

const prevHandler = (mode: 'months' | 'years') => {
  if (mode === 'months') {
    tempDate.value = new Date(
      tempDate.value.setMonth(tempDate.value.getMonth() - 1)
    )
  } else if (mode === 'years') {
    tempDate.value = new Date(
      tempDate.value.setFullYear(tempDate.value.getFullYear() - 1)
    )
  }
}

const nextHandler = (mode: 'months' | 'years') => {
  if (mode === 'months') {
    tempDate.value = new Date(
      tempDate.value.setMonth(tempDate.value.getMonth() + 1)
    )
  } else if (mode === 'years') {
    tempDate.value = new Date(
      tempDate.value.setFullYear(tempDate.value.getFullYear() + 1)
    )
  }
}

const saveTimeHandler = (newDate: Date) => {
  tempDate.value = newDate
  isVisibleTimePicker.value = false
}
</script>

<template>
  <div class="date-picker">
    <DatePickerInput
      v-bind="$attrs"
      v-model="modelValue"
      @toggle="toggleCalendar"
    />
    <div
      v-if="isVisibleCalendar"
      class="calendar"
    >
      <TimePicker
        v-if="isVisibleTimePicker"
        :temp-date="tempDate"
        @cancel-time="isVisibleTimePicker = false"
        @save-time="saveTimeHandler"
      />
      <DatePickerHeader
        :with-time="withTime"
        :month="currentMonth"
        :year="currentYear"
        @change-mod="changeModeHandler"
        @prev="prevHandler"
        @next="nextHandler"
        @toggle-time-picker="isVisibleTimePicker = true"
      />
      <DatePickerBody
        :view-mode="viewMode"
        :years-range="yearsRange"
        :calendar-days="calendarDays"
        @on-select="selectDate"
        @on-select-month="selectMonthHandler"
        @on-select-year="selectYearHandler"
      />
      <DatePickerFooter
        @confirm="confirmSelection"
        @cancel="cancelSelection"
      />
    </div>
  </div>
</template>

<style scoped lang="scss">
.date-picker {
  position: relative;
}

.calendar {
  position: absolute;
  top: calc(100% + 20px);
  left: 0;
  border: 1.5px solid #6f8bb7;
  background: #fff;
  z-index: 30;
}
</style>
