<style lang="less" scoped>
    @import '../../common/index.less';
    @import 'invoice.less';
</style>

<template>
<div>
    <div id="invoiceList">
        <!-- 标题 -->
        <headerCom :titleScoped="'开票处理'"></headerCom>
        <router-view></router-view>
        <!-- 企业名称 -->
        <div class="companyName">{{name}}</div>
        <!-- 发票列表 -->
        <!-- :on-refresh="refresh" -->
        <scroller noDataText="没有更多了" :on-infinite="infinite" ref="listInfo">
            <div class="listWrap">
                <!-- <div>{{getinvoiceList.list}}</div> -->
                <div class="list" v-for="(i,index) in getinvoiceList.list" :key="index" @click="toAddInvoice(i)">
                    <div class="listName">{{i.Name}}</div>
                    <div class="listDetail">
                        <span>日期：</span>
                        <span>{{i.CreateTime | formatDate}}</span>
                        <span>待开票</span>
                    </div>
                </div>
            </div>
        </scroller>
        <!-- 上拉加载更多 -->
        <p style="text-align:center;" v-if="isLoadMore">
            <inline-loading></inline-loading><span style="vertical-align:middle;display:inline-block;font-size:14px;">&nbsp;&nbsp;加载中...</span>
        </p>
        <div class="sortWrap" v-show="isShowW">
            <div class="windowsW">
                <div class="titleW">提示</div>
                <div class="detail1">pc端开票请登录</div>
                <div class="detail2 interlinkage">https://www.wqbol.com/</div>
                <div class="btnWrap">
                    <span @click="sure">确定</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import { InlineLoading } from 'vux';
import {mapActions,mapGetters} from 'vuex';
import tool from '../../util/tool.js'
export default {
    data(){
        return {
            isLoadMore:false, //是否显示加载更多
            name: JSON.parse(sessionStorage.getItem('customerInfo')).ShopName,
            pageIndex: 1,
            pageSize: 5,
            wId: "",
            isLoadDone: false,
            isShowW:true,
        }
    },
    created(){
        this.getList();
    },
    computed:{
        ...mapGetters(
            'billingProcessing',['getinvoiceList']
        )
    },
    methods:{
        ...mapActions(
            'billingProcessing',['GetInvList']
        ),
        toAddInvoice(val){
            localStorage.removeItem("addInvoice");
            this.$router.replace({path:"/billingProcessing/addInvoice",query:{name:val.Name,invoiceId:val.Id}});
        },
        getList(){
            this.wId = JSON.parse(sessionStorage.getItem('customerInfo')).Id;
            let params = {
                params:{
                    'MerId':this.wId,
                    'pageIndex':this.pageIndex,
                    'pageSize':this.pageSize,
                    'Status':0
                }
            }
            this.GetInvList(params).then(res=>{
                // console.log('bababab',this.getinvoiceList.list)
            })
        },
        infinite(done) {
            this.pageIndex = this.pageIndex + 1;
            let params = {
                params: {
                // WxCusId: this.wId,
                MerId: this.wId,
                pageIndex: this.pageIndex,
                pageSize: this.pageSize,
                Status:0
                },
                xiala: false
            };
            this.requestData(params, done);
        },
        requestData(params, done) {
            console.log("length",this.getinvoiceList.list.length)
            return this.GetInvList(params).then(() => {
                // 当数据加载完毕
                if (this.getinvoiceList.list.length >= this.getinvoiceList.recordCount) {
                // if(this.getinvoiceList.list.length == 0){
                //没有更多数据 显示到底部的文字
                this.$refs.listInfo.finishInfinite(true);
                } else {
                done();
                }
            });
        },
        refresh(done) {
            //防止下拉完毕后 页面没有数据
            this.pageIndex = 1;
            this.isNoDate = false;
            this.$refs.listInfo.finishInfinite(false);
            let params = {
                params: {
                // WxCusId: this.wId,
                MerId: this.wId,
                pageIndex: 1,
                pageSize: this.pageSize,
                Status:0
                },
                xiala: true
            };
            this.GetInvList(params).then(() => {
                done();
            });
        },
        sure(){
            this.isShowW = false;
        }
    },
    filters:{
        formatDate: (value)=>{
            var _value = value.replace(/\D/g,"")
            return tool.formatDate(_value,"yyyy-MM-dd");
        }
    },
    components: {
        InlineLoading,
    },
    beforeDestroy(){
        this.getinvoiceList.list = [];
    },
    beforeMount(){
         if (this.getinvoiceList.list.length >= this.getinvoiceList.recordCount) {
             this.getinvoiceList.list = [];
         }  
    }
}
</script>
