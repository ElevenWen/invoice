<style lang="less" scoped>
@import "../../common/index.less";
@import "business.less";
</style>
<template>
<div>
    <div id="first" class="routerView-44px">
        <!-- 标题 -->
        <headerCom :titleScoped="'成为商家'"></headerCom>
        <router-view></router-view>
        <div>
            <div class="firstOne">第一步：基本信息</div>
            <!-- 表单信息 -->
            <div class="name">
                <span class="redStart">*</span>
                <span class="nameWord">商户名称</span>
                <input type="text" placeholder="请填写商户名称" v-model="businessName" maxlength="120" @input="check">
            </div>
            <div class="name">
                <span class="redStart">*</span>
                <span class="nameWord space">用户名</span>
                <input type="text" placeholder="请填写用户姓名" v-model="custormerName" maxlength="20" @input="check">
            </div>
            <div class="name">
                <span class="redStart">*</span>
                <span class="nameWord">手机号码</span>
                <input type="num" placeholder="请填写手机号码" v-model="telphone" @blur="checkTel" @input="check" maxlength="11">
            </div>
            <div class="name">
                <span class="redStart">*</span>
                <span class="nameWord space">验证码</span>
                <input type="text" placeholder="请填写验证码" v-model="telCode" @blur="checkCode" @input.stop="check($event,'telCode')"  @change.stop="checkChange($event)">
                <!-- <span :class="getCode ? 'getCode' : 'getCode2'" @click="getTelC" >{{getCode ? "获取验证码" : timer}}</span> -->
                <span class="getCode" @click="getTelC" v-if="getCode">获取验证码</span>
                <span class="getCode2" v-else>{{timer}}</span>
            </div>
            <!-- 下一步 -->
            <div class="confirmIviW" @click="toSecond">
                <img src="../../assets/images/highlighted-button2@2x.png" alt="" class="confirmIvi" v-if="isGrayOrBlue">
                <img src="../../assets/images/highlighted-button@2x.png" alt="" class="confirmIvi" v-else>
                <span>下一步</span>
            </div>
        </div>
        
    </div>
</div>
</template>
<script>
import tool from "@util/tool.js";
import { setInterval, clearTimeout, clearInterval } from "timers";
import { mapState, mapActions, mapGetters } from "vuex";
import getData from "@vuex/ajaxAPI/getData";
var countDown = null;
export default {
  data() {
    return {
      businessName: "", //商户名称
      custormerName: "", //用户名
      telphone: "", //手机号码
      telCode: "", //验证码
      getCode: true,
      timer: 60,
      isGrayOrBlue: true, //是否显示蓝色按钮
      telStatus: false,
      codeStatus: false,
      noClickMore: true, 
    };
  },
  created() {},
  computed: {
    ...mapState("business", {
      code: "code",
      businessId: "businessId"
    })
  },
  methods: {
    ...mapActions("business", {
      getCodee: "getCodee",
      firstOne: "firstOne"
    }),
    // 去第二步
    toSecond() {
      console.log("灰色吗", this.isGrayOrBlue);
      if (!this.isGrayOrBlue) {
        let params = {
          ShopName: this.businessName,
          Name: this.custormerName,
          Mobile: this.telphone,
          VerifyCode: this.telCode
        };
        this.firstOne(params)
          .then(res => {
            if (this.businessId != "") {
              this.$router.push({
                path: "/business/second",
                query: { id: this.businessId }
              });
            } else {
              this.$vux.toast.text("网络故障,请刷新页面后重试", "middle");
            }
          })
          .catch(err => {
            this.$vux.toast.text(err, "middle");
          });
      } else {
        this.$vux.toast.text("请先获取验证码", "middle");
      }
    },
    check(e, leixing) {
      if (leixing == "telCode") {
        //过滤验证码的汉子 和 6位数
        let tempValue = e.target.value.replace(/\D/gi, "");
        this.telCode = tempValue;
        if (tempValue.length >= 6) {
          this.telCode = Number(tempValue.slice(0, 6));
        }
      }
      console.log(
        this.businessName,
        this.custormerName,
        this.checkTel2(),
        this.checkCode2()
      );
      if (
        this.businessName &&
        this.custormerName &&
        this.checkTel2() &&
        this.checkCode2()
      ) {
        this.isGrayOrBlue = false;
      } else {
        this.isGrayOrBlue = true;
      }
      console.log(this.isGrayOrBlue, "?");
    },
    checkChange(e) {
      //     console.log(1,e)
      //   let tempValue = e.target.value.replace(/\D/gi, "");
      //   console.log(tempValue)
      //   this.telCode = tempValue;
      //   if (tempValue.length >= 6) {
      //     this.telCode = Number(tempValue.slice(0, 6));
      //   }
    },
    checkCode2() {
      if (this.telCode.toString().length > 5) {
        return true;
      } else {
        return false;
      }
    },
    // 验证验证码
    checkCode() {
      if (toString(this.telCode).length.length != 0) {
        let status = tool.regularJudgement("noteCode", this.telCode);
        // console.log("status",status)
        if (!status) {
          return false;
        }
        this.codeStatus = status;
        // console.log("status2",this.codeStatus)
        return this.codeStatus;
      }
    },
    // 验证手机号
    checkTel() {
      if (this.telphone.length != 0) {
        let status = tool.regularJudgement("phone", this.telphone);
        if (!status) {
          return false;
        }
        this.telStatus = status;
        return this.telStatus;
      }
    },
    checkTel2() {
      let reg = /(^1[3|4|5|7|8][0-9]{9}$)/.test(this.telphone);
      if (!reg) {
        return false;
      } else {
        return true;
      }
    },
    // 获取验证码
    getTelC() {
      if (!this.telphone) {
        this.$vux.toast.text("请先填写手机号", "middle");
        return;
      }
      if (!this.checkTel()) {
        return;
      }
      this.getCode = false;
      this.noClickMore = false;
      let param = {
        mobile: this.telphone
      };
      this.getCodee(param);
      // .then((res) => {
      countDown = setInterval(() => {
        if (this.timer <= 1) {
          this.timer = 60;
          this.getCode = true;
          clearInterval(countDown);
          this.noClickMore = true;
        } else {
          this.timer--;
        }
      }, 1000);
      // });
    }
  },
  beforeDestroy() {
    clearInterval(countDown);
  }
};
</script>
