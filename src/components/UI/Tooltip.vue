<template>
  <div class="tooltip" :style="{ left: `${position.x}px`, top: `${position.y}px` }">
    <div class="tooltip__text">
      {{ tooltipText }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
  position: Object,
  tooltipText: String,
});

</script>
<style scoped lang="scss">
.tooltip {
  position: fixed;
  z-index: 4;
  background-color: #1A1A1A;
  border: 2px solid #454545;
  border-radius: 0 6px 6px 6px;

  &__text {
    color: #ababab;
    white-space: nowrap;
    margin: 6px 8px;
    font-size: 18px;
    line-height: 18px;
    font-weight: 700;
  }
}
</style>
