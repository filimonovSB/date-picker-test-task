import { computed, ref, watch } from 'vue'

import { MONTHS } from '@/constants'
import type { ICalendarDays } from '@/types'

export default function useDatePicker() {
  const tempDate = ref(new Date())

  const currentMonth = computed(() => {
    return MONTHS[tempDate.value.getMonth()]
  })

  const currentYear = computed(() => {
    return tempDate.value.getFullYear()
  })

  const yearsRange = computed(() => {
    const currentYear = tempDate.value.getFullYear()
    return Array.from({ length: 12 }, (_, i) => currentYear - 5 + i)
  })

  const calculateDays = () => {
    const start = new Date(
      tempDate.value.getFullYear(),
      tempDate.value.getMonth(),
      1
    )
    const end = new Date(
      tempDate.value.getFullYear(),
      tempDate.value.getMonth() + 1,
      0
    )
    const days = []

    const firstDay = start.getDay() || 7
    for (let i = firstDay - 1; i > 0; i--) {
      days.push(new Date(start.getFullYear(), start.getMonth(), -i + 1))
    }

    for (let i = 1; i <= end.getDate(); i++) {
      days.push(new Date(start.getFullYear(), start.getMonth(), i))
    }

    while (days.length < 42) {
      days.push(
        new Date(
          end.getFullYear(),
          end.getMonth() + 1,
          days.length - end.getDate() + 1
        )
      )
    }

    return days.map((i: Date) => ({
      value: i,
      isActive: tempDate.value.getTime() === i.getTime()
    }))
  }

  const calendarDays = ref<ICalendarDays[]>(calculateDays())

  watch(tempDate, () => {
    calendarDays.value = calculateDays()
  })

  return {
    tempDate,
    currentMonth,
    currentYear,
    calendarDays,
    yearsRange
  }
}
