<template>
  <!-- В данном случае это единственное и главное представление-->
  <div class="inventory-view">
    <Inventory />
  </div>
</template>
<script setup lang="ts">
import Inventory from "@/components/Inventory/Inventory.vue";
</script>
<style scoped lang="scss">
.inventory-view {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  height: 100%;
}
</style>