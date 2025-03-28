<template>
  <div class="shopping-cart">
    <h2>Shopping Basket</h2>
    <div v-if="basketItems.length === 0">
      <p>Your basket is empty.</p>
    </div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in basketItems" :key="item.product.id">
            <td>{{ item.product.title }}</td>
            <td>
              <input
                type="number"
                v-model.number="item.quantity"
                @change="updateQuantity(item.product.id, $event.target.value)"
                min="1"
              />
            </td>
            <td>${{ item.product.price }}</td>
            <td>${{ item.product.price * item.quantity }}</td>
            <td>
              <button @click="removeFromBasket(item.product.id)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="basket-total">
        <strong>Overall Total: ${{ basketTotal }}</strong>
      </div>
      <button @click.prevent="checkOut">Check-out</button>
    </div>
  </div>
</template>

<script setup>
import { useStore } from "vuex";
import { computed } from "vue";

const store = useStore();
const emit = defineEmits(["go-home"]);
const basketItems = computed(() => store.state.basket.items);
const basketTotal = computed(() => {
  return basketItems.value.reduce((total, item) => {
    return total + item.product.price * item.quantity;
  }, 0);
});

const removeFromBasket = (productId) => {
  store.commit("basket/removeFromBasket", productId);
};

const updateQuantity = (productId, quantity) => {
  store.commit("basket/updateQuantity", {
    productId,
    quantity: parseInt(quantity) > 0 ? parseInt(quantity) : 1,
  });
};

const checkOut = () => {
  alert("Checked-Out");
  store.commit("basket/clearBasket");
  emit("go-home");
};
</script>

<style scoped lang="scss">
.shopping-cart {
  border: 1px solid #ccc;
  padding: 10px;
  margin-top: 20px;
  width: 100%;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th,
td {
  border: 1px solid #ccc;
  padding: 5px;
  text-align: left;
}
.basket-total {
  text-align: right;
  margin-top: 10px;
}
</style>