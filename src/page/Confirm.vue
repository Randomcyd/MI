<template>
  <div class="confirm">
    <confirm-bar></confirm-bar>
    <div class="confirm-wrap">
      <div class="address">
        <h2>收货地址</h2>
        <div class="add-box-group">
          <div
            class="add-box"
            v-for="(item, index) in address"
            :key="index"
            :class="{ chosen: chooseIndex == index }"
            @click="chooseAdd(index)"
            ref="addbox"
          >
            <h3>{{ address[index].name }}</h3>
            <p>{{ address[index].tel }}</p>
            <p class="add">
              {{ address[index].add1 }} {{ address[index].add2 }}
              {{ address[index].add3 }} {{ address[index].add4 }}
            </p>
            <div class="btn-group">
              <a class="el-button" @click="deleteItem(index)">删除</a>
              <a class="el-button" @click="dialogVisible = true,edit(index)">编辑</a>
            </div>
          </div>
          <div class="new-add" @click="dialogVisible2 = true">
            <div class="add-img"></div>
            <p>添加新地址</p>
          </div>
        </div>
      </div>
      <div class="item">
        <h2>商品</h2>
        <ul class="item-ul">
          <li class="item-list" v-for="(item,index) in cartList" :key="index">
            <div class="item-name">
              <img :src="cartList[index].mainImage">
              <p>{{ cartList[index].name }}</p>
            </div>
            <div class="item-price">
              {{ cartList[index].price }}元x{{ cartList[index].itemNum }}
            </div>
            <div class="tot-item-price">
              {{ totalPrice(cartList[index].price,cartList[index].itemNum) }}
            </div>
          </li>
        </ul>
      </div>
      <div class="send">
        <h2>配送方式<span>包邮</span></h2>
      </div>
      <div class="iden">
        <h2>发票<span>电子发票</span><span>个人发票</span></h2>
      </div>
      <div class="pay-info">
        <div class="info-wrap">
          <div class="info-item">
            <div class="key">商品件数：</div>
            <div class="value">{{cartList.length}}件</div>
          </div>
          <div class="info-item">
            <div class="key">商品总价：</div>
            <div class="value">{{ totalPay() }}元</div>
          </div>
          <div class="info-item">
            <div class="key">优惠活动：</div>
            <div class="value">0元</div>
          </div>
          <div class="info-item">
            <div class="key">运费：</div>
            <div class="value">0元</div>
          </div>
          <div class="info-item big-item">
            <div class="key">应付总额：</div>
            <div class="value total-price">{{ totalPay() }}元</div>
          </div>
        </div>
      </div>
      <div class="btn-group-2">
        <router-link to="/cart" class="back">返回购物车</router-link>
        <router-link to="/order" @click.native="getOrderInfo()" class="to-pay">去结算</router-link>
      </div>
    </div>
    <el-dialog
      title="表单弹框"
      :visible.sync="dialogVisible"
      style="width: 1320px"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <div class="col">
          <input type="text" placeholder="姓名" class="input" :value="address[editingIndex].name" ref='name'>
          <input
            type="text"
            placeholder="手机号"
            class="input"
            style="margin-left: 15px"
            :value="address[editingIndex].tel"
            ref='tel'
          />
        </div>
        <div class="col">
          <select name="province" :value="address[editingIndex].add1" ref='province'>
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="河北">河北</option></select
          ><select name="city" :value="address[editingIndex].add2" ref='city'>
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="河北">石家庄</option></select
          ><select name="district" :value="address[editingIndex].add3" ref='district'>
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="河北">河北</option>
            <option value="天津">天津</option>
            <option value="河北">河北</option>
            <option value="天津">天津</option>
          </select>
        </div>
        <div class="col"><textarea name="street"></textarea></div>
        <div class="col">
          <input type="text" placeholder="邮编" class="input" />
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false ,update(editingIndex)"
          >确 定</el-button
        >
      </span>
    </el-dialog>
    <el-dialog
      title="表单弹框"
      :visible.sync="dialogVisible2"
      style="width: 1320px"
    >
      <el-form ref="form" :model="form" label-width="80px">
        <div class="col">
          <input type="text" placeholder="姓名" class="input" ref='name1'>
          <input
            type="text"
            placeholder="手机号"
            class="input"
            style="margin-left: 15px"
            ref='tel1'
          />
        </div>
        <div class="col">
          <select name="province" ref='province1'>
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="河北">河北</option></select
          ><select name="city" ref='city1'>
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="河北">石家庄</option></select
          ><select name="district" ref='district1'>
            <option value="北京">北京</option>
            <option value="天津">天津</option>
            <option value="河北">河北</option>
            <option value="天津">天津</option>
            <option value="河北">河北</option>
            <option value="天津">天津</option>
          </select>
        </div>
        <div class="col"><textarea name="street"></textarea></div>
        <div class="col">
          <input type="text" placeholder="邮编" class="input" />
        </div>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible2 = false ,addItem()"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import ConfirmBar from "../components/ConfirmBar.vue";
export default {
  mounted(){
    console.log(this.$store.state.cartList);
  },
  data() {
    return {
      dialogVisible: false,
      dialogVisible2: false,
      cartList:this.$store.state.cartList,
      form: {
        name: "",
        number: "",
      },
      editingIndex:0,
      address: [
        {
          name: '454',
          tel: 12345678910,
          add1: "北京",
          add2: "北京",
          add3: "天津",
          add4: "二环路",
        },
        {
          name: "小龙",
          tel: 1562332223,
          add1: "北京",
          add2: "北京",
          add3: "河北",
          add4: "二环路",
        },
        {
          name: "小王",
          tel: 1123214553,
          add1: "北京",
          add2: "天津",
          add3: "天津",
          add4: "三环路",
        },
      ],
      chooseIndex: 0,
    };
  },
  components: {
    ConfirmBar,
  },
  methods: {
    chooseAdd(index) {
      this.chooseIndex = index;
    },
    edit(index){
      this.editingIndex = index;
      console.log(this.$store.state.cartList);
    },
    update(index){
      this.address[index].name = this.$refs.name.value;
      this.address[index].tel = this.$refs.tel.value;
      this.address[index].add1 = this.$refs.province.value;
      this.address[index].add2 = this.$refs.city.value;
      this.address[index].add3 = this.$refs.district.value;
    },
    deleteItem(index){
      if (this.address.length == 1) {
 
      }else{
        this.address.splice(index,1);
      }
    },
    addItem(){
      let obj = {};
      obj.name = this.$refs.name1.value;
      obj.tel = this.$refs.tel1.value;
      obj.orderId = 12345678910;
      obj.add1 = this.$refs.province1.value;
      obj.add2 = this.$refs.city1.value;
      obj.add3 = this.$refs.district1.value;
      this.address.push(obj);
      console.log(this.address);
    },
    getOrderInfo(){
      this.$store.dispatch('addOrder',this.address[this.chooseIndex]);
    }
  },
  computed:{
    totalPrice() {
      return (a,b) => {
        return a*b;
      };
    },
    totalPay(){
      return () => {
        let total = 0;
        for (let key in this.cartList) {
          total += this.cartList[key].itemNum * this.cartList[key].price;
        }
        return total;
      };
    }
  }
};
</script>

<style lang="scss" scoped>
.none{
  display: none;
}
.confirm {
  width: 100%;
}
.confirm-wrap {
  width: 100%;
  padding: 10px 10px;
  box-sizing: border-box;
}
.address {
  width: 100%;
  margin-bottom: 40px;
  h2 {
    font-size: 20px;
    color: #333333;
    font-weight: 200;
    margin-bottom: 21px;
  }
  .add-box-group {
    width: 100%;
    display: flex;
    min-height: 180px;
    flex-wrap: wrap;
  }
}
.add-box {
  width: 271px;
  height: 180px;
  padding: 15px 24px;
  font-size: 14px;
  color: #757575;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  margin-left: 10px;
  margin-bottom: 10px;
  h3 {
    height: 27px;
    font-size: 18px;
    font-weight: 400;
    color: #333;
    margin-bottom: 10px;
  }
  p {
    font-size: 14px;
    color: #757575;
  }
  .add {
    height: 40px;
  }
  .btn-group {
    width: 100%;
    display: flex;
    justify-content: space-between;
    a {
      display: block;
      width: 80px;
      text-align: center;
      height: 50px;
      line-height: 50px;
      margin-top: 4px;
    }
  }
  .delete {
    display: block;
    width: 40px;
    height: 20px;
  }
  .edit {
    display: block;
    width: 40px;
    height: 20px;
  }
}
.new-add {
  width: 271px;
  height: 180px;
  padding: 15px 24px;
  font-size: 14px;
  color: #757575;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
  cursor: pointer;
  margin-left: 10px;
  text-align: center;
  .add-img {
    width: 30px;
    height: 30px;
    border-radius: 50%;
    background: url("../../public/imgs/icon-add.png") #e0e0e0 no-repeat center;
    background-size: 14px;
    margin: 0 auto;
    margin-top: 45px;
    margin-bottom: 10px;
  }
}
.item {
  width: 100%;
  h2 {
    border-bottom: 1px solid #e5e5e5;
    padding-bottom: 5px;
  }
}
.item-ul{
  border-bottom: 1px solid #e5e5e5; padding-bottom: 10px;
}
.item-list{
  width: 100%; display: flex; flex-wrap: nowrap; height: 40px; line-height: 40px;
  margin-top: 10px;font-size: 16px;
  img{width: 40px;height: 40px;vertical-align: middle;}
  .item-name{
    flex: 5; display: flex;
    p{
      font-size: 16px;color: #333333;
    }
  }
  .item-price{
    flex: 2;
  }
  .tot-item-price{
    padding-right: 44px;
    color: #ff6600;
  }
}
.send {
  width: 100%;
  margin-top: 36px;
  h2 {
    margin-right: 71px;
    font-size: 20px;
    width: 100%;
  }
  span {
    cursor: pointer;
    font-size: 16px;
    color: #ff6700;
    font-weight: normal;
    margin-left: 70px;
  }
}
.iden {
  width: 100%;
  margin-top: 30px;
  h2 {
    margin-right: 71px;
    font-size: 20px;
    width: 100%;
  }
  span {
    cursor: pointer;
    font-size: 16px;
    color: #ff6700;
    font-weight: normal;
    margin-left: 50px;
  }
}
.pay-info {
  width: 100%;
  padding: 40px 44px 33px 0;
  border-bottom: 1px solid #f5f5f5;
  height: 200px;
  font-size: 16px;
  color: #666666;
  box-sizing: border-box;
  text-align: right;
  .info-wrap {
    width: 18%;
    float: right;
  }
  .info-item {
    display: flex;
    justify-content: space-between;
    height: 20px;
    line-height: 20px;
    width: 100%;
    margin-top: 4px;
    .key {
      line-height: 20px;
    }
    .value {
      width: 120px;
      color: #ff6700;
    }
    .total-price {
      font-size: 28px;
      width: 120px !important;
    }
  }
  .big-item {
    margin-top: 20px;
    height: 30px;
    .key {
      line-height: 30px;
    }
    .value {
      width: 100px;
      color: #ff6700;
      line-height: 20px;
    }
  }
}
.btn-group-2 {
  margin: 37px 0;
  text-align: right;
  .back {
    width: 202px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    display: inline-block;
    text-align: center;
    background-color: #b0b0b0;
    color: #ffffff;
  }
  .to-pay {
    width: 202px;
    height: 50px;
    line-height: 50px;
    font-size: 18px;
    background-color: #ff6600;
    display: inline-block;
    text-align: center;
    color: #fff;
    margin-left: 20px;
  }
}
.chosen {
  border: 1px solid #ff6700;
}
.el-button {
  display: inline-block;
  width: 80px;
  text-align: center;
  height: 50px;
  line-height: 50px;
  margin-top: 4px;
  padding: 0 !important;
  border: 0;
}
.col {
  margin-bottom: 15px;
}
.input {
  display: inline-block;
  width: 283px;
  height: 40px;
  line-height: 40px;
  padding-left: 15px;
  border: 1px solid #e5e5e5;
}
select {
  height: 40px;
  line-height: 40px;
  border: 1px solid #e5e5e5;
  margin-right: 15px;
}
textarea {
  height: 62px;
  width: 100%;
  padding: 13px 15px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border: 1px solid #e5e5e5;
}
</style>