<script setup lang="ts">
import { ref } from 'vue'

import DatePicker from '@/components/date-picker/DatePicker.vue'

const selectedDate = ref<Date | null>(null)
const selectedDateAndTime = ref<Date | null>(null)
</script>

<template>
  <section>
    <div class="container">
      <div class="section-content">
        <DatePicker
          v-model="selectedDate"
          placeholder="Выберите дату"
        />
        <DatePicker
          v-model="selectedDateAndTime"
          with-time
          placeholder="Выберите дату и время"
        />
      </div>
    </div>
  </section>
</template>

<style scoped lang="scss">
.section-content {
  display: flex;
  flex-direction: column;
  gap: 30px;
}
</style>
