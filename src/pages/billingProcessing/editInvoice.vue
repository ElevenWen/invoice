<style lang="less" scoped>
    @import '../../common/index.less';
    @import 'invoice.less';
    #routerView{
        background: #fff;
    }
</style>
<template>
    <div>
        <div id="editInvoice" class="routerView-44px">
            <!-- 标题 -->
            <headerCom :titleScoped="'编辑发票内容'"></headerCom>
            <router-view></router-view>
            <!-- 内容 -->
            <div>
                <group> 
                    <template slot="title" slot-scope="props">
                        <div class="name">
                            <span class="redStart redStart2">*</span>
                            <span class="nameWord nameWord2">名称</span>
                            <input type="text" placeholder="请填写货物 / 应税劳务 / 服务名称" @blur="checkName" v-model="isName" @input="check" class="nameInput">
                            <span class="sour" @click="searchP"></span>
                        </div>
                    </template>
                </group>
                <div class="name">
                    <span class="whiteStart">*</span>
                    <span class="nameWord">规格</span>
                    <input type="text" placeholder="请填写规格型号（选填）" v-model="specification">
                </div>
                <div class="name">
                    <span class="whiteStart">*</span>
                    <span class="nameWord">单位</span>
                    <input type="text" placeholder="请填写单位（选填）" v-model="unit">
                </div>
                <div class="name">
                    <span class="redStart">*</span>
                    <span class="nameWord">数量</span>
                    <input type="num" placeholder="请填写数量" v-model="isNum" @input="changePrice">
                </div>
                <div class="name">
                    <span class="redStart">*</span>
                    <span class="nameWord">单价</span>
                    <input type="num" placeholder="请填写单价" v-model="isPrice" @input="changePrice">
                </div>
                <div class="name">
                    <span class="redStart">*</span>
                    <span class="nameWord">金额</span>
                    <input type="num" placeholder="请填写金额" v-model="isMoney" @input="changeTax">
                </div>
                <div class="name">
                    <span class="redStart">*</span>
                    <span class="nameWord">税率</span>
                    <input type="text" placeholder="请填写税率" v-model="isRate" @input="changeTax">
                    <!-- <span class="rightArrow" ></span> -->
                </div>
                <div class="name">
                    <span class="whiteStart">*</span>
                    <span class="nameWord">税额</span>
                    <input type="text" placeholder="请填写税额（选填）" v-model="isTax">
                </div>
                <div style="height:1.066667rem;width:100%;background:#fff;"></div>
                <!-- 保存按钮 -->
                <div class="saveButton" @click="saveInfo">
                    <img src="../../assets/images/highlighted-button@2x.png" alt="" class="saveImg">
                    <span>保存</span>
                </div>
                <!-- 商品名称弹窗 -->
                <div class="productname" v-if="product">
                    <product-name @productN="info" @noName="noName" @inputValue="inputValue"></product-name>
                </div>

                <!-- 无商品是弹窗 -->  
                <div class="sortWrap" v-if="isShowW">
                    <div class="windowsW">
                        <div class="titleW">提示</div>
                        <div class="detail1">无相关结果，请登录pc端添加商品</div>
                        <div class="detail2 copyI">https://www.wqbol.com/</div>
                        <div class="btnWrap">
                            <span @click="sure">确定</span>
                        </div>
                    </div>
                </div>     

            </div>
            <!--/ 内容 -->
        </div>
    </div>
</template>
<script>
import { Group } from "vux";
import tool from "@util/tool.js";
import rateWindow from '@components/rateWindow';
import productName from '@components/productName';
export default {
    data(){
        return {
            // isShowRate:true, //是否显示税率弹窗
            isCompleted:false,
            isName:"",
            specification:"",//规格
            unit:"", //单位
            isNum:"",//数量
            isPrice:"",//单价
            isMoney:"",//金额
            isRate:"", //税率
            isTax:"", //税额
            info:"",
            isShowW:false,
            product:true,
            productId:"",
            info:{},
            info2:[],
            arr:[],
            _isRate:"",
            productArr:[],
        }
    },
    mounted(){
        
    },
    components: {
        rateWindow,
        Group,
        productName
    },
    methods:{
        changePrice(){
            this.isMoney = Number(this.isNum) * Number(this.isPrice);
            this.changeTax();
        },
        changeTax(){
            // let _isRate_ = this.isRate.replace("%","");
            // this.isTax = Number(this.isMoney) * (Number(_isRate_)/100);

            let ratee = (this._isRate).replace("%","")/100;
            let r = (this.isMoney * ratee )/(1 + ratee);
            this.isTax = r.toFixed(2);
        },
        // 验证名称
        checkName(){
            if(this.isName.length > 0 && this.isName.length < 2){
                this.$vux.toast.text('请填写完整的名称', 'middle');
            }
        },
        // 保存信息
        saveInfo(){
            console.log("..",this.isName);
            if(this.isName != this.productArr[0].name){
                this.isShowW = true;
            }
            if(this.isName && this.isNum && this.isPrice && this.isMoney && this.isRate){
                this.info.name = this.isName;
                this.info.id = this.productId;
                this.info.sku = this.specification;
                this.info.unit = this.unit;
                this.info.num = this.isNum;
                this.info.price = this.isPrice;
                this.info.amount = this.isMoney;
                this.info.taxval = this.isTax;
                this.info.tax = this.isRate;
                // this.info2.push({"name":this.isName,"id":this.productId,"sku":this.specification,"unit":this.unit,"num":this.isNum,"price":this.isPrice,"amount":this.isMoney,"taxval":this.isTax,"tax":this.isRate})
                let arr = JSON.parse(localStorage.getItem("addInvoice"))
                if(arr!=null){
                    arr[arr.length] = this.info
                    localStorage.setItem("addInvoice",JSON.stringify(arr))
                }else{
                    let arr = []
                    arr[0] = this.info
                    localStorage.setItem("addInvoice",JSON.stringify(arr))
                }
                this.$vux.toast.text('发票明细保存成功', 'middle')
                this.$router.replace({path:"/billingProcessing/addInvoice",query:{name:this.$route.query.name,invoiceId:this.$route.query.invoiceId}})
            }else {
                this.$vux.toast.text('请填写完整的信息', 'middle');
            }
        },
        // 弹窗数据加载完毕
        completed(val){
            this.isCompleted = true;
        },
        // 搜索
        searchP(){
            console.log(this.isName)
        },
        check(){
            this.info = this.isName;
            console.log("this.info",this.info);
            tool.saveToLocal("productN",this.info);
            // console.log("]]]",tool.loadFromLocal("productN","ALL"));
        },
        noName(val){
            this.isShowW = val;
            this.product = false;
        },
        sure(){
            this.isShowW = false;
            this.product = true;
        },
        inputValue(val){
            this.productArr = val;
            // console.log("..00",this.productArr)
            if(val == null || val.length == 0){
                return
            }
            this.isName = val[0].name;
            this.isRate = val[0].rate;
            this.isPrice = val[0].price;
            this.productId = val[0].id;
            this.unit = val[0].unit;
            this.specification = val[0].sku;
            if(!val[0].price){
                this.isPrice = 1;
            }
            this.isNum = 1;
            this.isMoney = Number(this.isNum) * Number(this.isPrice);
            this._isRate = val[0].rate;
            if(this._isRate == "免税"){
                this.isTax = "免税";
            }else if(this._isRate == "不征税"){
                this.isTax = "不征税";
            }else if(this._isRate == 0 || this._isRate == null){
                this.isTax = 0;
            }else{
                let ratee = (this._isRate).replace("%","")/100;
                let r = (this.isMoney * ratee )/(1 + ratee);
                this.isTax = r.toFixed(2);
            }
        }
    }
}
</script>
