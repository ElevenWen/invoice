<style lang="less" scoped>
@import "../../common/index.less";
@import "myInvoice.less";

#myInvoice /deep/ .leftDelete {
  width: 100%;
  /* height: 100%; */
  z-index: 2;
  line-height: 0;
  overflow: hidden;
}

#myInvoice .invoiceListWrap {
  margin: 0;
}
#myInvoice /deep/ .deleteIcon {
  width: 2rem;
  height: 2.82rem;
  line-height: 2.82rem;
  position: absolute;
  right: -2rem;
  top: 0.1rem;
  text-align: center;
  color: #ffffff;
  font-size: 0.426667rem;
  background: rgb(255, 61, 61);
  /* background: url(./../../assets/main/4.png) no-repeat; */
  background-size: contain;
}
.iteratorItems {
  margin: 0.3334rem 0;
  margin-left: 0.186667rem;
}
</style>

<template>
    <div>
        <div id="myInvoice">
            <!-- 标题 --> 
            <headerCom :titleScoped="'我的发票'"></headerCom>
            <router-view></router-view>
            <!-- 发票列表==有发票时 -->  
            <div  class="outWrapper  routerView-44px"  >
                  <div class="wrapper" ref="wrapper">  
                    <div  class="dataWrap" v-if="getinvoiceList.recordCount != 0">
                          <div  class="pulldowntext" v-if='pulldowntext'>{{pulldowntext}}</div>
                          <div class="dataWrap">
                            <div v-for="(items,index) in getinvoiceList.list" :key="index" class="iteratorItems">
                                  <leftSliderDel @deleteItem='deleteItemFn'  :index="index" :item='items'>
                                                  <div class="invoiceListWrap" @click="toDetail(items)">
                                                      <div class="firstRow">
                                                          <!-- Status 	 状态（0.待开票，1.已开票） -->
                                                          <span></span>
                                                          <span>发票号：{{items.InvNo }}</span>
                                                          <span v-if="!items.IsSee"></span>
                                                      </div>
                                                      <div class="seconedRow">
                                                          <span>金额</span>
                                                          <span>{{items.MoneyAmount}}</span>
                                                      </div>
                                                      <div class="thirdRow">
                                                          <span>日期</span>
                                                          <span>{{items.CreateTime | formDataFilter }}</span>
                                                      </div>
                                                  </div>                        
                                  </leftSliderDel>
                            </div>
                            <div class="pulldowntext" v-show="hasData=='没有更多了'">{{hasData}}</div> 
                          </div> 
                    </div>
                    
                    <!-- 发票列表==没有发票时 -->
                    <div class="noInvoice"  v-else>
                        <img src="../../assets/images/vacancy@2x.png" alt="">
                        <div class="noWord">您还没有电子发票喔~ </div>
                        <div class="noButton" @click="toS">扫码开票</div>
                    </div>
                  </div>
                  
                    <!-- you can put some other DOMs here, it won't affect the scrolling -->
                

            </div>
              


           
            <!-- 删除弹窗 -->
            <div class="sortWrap" v-if="isShowW">
                <div class="windowsW">
                    <div class="titleW">确认删除吗？</div>
                    <div class="detail">删除当前发票，删除后不可恢复</div>
                    <div class="btnWrap">
                        <span @click="cancle">取消</span>
                        <span @click="sure">确定</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import { Swipeout, SwipeoutItem, SwipeoutButton } from "vux";
import leftSliderDel from "@components/leftSliderDel";
import { mapState, mapActions, mapGetters, mapMutations } from "vuex";
import { getSession } from "@util/sessionStorage";
import tool from "@util/tool.js";
import BScroll from "better-scroll";
import { clearTimeout } from "timers";

export default {
  data() {
    return {
      haveInvoice: true, //是否有发票
      pulldowntext: false,
      isShowW: false,
      isLoadMore: false,
      scroll: false,
      users: [],
      totalCount: 0,
      pageIndex: 1,
      pageSize: 10,
      hasData: true, // 上拉加载数据 true代表有数据
      delectDataIt: null, //删除数据的id
      delectIndex: null, //删除数据的index
      timeId: null, //定时器
      mId: ""
    };
  },
  components: {
    Swipeout,
    SwipeoutItem,
    SwipeoutButton,
    leftSliderDel
  },
  computed: {
    ...mapGetters("billingProcessing", ["getinvoiceList"]),
    ...mapGetters("home", ["_info"])
  },
  created() {
    //获取用户的微信id
    let params = {
      UnionId: getSession("_id")
      //
    };
    this.getUserInfo(params).then(res => {
      let GetInvHeadlistParams = {
        params: {
          WxCusId: JSON.parse(sessionStorage.getItem("customerInfo")).WxId, //用户微信id
          pageIndex: 1, // 	 页数(不填默认查出所有） 	 string 	 可
          pageSize: 10, //	 每页显示条数(不填默认查出所有） 	 string 	 可
          Status:2
        }
      };
    });

    this.$nextTick(() => {
      console.log(2, this.getinvoiceList.recordCount);
      if (!this.scroll) {
        console.log(this.scroll, this.$refs.wrapper);
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
          // console.log(pos.y > 20)
          if (pos.y > 20) {
            this.pulldowntext = "下拉刷新";
          } else {
            this.pulldowntext = false;
          }
        });

        this.scroll.on("pullingDown", pos => {
          //下拉刷新 请求后台数据
          this.refresh().then(() => {
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
                this.scroll.finishPullUp();
                this.scroll.refresh();
              });
            }, 500);
          } else {
            this.hasData = "没有更多了";
          }
        });
      }
    });
  },
  mounted() {
    //获取抬头列表 //手动第一次请求数据
    this.refresh();
    console.log(this.getinvoiceList.recordCount);
    // this.mId = JSON.parse(sessionStorage.getItem('customerInfo')).Id;
    this.mId = JSON.parse(sessionStorage.getItem("customerInfo")).WxId;
  },
  methods: {
    ...mapActions("home", {
      getUserInfo: "getUserInfo" //获取抬头列表
    }),
    ...mapActions("billingProcessing", {
      GetInvList: "GetInvList", //获取我的发票列表
      GetInvListRefresh: "GetInvListRefresh"
    }),
    ...mapMutations("billingProcessing", {
      delInvoice_getinvoiceList: "delInvoice_getinvoiceList",
      _GetInvListRefresh: "_GetInvListRefresh"
    }),
    ...mapActions("myInvoice", {
      delInvoice: "delInvoice" //获取我的发票列表
    }),

    handleEvents(type) {
      console.log("event: ", type);
    },
    cancle() {
      this.isShowW = false;
    },
    sure() {
      //删除数据
      let params = {
        Id: this.delectDataId
      };
      this.delInvoice(params).then(() => {
        //同步数据删除后删view 数据
        this.delInvoice_getinvoiceList(this.delectIndex);
        //关闭窗口
        this.isShowW = false;
      });
    },
    deleteItemFn(delectIndex, delectDataId) {
      this.isShowW = true;
      this.delectIndex = delectIndex;
      this.delectDataId = delectDataId;
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
      let params = {
        params: {
          WxCusId: JSON.parse(sessionStorage.getItem("customerInfo")).WxId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          Status: 2
        },
        xiala: false
      };
      //vux 数据交互 上拉加载
      return this.GetInvList(params).then(() => {
        // 当数据加载完毕
        if (
          this.getinvoiceList.list.length >= this.getinvoiceList.recordCount
        ) {
          this.hasData = "没有更多了";
          // console.log("没有数据了1");
        } else {
          this.hasData = true;
          console.log("还有数据呢", this.hasData);
        }
      }).catch(()=>{
        console.log(22)
      });
    },

    refresh() {
      //下拉刷新
      this.pageIndex = 1;
      let params = {
        params: {
          WxCusId: JSON.parse(sessionStorage.getItem("customerInfo")).WxId,
          pageIndex: 1,
          pageSize: this.pageSize,
          Status: 2
        },
        xiala: true
      };
      // 下拉刷新
      return this.GetInvListRefresh(params).then(() => {
        // 当数据加载完毕
        if (
          this.getinvoiceList.list.length >= this.getinvoiceList.recordCount
        ) {
          this.hasData = "没有更多了";
          // console.log("没有数据了1");
        } else {
          this.hasData = true;
          // console.log("还有数据呢", this.hasData);
        }
      });
    },
    toDetail(val) {
      this.$router.push({
        path: "/myInvoice/invoiceDetail",
        query: { id: val.Id }
      });
    },
    toS() {
      this.$router.push("/");
    }
  },

  filters: {
    formDataFilter: value => {
      return tool.formatDate(value, "yyyy-MM-dd");
    }
  },
  beforeDestroy(){
    this.getinvoiceList.list = [];
  },
  beforeMount(){
    if (this.getinvoiceList.list.length >= this.getinvoiceList.recordCount) {
        this.getinvoiceList.list = [];
    }  
  }
};
</script>

