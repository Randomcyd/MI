<template>
  <div class="bought">
    <top-bar :message="topList"></top-bar>
    <div class="bought-wrap">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide">
              <img src="../../public/imgs/detail/phone-1.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="../../public/imgs/detail/phone-2.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="../../public/imgs/detail/phone-3.jpg" />
            </div>
            <div class="swiper-slide">
              <img src="../../public/imgs/detail/phone-4.jpg" />
            </div>
          </div>
          <!-- 如果需要分页器 -->
          <div class="swiper-pagination"></div>

          <!-- 如果需要导航按钮 -->
          <div class="swiper-button-prev"></div>
          <div class="swiper-button-next"></div>

          <!-- 如果需要滚动条 -->
          <div class="swiper-scrollbar"></div>
        </div>
      <div class="buy-params">
        <h2 class="item-title">{{ this.$store.state.mainList[this.detail].name }}</h2>
        <p class="item-info">相机全新升级 / 960帧超慢动作 / 手持超级夜景 / 全球首款双频GPS / 骁龙845处理器 / 红外人脸解锁 / AI变焦双摄 / 三星 AMOLED 屏</p>
        <div class="delivery">小米自营</div>
        <div class="item-price">{{this.$store.state.mainList[this.detail].price}}元<span class="del">1999元</span></div>
        <div class="item-addr">
          <i class="icon-loc"></i>
          <div class="addr">北京 北京市 朝阳区 安定门街道</div>
          <div class="stock">有现货</div>
        </div>
        <div class="item-version">
          <h2>选择版本</h2>
          <div class="phone" :class="{checked:phoneIndex==0}" @click="choosePhone(0)">6GB+64GB 全网通</div>
          <div class="phone" :class="{checked:phoneIndex==1}" @click="choosePhone(1)">4GB+64GB 移动4G</div>
        </div>
        <div class="item-color">
          <h2>选择颜色</h2>
          <div class="phone checked">深空灰</div>
        </div>
        <div class="total">
          <div class="total-info">
            <div class="left-info">小米9 6GB+64GB 全网通 深灰色</div>
            <div class="right-info">2599元</div>
          </div>
          <div class="total-price"></div>
        </div>
        <div class="add-cart" @click="addCart()">加入购物车</div>
      </div>
    </div>

    <div class="price-info">
      <h2>价格说明</h2>
      <img src="../../public/imgs/detail/item-price.jpeg" />
    </div>
  </div>
</template>

<script>
import TopBar from "../components/TopBar.vue";
export default {
  data() {
    return {
      topList: [],
      detail: this.$store.state.detailIndex,
      phoneIndex: 0,
    };
  },
  mounted() {
      console.log(this.detail);
    this.axios
      .get("/api/products", {
        params: {
          categoryId: 100012,
          // pageSize: 14
        },
      })
      .then((res) => {
        this.topList = res.data.data.list.slice(0, 8);
      });
    var mySwiper = new Swiper(".swiper-container", {
      loop: true, // 循环模式选项

      // 如果需要分页器
      pagination: {
        el: ".swiper-pagination",
      },

      // 如果需要前进后退按钮
      navigation: {
        nextEl: ".swiper-button-next",
        prevEl: ".swiper-button-prev",
      },

      // 如果需要滚动条
      
    });
  },
  components: {
    TopBar,
  },
  methods:{
      choosePhone(index){
        this.phoneIndex = index;
      },
      addCart(){
        this.$store.state.mainList[this.detail].itemNum = 1;

        if (this.phoneIndex==0) {
          this.$store.state.mainList[this.detail].phone = '6GB+64GB 全网通'
        }else{
          this.$store.state.mainList[this.detail].phone = '4GB+64GB 移动4G'
        }
        let item = JSON.parse(JSON.stringify(this.$store.state.mainList[this.detail]))
        this.$store.state.cartList.push(item);
        this.$router.push('/cart')
        // if (this.$store.state.cartList.indexOf(this.$store.state.mainList[this.detail])!=-1) {
        //     let n = this.$store.state.cartList.indexOf(this.$store.state.mainList[this.detail]);
        //     this.$store.state.cartList[n].itemNum +=1;
        //     console.log(n);
        // }else{
          
        // }
      }
  }
};
</script>

<style lang="scss" scoped>
.bought-wrap {
  width: 100%;
  display: flex;
  height: 870px;
}

.swiper-container {
  width: 642px; height: 617px; margin-top: 5px;
  overflow: hidden; margin-left: 0;
  img {
    width: 100%;
  }
  .swiper-slide {
    cursor: pointer;
  }
}

.buy-params{
    flex: 1;
    .item-title{font-size: 28px;padding-top: 30px;padding-bottom: 16px;height: 26px;}
    .item-info{font-size: 14px;height: 36px;}
    .delivery{font-size: 16px;color: #ff6700;margin-top: 26px;margin-bottom: 14px;height: 15px;}
    .item-price{font-size: 20px;color: #ff6700;height: 19px;}
    .del{font-size: 16px;color: #999999;text-decoration: line-through; display: block;}
    .item-addr{ height: 108px;background-color: #fafafa;border: 1px solid #e5e5e5;
    box-sizing: border-box;padding-top: 31px;padding-left: 64px;font-size: 14px; margin-top: 50px;
    line-height: 14px;position: relative;
        .addr{color: #666666; display: inline-block;}
        .icon-loc{display: inline-block; width: 20px; height: 20px; margin-right: 4px;
        background: url('../../public/imgs/detail/icon-loc.png') no-repeat center;
        background-size: contain; vertical-align: middle; position: relative; bottom: 2px;}
        .stock{margin-top: 15px;color: #ff6700;}
    }
    .item-version,.item-color{margin-top: 30px; width: 100%; display: flex; flex-wrap: wrap; justify-content: space-between;
        h2{width: 100%; margin-bottom: 20px;}
    }
    .phone{color: #333333;border: 1px solid #e5e5e5;width: 287px;height: 50px;
    line-height: 50px;font-size: 16px;box-sizing: border-box;text-align: center;cursor: pointer;}
    .total{height: 108px;background: #fafafa;padding: 24px 33px 29px 30px;
    font-size: 14px;margin-top: 50px;margin-bottom: 30px;box-sizing: border-box;}
    .add-cart{text-align: center;background-color: #FF6600;
    color: #ffffff;border: none;cursor: pointer;}
    .checked{border: 1px solid #ff6600;color: #ff6600;}
    .total-info{
        .right-info{
            font-size: 24px;color: #ff6600;margin-top: 16px;
        }
    }
    .add-cart{width: 300px;height: 54px;line-height: 54px;font-size: 16px;}
}
</style>