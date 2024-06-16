<template>
  <div class="item" @mouseenter="showTooltip" @mousemove="updateTooltipPosition" @mouseleave="hideTooltip">
    <div class="backlight" :class="{'backlight_blue' : item?.type === 'armor', 'backlight_purple': item?.type === 'weapon'}"></div>
    <img v-if="item" :src="item.imageUrl" :alt="item.name"/>
    <div v-if="item?.count" class="count">x{{ item.count }}</div>
    <div v-if="item?.charges" class="charges">
      <div>{{ item.charges }}/{{ item.maxCharges }}</div>
    </div>
    <div v-if="remainingCooldown > 0" class="cooldown">
      <img src="@/assets/icons/timer.svg" alt="Cooldown Icon" class="cooldown-icon" />
      {{ remainingCooldown }}s
    </div>
    <Tooltip v-if="isTooltipVisible" :tooltipText="item?.name" :position="tooltipPosition"/>
  </div>
</template>

<script setup lang="ts">
import { computed, ref, defineProps, defineEmits, onMounted, onUnmounted, watch } from 'vue';
import Tooltip from '@/components/UI/Tooltip.vue';
import { InventoryItem } from '@/types/inventory.types';

const props = defineProps<{ item: InventoryItem | null }>();

// Tooltip
const isTooltipVisible = ref(false);
const tooltipPosition = ref({ x: 0, y: 0 });

const showTooltip = (event: MouseEvent) => {
  if (props.item?.name) {
    isTooltipVisible.value = true;
    updateTooltipPosition(event);
  }
};

const updateTooltipPosition = (event: MouseEvent) => {
  tooltipPosition.value = { x: event.clientX + 10, y: event.clientY + 20 };
};
const hideTooltip = () => {
  isTooltipVisible.value = false;
};

// Cooldown
const remainingCooldown = ref(0);
let timer: number | undefined;

const startCooldown = () => {
  if (props.item?.cooldown) {
    const now = Date.now();
    remainingCooldown.value = Math.max(0, Math.floor((props.item.cooldown - now) / 1000));

    timer = setInterval(() => {
      if (remainingCooldown.value > 0) {
        remainingCooldown.value -= 1;
      } else {
        clearInterval(timer!);
      }
    }, 1000);
  }
};

watch(() => props.item, (newVal, oldVal) => {
  if (newVal !== oldVal) {
    if (timer !== undefined) {
      clearInterval(timer);
    }
    startCooldown();
  }
}, { deep: true });

onMounted(() => {
  startCooldown();
});

onUnmounted(() => {
  if (timer !== undefined) {
    clearInterval(timer);
  }
});
</script>
<style scoped lang="scss">
.item {
  position: relative; // Для тултипа
  border: 1px solid #454545;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #1A1A1A;
  width: 94px;
  height: 94px;
  cursor: default;

  img {
    max-width: 85%;
    max-height: 85%;
    z-index: 1;
  }

  // Подсветка для предметов типа armor и weapon
  // Хорошо выглядит, но не по тз
  // :class="{'blue-backlight' : item?.type === 'armor', 'purple-backlight': item?.type === 'weapon'}"
  //img.blue-backlight {
  //  filter: drop-shadow(0 0 15px #367CCE);
  //}
  //img.purple-backlight {
  //  filter: drop-shadow(0 0 15px #7F59CE);
  //}

  // Подсветка для предметов типа armor и weapon
  .backlight {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 110%;
    height: 110%;
    transform: translate(-50%, -50%);
    border-radius: 50%;
    z-index: 0;

    &_blue {
      background: radial-gradient(circle, rgba(54, 124, 206, 1) 0%, rgba(0, 95, 206, 0) 70%);
    }

    &_purple {
      background: radial-gradient(circle, rgba(127, 89, 206, 1) 0%, rgba(127, 89, 206, 0) 70%);
    }
  }

  .count {
    position: absolute;
    bottom: 2px;
    right: 3px;
    background-color: transparent;
    color: white;
    font-size: 17px;
    line-height: 17px;
    font-weight: 700;
  }

  .charges {
    position: absolute;
    top: 0;
    left: 0;
    width: 0;
    height: 0;
    border-right: 62px solid transparent;
    border-top: 36px solid rgba(6, 6, 6, 0.65); // Цвет треугольника
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 0;
    div {
      z-index: 1;
      position: absolute;
      left: 5px;
      bottom: 14px;
      color: white;
      font-size: 17px;
      line-height: 17px;
      font-weight: 700;

    }
  }

  .cooldown {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: rgba(0, 0, 0, 0.5);
    color: white;
    font-size: 20px;
    line-height: 25px;
    font-weight: 900;
    padding: 5px;
    border-radius: 5px;
    z-index: 2;
    width: 100%;
    height: 100%;

    .cooldown-icon {
      width: 28px;
      height: 27px;
      margin-bottom: 3px;
    }
  }

}


//.count, .charges, .cooldown {
//  position: absolute;
//  bottom: 5px;
//  right: 5px;
//  background-color: rgba(0, 0, 0, 0.5);
//  color: white;
//  padding: 2px 5px;
//  border-radius: 3px;
//}
//
//.tooltip {
//  position: absolute;
//  bottom: 100%;
//  left: 50%;
//  transform: translateX(-50%);
//  margin-bottom: 5px;
//  padding: 5px;
//  background-color: #333;
//  color: white;
//  border-radius: 3px;
//  white-space: nowrap;
//  z-index: 10;
//}
</style>
