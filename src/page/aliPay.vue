<template>
  <div>
      <div class="ali-pay">
          <div class="from" v-html="content"></div>
      </div>
  </div>
</template>

<script>
export default {
  components:{
  },
    data(){
      return {
        orderId: this.$route.query.orderId,
        content:'',
        loading:true
      }
    },
    mounted(){
      this.paySubmit()
    },
    methods:{
      paySubmit(){
          this.axios.post('api/pay',{
            orderId:this.orderId,
            orderName:'xiaomi',
            amount:'0.01',
            payType:1
          }).then((res) => {
            console.log(res);
            this.content = res.content;
            setTimeout(()=>{
              document.forms[0].submit();
            },100)
          })
      }
    }
}
</script>

<style>

</style>