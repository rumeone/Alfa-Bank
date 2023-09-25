import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import MenuComponent from "./components/MenuComponent.vue";

Vue.config.productionTip = false;

Vue.use(VueRouter);

const routes = [
  { path: '/', component: MenuComponent },
];

const router = new VueRouter({
  routes,
  mode: 'history',
});

new Vue({
  render: h => h(App),
  router,
}).$mount('#app');
