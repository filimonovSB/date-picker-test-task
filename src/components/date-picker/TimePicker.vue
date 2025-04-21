<script setup lang="ts">
import { ref } from 'vue'

import AppButton from '@/components/buttons/AppButton.vue'

const selectedHours = ref(0)
const selectedMinutes = ref(0)
const selectedSeconds = ref(0)

const emit = defineEmits(['saveTime', 'cancelTime'])

const props = defineProps<{
  tempDate: Date
}>()

const cancelTime = () => {
  selectedHours.value = 0
  selectedMinutes.value = 0
  selectedSeconds.value = 0
  emit('cancelTime')
}

const saveTime = () => {
  const newDate = new Date(props.tempDate)
  newDate.setHours(
    selectedHours.value,
    selectedMinutes.value,
    selectedSeconds.value
  )
  emit('saveTime', newDate)
}
</script>

<template>
  <div class="time-picker-modal">
    <div class="time-picker">
      <div class="time-controls">
        <div class="time-section">
          <input
            v-model.number="selectedHours"
            type="number"
            min="0"
            max="23"
            maxlength="1"
          />
        </div>
        <span>:</span>
        <div class="time-section">
          <input
            v-model.number="selectedMinutes"
            type="number"
            min="0"
            max="59"
            maxlength="1"
          />
        </div>
        <span>:</span>
        <div class="time-section">
          <input
            v-model.number="selectedSeconds"
            type="number"
            min="0"
            max="59"
            maxlength="2"
          />
        </div>
      </div>
      <div class="time-footer">
        <AppButton
          theme="secondary"
          @click="cancelTime"
        >
          Отмена
        </AppButton>
        <AppButton @click="saveTime">OK</AppButton>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.time-picker-modal {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 20;

  .time-picker {
    background: var(--app-bg-primary-color);
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

    .time-controls {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 15px;

      .time-section {
        display: flex;
        flex-direction: column;
        align-items: center;

        input {
          width: 50px;
          text-align: center;
          margin: 5px 0;
          padding: 5px;
          border: 1px solid #ddd;
          border-radius: 4px;
          background: var(--input-bg);
        }

        button {
          padding: 2px 10px;
          border: 1px solid #ccc;
          background: #f8f8f8;
          cursor: pointer;
        }
      }
    }

    .time-footer {
      display: flex;
      justify-content: flex-end;
      gap: 10px;
    }
  }
}

.time-picker-btn {
  margin-left: auto;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
  padding: 5px;
}
</style>
