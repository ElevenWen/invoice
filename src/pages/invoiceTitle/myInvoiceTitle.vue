<template>
    <div>
        <div id="myVoiceTitle" class="routerView-44px"> 
        <!-- 标题 --> 
        <headerCom :titleScoped="'我的抬头'"></headerCom> 
        <router-view>ddd</router-view>    
         <!-- 发票列表==有发票时 --> 
         <div class="wrapper" ref="wrapper">
           <div class="ulContainer" ref="ulContainer" v-if="_list.recordCount">
             <div  class="pulldowntext" v-if='pulldowntext'>{{pulldowntext}}</div>
            <ul class="content">
                <li v-for="(item,index) in _list.list" :key="index">
                    <div class="top" @click="goDetail(item.Id)">
                        <p>
                            {{item.Name}}
                        </p>
                        <p>
                            <span>
                                {{item.InvType==0?'普票':''}}
                            </span>
                            <span>
                                {{item.Mobile}}
                            </span>
                        </p>
                        <p>
                            税号：{{item.Tax}}
                        </p>
                    </div>
                    <div class="bottom">
                        <div class="code">
                            <qrcode class="codeImg" :value="value" type="img" :size=140></qrcode>
                        </div>
                        <div class="delete" @click="deleteM(item.Id,index)">
                            <span>
                                <img src="../../assets/images/delete@3x.png" alt="">
                            </span>
                            <span>删除</span>
                        </div>
                    </div>
                </li>
                <li class="backLi"></li>
            </ul>
            <div class="pulluptext" v-show="hasData=='没有更多了'">{{hasData}}</div> 
        </div>
        <div class="noTitle" v-else>
            <!-- <div> -->
                <img    src="../../assets/images/vacancy@3x.png" alt="">
            <!-- </div> -->
            <p class="titleInfo">您还没有发票抬头哦~</p>
        </div>
         </div>
        
        <div class="button_box">
            <div class="botton_b" @click="add">
                <img src="../../assets/images/highlighted-button@3x.png" alt="">
                <span>新增抬头</span>
            </div>
        </div>
        <div class="comfirm_box" v-if="comfirmShow">
            <div class="box">
                <div class="top">
                    <p>
                        确认删除吗？
                    </p>
                    <p>
                        删除当前抬头，删除后不可恢复
                    </p>
                </div>
                <div class="bottomn">
                    <span @click="cancel">
                        取消
                    </span>
                    <span @click="sure">
                        确定
                    </span>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>

<style lang="less" scoped>
@import "../../common/index.less";
#myVoiceTitle {  
  padding-top: 0.1px; 
  .wrapper{
    margin-top: 0.266667rem !important;
  }
  .ulContainer{
      margin-top: 0.32rem !important;
      // height: 100%;
      // overflow-y: auto;
  }
  ul {
    .backLi{
      width: 100%;
      height: 2.666667rem;
      background: none;
    }
    li {
      background-color: white;
      margin-bottom: 0.32rem;
      &:last-child {
        margin-bottom: 1.6rem;
      }
      .top {
        height: 2.666667rem;
        width: 100%;
        color: #000;
        font-size: 0.4rem;
        display: flex;
        justify-content: space-around;
        flex-direction: column;
        border-bottom: 1px solid #eee;
        padding: 0 0.333333rem;
        p:nth-child(2) {
          display: flex;
          justify-content: space-between;
        }
      }
      .bottom {
        width: 100%;
        height: 5.333333rem;
        text-align: center;
        position: relative;
        .code {
          width: 4.533333rem;
          height: 4.533333rem;
          position: absolute;
          left: 50%;
          margin-left: -2.266667rem;
          top: 50%;
          margin-top: -2.266667rem;
          img {
            width: 100%;
            height: 100%;
          }
        }
        .delete {
          position: absolute;
          top: 0.32rem;
          right: 0.32rem;
          img {
            width: 0.373333rem;
            height: 0.373333rem;
            vertical-align: middle;
          }
          span {
            display: inline-block;
            height: 0.373333rem;
            line-height: 0.373333rem;
            font-size: 0.32rem;
          }
        }
      }
    }
  }
  .button_box {
    width: 100%;
    height: 1.2rem;
    position: fixed;
    bottom: 0;
    .botton_b {
      width: 9.2rem;
      text-align: center;
      color: #fff;
      font-size: 0.48rem;
      margin-top: -0.4rem;
      position: absolute;
      left: 50%;
      margin-left: -4.6rem;
      span {
        position: absolute;
        font-size: 0.48rem;
        left: 3.733333rem;
        top: 0.426667rem;
      }
    }
  }
  .comfirm_box {
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.4);
    z-index: 2;
    .box {
      background: #fff;
      height: 3.333333rem;
      width: 7.333333rem;
      position: absolute;
      top: 30%;
      left: 13%;
      border-radius: 0.4rem;
      .top {
        width: 100%;
        height: 2.106667rem;
        border-bottom: 1px solid #eee;
        text-align: center;
        padding-top: 0.533333rem;
        color: #000;
        p:nth-child(1) {
          font-size: 0.453333rem;
          margin-bottom: 0.24rem;
        }
        p:nth-child(2) {
          font-size: 0.373333rem;
        }
      }
      .bottomn {
        height: 1.226667rem;
        line-height: 1.226667rem;
        color: rgb(14, 128, 254);
        font-size: 0.453333rem;
        span {
          text-align: center;
          display: inline-block;
        }
        span:nth-child(1) {
          width: 49%;
          border-right: 1px solid #eee;
        }
        span:nth-child(2) {
          width: 49%;
        }
      }
    }
  }
  .noTitle {
    // *z-zoom:1;
    overflow: auto;
 -webkit-overflow-scrolling: touch;    
    z-index:-2; 
    text-align: center;
    padding-top: 2.4rem;
    font-size: 0.4rem;
    color: rgb(102, 102, 102);
    div {
      margin-bottom: 0.4rem;
    }
    img {
      width: 1.466667rem;
      height: 1.466667rem;
    }
    .titleInfo{
      margin-top:0.586667rem
    }
  }
}
.pulluptext{ //没有更多
  height: 3.133333rem !important;
	line-height: 3.133333rem !important;
	font-size: 0.346667rem !important;
	color: #000 !important;
  position: absolute;
  left: 4.266667rem;
  bottom: 0.8rem;
}
.pulldowntext{  //下拉刷新
  margin-left: 4.266667rem;
  margin-bottom: 0.266667rem;
}
</style>

<script>
import { mapActions, mapGetters, mapMutations } from "vuex";
import { Qrcode } from "vux";
import { getSession } from "@util/sessionStorage";
import BScroll from 'better-scroll'
export default {
  data() {
    return {
      comfirmShow: false, //确认删除弹窗
      deleteId: "", //确定删除的id
      value:`${process.env.innerGobleNetPort}?xxx=hahah`,
      pageIndex:0,
      hasData: true, // 上拉加载数据 true代表有数据
      pulldowntext:false,
      deleteIndex:0,
      pageSize: 3
    };
  },
  computed: {
    ...mapGetters("invoiceTitle", ["_infoId", "_list", "_delete"])
  },
  created() {
    this.$nextTick(()=>{
     setTimeout(() => {
      //二维码自适应
      let arr = document.getElementsByClassName("codeImg");
      for (var i = 0; i < arr.length; i++) {
        document.getElementsByClassName("codeImg")[i].children[1].style.width =
          "4.533333333333333rem";
        document.getElementsByClassName("codeImg")[i].children[1].style.height =
          "4.533333333333333rem";
      }
      // let scroll = new BScroll('.ulContainer')
    }, 100);

        if(!this.scroll){
           this.scroll = new BScroll(this.$refs.wrapper, {
            scrollY: true,
            click: true,
            pullDownRefresh: {
              //下拉刷新 阀值
              threshold: 0
            },
            pullUpLoad: {
              //上拉加载 阀值
              threshold: -20
            }
          });
          this.scroll.on("scroll", pos => {
          
          // 下拉动作
          if (pos.y > 20) {
              this.pulldowntext = "下拉刷新";
            } else {
              this.pulldowntext = false;
            }
          });
           this.scroll.on("pullingDown", pos => {
          
          //上拉刷新 请求后台数据
          this.refresh().then(() => { 
            let arr = document.getElementsByClassName("codeImg");
            for (var i = 0; i < arr.length; i++) {
              document.getElementsByClassName("codeImg")[i].children[1].style.width =
                "4.533333333333333rem";
              document.getElementsByClassName("codeImg")[i].children[1].style.height =
                "4.533333333333333rem";
            }
            this.scroll.finishPullDown();
            this.scroll.refresh();
            this.$vux.toast.text('刷新成功', 'middle');  
          });
        });
        this.scroll.on("pullingUp", () => { 
          //上拉加载 请求后台数据
          if (this.hasData) {
            this.timeId = setTimeout(() => {
              this.infinite().then(() => {
                let arr = document.getElementsByClassName("codeImg");
                for (var i = 0; i < arr.length; i++) {
                  document.getElementsByClassName("codeImg")[i].children[1].style.width =
                    "4.533333333333333rem";
                  document.getElementsByClassName("codeImg")[i].children[1].style.height =
                    "4.533333333333333rem";
                }
                this.scroll.finishPullUp();
                this.scroll.refresh();
              });
            }, 500);
          } else {
            this.hasData = "没有更多了";
          }
        });
        }
      })

    this.weixin({
        houtaiData: `url=${location.href}`,
        title: "填写发票抬头，在这里轻松搞定。",
        desc: "填写发票抬头，请点击这里，动动手指一键生成电子发票！",
        link: location.href,
        imgUrl:`${process.env.innerGobleNetPort}myInvoiceTitle.jpg` 
      });
  },
  methods: {
    ...mapActions("invoiceTitle", [
      "getUserInfo",
      "GetInvHeadlist",
      'GetInvList',
      "DelInvHead"
    ]),
    ...mapMutations(
      'invoiceTitle',[
        '_del'
      ]
    ),
    deleteM(id,index) {
      //禁止滑动
      document.body.style.overflow = "hidden";
      //点击删除
      this.comfirmShow = true;
      this.deleteId = id;
      this.deleteIndex = index;
    },
    cancel() {
      //取消删除
      document.body.style.overflow = "visible"; 
      this.comfirmShow = false;
    },
    sure() {
         //确认删除
      document.body.style.overflow = "visible"; 
      this.DelInvHead({ Id: this.deleteId }).then(res => {
        this.comfirmShow = false;
        if (this._delete.success) {
          this.$vux.toast.text(this._delete.msg);
          // this.getId();
          window.location.reload() //后期优化
          // this._del(this.deleteIndex).then(res=>{
          // })
        } else {
          this.$vux.toast.text(this._delete.msg);
        }
      });
    },
    add() {
      //新增抬头
      this.$router.push("/invoiceTitle/titleDetail");
    },
    getId() {
      this.pageIndex++;
      //列表
      let id = JSON.parse(sessionStorage.getItem("customerInfo")).WxId
      let params = {
        params:{
          Id: id, //微信id 来自本地
          pageIndex: this.pageIndex,
          pageSize:this.pageSize
        }
      };
      this.GetInvHeadlist(params);
      
    },

    goDetail(id) {
      this.$router.push({
        path: "/invoiceTitle/invoiceTitle",
        query: { fapiaoId: id }
      });
    },
    infinite(done) {
      //注意调用为异步ajax 所以刚开始设置的this.hasData = true 表示么有数据
      if (!this.hasData) {
        return;
      }

      //        MerId 	 商家ID 	 string 	 可
      //  WxCusId 	 微信用户ID 	 string 	 可
      //  Name 	 名称 	 string 	 可
      //  pageIndex 	 页数 	 string 	 可
      //  pageSize 	 每页显示条数(默认10条） 	 string 	 可
      //  Status 	 状态（0.待开票，） 	 string 	 可

      //第二次加载数据
      this.pageIndex++;
      let id = JSON.parse(sessionStorage.getItem("customerInfo")).WxId
      let params = {
        params:{
          Id: id, //微信id 来自本地
          pageIndex: this.pageIndex,
          pageSize:this.pageSize
        }
      };
      //vux 数据交互 上拉加载
      return this.GetInvHeadlist(params).then(() => {
        // 当数据加载完毕
        if (
          this._list.list.length >= this._list.recordCount
        ) {
          this.hasData = "没有更多了";
          // console.log("没有数据了1");
        } else {
          this.hasData = true;
          // console.log("还有数据呢", this.hasData);
        }
      });
    },

    refresh() {
      //下拉刷新
      this.pageIndex = 1;
      let id = JSON.parse(sessionStorage.getItem("customerInfo")).WxId
      let params = {
        params:{
          Id: id, //微信id 来自本地
          pageIndex: this.pageIndex,
          pageSize:this.pageSize
        }
      };
      // 下拉刷新
      return this.GetInvList(params).then(() => {
        // 当数据加载完毕
        if (
          this._list.list.length >= this._list.recordCount
        ) {
          this.hasData = "没有更多了";
          // console.log("没有数据了1");
        } else {
          this.hasData = true;
          // console.log("还有数据呢", this.hasData);
        }
      }).catch(()=>{
        console.log('dsafsdwer')
      });;
    },
  },
  components: {
    Qrcode
  },
  beforeDestroy() {
    document.body.style.overflow = "visible";
  },
  mounted(){
    this.refresh();
  }
};
</script>

