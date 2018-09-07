<style lang="less" scoped>
    @import '../../common/index.less';
    @import 'invoice.less';
    #routerView{  
        height: 100%; 
        background: #fff; 
    }
</style>
<template>
<div>
    <div id="addInvoice">
        <!-- 标题 -->
        <headerCom :titleScoped="'开票处理'"></headerCom>
        <router-view></router-view>
        <!-- 发票抬头 -->
        <div class="invoiceHeader">
            <span>发票抬头</span>
            <input type="text" placeholder="请填写商家登录用户名" v-model="invoiceHeader" disabled>
        </div>
        <!-- 发票内容 -->
        <!-- 没有内容时 -->
        <div v-if="isContent">   
            <div class="contentWord">发票内容</div>
            <div class="addContentWrap">
                <div class="addContent" @click="toEditI">
                    <span></span>
                    <span>添加内容</span>
                </div>
            </div>
            <div class="pcWrod">
                <div>PC端开票请登录</div>
                <div class="interlinkage">www.baidu.com</div>
            </div>
            <!-- 确认开票按钮灰色 -->
            <div class="confirmIviW">
                <img src="../../assets/images/highlighted-button2@2x.png" alt="" class="confirmIvi">
                <span>确认开票</span>
            </div>
        </div>
        <!-- 有内容时 -->
        <div v-else>
            <!-- 发票合计 -->
            <div class="invoiceTotal">发票合计：{{totalMoney}}</div>
            <div class="borderT">
                <div class="invoiceCWrap">
                    <div class="invoiceC" v-for="(items,index) in arrInfo" :key="index">
                        <!-- <div>{{items}}</div> -->
                        <div class="invoiceTitle">{{index+1}}.{{items.name}}</div>
                        <div class="invoiceCLeft">
                            <span>规格：{{items.sku?items.sku:"--"}}</span>
                            <span>数量：{{items.num}}</span>
                            <span>税率：{{items.tax}}</span>
                        </div>
                        <div class="invoiceCRight">
                            <span>单位：{{items.unit}}</span>
                            <span>单价：{{items.price}}</span>
                            <span>税额：{{items.taxval?items.taxval:"--"}}</span>
                        </div>
                        <div class="subtotal">
                            <span>小计：{{items.amount}}</span>
                            <span @click="deletInfo(items,index)">删除</span>
                            <span @click="deletInfo(items,index)"></span>
                        </div>
                    </div>

                </div>
                <!-- 继续添加 -->
                <div class="addContentWrap2">
                    <div class="addContent addContent2" @click="toEditII">
                        <span></span>
                        <span>继续添加</span>
                    </div>
                </div>
            </div>
            <img src="../../assets/images/shadow2@2x.png" alt="" class="bottomImg" >
            <div class="pcWrod">
                <div>PC端开票请登录</div>
                <div>www.baidu.com</div>
            </div>
            <div style="height:1.066667rem;width:100%;background:#fff;"></div>
            <!-- 确认开票蓝色-->
            <div class="invoiceBlue" @click="sureI">
                <img src="../../assets/images/highlighted-button@2x.png" alt="" class="confirmIvi">
                <span>确认开票</span>
            </div>
        </div>
        <!-- 删除弹窗 -->
        <div class="sortWrap" v-if="isShowW">
            <div class="windowsW">
                <div class="titleW">提示</div>
                <div class="detail">确认删除吗？</div>
                <div class="btnWrap">
                    <span @click="cancle">取消</span>
                    <span @click="sure">确定</span>
                </div>
            </div>
        </div>
        <!-- 确认开票弹窗 -->
        <div class="sortWrap2" v-if="isSuccess">
            <div class="windowsW">
                <div class="titleW">提示</div>
                <div class="detail">开票成功</div>
                <div class="detail2">开票信息推送成功</div>
                <div class="btnWrap">
                    <span @click="sureList">确定</span>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
<script>
import tool from "@util/tool.js";
import { mapState, mapActions, mapGetters } from "vuex";
export default {
    data(){
        return {
            isContent:false,
            arrInfo:[],
            invoiceHeader:"",
            isShowW:false,
            currentVal:"",
            totalMoney:'',
            isSuccess:false,
        }
    },
    computed: {
        ...mapGetters(
            'billingProcessing',['detailInfo',"_confirmInvoice_"]
        )
    },
    mounted(){
        this.invoiceHeader = this.$route.query.name;
        if(this.$route.query.id){
            // console.log("3")
            // this.invoiceHeader = this.$route.query.name;
            let params = {
                params:{
                    Id:this.$route.query.id
                }
            }
            this.invoiceDetail(params).then(() => {
                // console.log("this.detailInfo",this.detailInfo)
                this.arrInfo = this.detailInfo;
                console.log("this.arrInfo",this.arrInfo)
                if(this.arrInfo == null || this.arrInfo.length == 0){
                    this.isContent = true;
                    return
                }else if(this.arrInfo.length != 0){
                    this.isContent = false;
                }
                let arrMoney2 = [];
                    this.arrInfo.forEach((items,index) => {
                    arrMoney2.push(items.amount);

                })
                this.totalMoney = arrMoney2.reduce((x ,y)=>{return x+y;})    
            });
            // console.log("6666",this.arrInfo)
        }else{
            this.arrInfo = JSON.parse(localStorage.getItem("addInvoice"));
            // console.log("this.arrInfo",this.arrInfo)
            if(this.arrInfo == null || this.arrInfo.length == 0){
                this.isContent = true;
                return
            }else if(this.arrInfo.length != 0){
                this.isContent = false;
            }
            // this.invoiceHeader = this.$route.query.name;

            let arrMoney = [];
                this.arrInfo.forEach((items,index) => {
                arrMoney.push(items.amount);
            })
            this.totalMoney = arrMoney.reduce((x ,y)=>{return x+y;})    
        }

    },
    methods:{
        ...mapActions("billingProcessing", {
            confirmInvoice:"confirmInvoice",
            invoiceDetail:"invoiceDetail"
        }),
        toEditI(){
            if(this.$route.query.id){
                this.$router.replace({path:"/billingProcessing/editInvoice",query:{name:this.$route.query.name,id:this.$route.query.id}});
            }else if(this.$route.query.invoiceId){
                this.$router.replace({path:"/billingProcessing/editInvoice",query:{name:this.$route.query.name,invoiceId:this.$route.query.invoiceId}});
            }
        },
        toEditII(){
            // this.$router.replace("/billingProcessing/editInvoice");
            if(this.arrInfo.length >= 8){
                this.$vux.toast.text('单张发票最多可添加8行,如需更好体验请登录pc端', 'middle')
                return
            }else{
                this.$router.replace({path:"/billingProcessing/editInvoice",query:{name:this.$route.query.name,invoiceId:this.$route.query.invoiceId}});
            }
        },
        deletInfo(val,i){
            this.isShowW = true;
            this.currentVal = val.id;
        },
        sureI(){
            // console.log(this.arrInfo);
            let _id;
            if(this.$route.query.invoiceId){
                _id = this.$route.query.invoiceId
            }else if(this.$route.query.id){
                _id = this.$route.query.id
            }
            let params = {
                InvId:_id,
                Param:encodeURI(JSON.stringify({data:this.arrInfo})),
                SumMoney:this.totalMoney
            }
            // console.log( {data:this.arrInfo} )
            // console.log( '=',params)
            
            this.confirmInvoice(params).then(() => {
                console.log(this._confirmInvoice_)
                if(this._confirmInvoice_){
                    this.isSuccess = true;
                }
            });
        },
        cancle(){
            this.isShowW = false;
        },
        sureList(){
            this.$router.replace("/billingProcessing/invoiceList");
        },
        sure(){
            let arr = [];
            this.arrInfo.forEach((items) => {
                if(this.currentVal != items.id){
                    arr.push(items);
                }
            })
            localStorage.removeItem('addInvoice');
            localStorage.setItem("addInvoice",JSON.stringify(arr))
            this.arrInfo = JSON.parse(localStorage.getItem("addInvoice"));
            if(this.arrInfo.length == 0){
                this.isContent = true;
            }
            this.isShowW = false;

            let allMoney = [];
                this.arrInfo.forEach((items,index) => {
                allMoney.push(items.amount);

            })
            console.log("allMoney",allMoney)
            this.totalMoney = allMoney.reduce((x ,y)=>{return x+y;})    
        },
    },
    // beforeDestroy(){
    //     if(JSON.parse(localStorage.getItem("addInvoice"))){

    //     }
    //     localStorage.removeItem("addInvoice");
    // }
}
</script>

