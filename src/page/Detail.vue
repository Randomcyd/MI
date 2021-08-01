<template>
  <div class="detail">
    <top-bar :message="topList"></top-bar>
    <div class="item-info">
      <h3>{{ this.$store.state.mainList[this.detail].name }}</h3>
      <div class="params">
        <a href="#">概述</a><span>|</span> <a href="#">参数</a><span>|</span>
        <a href="#">评价</a>
        <a @click="toBuyItem()" class="buy">立刻购买</a>
      </div>
    </div>
    <div class="pic">
      <h1>{{ this.$store.state.mainList[this.detail].name }}</h1>
      <h3>小米9 战斗天使</h3>
      <p>{{ this.$store.state.mainList[this.detail].subtitle }}</p>
      <span><b>￥</b>{{ +this.$store.state.mainList[this.detail].price }}</span>
    </div>

    <div class="detail-info">
      <img src="../../public/imgs/product/product-bg-2.png" />
    </div>

    <div class="pro-show"></div>

    <template>
      <el-carousel :interval="4000" type="card" height="300px">
        <el-carousel-item>
          <img src="../../public/imgs/product/gallery-2.png" alt="" style="width: 100%; height: 100%;">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../public/imgs/product/gallery-3.png" alt="" style="width: 100%; height: 100%;">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../public/imgs/product/gallery-4.png" alt="" style="width: 100%; height: 100%;">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../public/imgs/product/gallery-5.jpg" alt="" style="width: 100%; height: 100%;">
        </el-carousel-item>
        <el-carousel-item>
          <img src="../../public/imgs/product/gallery-6.jpg" alt="" style="width: 100%; height: 100%;">
        </el-carousel-item>
      </el-carousel>
    </template>

    <div class="item-video">
        <h2> 60帧超慢动作摄影 <br>慢慢回味每一瞬间的精彩 </h2>
        <p> 后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！ <br>更能AI 精准分析视频内容，15个场景智能匹配背景音效。 </p>
        <div class="video">
            <video src="../../public/imgs/product/video.mp4" controls="controls" autoplay="autoplay" muted="muted"></video>
        </div>
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
    };
  },
  props: ["info"],
  components: {
    TopBar,
  },
  methods:{
    toBuyItem(){
      this.$router.push('/bought');
    }
  },
  mounted() {
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
  },
};
</script>

<style lang="scss" scoped>
.detail {
  width: 100%;
}
.item-info {
  width: 100%;
  height: 70px;
  line-height: 70px;
  display: flex;
  justify-content: space-between;
  border-top: 1px solid #e5e5e5;
  h3 {
    font-size: 18px;
    color: #333;
    font-weight: bold;
  }
  .params {
    height: 70px;
    line-height: 70px;
    display: flex;
    align-items: center;
    a {
      color: #666;
      font-size: 16px;
    }
    span {
      font-size: 16px;
      margin: 0 4px;
    }
    .buy {
      background-color: #ff6600;
      border-radius: 0;
      display: inline-block;
      font-size: 14px;
      width: 110px;
      height: 30px;
      line-height: 30px;
      text-align: center;
      color: #fff;
      margin-left: 10px;
      cursor: pointer;
    }
  }
}

.pic {
  width: 100%;
  height: 718px;
  background: url("../../public/imgs/product/product-bg-1.png") no-repeat center;
  text-align: center;
  h1 {
    font-size: 80px;
    padding-top: 55px;
  }
  h3 {
    font-size: 24px;
    letter-spacing: 10px;
  }
  p {
    font-size: 16px;
    color: #333333;
    margin-top: 21px;
    margin-bottom: 40px;
  }
  span {
    font-style: normal;
    font-size: 38px;
    b {
      font-size: normal;
      font-size: 30px;
    }
  }
}

.detail-info {
  width: 100%;
  height: 480px;
  img {
    width: 100%;
    height: auto;
    margin-top: 40px;
  }
}

.pro-show {
  width: 100%;
  height: 638px;
  background: url("../../public/imgs/product/product-bg-3.png") no-repeat center;
  background-size: cover;
}

.item-video{
    width: 100%; height: 1044px; text-align: center;background-color: #070708;margin-bottom: 76px;color: #ffffff;
    h2{
        font-size: 60px;padding-top: 82px;margin-bottom: 47px; text-align: center;
    }
    p{
        font-size: 24px;margin-bottom: 58px; text-align: center;
    }
}

.video{
    width: 100%; height: 540px;
    video{
        width: 100%; height: 540px;
    }
}
</style>