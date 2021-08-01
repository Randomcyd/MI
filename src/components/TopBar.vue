<template>
  <div class="top-bar">
    <div class="logo"></div>
    <ul class="product">
      <li @mouseover="exlistAction(0)" @mouseout="cancelAction()">小米手机</li>
      <li @mouseover="exlistAction(1)" @mouseout="cancelAction()">
        RedMi红米手机
      </li>
      <li @mouseover="exlistAction(2)" @mouseout="cancelAction()">电视</li>
    </ul>
    <div class="search">
      <input type="text" />
      <div class="search-box"></div>
    </div>
    <transition name="slide">
      <div
        class="top-list"
        v-show="activeIndex == 0"
        @mouseover="exlistAction(0)"
        @mouseout="cancelAction()"
      >
        <a class="top-item" v-for="(item, index) in message" :key="index">
          <img :src="item.mainImage" />
          <h3>{{ item.name }}</h3>
          <p>{{ item.price }}元起</p>
        </a>
      </div>
    </transition>
    <transition name="slide">
      <div
        class="top-list"
        v-show="activeIndex == 1"
        @mouseover="exlistAction(1)"
        @mouseout="cancelAction()"
      >
        <a class="top-item" v-for="(item, index) in message" :key="index">
          <img :src="item.mainImage" />
          <h3>{{ item.name }}</h3>
          <p>{{ item.price }}元起</p>
        </a>
      </div>
    </transition>
    <transition name="slide">
      <div
        class="top-list"
        v-show="activeIndex == 2"
        @mouseover="exlistAction(2)"
        @mouseout="cancelAction()"
      >
        <a class="top-item" v-for="(item, index) in message" :key="index">
          <img :src="item.mainImage" />
          <h3>{{ item.name }}</h3>
          <p>{{ item.price }}元起</p>
        </a>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeIndex: null,
    //   topList: [],
    };
  },
  props:['message'],
  methods: {
    exlistAction(index) {
      this.activeIndex = index;
    },
    cancelAction() {
      this.activeIndex = null;
    },
    mounted() {
        console.log(this.topList);
      this.axios
        .get("/api/products", {
          params: {
            categoryId: 100012,
            // pageSize: 14
          },
        })
        .then((res) => {
          this.topList = res.data.data.list.slice(0, 6);
          console.log(this.topList);
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.top-bar {
  width: 100%;
  height: 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.top-list {
  position: absolute;
  top: 150px;
  left: 0;
  width: 100%;
  height: 200px;
  background: #fff;
  z-index: 3;
  border-top: 1px solid #eee;
  box-shadow: 2px 2px 2px #ccc;
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.top-item {
  width: 17%;
  height: 100%;
  display: block;
  text-align: center;
  img {
    width: auto;
    height: 111px;
    display: inline-block;
    margin-top: 20px;
  }
  h3 {
    font-weight: bold;
    margin-top: 10px;
    margin-bottom: 8px;
    color: #333;
    font-size: 12px;
  }
  p {
    color: #ff6600;
    font-weight: bold;
  }
}

.logo {
  width: 55px;
  height: 55px;
  background: url("../../public/imgs/logo-mi.png") no-repeat;
  background-size: 55px 55px;
}

.product {
  height: 112px;
  display: flex;
  margin-left: -200px;
  li {
    height: 112px;
    line-height: 112px;
    cursor: pointer;
    font-weight: bold;
    font-size: 16px;
    margin-right: 24px;
  }
  li:hover {
    color: #ff6600;
  }
}

.search {
  height: 50px;
  width: 319px;
  border: 1px solid #e0e0e0;
  display: flex;
  input {
    width: 248px;
    height: 50px;
    padding-left: 14px;
    border: 0;
    border-right: 1px solid #e0e0e0;
  }
  .search-box {
    background: url("../../public/imgs/icon-search.png") no-repeat center;
    flex: 1;
    background-size: 18px 18px;
    cursor: pointer;
  }
}

.slide-enter,
.slide-leave-to {
  height: 0;
}
.slide-leave,
.slide-enter-to {
  height: 200px;
}

.slide-enter-active,
.slide-leave-active {
  transition: 0.5s ease;
}
</style>