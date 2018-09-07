
<!-- 此页面作为数据联动单独组件 -->
<template>
  <div> 
      <div id="Bar"> 
            <!-- 二维码弹框 -->   
            <div v-transfer-dom>
            <x-dialog v-model="showHideOnBlur"   :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
                <div id="comone">
                    <img src="../../static/img/gongzhonghaoLogo.jpg"  >
                </div>
            </x-dialog>
            </div> 
      </div>
   
   </div>
</template>



 
<script>
import { mapState, mapActions, mapGetters } from "vuex";

import { setSession, getSession } from "@util/sessionStorage";

export default {
  data() {
    return {
      showHideOnBlur: false
    };
  },
  computed: {
    ...mapState({
      code: "code",
      weixinAuthData: "weixinAuthData"
    }),
    ...mapGetters("home", ["_info"])
  },

  components: {},
  
  created() { 
    //传递给后台的state  和  手动覆蓋路由_replaceState用来覆盖路由历史记录
    /*
    * 第一次未获取code   state等于后台需要手动回调的跳转页面   _replaceState用来覆盖路由历史记录
    * 第二次获取到了code  _replaceState用来覆盖路由历史记录
    */
     var  state = this.$route.query.redirect;
     var  _replaceState =   this.$route.query.beforeRedirect
     if(state == undefined){
       state = ''
     }
    //若本地有数据 则表示已经授权成功了 ,无需再次授权 此处本地缓存调用时机不对 ! 不能这样操作!! 会有bug!!!
   
    if ( this.$route.query.code  != '0') {
      let _params = {
        params: {
          code: this.$route.query.code
          // state: this.$route.query.state
        }
      };
      //获取用户openid
     
      this.weixinAuthOpenid(_params)
        .then(() => {
          
          history.replaceState(null, null,  _replaceState ); 
          // console.log("第一次", _replaceState );
          let _params = {
            params: {
              openid: this.weixinAuthData.openid
            }
          };

          this.weixinIsFocus(_params).then(() => { 
            let success = this.weixinAuthData.isFocus;
            if (success) {
              this.showHideOnBlur = false; 
              console.log("已经关注了"); 
              let paramsDate = {
                params: {
                  openid: this.weixinAuthData.openid,
                  RefCode: ""
                }
              };
              this.weixinBindCusAndRefCode(paramsDate).then(() => {
                //数据同步后台后 存入session
                
                setSession("_id", this.weixinAuthData.unionid); 
                this.getInfo();
              });
            } else {
              //未关注 则弹出二维码关注
              // // gongzhonghaoLogo
              // console.log("没有关注");
              // this.showHideOnBlur = true;
              // document.body.style.overflow = "hidden";
            }
          });
        })
        .catch(error => {
          // console.log("没有关注");
          //未关注 则弹出二维码关注
          this.showHideOnBlur = true;
          document.body.style.overflow = "hidden";
          // console.log(error, "====>m没有关注 === >  isWeixinAuth.vue页面授权报错了");
        });
    } else {
      //  to.path.
      //用户扫码后进入页面 1 => 获取code 2=> 在获取用户openid   3=>判断用户是否关注
 
      let replacePath = this.$route.path.substring(
          0,
          this.$route.path.indexOf("/isWeixinAuth/isWeixinAuth")
        );

        if (replacePath == "") {
          replacePath = "/";
        }
        
        
        
        //路由历史覆盖
        history.replaceState(null, null, _replaceState ); 
        
        window.location.replace(`https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxce4d12348f8df94d&redirect_uri=http%3A%2F%2Fapi.wqbol.net%2FWx%2Finvback&response_type=code&scope=snsapi_base&state=${state}&connect_redirect=1#wechat_redirect`);
    }
  },

  methods: {
    ...mapActions({
      weixinAuthOpenid: "weixinAuthOpenid",
      weixinIsFocus: "weixinIsFocus",
      weixinBindCusAndRefCode: "weixinBindCusAndRefCode"
    }),
    ...mapActions("home", {
      getUserInfo: "getUserInfo"
    }),
    onHide(onHide) {
    },
    getInfo() {
      let params = {
        UnionId: this.weixinAuthData.unionid
      };

      this.getUserInfo(params).then(res => {
        sessionStorage.setItem("customerInfo", JSON.stringify(this._info));


          let replacePath =   this.$route.query.beforeRedirect

        if (replacePath == "") {
          replacePath = "/";
        }
        
        ///isWeixinAuth
         this.$router.replace({"path": replacePath});
      }).catch(()=>{
      });
    }
  },
  beforeDestroy() {
    document.body.style.overflow = "visible";
  }
};
</script>

 


<style lang="less" type="stylesheet/css" scoped>
#Bar /deep/ .weui-dialog {
  position: fixed;
  display: table;
  z-index: 5000;
  width: auto;
  height: auto;
  top: 50%;
  right: 0;
  bottom: 0;
  left: 0%;
  background-color: #ffffff;
  text-align: center;
  border-radius: 3px;
  overflow: hidden;
  margin: -25% 0 0 0;
}
#comone {
  position: relative;
  height: 100%;
  width: 100%;
  margin-top: 10%;
  img {
    margin: 0 auto;
    width: 6.666667rem;
    height: 6.666667rem;
  }
}
</style>
