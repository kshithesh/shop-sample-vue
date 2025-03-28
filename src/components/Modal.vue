<template>
  <div v-if="product" class="product-modal">
    <div class="modal-content">
      <span class="close" @click="closeModal">&times;</span>
      <h2>{{ product.title }}</h2>
      <img :src="product.thumbnail" :alt="product.title" />
      <p class="price">${{ product.price }}</p>
      <p>{{ product.description }}</p>
      <button @click.prevent="addToBasket(product)">Add to Basket</button>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  product: {
    type: Object,
    required: false,
  },
});

const emit = defineEmits(["close", "add-to-basket"]);

const closeModal = () => {
  emit("close");
};

const addToBasket = (product) => {
  emit("add-to-basket", product);
  closeModal();
};
</script>

<style scoped lang="scss">
.product-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  color: black;
}

.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>