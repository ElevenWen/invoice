<!--  新增发票抬头 -->
<template>
    <div>
        <div id="invoiceTitle"> 
          <router-view  id="dddddddddddd">子路由页面</router-view> 
          <headerCom :titleScoped="'发票抬头'"></headerCom>    
          <div class="top">
              请选择发票种类
          </div>
          <div class="choice">
              <span>
                  增值税普通发票
              </span>
          </div>
          <div class="info_t">
              请填写抬头信息，<span>*</span> 为必填，    <span>o</span> 为选填
          </div>
      
          <div class="base_info">
              <div  >
                  <div>
                      <div class="titleBox ">
                        <div class=" box">
                            <span class="span_x">*</span> <span>类型</span>
                          <span class="lebalSpan" @click="checkTypeId(1)"><i><img :src="crrentTypeId == 1?selected:noSelected" alt=""></i>企业</span>
                          <span class="lebalSpan" @click="checkTypeId(2)"><i><img :src="crrentTypeId == 2?selected2:noSelected2" alt=""></i>个人</span>
                
                        </div>
                      </div>
                  </div>
                  <ul class="baseInfo"   v-if="crrentTypeId == 1">
                      <li> 
                      <div class="box">
                              <span class="span_x">*</span> <span>抬头</span>
                              <!-- 此处查询数据为天眼查   -->
                              <!-- <input type="text" placeholder="请填写企业名称" @input="titleInputFn($event) "    maxlength="30" @blur="verifyC1()"  @change="titleInputFn"  v-model="enterprise1.Name"> -->
                              <input type="text" placeholder="请填写企业名称" @input="titleAddShowListFn('3') "    maxlength="30" @blur="verifyC1()"    v-model="enterprise1.Name">
                              
                        </div> 
                      </li>
                      <li> 
                          <div class="box">
                              <span class="span_o">o</span> <span>手机</span>
                              <!-- <input type="tel"  maxlength='11' placeholder="请填写手机号码(选填)" v-model="enterprise1.Mobile" @blur="verifyP1()"  @input="verifyP1Promptly"> -->
                              <input type="tel"  maxlength='11' placeholder="请填写手机号码(选填)" v-model="enterprise1.Mobile" @blur="verifyP1()"   >
                              
                          </div>
                      </li>
                      <li> 
                          <div class="box boxNo">
                              <span class="span_o">o</span> <span>邮箱</span>
                              <!-- <input type="text" placeholder="请填写邮箱地址(选填)" maxlength="50" v-model="enterprise1.Email " @blur="verifyEmail1()" @input="verifyEmail1Promptly"> -->
                              <input type="text" placeholder="请填写邮箱地址(选填)" maxlength="50" v-model="enterprise1.Email " @blur="verifyEmail1()"  >
                              
                          </div>
                      </li>
                  </ul>
                  <ul class="baseInfo"   v-if="crrentTypeId == 2">
                      <li>
                        <div class="box">
                              <span class="span_x">*</span> <span>姓名</span>  
                              <input type="text" placeholder="请填写个人姓名"     maxlength="30" @blur="verifyC2()"  @change="verifyC2Promptly"  v-model="enterprise2.Name">
                        </div>
                      </li>
                      <li>
                          <div class="box">
                              <span class="span_o">o</span> <span>手机</span>
                              <input type="tel"  maxlength='11'   placeholder="请填写手机号码(选填)" v-model="enterprise2.Mobile" @blur="verifyP2()"  @input="verifyP2Promptly">
                          </div>
                      </li>
                      <li>
                          <div class="box boxNo">
                              <span class="span_o">o</span> <span>邮箱</span>
                              <input type="text" placeholder="请填写邮箱地址(选填)" maxlength="50" v-model="enterprise2.Email " @blur="verifyEmail2()" @input="verifyEmail2Promptly"> 
                          </div>
                      </li>
                  </ul>
              </div>
              <ul class="otherInfo" v-if="crrentTypeId == 1">
                  <li>
                      <div class="box">
                          <span class="hiddenSpan">o</span>
                          <span>税号</span>
                          <input type="text" placeholder="税号(点击可编辑)" v-model="enterprise1.Tax" @blur="verifyTN">
                      </div>
                  </li>
                  <li @click="showMore">
                      <div class="box">
                          <span class="hiddenSpan">o</span>
                          <span>其它</span>
                          <span>
                              <img :src="openImg" alt="">
                          </span>
                      </div>
                  </li>
              </ul>
              <ul class="otherInfoMoreShow" v-if="moreShow">
                  <li>
                    <div class="box">
                          <span class="hiddenSpan">o</span>
                          <span>银行</span>
                          <input type="text" placeholder="请填写开户行" maxlength="50" @blur="verifyB" v-model="enterprise1.Bank">
                    </div>
                  </li>
                  <li>
                    <div class="box">
                          <span class="hiddenSpan">o</span>
                          <span>账号</span>
                          <input type="text" placeholder="请填写银行账号" v-model="enterprise1.Account" @input="verifyAccount($event)"   @blur="verifyAccountFn"  maxlength="24">
                    </div>
                  </li>
                  <li>
                      <div class="box">
                          <span class="hiddenSpan">o</span>
                          <span>地址</span>
                          <input type="text" placeholder="请填写详细地址" maxlength="120" @blur="verifyAddress" v-model="enterprise1.Address">
                      </div>
                  </li>
                  <li>
                      <div class="box boxNo">
                          <span class="hiddenSpan">o</span>
                          <span>电话</span>
                          <input type="text" placeholder="请填写注册电话" @blur="verifyTel" v-model="enterprise1.Tel">
                      </div>
                  </li>
              </ul>
              
              <!-- 从后台获取数据 -->
              <div class="title_check"  v-if="titleCheckShow1">
                  <ul>
                      <li @click="houtaiCheckCompany(items)" v-for="(items ,index)  in  getInvHeadlistData.list"  :key="index">
                          {{items.Name}}
                      </li>
                    
                  </ul>
                  <div @click="close">
                      <span class="close">关闭</span>
                  </div>
              </div>
              <!-- 从第三方 和 后台获取数据 -->
              <div class="title_check"  v-if="titleCheckShow2">
                  <ul>
                      <li @click="checkCompany(items)" v-for="(items ,index)  in  getInvHeadlistData.list"  :key="index">
                          {{items.Name}}
                      </li>
                    
                  </ul>
                  <div @click="close">
                      <span class="close">关闭</span>
                  </div>
              </div>
          </div>
      
          <div class="button_box" v-if="crrentTypeId == 1">
              <button :class="{doClick:doClick1}" @click="save(1)">保存</button>
          </div>
          <div class="button_box" v-else>
              <button :class="{doClick:doClick2}" @click="save(2)">保存</button>
          </div>
      </div>
    </div>
</template>

<style lang="less" scoped>
@import "../home/scanInvoice.less";
</style>

<script>
import { CheckIcon } from "vux";
import { mapState, mapActions, mapGetters } from "vuex";
import { getSession } from "@util/sessionStorage";
import uploadFile from "@components/uploadFile";

import tool from "@util/tool.js";

import getData from "@vuex/ajaxAPI/getData";

let timer = null; //防抖

export default {
  data() {
    return {
      demo1: true, //类型企业选择
      demo2: false, //类型个人选择
      openImg: require("../../assets/images/open@3x.png"),
      noClick: true, //保存按钮不可点
      moreShow: false, //其它下拉显示隐藏
      titleCheckShow1: false, //天严查数据 抬头输入搜索显隐藏
      titleCheckShow2: false, //后台数据 抬头输入搜索显隐藏
      houtaiTotalData: [], //后台数据
      phone: "", //手机
      isPhone: false, //手机号是否正确
      titleC: "", //抬头
      isTitleC: false, //抬头验证
      textNum: "", //税号
      bank: "", //开户行
      account: {
        name: ""
      }, //账号
      address: "", //地址
      tel: "", //固定电话
      email: "",
      selected: require("../../assets/images/selected2@3x.png"),
      noSelected: require("../../assets/images/selected2-1@3x.png"),
      selected2: require("../../assets/images/selected2@3x.png"),
      noSelected2: require("../../assets/images/selected2-1@3x.png"),
      tempInvHeadTotalData: "", //获取id下所有抬头的数量
      crrentTypeId: "1", //当前选中的类型
      enterprise1: {
        Name: "", //	 抬头名称 	 string 	 不可
        TypeId: "1", //	 发票种类(1.企业 2.个人) 	 string 	 不可
        InvType: "0", // 	 发票类型(0.增值税) 	 string 	 不可
        Mobile: "", //	 手机 	 string 	 可能
        Email: "", //	 邮箱 	 string 	 可能
        Tax: "", //	 税号 	 string 	 可
        Bank: "", //	 银行 	 string 	 可
        Account: "", //	 账号 	 string 	 可
        Address: "", //	 地址 	 string 	 可
        Tel: "" // 电话 	 string 	 可
      },
      enterprise2: {
        Name: "", //	 抬头名称 	 string 	 不可
        TypeId: "2", //	 发票种类(1.企业 2.个人) 	 string 	 不可
        InvType: "0", // 	 发票类型(0.增值税) 	 string 	 不可
        Mobile: "", //	 手机 	 string 	 可能
        Email: "" //	 邮箱 	 string 	 可能
      }
      // isEnterpriseRight1: {
      //   InvType: true,
      //   Name: false,
      //   Mobile: false,
      //   Email: false
      // },
      // isEnterpriseRight2: {
      //   InvType: true,
      //   Name: false,
      //   Mobile: false,
      //   Email: false
      // },
      // doClick1: false, //保存按钮是否可以标亮
      // doClick2: false //保存按钮是否可以标亮
    };
  },
  computed: {
    ...mapState(["tianyanchaMohuData", "tianyanchaJingqueData"]),
    ...mapState("home", ["getInvHeadInfoData", "getInvHeadlistData"]),

    doClick1() {
      //企业保存按钮是否可以标亮

      // 如果手机号码和邮箱都填写了 则判断 3个都要为true
      if (
        this.enterprise1.Email.length != 0 &&
        this.enterprise1.Mobile.length != 0
      ) {
        if (
          this.verifyC1Promptly() &&
          (this.verifyEmail1Promptly() && this.verifyP1Promptly())
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.enterprise1.Email.length != 0) {
        if (
          this.verifyC1Promptly() &&
          (this.verifyEmail1Promptly() || this.verifyP1Promptly())
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          this.verifyC1Promptly() &&
          (this.verifyEmail1Promptly() || this.verifyP1Promptly())
        ) {
          return true;
        } else {
          return false;
        }
      }
    },
    doClick2() {
      //个人保存按钮是否可以标亮
      // 如果手机号码和邮箱都填写了 则判断 3个都要为true

      if (
        this.enterprise2.Email.length != 0 &&
        this.enterprise2.Mobile.length != 0
      ) {
        if (
          this.verifyC2Promptly() &&
          (this.verifyEmail2Promptly() && this.verifyP2Promptly())
        ) {
          return true;
        } else {
          return false;
        }
      } else if (this.enterprise2.Email.length != 0) {
        if (
          this.verifyC2Promptly() &&
          (this.verifyEmail2Promptly() || this.verifyP2Promptly())
        ) {
          return true;
        } else {
          return false;
        }
      } else {
        if (
          this.verifyC2Promptly() &&
          (this.verifyEmail2Promptly() || this.verifyP2Promptly())
        ) {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  components: {
    CheckIcon,
    uploadFile
  },
  created() {},

  methods: {
    ...mapActions(["tianyanchaAddHoutai"]),
    ...mapActions("home", ["getInvHeadInfo", "getInvHeadlist"]),
    ...mapActions("invoiceTitle", ["editInvHead"]),
    titleInputFn(value) {
      if (value.target.value.length <= 0) {
        this.titleCheckShow1 = false;
        return;
      }
      // 需要优化 待后期
      if (value.target.value.length >= 2) {
        let params = {
          api: 1,
          args: `word=${encodeURI(this.enterprise1.Name)}`
        };
        //从天眼查 和后台获取数据
        this.tianyanchaAddHoutai(params)
          .then(res => {
            this.titleCheckShow1 = true;
          })
          .catch(eee => {
            this.titleCheckShow1 = false;
          });
      }
    },
    titleInputFnPromptly() {
      if (!this.enterprise1.Name.trim()) {
        return;
      }
      var Name = tool.regularJudgementPromptly("phone", this.enterprise1.Name);
      return phoneV;
    },
    save(value) {
      var that = this;
      //保存
      // 企业类型保存
      if (value == 1) {
        if (!this.doClick1) {
          this.$vux.alert.show({
            title: "提示",
            content: "请输入正确的信息",
            onShow() {},
            onHide() {}
          });
          return;
        }
        //编辑发票抬头 后传递给后台
        let params = {  BusinessId: this.$route.query.fapiaoId, //	 商家用户Id 	 string 	 不可
          Id: JSON.parse(sessionStorage.getItem("customerInfo")).WxId, //微信id 来自本地
          InvHeadId :'',//为空表示新增
          Name: this.enterprise1.Name,
          TypeId: this.enterprise1.TypeId,
          InvType: this.enterprise1.InvType,
          Mobile: this.enterprise1.Mobile,
          Email: this.enterprise1.Email,
          Tax: this.enterprise1.Tax,
          Bank: this.enterprise1.Bank,
          Account: this.enterprise1.Account,
          Address: this.enterprise1.Address,
          Tel: this.enterprise1.Tel
        };
        this.editInvHead(params)
          .then(res => {
            this.$vux.alert.show({
              title: "提示",
              content: "保存成功",
              onShow() {},
              onHide() {
                console.log(this);
                that.$router.go(-1);
              }
            });
          })
          .catch(err => {
            this.$vux.alert.show({
              title: "提示",
              content: err,
              onShow() {},
              onHide() {}
            });
          });
      } else {
        // 个人类型保存
        if (!this.doClick2) {
          this.$vux.alert.show({
            title: "提示",
            content: "请输入正确的信息",
            onShow() {},
            onHide() {}
          });
          return;
        }
        // data.WxId 	  	 微信用户ID
        //  data.NickName 	  	 昵称
        //  data.Sex 	  	 性别（值为1时是男性，值为2时是女性，值为0时是未知）
        //  data.HeadImgUrl 	  	 头像
        //  data.UnionId 	  	 微信唯一标识
        //  data.IsShop 	  	 是否是商家（0否1是）
        //  data.Id 	  	 商家ID
        //  data.CusId 	  	 用户ID
        //  data.ShopName 	  	 商家名称
        //  data.Status 	  	 状态（0=待处理，1=已通过，2=已驳回）
        //  data.Mobile 	  	 手机（手机注册才显示）
        //  data.CreateTime 	  	 创建时间

        //编辑发票抬头 后传递给后台
        let params = {
          Id: JSON.parse(sessionStorage.getItem("customerInfo")).WxId, //微信id 来自本地
          InvHeadId :'',//为空表示新增
          Name: this.enterprise2.Name,
          TypeId: this.enterprise2.TypeId,
          InvType: this.enterprise2.InvType,
          Mobile: this.enterprise2.Mobile,
          Email: this.enterprise2.Email
        };
        this.editInvHead(params)
          .then(res => {
            this.$vux.alert.show({
              title: "提示",
              content: "保存成功",
              onShow() {},
              onHide() {
                //点击确定跳转
                that.$router.go(-1);
              }
            });
          })
          .catch(err => {
            this.$vux.alert.show({
              title: "提示",
              content: err,
              onShow() {},
              onHide() {}
            });
          });
      }
    },
    titleAddShowListFn(value) {
      // 过滤是企业信息 还是个人信息  houtaiTotalData 只存储企业信息

      if (timer) {
        clearTimeout(timer);
      } //防抖

      timer = setTimeout(() => {
        // console.log('>>>>>>>>>>>>>>',this.enterprise1.Name.trim(),!this.enterprise1.Name.trim())
        if (!this.enterprise1.Name.trim() || this.enterprise1.Name.length < 2) {
          this.titleCheckShow1 = false; 
          return false;
        }
        let params = {
          Id: JSON.parse(sessionStorage.getItem("customerInfo")).WxId, // 微信用户ID 	 string 	 不可
          Name: this.enterprise1.Name.trim(), //	 抬头名称（模糊匹配） 	 string 	 可
          containTyc: value, //	 是否包含天眼查数据（1.后台数据,2 天眼查 3 后台+天眼查） 	 int 	 可
          pageIndex: "1", // 页数(不填默认查出所有） 	 int 	 可
          pageSize: "5" //	 每页显示条数(不填默认查出所有） 	 int 	 可
        };
        // throttleTitleAddShowListFn = false;//节流开启
        this.getInvHeadlist(params)
          .then(() => {
            console.log(this.getInvHeadlistData.list);
            //value == 1 表示 用户点击 + 号   ; value ==2  表示用户在输入 请求天眼查
            if (value == 3 && this.getInvHeadlistData.list.length != 0) {
              //点击抬头 边上的加号 弹出list菜单 数据在加载页面就已经请求 只显示前5个
              this.titleCheckShow1 = true;
            } else if (value == 3 && this.getInvHeadlistData.list.length == 0) {
              this.titleCheckShow1 = false;
            } 
          })
          .catch(err => {
            console.log(err);
          });
      }, 800);

      // console.log(this.enterprise1.Name);
      // if (this.enterprise1.Name.length < 2) {
      //   return false;
      // }
      // let params = {
      //   Id: JSON.parse(sessionStorage.getItem("customerInfo")).WxId, // 微信用户ID 	 string 	 不可
      //   Name: this.enterprise1.Name, //	 抬头名称（模糊匹配） 	 string 	 可
      //   containTyc: value, //	 是否包含天眼查数据（1.后台数据,2 天眼查 3 后台+天眼查） 	 int 	 可
      //   pageIndex: "1", // 页数(不填默认查出所有） 	 int 	 可
      //   pageSize: "5" //	 每页显示条数(不填默认查出所有） 	 int 	 可
      // };
      // this.getInvHeadlist(params)
      //   .then(() => {
      //     console.log(this.getInvHeadlistData.list);
      //     //value == 1 表示 用户点击 + 号   ; value ==2  表示用户在输入 请求天眼查 value = 3 表示从天眼查和后台同时获取
      //     if (value == 3 && this.getInvHeadlistData.list.length != 0) {
      //       //点击抬头 边上的加号 弹出list菜单 数据在加载页面就已经请求 只显示前5个
      //       this.titleCheckShow1 = true;
      //     } else if (value == 3 && this.getInvHeadlistData.list.length == 0) {
      //       this.titleCheckShow1 = false;
      //     }
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    },
    checkCompany(value) {
      //从天眼查获取数据获取数据
      //北京百度网讯科技有限公司 目前只有这个查到值
      console.log(value);
      this.titleCheckShow2 = false;
      //再次精确匹配

      this.enterprise1.Name = value.name == undefined ? "" : value.name;

      this.enterprise1.Tax = value.Tax == undefined ? "" : value.Tax;
      this.enterprise1.Address =
        value.Address == undefined ? "" : value.Address;
      this.enterprise1.Tel =
        value.Tel == undefined ? "" : value.Tel;
    },
    houtaiCheckCompany(data) {
      //从后台获取数据
      //  console.log(data);
      this.enterprise1 = {
        Name: data.Name, //	 抬头名称 	 string 	 不可
        TypeId: "1", //	 发票种类(1.企业 2.个人) 	 string 	 不可
        InvType: data.InvType, // 	 发票类型(0.增值税) 	 string 	 不可
        Mobile: data.Mobile, //	 手机 	 string 	 可能
        Email: data.Email, //	 邮箱 	 string 	 可能
        Tax: data.Tax, //	 税号 	 string 	 可
        Bank: data.Bank, //	 银行 	 string 	 可
        Account: data.Account, //	 账号 	 string 	 可
        Address: data.Address, //	 地址 	 string 	 可
        Tel: data.Tel // 电话 	 string 	 可
      };
      this.titleCheckShow1 = false;
    },
    showMore() {
      //其它内容的显示隐藏
      this.moreShow = !this.moreShow;
      if (this.moreShow) {
        this.openImg = require("../../assets/images/takeback@3x.png");
      } else {
        this.openImg = require("../../assets/images/open@3x.png");
      }
    },
    checkTypeId(value) {
      this.crrentTypeId = value;
      if (value == 2) {
        this.openImg = require("../../assets/images/open@3x.png");
        this.moreShow = false;
      }
    },

    close() {
      //调用正则判断
      this.verifyC1();
      //关闭抬头搜索
      this.titleCheckShow1 = false;
      this.titleCheckShow2 = false;
    },
    verifyP1() {
      //手机验证
      if (!this.enterprise1.Mobile.trim()) {
        return false;
      }
      var phoneV = tool.regularJudgement("phone", this.enterprise1.Mobile);
      if (phoneV) {
        return true;
      } else {
        return false;
      }
    },
    verifyP1Promptly() {
      // 立即付款
      //手机验证
      if (!this.enterprise1.Mobile.trim()) {
        return false;
      }
      var phoneV = tool.regularJudgementPromptly(
        "phone",
        this.enterprise1.Mobile
      );
      console.log("手机", phoneV);
      return phoneV;
    },
    verifyP2() {
      //手机验证
      if (!this.enterprise2.Mobile.trim()) {
        return false;
      }
      var phoneV = tool.regularJudgement("phone", this.enterprise2.Mobile);
      if (phoneV) {
        return true;
      } else {
        return false;
      }
    },
    verifyP2Promptly() {
      //手机验证
      if (!this.enterprise2.Mobile.trim()) {
        return false;
      }
      var phoneV = tool.regularJudgementPromptly(
        "phone",
        this.enterprise2.Mobile
      );
      return phoneV;
    },
    verifyEmail1() {
      //邮箱
      if (!this.enterprise1.Email.trim()) {
        return false;
      }
      let Email = tool.regularJudgement("email", this.enterprise1.Email);
      return Email;
    },
    verifyEmail1Promptly() {
      //邮箱
      if (!this.enterprise1.Email.trim()) {
        return false;
      }
      let Email = tool.regularJudgementPromptly(
        "email",
        this.enterprise1.Email
      );
      console.log(1);
      return Email;
    },
    verifyEmail2() {
      //邮箱
      if (!this.enterprise2.Email.trim()) {
        return false;
      }
      let Email = tool.regularJudgement("email", this.enterprise2.Email);
      return Email;
    },
    verifyEmail2Promptly() {
      //邮箱
      if (!this.enterprise2.Email.trim()) {
        return false;
      }
      let Email = tool.regularJudgementPromptly(
        "email",
        this.enterprise2.Email
      );
      return Email;
    },
    verifyC1(value) {
      console.log("valuevaluevaluevalue", value);
      // 抬头名称
      if (!this.enterprise1.Name.trim()) {
        return false;
      }
      let Name = tool.regularJudgement("companyAddress", this.enterprise1.Name);
      return Name;
    },
    verifyC1Promptly() {
      // 抬头名称
      if (!this.enterprise1.Name.trim()) {
        return false;
      }
      let Name = tool.regularJudgementPromptly(
        "companyAddress",
        this.enterprise1.Name
      );
      console.log("/ 抬头名称", Name);

      return Name;
    },
    verifyC2(value) {
      console.log("姓名", this.enterprise2.Name);
      //个人名字
      if (!this.enterprise2.Name.trim()) {
        return false;
      }
      let Name = tool.regularJudgement("person", this.enterprise2.Name);
      return Name;
    },
    verifyC2Promptly(value) {
      console.log("姓名", this.enterprise2.Name);
      //个人名字
      if (!this.enterprise2.Name.trim()) {
        return false;
      }
      let Name = tool.regularJudgementPromptly("person", this.enterprise2.Name);
      return Name;
    },
    verifyTN() {
      //税号验证
      if (!this.enterprise1.Tax.trim()) {
        return;
      }
      tool.regularJudgement("taxNumber", this.enterprise1.Tax);
    },
    verifyB() {
      //开户行验证
      if (!this.enterprise1.Bank.trim()) {
        return;
      }
      tool.regularJudgement("hanzi", this.enterprise1.Bank);
    },
    verifyAccount(e) {
      //银行账号验证
      var str = e.target.value;
      function replaceStr(str) {
        let rule = str.trim().match(/\d/g);
        if (!rule) {
          let ddd = "";
          return ddd;
        } else {
          rule = rule
            .join("")
            .replace(/(\d{4})/g, "$1 ")
            .trim();
          let aa = rule;
          return aa;
        }
      }
      this.$set(this.enterprise1, "Account", replaceStr(str));
    },
    verifyAccountFn(e) {
      //银行账号失焦点
      var str = e.target.value;
      if (e.target.value.length <= 10) {
        this.$vux.toast.text("请输入正确银行卡", "middle");
      }
    },
    verifyAddress() {
      //地址验证
      if (!this.enterprise1.Address.trim()) {
        return;
      }
      tool.regularJudgement("hanzi", this.enterprise1.Address);
    },
    verifyTel() {
      //验证固定电话
      if (!this.enterprise1.Tel.trim()) {
        return;
      }
      tool.regularJudgement("tel", this.enterprise1.Tel);
    }
  }
};
</script>
