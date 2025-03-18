<template>
  <div class="banner">
    <div class="leftMenu" @click="emits('go-home')"><h3>Shopping</h3></div>
    <div class="centerMenu">
      <div v-for="category in categories" :key="category">
        <span :class="currentCategory == category ? 'currentCat': ''"
          @click="
            emits('filter-changed', {
              category: category,
            })
          "
          >{{ category }}</span
        >
      </div>
    </div>
    <div class="rightMenu" @click="emits('open-cart')">
      <i class="fa-solid fa-cart-shopping" style="font-size: 24px;"></i
      ><span
        v-if="basketCount > 0"
        style="
          position: absolute;
          top: -8px;
          right: -8px;
          background-color: red;
          color: white;
          border-radius: 50%;
          padding: 4px 6px;
          font-size: 12px;
          font-weight: bold;
        "
      >
        {{ basketCount }}
      </span>
    </div>
  </div>
</template>
<script setup>
import { ref, defineProps, onMounted } from "vue";
import Cart from "./components/Cart.vue";
import { useStore } from "vuex";

const store = useStore();
const emits = defineEmits(["open-cart", "filter-changed", "go-home"]);
const props = defineProps({
  categories: {
    type: Array,
  },
  basketCount: {
    type: Number,
  },
  currentCategory: {
    type: Number,
  }
});
</script>

<style scoped lang="scss">
.banner {
  justify-content: space-between;
  display: flex;
  align-items: center;
}

.centerMenu {
  justify-content: space-between;
  display: flex;
  gap: 20px;
}

.rightMenu {
  position: relative;
  display: inline-block;
}

.currentCat {
  border: solid 1px;
  padding: 5px;
  border-radius: 5px;
}
</style>