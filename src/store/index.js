import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    detailIndex:null,
    mainList:[],
    cartList:[],
    address:[],
    username:null,
    password:null
  },
  getters:{
    isLogin(state){
      if(state.username){
        return true;
      }else{
        return false;
      }
    }
  },
  mutations: {
  },
  actions: {
    toDetail(context,index){
      context.state.detailIndex = index;
    },
    addOrder(context,info){
      context.state.address = info;
    },
    saveUserName(context,info){
      context.state.username = info;
    }
  },
  modules: {
  },
});
