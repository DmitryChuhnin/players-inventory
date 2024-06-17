<template>
  <div class="inventory">
    <div class="inventory__head">
      <Tabs/>
    </div>
    <div class="inventory-content">
      <div class="inventory-content__filters">
        <Filters
            :availableFilters="availableFilters"
            :activeFilterId="activeFilterId"
            @update:activeFilterId="activeFilterId = $event"
        />
      </div>
      <div class="inventory-content__grid">
        <div class="title-box">
          {{ availableFilters[activeFilterId].name.toUpperCase() }}
        </div>
        <div class="grid-wrapper">
          <Item v-for="(item, index) in inventoryItems" :key="index" :item="item"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import {ref, computed, watchEffect} from 'vue'
import Tabs from "@/components/Inventory/Tabs.vue";
import Filters from "@/components/Inventory/Filters.vue";
import Item from "@/components/Inventory/Item.vue";
import {useInventoryStore} from "@/stores/inventory.store";
import { useRoute } from 'vue-router'

const route = useRoute()

const activeFilterId = ref(0)

const availableFilters = [
  { id: 0, name: 'all items', typeName: '' },
  { id: 1, name: 'weapons', typeName: 'weapon' },
  { id: 2, name: 'armor', typeName: 'armor' },
  { id: 3, name: 'misc', typeName: 'misc' },
]

const inventoryStore = useInventoryStore()
watchEffect(() => {
  // Если в URL есть параметр case, то загружаем инвентарь для этого кейса, но только если case принимает значения 1, 2, 3
  if (route.query.case && ['1', '2', '3'].includes(route.query.case as string)) {
    inventoryStore.getInventoryItems(+route.query.case)
  } else {
    inventoryStore.getInventoryItems()
  }
})


// Загружаем инвентарь учитывая фильтр и заполняя пустые ячейки
const inventoryItems = computed(() => {
  const items = inventoryStore.inventoryItems
  const filteredItems = items.filter(item => {
    if (activeFilterId.value === 0) return true
    return item.type === availableFilters[activeFilterId.value].typeName
  })
  return [...filteredItems, ...Array(Math.max(0, 40 - filteredItems.length)).fill(null)]
})


</script>
<style scoped lang="scss">
.inventory {
  display: flex;
  flex-direction: column;
  max-width: 562px;
  min-width: 300px;
  max-height: 865px;
  height: 100%;

  &__head {
    width: 100%;
    height: 59px;
  }

  &-content {
    width: 100%;
    height: 100%;
    display: flex;
    overflow: hidden;

    &__filters {
      width: 64px;
      height: 100%;
    }

    &__grid {
      display: flex;
      flex-direction: column;
      flex-grow: 1;
      padding: 12px 12px;
      background-color: #242223;
      border: 1px solid #000000;
      .title-box {
        width: 100%;
        height: 25px;
        color: #FFFFFF;
        font-family: Work Sans, sans-serif;
        font-size: 20px;
        font-weight: 900;
        line-height: 25px;
        margin-bottom: 8px;
        cursor: default;
      }

      .grid-wrapper {
        border: 1px solid #454545;
        display: grid;
        grid-template-columns: repeat(5, 1fr);
        grid-template-rows: repeat(5, 1fr);
        overflow-y: auto;
        max-height: 100%;
      }
    }
  }
}

@media (max-width: 600px) {
  .inventory {
    &__head {
      height: auto;
    }

    &-content {
      flex-direction: column;
      height: auto;

      &__filters {
        width: 100%;
      }

      &__grid {
        padding: 8px 8px;
        .title-box {
          font-size: 16px;
          line-height: 16px;
          height: 20px;
        }
      }
    }
  }
}
</style>