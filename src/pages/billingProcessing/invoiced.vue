<style lang="less" scoped>
@import "../../common/index.less";
@import "invoice.less";
#invoiced{
  padding-top:0.1px;
}
.routerView-44px{
  height: calc(100% - 2.8rem)!important;
}
</style>
<template>
<div>
    <div id="invoiced">
        <!-- <div id="hiddenS"> -->
            <!-- 标题 -->
            <headerCom :titleScoped="'开票记录'"></headerCom>
            <router-view></router-view>
            <!-- 企业名称 -->
            <div class="companyName" :class="search?'companyName2':'companyName'" >
                <div>深圳市微企宝计算机系统有限公司</div>
                <div @click="isShowSearch" :class="search?'arrowUp':'arrowDown'"></div>
                <div v-show="search" class="hidden">
                    <input type="text" @keyup.enter="searchI" v-model="searchName">
                    <span></span>
                    <span>搜索</span>
                </div>
            </div>
        <!-- </div> -->
        <!-- 发票列表 -->
       
        <!-- 上拉加载更多 -->
        <div  class="outWrapper  routerView-44px"  >
          <div class="wrapper" ref="wrapper"> 
            <div  class="dataWrap" v-show="getinvoiceList.recordCount != 0"> 
              <div  class="pulldowntext" v-if='pulldowntext'>{{pulldowntext}}</div>
                <div :class="search?'listWrap':'listWrap2'">
                    <div class="list" v-for="(items,index) in getinvoiceList.list" :key="index"  @click="toDetail(items)">
                        <div class="listName">{{items.Name}}</div>
                        <div class="listDetail">
                            <span>日期：</span>
                            <span>{{(items.CreateTime).substring(6,items.CreateTime.lastIndexOf(")")) | formatDateFn }}</span>
                            <span>{{stateChange(items.Status)}}</span>
                        </div>
                    </div>
                </div>
                <!-- <div class="pulldowntext" v-show="hasData=='没有更多了'" id="pulldowntext">{{hasData}}</div>  -->
                <div class="pulldowntext" v-show="hasData=='没有更多了'">{{hasData}}</div> 
              </div>
            </div>
          </div>
      </div>
        <!-- 发票列表 -->
    </div>
<!-- </div> -->
</template>
<script>
import headerCom from "@components/headerCom";
import { InlineLoading } from "vux";
import { mapState, mapActions, mapGetters,mapMutations } from "vuex";
import tool from "@util/tool.js";
import getData from "@vuex/ajaxAPI/getData";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      search: false, //是否展示搜索框
      isLoadMore: false,
      pageIndex: 1,
      pageSize: 6,
      wId: "",
      isLoadDone: false,
      searchName: "",
      scroll: false,
      pulldowntext: false,
      timeId: null, //定时器
      hasData: true, // 上拉加载数据 true代表有数据
    };
  },
  computed: {
    ...mapGetters("billingProcessing", ["getinvoiceList"]),
    ...mapGetters(
        '_list',['_list']
    ),
    ...mapState("billingProcessing",["invoiceList"]),
  },
  created() {
    let info = JSON.parse(sessionStorage.getItem('customerInfo'));
    // console.log("info",info)
    // this.wId = info.WxId;
    this.wId = info.Id;
    let params = {
      params: {
        // WxCusId: this.wId,
        MerId: this.wId,
        pageIndex: 1,
        pageSize: 10
      },
      xiala: false
    };
    this.GetInvList(params).then(res => {
    });
// console.log("")
var that = this
    this.$nextTick(() => {
      // console.log(this.$refs.wrapper,'??' )
      if (!this.scroll) {
       
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
    //  this.refresh();
    // 吸顶效果
    // var obj = document.getElementById("hiddenS");
    // var ot = obj.offsetTop;
    // document.onscroll = function() {
    //   var st = document.body.scrollTop || document.documentElement.scrollTop;
    //   obj.setAttribute("data-fixed", st >= ot ? "fixed" : "");
    // };
  },
  methods: {
    ...mapActions("billingProcessing", {
      GetInvList: "GetInvList",
      GetInvListRefresh: "GetInvListRefresh" 
    }),
     
    isShowSearch() {
      this.search = !this.search;
    },
    infinite(done) { 
      //注意调用为异步ajax 所以刚开始设置的this.hasData = true 表示么有数据
      if (!this.hasData) {
        return;
      }
      //第二次加载数据
      this.pageIndex++;
      let params = {
        params: {
          MerId: this.wId,
          pageIndex: this.pageIndex,
          pageSize: this.pageSize,
          // Status: 2
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
          console.log("没有数据了1");
        } else { 
          this.hasData = true;
          console.log("还有数据呢", this.hasData);
        }
      });
    },
    refresh(flag) { 
      //下拉刷新
      this.pageIndex = 1;
      let params = {
        params: {
          MerId: this.wId, 
          pageIndex: 1,
          pageSize: this.pageSize
        },
        xiala: true
      };
      if(flag){
        params.params.Name  = this.searchName
      }
      return this.GetInvListRefresh(params).then(() => {
        // 当数据加载完毕
        if (this.getinvoiceList.list.length >= this.getinvoiceList.recordCount) {
          this.hasData = "没有更多了";
          // console.log("没有数据了1");
        } else {
          this.hasData = true;
          // console.log("还有数据呢", this.hasData);
        }

        if(this.getinvoiceList.recordCount == 1){
          document.getElementsByClassName("dataWrap")[0].style.paddingTop = "0";
        }else{
          document.getElementsByClassName("dataWrap")[0].style.paddingTop = "3rem";
        }
                this.scroll.refresh();
        
      });
    },
    stateChange(val) {
      switch (val) {
        case 0:
          return "待开票";
          break;
        case 1:
          return "开具中";
          break;
        case 2:
          return "开具成功";
          break;
        case 3:
          return "开具失败";
          break;
      }
    },
    searchI() {
      this.getinvoiceList.list = [];
      this.refresh(true)
      // let params = {
      //   params: {
      //     // WxCusId: this.wId,
      //     MerId: this.wId,
      //     pageIndex: 1,
      //     pageSize: this.pageSize,
      //     Name: this.searchName
      //   },
      //   xiala: false
      // };
      // return this.GetInvListRefresh(params).then((res) => {
      //   // 当数据加载完毕
      //   if (this.getinvoiceList.list.length >= this.getinvoiceList.recordCount) {
      //     this.hasData = "没有更多了";
      //     // console.log("没有数据了1");
      //   } else {
      //     this.hasData = true;
      //     // console.log("还有数据呢", this.hasData);
      //   }
      //   if(this.getinvoiceList.recordCount == 1){
      //     document.getElementsByClassName("dataWrap")[0].style.paddingTop = "0";
      //   }else{
      //     document.getElementsByClassName("dataWrap")[0].style.paddingTop = "3rem";
      //   }
      // });
    },
    toDetail(val){
      // console.log(val)
      localStorage.removeItem("addInvoice");
      if(val.Status == 2){
        this.$router.push({path:"/myInvoice/invoiceDetail",query:{id:val.Id}});
      }else{
        this.$router.push({path:"/billingProcessing/addInvoice",query:{id:val.Id,name:val.Name}});
      }
    }
  },
  components: {
    headerCom,
    InlineLoading
  },
  filters: {
    formatDateFn: value =>  tool.formatDate(value, "yyyy-MM-dd"),
      
    
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
