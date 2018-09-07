<!-- 已经全局引入不用每个页面单独引入 -->
<template   >  
   <div id="home"> 
        <router-view  id="dddddddddddd">子路由页面</router-view>
        <headerCom :titleScoped="'扫码开票'"/>
        <div class="home"  >
                <div class="saoyisaoWrap">
                        <div class="saoyisao"   @click.stop.prevent="saoyisaoFn">
                            <p class="saoInfo"  >扫码开票</p>
                        </div>
                </div>
        </div>
        
    </div>


 
</template>


<script>
import { mapActions, mapGetters } from "vuex";
import { getSession,setSession } from "@util/sessionStorage";
export default {
  name: "App",
  components: {},
  data() {
    return {};
  },
  computed: {
    ...mapGetters("home", ["_info"])
  },
  created() {   
    //微信分享授权
    this.weixin({
      houtaiData: `url=${location.href}`,
      title: "扫一扫一键开票，开票原来如此简单！",
      desc: "扫码就能线上开具电子发票，比你想象中的还要更快一些~",
      link: location.href,
      
      imgUrl:`${process.env.innerGobleNetPort}home.jpg`
    });
  },
  methods: {
    getQueryString(result, name) {
     var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i"); 
				var r = result.substr(result.indexOf("?")  ).match(reg);  
				if(r != null) {
					return unescape(r[2]);
				} 
				return false;
    },
    saoyisaoFn() {
      var that = this; 
      
      wx.scanQRCode({
        needResult: 1,
        desc: "scanQRCode desc",
        success: function(res) {
          // alert('扫码成功')
          // 若是不是扫我们的二维码需要添加限制条件
          let tempResultStr = res.resultStr;
          var abc = {
            path: "/scanInvoice",
            query: { fapiaoId: that.getQueryString(tempResultStr, "fapiaoId") }
          };
          // 当他不存在 则提示不是微企宝二维码 且不能跳转
          if (!that.getQueryString(tempResultStr, "fapiaoId")) {
            that.$vux.alert.show({
              title: "提示",
              content: "不是微企宝二维码",
              onShow() {},
              onHide() {}
            });
            return;
          }else if(that.getQueryString(tempResultStr, "xxx") ){
              that.$router.push({path: '/'}); 
              return;  
          }
          that.$router.push({
            path: "/scanInvoice",
            query: { fapiaoId: that.getQueryString(tempResultStr, "fapiaoId") }
          });
        }
      });
    }
  }
};
</script>







<style  lang="less" scoped>
@import "../../common/index.less";

.home {
  position: relative;
  height: calc(100% - 1.173333rem);
  .bg-image("../../assets/images/background3");
  background-size: cover;
}
.saoyisaoWrap {
  width: 100%;
  height: 3.466667rem;
  position: absolute;
  top: 9.493333rem;
}
.saoyisao {
  border: 6px solid #daf4ff;
  height: 3.546667rem;
  width: 3.546667rem;
  margin: 0 auto;
  border-radius: 50%;
  .bg-image("../../assets/images/code");
  background-size: 0.88rem;
  background-position: center 0.853333rem;
  background-color: #fff;
  text-align: center;
  .saoInfo {
    font-size: 0.533333rem;
    margin-top: 2.12rem;
  }
}
</style>
