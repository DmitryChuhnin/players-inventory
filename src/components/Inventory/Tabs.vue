<template>
  <div class="tabs">
    <button class="tab-button" :class="{'tab-button_active': selectedTab==='backpack'}" @click="selectTab('backpack')">BACKPACK</button>
    <button class="tab-button" :class="{'tab-button_active': selectedTab==='nexus'}" @click="selectTab('nexus')">NEXUS</button>
    <button class="close-button" @click="closeTabs">
      <img src="@/assets/icons/x.svg" alt="Close" />
    </button>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const selectedTab = ref('backpack');

const selectTab = (tab) => {
  selectedTab.value = tab;
  // Можно будет добавить функциональность
};

const closeTabs = () => {
  // Закрыть инвентарь
};
</script>
<style scoped lang="scss">
.tabs {
  width: 100%;
  display: flex;
  align-items: center;
}

.tab-button {
  flex-grow: 1;
  height: 59px;
  border: 1px solid #000000;
  background-color: #393839;
  color: #FFFFFF78;
  font-size: 24px;
  font-weight: 900;
  cursor: pointer;
  &_active {
    background-color: #242223;
    color: #FFFFFF;
  }
}

.tab-button:hover {
  background-color: #1e1c1e;
  color: #FFFFFFCC;
}

.close-button {
  padding: 14px;
  background-color: #242223;
  border: 1px solid #000000;
  color: #FFFFFF80;
  cursor: pointer;
  width: 59px;
  height: 59px;
  img {
    width: 24px;
    height: 24px;
  }
}

.close-button:hover {
  background-color: #cc3232;
}
</style>