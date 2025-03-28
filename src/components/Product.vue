<template>
  <div class="product-card">
    <div @click="emit('openModal', product)">
      <img :src="product.thumbnail" :alt="product.title" />
      <h2>{{ product.title }}</h2>
      <p class="price">${{ product.price }}</p>
      <p>{{ product.description }}</p>
    </div>
    <button @click.prevent="emit('add-to-basket', product)">
      Add to Basket
    </button>
  </div>
</template>

<script setup>
const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
});

const emit = defineEmits(["add-to-basket", "openModal"]);
</script>

<style scoped lang="scss">
.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
  border-radius: 5px;
}
img {
  max-width: 100%;
  height: auto;
}
.price {
  font-weight: bold;
}
</style>