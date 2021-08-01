<template>
  <div class="content">
    <top-bar :message='topList'></top-bar>

    <div class="swiper-box">
      
      <div class="all-item" v-show="bannerItem=='show'">
        <a class="phone" v-for="(item,index) in phoneList" :key="'info1'+index">
          <img :src="item.mainImage">
          <h3>{{item.name}}</h3>
        </a>
        <a class="phone" v-for="(item,index) in phoneList" :key="'info2'+index">
          <img :src="item.mainImage">
          <h3>{{item.name}}</h3>
        </a>
        <a class="phone" v-for="(item,index) in phoneList" :key="'info3'+index">
          <img :src="item.mainImage">
          <h3>{{item.name}}</h3>
        </a>
      </div>
      <div class="list">
        <ul>
          <li v-for="(item,index) in classList" :key="index" @mouseover="bannerlistAction('show')" @mouseout="leaveAction()">{{item}}<i class="arrow"></i></li>
        </ul>
      </div>
      <div class="swiper-container">
        <div class="swiper-wrapper">
          <div class="swiper-slide" @click="toDetail(0)">
            <img src="../../public/imgs/slider/slide-1.jpg" />
          </div>
          <div class="swiper-slide" @click="toDetail(0)">
            <img src="../../public/imgs/slider/slide-2.jpg" />
          </div>
          <div class="swiper-slide" @click="toDetail(0)">
            <img src="../../public/imgs/slider/slide-3.jpg" />
          </div>
          <div class="swiper-slide" @click="toDetail(0)">
            <img src="../../public/imgs/slider/slide-4.jpg" />
          </div>
          <div class="swiper-slide" @click="toDetail(0)">
            <img src="../../public/imgs/slider/slide-5.jpg" />
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
    </div>

    <div class="ads">
        <a @click="toDetail(0)" class="ads-box"><img src="../../public/imgs/ads/ads-1.png"></a>
        <a @click="toDetail(1)" class="ads-box"><img src="../../public/imgs/ads/ads-2.jpg"></a>
        <a @click="toDetail(2)" class="ads-box"><img src="../../public/imgs/ads/ads-3.png"></a>
        <a @click="toDetail(3)" class="ads-box"><img src="../../public/imgs/ads/ads-4.jpg"></a>
    </div>

    <div class="banner" @click="toDetail(0)"><img src="../../public/imgs/banner-1.png"></div>

    <div class="item-display">
        <h1>手机</h1>
        <div class="item-content">
            <div class="left-content" @click="toDetail(0)">
                <img src="../../public/imgs/mix-alpha.jpg">
            </div>
            <div class="right-content" >
                <div class="item-wrap" v-for="(item1,index1) in phoneList2" :key="'info'+index1">
                    <span>新品</span>
                    <img :src="item1.mainImage">
                    <h3>{{item1.name}}</h3>
                    <p>{{item1.subtitle}}</p>
                    <a @click="addCart(index1)">{{item1.price}}<i class="cart"></i></a>
                </div>
            </div>
        </div>
    </div>

    <div class="service">
        <p><i class="icon setting"></i>预约维修服务</p>
        <p><i class="icon day7"></i>七天无理由退货</p>
        <p><i class="icon day15"></i>15天免费换货</p>
        <p style="border:0"><i class="icon post"></i>满150元包邮</p>
    </div>
    
  </div>
</template>

<script>
import TopBar from '../components/TopBar.vue'
export default {
  data(){
      return {
          classList:['手机 电话卡','电视 盒子','笔记本 平板','家电 插线板',
          '出行 穿戴','智能 路由器','电源 配件','生活 箱包'],
          phoneList:[],
          phoneList2:[],
          topList:[],
          activeIndex:null,
          bannerItem:null
      }
  },
  components:{
    TopBar
  },
  mounted() {
    console.log(sessionStorage);
    this.init();
    
    var mySwiper = new Swiper(".swiper-container", {
      loop: true, // 循环模式选项
      autoplay: {
        stopOnLastSlide: true,
      },

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
      scrollbar: {
        el: ".swiper-scrollbar",
      },
    });
  },
  methods:{
    init() {
      this.axios.get("/api/products", {
          params: {
            categoryId: 100012,
            // pageSize: 14
          }
        })
        .then(res => {
          this.phoneList = res.data.data.list.slice(0,8);
          this.topList = res.data.data.list.slice(0,6);
          this.phoneList2 = res.data.data.list.slice(0,8);
          this.$store.state.mainList = res.data.data.list.slice(0,8);
        });
    },
    exlistAction(index){
      this.activeIndex = index;
    },
    cancelAction(){
      this.activeIndex = null;
    },
    bannerlistAction(show){
      this.bannerItem = show;
    },
    leaveAction(){
      this.bannerItem = null;
    },
    toDetail(index){
      this.$router.push('/detail')
      this.$store.dispatch('toDetail',index);
    },
    addCart(index){
      this.phoneList2[index].itemNum = 1;
      this.$store.state.cartList.push(this.phoneList2[index]);
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  width: 100%;
}


.all-item{
  position: absolute; top: 0; left: 264px; background: #fff; justify-content: space-between;
  width: 962px; height: 100%; z-index: 3; opacity: .9; display: flex; flex-wrap: wrap;
  .phone{
    display: block; width: 24.8%; height: 17%; box-sizing: border-box; padding: 20px 20px;
    img{
      width:auto; height: 100%; vertical-align: middle;
    }
    h3{
      display: inline-block; font-weight: normal;vertical-align: middle; margin-left: 10px;
    }
  }
}

.list {
  width: 264px;height: 100%;background: #55585a7a;position: absolute;
  top: 0;left: 0;bottom: 0;z-index: 2; 
  ul{
      padding: 26px 0; height: 100%; box-sizing: border-box; display: flex; flex-direction:row-reverse; flex-wrap: wrap; 
      li{
          width: 100%;font-size: 16px;color: #fff;padding-left: 30px;height: 50px; line-height: 50px;position: relative;
          cursor: pointer;
      }
      li:hover{
          background: #FF6600;
      }
  }
}

.swiper-box{
    width: 100%; position: relative; height: 460px; overflow: hidden;
}

.swiper-container {
  width: 100%;
  overflow: hidden;
  img {
    width: 100%;
  }
  .swiper-slide{
    cursor: pointer;
  }
}

.swiper-button-prev{
    margin-left: 270px;
}

.arrow{
    background: url('../../public/imgs/icon-arrow.png') no-repeat;
    background-size: 10px 15px; position: absolute; right: 40px; top: 16px;
    display: inline-block; width: 10px; height: 15px; 
}

.ads{
    width: 100%; display: flex; justify-content: space-between; margin: 30px 0 20px 0;
    .ads-box{
        width: 296px; height: 167px; cursor: pointer;
        img{
            width: 100%; height: 100%; display: block;
        }
    }
}

.banner{
        width: 100%; margin-bottom: 30px; cursor: pointer;
        img{
            width: 100%; display: block;
        }
}

.item-display{
    width: 100%;
    h1{
        width: 100%; margin-bottom: 16px;
    }
    .item-content{
        width: 100%; display: flex; justify-content: space-between; 
        .left-content{
            width: 224px; height: 619px; cursor: pointer;
            img{
                width: 100%; height: 100%; display: block;
            }
        }
        .right-content{
            height: 619px; flex:1; display: flex; flex-wrap: wrap;align-content: space-between;
        }
    }
}

.item-wrap{
    width: 236px; height: 302px; box-sizing: border-box; border: 1px solid #eee; text-align: center;
    margin-left: 14px;
    span{
        width: 67px; height: 24px; background-color: #7ecf68; text-align: center; 
        line-height: 24px; display: inline-block; color: #fff;font-size: 14px;
    }
    img{
        display: block; width: 100%; height: 195px;
    }
    p{
        color: #999999;line-height: 13px;margin: 6px auto 13px;
    }
    a{
        color: #f20a0a;font-size: 14px;font-weight: bold; display: block; width: 100%; height: 22px;
        cursor: pointer;
        .cart{
            display: inline-block; width: 22px; height: 22px; line-height: 22px;
            background: url('../../public/imgs/icon-cart-hover.png') no-repeat ;
            background-size: 22px 18px; vertical-align: middle; margin-left: 4px;
        }
    }
}

.service{
    width: 100%; display: flex; justify-content: space-between; align-items: center; padding: 40px 0;
    p{
        width: 24.8%; border-right: 1px solid #e5e5e5; font-size: 16px; color: #666; text-align: center;
    }
    .icon{
        display: inline-block; vertical-align: middle; width: 20px; height: 20px;
    }
}

.setting{
    background: url('../../public/imgs/icon-setting.png') no-repeat; background-size: 20px 20px;margin-right: 6px;
}
.day7{
    background: url('../../public/imgs/icon-7day.png') no-repeat; background-size: 20px 20px;margin-right: 6px;
}
.day15{
    background: url('../../public/imgs/icon-15day.png') no-repeat; background-size: 20px 20px;margin-right: 6px;
}
.post{
    background: url('../../public/imgs/icon-post.png') no-repeat; background-size: 20px 20px;margin-right: 6px;
}

</style>