import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../page/Home.vue';
import Detail from '../page/Detail.vue'
import Bought from '../page/Bought.vue'
import Cart from '../page/Cart.vue'
import Login from '../page/Login.vue'
import Register from '../page/Register.vue'
import Confirm from '../page/Confirm.vue'
import Order from '../page/Order.vue'
import AliPay from '../page/aliPay.vue'

Vue.use(VueRouter);

const routes = [
  {
    path: '/home',
    alias:'/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/detail',
    name: 'Detail',
    component: Detail,
  },
  {
    path: '/bought',
    name: 'Bought',
    component: Bought,
  },
  {
    path: '/cart',
    name: 'Cart',
    component: Cart,
    meta: {
      title:'cart',
      keepAlive:true
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/register',
    name: 'Register',
    component: Register,
  },
  {
    path: '/confirm',
    name: 'Confirm',
    component: Confirm,
  },
  {
    path: '/order',
    name: 'Order',
    component: Order,
  },
  {
    path: '/aliPay',
    name: 'AliPay',
    component: AliPay,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
