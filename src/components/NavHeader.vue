<template>
  <div class="header-wrap">
    <header class="header">
      <ul class="left-top-bar">
        <li>小米商城</li>
        <li>MUUI</li>
        <li>云服务</li>
        <li>协议规则</li>
      </ul>
      <div class="right-top-bar">
        <a class="login" @click="toLogin()" v-if="!$store.getters.isLogin">登录</a>
        <a class="login"  @click="exit()" v-if="$store.getters.isLogin">{{this.$store.state.username}}</a>
        <a class="cart" @click="toCart()"
          ><i class="icon-cart"></i>购物车({{
            this.$store.state.cartList.length
          }})</a
        >
      </div>
    </header>
  </div>
</template>

<script>
import Vuex from 'vuex';
export default {
  data() {
    return {
      username:''
    };
  },
  computed:{
    // ...Vuex.mapState(['username']),
    // ...Vuex.mapGetters(['isLogin'])
  },
  mounted() {
     console.log(this.$store.state.username);
  },
  methods: {
    toCart() {
      this.$router.push("/cart");
    },
    toLogin() {
      this.$router.push("/login");
    },
    exit(){
      sessionStorage.clear(); 
      this.$store.dispatch('saveUserName',null);
    }
  },
  computed: {
    
  },
};
</script>

<style scoped lang="scss">
.header-wrap {
  width: 100%;
  height: 39px;
  line-height: 39px;
  background: #333;
  color: #b0b0b0;
}

.header {
  width: 1226px;
  height: 39px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
}

.left-top-bar {
  display: flex;
  li {
    margin-right: 20px;
    cursor: pointer;
  }
}

.right-top-bar {
  display: flex;
  .login {
    display: block;
    height: 39px;
    line-height: 39px;
    margin-right: 16px;
    cursor: pointer;
  }
  .cart {
    display: block;
    height: 39px;
    line-height: 39px;
    padding: 0 16px;
    background: #ff6600;
    color: #fff;
    cursor: pointer;
  }
}

.icon-cart {
  background: url("../../public/imgs/icon-cart-checked.png") no-repeat 0px 10px;
  background-size: 100% 34%;
  margin-right: 4px;
  display: inline-block;
  width: 16px;
  height: 39px;
  vertical-align: middle;
}
</style>
