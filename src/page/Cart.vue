<template>
  <div class="cart">
    <cart-bar></cart-bar>
    <div class="cart-content">
      <div class="item-list">
        <div class="cart-box">
          <ul class="cart-item-head">
            <li class="col-1">
              <span
                class="checkbox checked"
                @click="chooseAll()"
                ref="all"
              ></span
              >全选
            </li>
            <li class="col-3">商品名称</li>
            <li class="col-1">单价</li>
            <li class="col-2">数量</li>
            <li class="col-1">小计</li>
            <li class="col-1">操作</li>
          </ul>
          <ul class="cart-item-list">
            <li
              class="cart-item"
              v-for="(item, index) in cartList"
              :key="index"
            >
              <div class="item-check">
                <span
                  class="checkbox checked"
                  @click="choose(index)"
                  :ref="index"
                ></span>
              </div>
              <div class="item-name">
                <img
                  alt=""
                  data-src="https://cdn.cnbj1.fds.api.mi-img.com/mi-mall/6f2493e6c6fe8e2485c407e5d75e3651.jpg"
                  :src="cartList[index].mainImage"
                  lazy="loaded"
                /><span
                  >{{ cartList[index].name }} {{ cartList[index].phone }}</span
                >
              </div>
              <div class="item-price">{{ cartList[index].price }}</div>
              <div class="item-num">
                <div class="num-box">
                  <a href="javascript:;" @click="sub(index)">-</a
                  ><span>{{ cartList[index].itemNum }}</span
                  ><a @click="add(index)" href="javascript:;">+</a>
                </div>
              </div>
              <div class="item-total">{{ totalPrice(index) }}</div>
              <div class="item-del" @click="del(index)"></div>
            </li>
          </ul>
        </div>
        <div class="totPrice">
          <div class="tot-left">
            <a href="">继续购物</a>
            <p>
              共<span>{{ cartList.length }}</span
              >件商品，已选择<span>{{ cartList.length }}</span>件
            </p>
          </div>
          <div class="tot-right">合计：{{ totalPay() }}元</div>
        </div>
        <div class="btn">
          <router-link href="" to="/confirm">去结算</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CartBar from "../components/CartBar.vue";
export default {
  data() {
    return {
      cartList: this.$store.state.cartList,
    };
  },
  methods: {
    sub(index) {
      if (this.cartList[index].itemNum <= 1) {
        this.cartList[index].itemNum = 1;
      } else {
        this.cartList[index].itemNum--;
        this.$forceUpdate();
      }
    },
    add(index) {
      if (this.cartList[index].itemNum >= 10) {
        this.cartList[index].itemNum = 10;
      } else {
        this.cartList[index].itemNum++;
        this.$forceUpdate();
      }
    },
    choose(index) {
      if (this.$refs[index][0].className == "checkbox checked") {
        this.$refs[index][0].className = "checkbox";
        this.$refs.all.className = "checkbox";
      } else {
        this.$refs[index][0].className = "checkbox checked";
        for (let key in this.$refs) {
          if (key !='all' && this.$refs[key][0].className == "checkbox") {
              return
          }
        }
        this.$refs.all.className = 'checkbox checked'
      }
    },
    chooseAll() {
      if (this.$refs.all.className == "checkbox checked") {
        this.$refs.all.className = "checkbox";
        for (let key in this.$refs) {
          this.$refs.all.className = "checkbox";
          if (key != "all") {
            this.$refs[key][0].className = "checkbox";
          }
        }
      } else {
        this.$refs.all.className = "checkbox checked";
        for (let key in this.$refs) {
          if (key != 'all') {
            this.$refs[key][0].className = "checkbox checked";
          }  
        }
      }
    },
    del(index){
      this.$store.state.cartList.splice(index,1)
    }
    // toPay(){
    //   this.$router.push('/confirm')
    // }
  },
  components: {
    CartBar,
  },
  computed: {
    totalPrice() {
      return (index) => {
        return this.cartList[index].itemNum * this.cartList[index].price;
      };
    },
    totalPay() {
      return () => {
        let total = 0;
        for (let key in this.cartList) {
          total += this.cartList[key].itemNum * this.cartList[key].price;
        }
        return total;
      };
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-content {
  background-color: #f5f5f5;
  padding-top: 30px;
  padding-bottom: 114px;
  width: 100%;
  .item-list {
    width: 100%;
    margin: 0 auto;
    .cart-box {
      width: 100%;
      background-color: #fff;
      font-size: 14px;
      color: #999999;
      text-align: center;
    }
  }
}
.cart-item-head {
  display: flex;
  height: 79px;
  line-height: 79px;
  .col-1 {
    flex: 1;
  }
  .col-2 {
    flex: 2;
  }
  .col-3 {
    flex: 3;
  }
}
.cart-item {
  display: flex;
  align-items: center;
  height: 125px;
  border-top: 1px solid #e5e5e5;
  font-size: 16px;
  color: #333;
  .item-check {
    flex: 1;
  }
  .item-name {
    flex: 3;
    font-size: 18px;
    display: flex;
    align-items: center;
    span {
      margin-left: 30px;
    }
  }
  img {
    width: 80px;
    height: 80px;
    vertical-align: middle;
  }
  .item-price {
    flex: 1;
    color: #333;
  }
  .item-num {
    flex: 2;
  }
  .item-total {
    flex: 1;
    color: #ff6600;
  }
  .item-del {
    flex: 1;
    background: url("../../public/imgs/icon-close.png") no-repeat center;
    background-size: contain;
    cursor: pointer;
    width: 14px;
    height: 12px;
  }
}
.checkbox {
  display: inline-block;
  width: 22px;
  height: 22px;
  border: 1px solid #e5e5e5;
  vertical-align: middle;
  margin-right: 17px;
  cursor: pointer;
  box-sizing: border-box;
}
.checked {
  background: #ff6600;
  border: 4px solid #eee;
}
.totPrice {
  font-size: 14px;
  color: #666666;
  margin-top: 20px;
  height: 50px;
  line-height: 50px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  box-sizing: border-box;
  .tot-left {
    display: flex;
    a {
      margin-right: 10px;
      color: #666;
    }
    span {
      margin: 0 5px;
      color: #ff6600;
    }
  }
  .tot-right {
    font-size: 18px;
    color: #ff6600;
  }
}
.btn {
  width: 100%;
  a {
    display: block;
    width: 202px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    float: right;
    margin-right: 30px;
    text-align: center;
    background-color: #ff6600;
    color: #ffffff;
    border: none;
    cursor: pointer;
  }
}
.num-box {
  display: inline-block;
  width: 150px;
  height: 40px;
  line-height: 40px;
  border: 1px solid #e5e5e5;
  font-size: 14px;
  a {
    display: inline-block;
    width: 50px;
    color: #333333;
  }
  span {
    display: inline-block;
    width: 50px;
    color: #333333;
  }
}
</style>