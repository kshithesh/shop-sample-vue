import { createStore } from 'vuex';

export default createStore({
  modules: {
    products: {
      namespaced: true,
      state: {
        allProducts: [],
      },
      mutations: {
        setProducts(state, products) {
          state.allProducts = products;
        },
      },
      actions: {
        async fetchProducts({ commit }) {
          try {
            const response = await fetch('https://dummyjson.com/products');
            const data = await response.json();
            commit('setProducts', data.products);
          } catch (error) {
            console.error('Error fetching products:', error);
          }
        },
      },
      getters: {
        getProducts: (state) => state.allProducts,
      },
    },
    basket: {
      namespaced: true,
      state: {
        items: [],
      },
      mutations: {
        addToBasket(state, product) {
          const existingItem = state.items.find(item => item.product.id === product.id);
          if (existingItem) {
            existingItem.quantity++;
          } else {
            state.items.push({ product, quantity: 1 });
          }
        },
        removeFromBasket(state, productId) {
          state.items = state.items.filter(item => item.product.id !== productId);
        },
        updateQuantity(state, { productId, quantity }) {
          const item = state.items.find(item => item.product.id === productId);
          if (item) {
            item.quantity = quantity;
          }
        },
        clearBasket(state){
          state.items = [];
        }
      },
      getters: {
        basketItemCount: (state) => state.items.reduce((sum, item) => sum + item.quantity, 0),
        basketTotal: (state) =>
          state.items.reduce((total, item) => total + item.product.price * item.quantity, 0),
      },
    },
  },
});