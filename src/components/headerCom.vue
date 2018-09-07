<template>
  <div id="headerWrap"> 
     <div class="header">
       <span class="left" @click.stop.prevent="returnFn"></span>
       <span class="center">{{titleScoped}}</span>
       <span class="right" @click="alertDialog">
         <ul class="rightListWrap" v-show="rightToggleData && (titleScoped=='商家信息'||titleScoped=='开票记录'||titleScoped=='开票处理')">
            <li class="listItems anotherListItems" :key="index" v-for="(items , index) in lessList" @click="goLessRouter(index)"> 
              {{items}}
              <span class="hrWrap"></span>
            </li>
          </ul>
          <ul class="rightListWrap" v-show="rightToggleData && (titleScoped!='商家信息'&&titleScoped!='开票记录'&&titleScoped!='开票处理')">
            <li class="listItems" :key="index" v-for="(items , index) in rightList" @click="goOtherRouter(index)"> 
              {{items}}
              <span class="hrWrap"></span>
            </li>
          </ul>
          
       </span>
     </div>
  </div>
</template>

<script>
// import tool from "@util/tool.js";
// import { Toast } from 'vux'
// import { getSession } from "@util/sessionStorage";
import {mapActions,mapGetters} from 'vuex';
export default {
  name: "HelloWorld",
  props: {
    titleScoped: {
      type: String,
      default: "电子发票"
    }
  },
  data() {
    return {
      rightList: ["我的抬头", "我的发票", "成为商家", "个人中心"],
      lessList: ["开票处理", "开票记录"],
      rightToggleData: false,
      isBusiness: -1,
      arr:[],
      businessStatus:-1,
    };
  },
  computed:{
      ...mapGetters(
          'billingProcessing',['getinvoiceList']
      )
  },
  created() {
    this.$nextTick(() => {
      this.bodyCloseDialog();
      document.getElementById("headerWrap").nextElementSibling.style =
        "margin-top:1.173333rem";
    }); 
    if (JSON.parse(sessionStorage.getItem("customerInfo"))) {
      //判断有没有成为商家
      this.isBusiness = JSON.parse(
        sessionStorage.getItem("customerInfo")
      ).IsShop;
      this.businessStatus = JSON.parse(
        sessionStorage.getItem("customerInfo")
      ).Status;
    }
  },
  methods: {
    alertDialog() {
      this.rightToggleData = !this.rightToggleData;
      return false;
    },
    returnFn() {
      // if(this.$router.currentRoute.name == "addInvoice"){
      //   // this.$router.push("/billingProcessing/invoiceList")
      // }else{
        this.$router.go(-1);
      // }
    },
    bodyCloseDialog() {
      document.getElementById("app").addEventListener(
        "click",
        function(e) {
          if (e.target == document.getElementsByClassName("right")[0]) {
            this.rightToggleData = true;
          } else if (e.target == document.getElementsByClassName("right")[0]) {
          } else if (e.target.type == "file") {
            return;
          } else {
            this.rightToggleData = false;
          }
          // 阻止默认行为阻止冒泡
          e.preventDefault();
          e.stopPropagation();
        }.bind(this),
        false
      );
    },
    goOtherRouter(index) {
      switch (index) {
        case 0:
          this.$router.push("/invoiceTitle/myInvoiceTitle");
          break;
        case 1:
          this.$router.push("/myInvoice/myInvoice");
          break;
        case 2:
          // 要先判断是否已完成认证步骤
          console.log(this.isBusiness)
          if((this.isBusiness == 1 && this.businessStatus == 0) || this.isBusiness == 0){
            this.$router.push("/business/first");
          }else if((this.isBusiness == 1 && this.businessStatus == 1) || (this.isBusiness == 1 && this.businessStatus == 2) || (this.isBusiness == 1 &&this.businessStatus == 3)){
            // this.$router.push("/business/first");
            this.$vux.toast.text('您已经是商家了', 'middle')
          }
          break;
        case 3:
          this.$router.push("/personalcenter");
          break;
      }
    },
    goLessRouter(index) {
      if (index == 0) {
        this.$router.push("/billingProcessing/invoiceList");
      } else {
        this.$router.push("/billingProcessing/invoiced");
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style   lang="less"  scoped>
@import "../common/index.less";

#headerWrap {
  background: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0; 
  border: 1px solid #f2f2f2;
  box-shadow: 0px 1px 2px #f2f2f2;
  z-index: 9933;
  .header {
    height: 1.173333rem;
    line-height: 1.173333rem;
    font-size: 0.453333rem;
    position: relative;
  }
  .left {
    .fl;
    width: 0.666667rem;
    height: 100%;
    .bg-image("../assets/images/return");
    background-size: 0.28rem 0.493333rem;
    background-position: right center;
    z-index: 199;
  }
  .right {
    height: 100%;
    .fl(right);
    width: 0.933333rem;
    .bg-image("../assets/images/menu");
    background-size: 0.533333rem 0.386667rem;
    background-position: left center;
    position: relative;
  }
  .center {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    text-align: center;
  }
}
.rightListWrap {
  position: absolute;
  z-index: 999;
  top: 1.173333rem;
  right: 0.266667rem;
  width: 4rem;
  background: black;
  .c(white);
  .sanB;
  border-radius: 0.11rem;
}
.listItems {
  width: 100%;
  height: 1.066667rem;
  line-height: 1.066667rem;
  padding-left: 1.2rem;
  padding-right: 0.266667rem;
  background-size: 0.48rem 0.533333rem;
  background-position: 0.346667rem center;
  font-size: 0.373333rem;
  &:nth-child(1) {
    .bg-image("../assets/images/Look-up");
  }
  &:nth-child(2) {
    .bg-image("../assets/images/invoice");
  }
  &:nth-child(3) {
    .bg-image("../assets/images/merchants");
  }
  &:nth-child(4) {
    .bg-image("../assets/images/Personalcenter");
    .border-none;
  }
  span {
   .border-1pxB(#717171); 
    height: 1px;
    width: 100%;
    margin-top:-1px;
    display: block;
  }
}
.anotherListItems {
  &:nth-child(1) {
    .bg-image("../assets/images/dealwith");
  }
  &:nth-child(2) {
    .bg-image("../assets/images/record");
  }
}
</style>
