<template>
  <div class="filters">
    <div
        v-for="filter in availableFilters"
        :key="filter.id"
        class="filter"
        :class="{ 'active-filter': activeFilterId === filter.id }"
        @click="changeFilter(filter.id)"
    >
      <img :src="getImageUrl(filter.name)" :alt="filter.name" />
    </div>
  </div>
</template>
<script setup lang="ts">
import {defineProps, defineEmits} from 'vue'
import {PropType} from 'vue'

const props = defineProps({
  availableFilters: {
    type: Array as PropType<{ id: number, name: string }[]>,
    required: true
  },
  activeFilterId: {
    type: Number,
    required: true
  }
})

const emit = defineEmits(['update:activeFilterId'])

const changeFilter = (filter: number) => {
  emit('update:activeFilterId', filter)
}

const getImageUrl = (imageName) => {
  return `/filters/${imageName}.svg`;
};

// Данный компонент можно реализовать разными способами:
// 1. Если в реальном проекте фильтры будут меняться очень редко, то можно просто отверстать их не используя availableFilters, не используя v-for и т.д.
// 2. Если картинки статичны и используются во множестве других мест, то можно добавить их в public и тянуть по url
// Второй вариант, в отличие от первого позволяет сделать компонент переиспользуемым.
// 3. Либо, можно динамически загружать изображения:
// const imageUrls = ref({});
// const getImageUrl = async (imageName) => {
//   try {
//     const imageModule = await import(`@/assets/icons/${imageName}.svg`);
//     return imageModule.default;
//   } catch (error) {
//     console.error(`Failed to load image: ${imageName}`, error);
//     // Стоит добавить некоторую индикацию пользователю, если изображение не загрузилось
//     return null;
//   }
// };
// onMounted(async () => {
//   for (const filter of props.availableFilters) {
//     imageUrls.value[filter.name] = await getImageUrl(filter.name);
//   }
// });
// Преимущество третьего способа, заключается в его оптимизации производительности за счет отложенной загрузки.

// Каждое решение несет свои плюсы и минусы, и выбор зависит от конкретной ситуации.
// В данном случае динамическая загрузка была бы избыточной, но хотелось показать, что умею работать с ней.
</script>
<style scoped lang="scss">
.filters {
  width: 100%;
  height: 100%;
  border: 1px solid #000000;
  background-color: #393839;
  display: flex;
  flex-direction: column;
  gap: 33px;
  align-items: center;
  padding: 16px 0;

  .filter {
    width: 42px;
    height: 42px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      opacity: 50%;
    }

    img:hover {
      opacity: 70%;
    }
  }

  .active-filter {
    img {
      opacity: 100%;
    }

    img:hover {
      opacity: 100%;
    }
  }
}
</style>