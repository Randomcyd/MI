<template>
  <div class="top-bar">
    <div class="tip">
        <div class="logo"></div>
        <h2>我的购物车</h2>
        <p>温馨提示：产品是否购买成功，以最终下单为准哦，请尽快结算</p>
    </div>
  </div>
</template>

<script>
export default {
 
};
</script>

<style lang="scss" scoped>
.top-bar {
  width: 100%;
  height: 112px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 2px solid #ff6600;
}

.logo {
  width: 55px;
  height: 55px;
  background: url("../../public/imgs/logo-mi.png") no-repeat;
  background-size: 55px 55px;
}

.tip{
  display: flex; height: 55px; line-height: 55px;
  h2{
    font-size: 28px;color: #333; margin-left: 54px;
  }
  p{
    font-size: 14px;margin-left: 17px;color: #999;font-weight: 200;
    position: relative; top: 6px;
  }
}
</style>