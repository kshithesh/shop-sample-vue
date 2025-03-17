<template>
  <div class="product-filters">
    <input type="text" v-model="searchQuery" placeholder="Search products...">
    <select v-model="sortFilter">
      <option value="">Sort by</option>
      <option value="price-low-to-high">Price: Low to High</option>
      <option value="price-high-to-low">Price: High to Low</option>
      <option value="name-a-z">Name: A-Z</option>
      </select>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';

const emit = defineEmits(['filter-changed']);

const categoryFilter = ref('');
const searchQuery = ref('');
const sortFilter = ref('');

watch([categoryFilter, searchQuery, sortFilter], () => {
  emit('filter-changed', {
    category: "",
    search: searchQuery.value,
    sort: sortFilter.value
  });
});
</script>

<style scoped lang="scss">
.product-filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}
</style>