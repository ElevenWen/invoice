<style lang="less" scoped>
@import "../../common/index.less";
@import "business.less";
// 重写组件样式
#fourth #uploadFileWrap {
  position: absolute;
  top: 0;
  left: 0;
  height: 2.9rem;
  width: 100%;
}

#fileWrap {
}
.ceshi {
  line-height: 0.733333rem;
  height: 0.733333rem;
  border: 1px solid red;
  margin-top: 0.586667rem;
}
#fourth /deep/ .weui-dialog {
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
</style>

<template>
<div>
    <div id="fourth" class="routerView-44px">
         <!-- 标题 --> 
        <headerCom :titleScoped="'成为商家'"></headerCom>
        <router-view></router-view>
        <div class="firstOne">第二步：上传资质</div>
        <!-- 图片 -->
        <div class="imgWrap">
            <!-- 必填：类型（businessLicense=公司营业执照，avatar=客户头像，idCard=身份证） 此处暂时统一写avatar -->   
            <div class="firstRow">
                <div class="businessImg businessImg1"> 
                    <img  :src="srcDefault" alt="">
                    <span><strong class="bixu">*</strong>营业执照</span>
                    <uploadFile DOM="businessImg1"  type="avatar"  @changeImageDefault="changeImageDefaultFn"></uploadFile>
                </div>
                <div class="idcardFace idcardFace1">
                    <img :src="srcDefault" alt="">
                    <span>法人身份证正面</span>
                    <uploadFile DOM="idcardFace1"  type="avatar"  @changeImageDefault="changeImageDefaultFn"></uploadFile>
                </div>
            </div>
            <div class="firstRow">
                <div class="openAccount ">
                    <img :src="srcDefault" alt="">
                    <span>法人身份证反面</span>
                    <uploadFile DOM="openAccount"  type="avatar"  @changeImageDefault="changeImageDefaultFn"></uploadFile>
                </div>
                <div class="businessImg businessImg2" >
                    <img :src="srcDefault" alt="">
                    <span>银行卡正面</span>
                    <uploadFile DOM="businessImg2"  type="avatar"  @changeImageDefault="changeImageDefaultFn"></uploadFile>
                </div>
            </div>
            <div class="firstRow">
              <div class="idcardFace idcardFace2">
                  <img :src="srcDefault" alt="">
                  <span>银行卡背面</span>
                    <uploadFile DOM="idcardFace2"  type="avatar"  @changeImageDefault="changeImageDefaultFn"></uploadFile>
              </div>
            </div>
            <!-- 提交审核按钮 -->
            <div class="saveButton" >
               <div  v-if="isAllCompleted" class="saveImgWrap">
                 <div class="saveImgSubmit" @click="saveButtonFn" >
                    <span >提交审核</span>  
                 </div> 
               </div>
               <div    v-else    alt="" class="saveImg">
                 <span >提交审核</span>  
               </div>
                
            </div>
        </div>
        <div class="comfirm_box" v-if="comfirmShow">
            <div class="box">
                <div class="top">
                    <p>
                        提示
                    </p>
                    <p>
                        申报成功，请耐心等待审核！
                    </p>
                </div>
                <div class="bottomn" @click="sure">
                    <span >
                        确定
                    </span>
                </div>
            </div>
        </div>
        <!-- 二维码弹框 -->  
    </div>
</div>
</template>
<script>
/****
 * 此页面的微信图片功能 暂时不删除 防止以后调用微信图床 又要改回来!!!!!
 *
 */
import { mapState, mapActions, mapGetters } from "vuex";
import getData from "../../vuex/ajaxAPI/getData.js";
import uploadFile from "@components/uploadFile";

export default {
  data() {
    return {
      comfirmShow: false, //确认弹窗
      srcDefault: require("../../assets/images/upload@2x.png"), //图片默认样式
      localIds: "", //图片本地来源
      serverId: "", // 返回图片的服务器端ID
      srcPreview: "", //预览图片img地址,
      srcPreview2: "",
      getImage: {
        businessImg1: "",
        idcardFace1: "",
        openAccount: "",
        businessImg2: "",
        idcardFace2: ""
      }
    };
  },
  components: {
    uploadFile
  },
  created() {
    this.weixin({});
  },
  computed: {
    ...mapState("business", {
      code: "code",
      weixinAuthData: "weixinAuthData",
      isComfirmShow: "isComfirmShow"
    }),
    isAllCompleted() {
      //判断是否已经把图片填充完毕
      if (this.getImage.businessImg1 == "") {
        return false;
      }
      return true;
    }
  },
  methods: {
    ...mapActions("business", {
      QUERYTELCODE: "QUERYTELCODE",
      FIRSTONE: "FIRSTONE",
      weixinAuthOpenid: "weixinAuthOpenid",
      weixinIsFocus: "weixinIsFocus",
      fourthFOURTH: "fourthFOURTH"
    }),
    changeImageDefaultFn(imageDeefault, DOM) {
      //图片上传后改变图片的props数据
      console.log("图片上传后改变图片的props数据", imageDefault, DOM);
      switch (DOM) {
        case "businessImg1":
          console.log(DOM);
          this.getImage.businessImg1 = imageDefault;
          break;
        case "idcardFace1":
          this.getImage.idcardFace1 = imageDefault;
          break;
        case "openAccount":
          this.getImage.openAccount = imageDefault;
          break;
        case "businessImg2":
          this.getImage.businessImg2 = imageDefault;
          break;
        case "idcardFace2":
          this.getImage.idcardFace2 = imageDefault;
          break;
      }
      document
        .getElementsByClassName(DOM)[0]
        .getElementsByTagName("img")[0].src = imageDefault;
    },
    sure() {
      //关闭弹窗
      this.comfirmShow = false;
      //成功弹窗后跳转首页
      this.getImage = {
        businessImg1: "",
        idcardFace1: "",
        openAccount: "",
        businessImg2: "",
        idcardFace2: ""
      };
      this.$router.push("/");
    },
    saveButtonFn() {
      console.log(1, this.getImage);
      //回传图片数据数据给后台
      // let params = {
      //   Id: "03B203BC-9730-4616-B0AB-3254C5E05F2B", //商户Id 	 string 	 不可
      //   BusinessLicense: "http://api.wqbol.net/Upload/avatar/b35561a1-ca56-43a1-a820-8b5141da402d.jpg", //	 营业执照 	 string 	 不可
      //   LegalCardFront: "http://api.wqbol.net/Upload/avatar/b35561a1-ca56-43a1-a820-8b5141da402d.jpg", //	 法人身份证正面 	 string 	 可
      //   LegalCardBack: "http://api.wqbol.net/Upload/avatar/b35561a1-ca56-43a1-a820-8b5141da402d.jpg", // 法人身份证反面 	 string 	 可
      //   BankFront: "http://api.wqbol.net/Upload/avatar/b35561a1-ca56-43a1-a820-8b5141da402d.jpg" //
      // };

      if (this.getImage.businessImg1 == "") {
        this.$vux.alert.show({
          title: "提示",
          content: "营业执照为必传项",
          onShow() {},
          onHide() {}
        });
        return false;
      }

      let params = {
        Id: this.$route.query.id, //商户Id 	 string 	 不可
        BusinessLicense: this.getImage.businessImg1, //	 营业执照 	 string 	 可不传
        LegalCardFront: this.getImage.idcardFace1, //	 法人身份证正面 	 string 	 可不传
        LegalCardBack: this.getImage.openAccount, // 法人身份证反面 	 string 	 可不传
        BankFront: this.getImage.businessImg2, //	 银行卡正面
        BankBack: this.getImage.idcardFace2 //银行卡反面
      };
      console.log("---", params);
      this.fourthFOURTH(params)
        .then(() => {
          if (this.isComfirmShow) {
            //成功弹出提示
            this.comfirmShow = true;
          }
        })
        .catch(err => {
          this.$vux.alert.show({
            title: "提示",
            content: err,
            onShow() {},
            onHide() {}
          });
        });
    },
    onHide(onHide) {
      document.body.style.overflow = "visible";
    },
    //无用代码 暂时保留-------------------------------------------------------------------------------------------------------------------------
    one(e) {
      var that = this;
      let files = e.target.files || e.dataTransfer.files;
      console.log(e, "图片上传e");
      if (!files.length) return;

      //传给后台
      var acv = new FormData();
      acv.append("file", files[0]);
      acv.append("type", "avatar");
      getData
        .upNetImage(acv)
        .then(res => {
          console.log("上传图片成功了");
        })
        .catch(error => {
          //console.log(error);
        });

      //拍照或从手机相册中选图接口
      // wx.chooseImage({
      //   count: 1, // 默认9
      //   sizeType: ["original", "compressed"], // 可以指定是原图还是压缩图，默认二者都有
      //   sourceType: ["album", "camera"], // 可以指定来源是相册还是相机，默认二者都有
      //   success: function(res) {
      //     var localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //     that.localIds = res.localIds; // 返回选定照片的本地ID列表，localId可以作为img标签的src属性显示图片
      //     console.log("拍照或从手机相册中选图接口", localIds);
      //     that.srcPreview = res.localIds[0];
      //     that.$refs.valvalval.value = res.localIds[0];
      //     //   that.srcPreview2 =  res.localIds[1]
      //     //console.log("lalalal ", res.localIds);

      //     console.log("d?", that.$refs.valvalval, that.srcPreview);
      //     that.$refs.valvalval.value = that.srcPreview;
      //     //用户选择图片后就上传到服务器
      //   }
      // });
    },
    //无用代码 暂时保留-------------------------------------------------------------------------------------------------------------------------
    two() {
      var that = this;
      var arr = [
        "https://ss0.baidu.com/73F1bjeh1BF3odCf/it/u=1133881542,801575775&fm=85&s=ABA3CB024474A99E4832DBFE0200501F",
        "https://img-blog.csdn.net/20170525114340413",
        "https://f10.baidu.com/it/u=113220993,1390491462&fm=76"
      ];
      // 预览图片接口
      wx.previewImage({
        current: that.previewI, // 当前显示图片的http链接
        urls: [] // 需要预览的图片http链接列表
      });
    },
    //无用代码 暂时保留-------------------------------------------------------------------------------------------------------------------------
    three() {
      var that = this;
      //上传图片接口
      // wx.uploadImage({
      //   localId: that.localIds[0], // 需要上传的图片的本地ID，由chooseImage接口获得
      //   isShowProgressTips: 0, // 默认为1，显示进度提示
      //   success: function(res) {
      //     var serverId = res.serverId; // 返回图片的服务器端ID
      //     that.serverId = res.serverId; // 返回图片的服务器端ID
      //     that.previewI = res.serverId;
      //   }
      // });
    },
    //无用代码 暂时保留-------------------------------------------------------------------------------------------------------------------------
    three1() {
      var that = this;
      //上传图片接口
      // wx.uploadImage({
      //   localId: that.localIds.toString(), // 需要上传的图片的本地ID，由chooseImage接口获得
      //   isShowProgressTips: 0, // 默认为1，显示进度提示
      //   success: function(res) {
      //     var serverId = res.serverId; // 返回图片的服务器端ID
      //     that.serverId = res.serverId; // 返回图片的服务器端ID
      //     console.log("上传图片接口1", that.serverId);
      //   }
      // });
    },
    fouth() {
      var that = this;
      //下载图片接口
      // wx.downloadImage({
      //   serverId: that.serverId, // 需要下载的图片的服务器端ID，由uploadImage接口获得
      //   isShowProgressTips: 0, // 默认为1，显示进度提示
      //   success: function(res) {
      //     var localId = res.localId; // 返回图片下载后的本地ID
      //     console.log("下载图片接口", localId);
      //   }
      // });
    }
  },
  beforeDestroy() {
    document.body.style.overflow = "visible";
  }
};
</script>
