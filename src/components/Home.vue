<template>
  <div class="home">
    <AppTopBar
      class="appBanner"
      :categories="categoriesList"
      :basketCount="basketCount"
      :currentCategory="currentCat"
      @filter-changed="handleFilterChange"
      @go-home="
        (filters = {
          category: '',
          search: '',
          sort: '',
        }),
          (openCart = false),
          (productListTemp = productList),
          (currentCat = 'All')
      "
      @open-cart="openCart = true"
    />
    <div v-if="!openCart">
      <Filter @filter-changed="handleFilterChange" />
      <div class="product-list">
        <Product
          v-for="product in filteredProducts"
          :key="product.id"
          :product="product"
          @add-to-basket="addToBasket"
          @openModal="openModal(product)"
        />
      </div>
    </div>
    <div v-else>
      <Cart
        @go-home="
          (filters = {
            category: '',
            search: '',
            sort: '',
          }),
            (openCart = false),
            (basketCount = 0),
            (productListTemp = productList),
            (currentCat = 'All')
        "
      />
    </div>
    <Modal
      :product="selectedProduct"
      @close="closeModal"
      @add-to-basket="addToBasket"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useStore } from "vuex";
import AppTopBar from "../AppBanner.vue";
import Product from "./Product.vue";
import Filter from "./Filter.vue";
import Modal from "./Modal.vue";
import Cart from "./Cart.vue";

const store = useStore();
const openCart = ref(false);
const basketCount = ref(0);
const currentCat = ref('All');
const productList = ref([]);
const productListTemp = ref([]);
const categoriesList = ref([]);
const filters = ref({
  category: "",
  search: "",
  sort: "",
});
onMounted(() => {
  fetchProducts();
});
const filteredProducts = computed(() => {
  if (filters.value.category) {
    currentCat.value = filters.value.category;
    productListTemp.value = JSON.parse(JSON.stringify(productList.value)).filter(
      (product) =>
        product.category === filters.value.category ||
        filters.value.category == "All"
    );
  }
  if (filters.value.search) {
    productListTemp.value = JSON.parse(JSON.stringify(productList.value)).filter((product) =>
      product.title.toLowerCase().includes(filters.value.search.toLowerCase())
    );
  }
  if(filters.value.category && filters.value.search){
    productListTemp.value = JSON.parse(JSON.stringify(productList.value)).filter(
      (product) =>
        (product.category === filters.value.category && product.title.toLowerCase().includes(filters.value.search.toLowerCase())) ||
        filters.value.category == "All"
    );
  }
  if (filters.value.sort) {
    switch (filters.value.sort) {
      case "price-low-to-high":
        productListTemp.value.sort((a, b) => a.price - b.price);
        break;
      case "price-high-to-low":
        productListTemp.value.sort((a, b) => b.price - a.price);
        break;
      case "name-a-z":
        productListTemp.value.sort((a, b) => a.title.localeCompare(b.title));
        break;
    }
  }
  return productListTemp.value;
});
const fetchProducts = async () => {
  await store.dispatch("products/fetchProducts");
  productList.value = store.getters["products/getProducts"];
  productListTemp.value = JSON.parse(JSON.stringify(productList.value));
  categoriesList.value = [
    "All",
    ...new Set(productList.value.map((p) => p?.category)),
  ];
};
const handleFilterChange = (newFilters) => {
  if(newFilters["search"]) filters.value["search"] = newFilters["search"];
  if(newFilters["sort"]) filters.value["sort"] = newFilters["sort"];
  if(newFilters["category"]) filters.value["category"] = newFilters["category"];
  openCart.value = false;
};

const addToBasket = (product) => {
  store.commit("basket/addToBasket", product);
  basketCount.value = store.getters["basket/basketItemCount"];
};

const selectedProduct = ref(null);
const openModal = (product) => {
  selectedProduct.value = product;
};
const closeModal = () => {
  selectedProduct.value = null;
};
</script>

<style scoped lang="scss">
.home {
  padding: 10px;
}
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 10px;
}
</style>