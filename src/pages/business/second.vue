<style lang="less" scoped>
    @import '../../common/index.less';
    @import 'business.less';
</style>
<template>
<div>
    <div id="second" class="routerView-44px">
        <!-- 标题 -->
        <headerCom :titleScoped="'成为商家'"></headerCom>
        <router-view></router-view>
        <div class="firstOne">第二步：个人信息</div>
        <!-- 表单信息 -->
        <group>
            <template slot="title" slot-scope="props">
                <div class="name">
                    <span class="redStart">*</span>
                    <span class="nameWord">证件类型</span>
                    <input type="text" placeholder="请填写证件类型" v-model="cardTypee" disabled>
                    <span class="rightArrow"></span>
                </div>
            </template>
        </group>
        <div class="name">
            <span class="redStart">*</span>
            <span class="nameWord">证件姓名</span>
            <input type="text" placeholder="请填写证件姓名" v-model="cardName" @blur="checkName" @input="check" maxlength="20">
        </div>
        <div class="name">
            <span class="redStart">*</span>
            <span class="nameWord">证件号码</span>
            <input type="text" placeholder="请填写证件号码" v-model="cardNum" @blur="checkNum" @input="check">
        </div>
        <div class="name">
            <span class="redPoint">o</span>
            <span class="nameWord">QQ号</span>
            <input type="text" placeholder="请填写QQ号（选填）" v-model="qq" @blur="checkQQ" @input="check">
        </div>
        <div class="name">
            <span class="redPoint">o</span>
            <span class="nameWord">微信号</span>
            <input type="text" placeholder="请填写微信号（选填）" v-model="wechat" @blur="checkWechat" @input="check">
        </div>
         <!-- 下一步 -->
        <div class="confirmIviW" @click="toSucess">
            <img src="../../assets/images/highlighted-button2@2x.png" alt="" class="confirmIvi" v-if="isGrayOrBlue">
            <img src="../../assets/images/highlighted-button@2x.png" alt="" class="confirmIvi" v-else>
            <span>下一步</span>
        </div>
        <!-- 证件类型弹窗 -->
        <div v-show="isShowType">
            <card-type @value = "value"></card-type>
        </div>
    </div>
</div>
</template>
<script>
import tool from "@util/tool.js";
import cardType from "@components/cardType";
import { Group } from "vux";
import { mapState, mapActions, mapGetters,mapMutations } from "vuex";
import getData from "@vuex/ajaxAPI/getData";
export default {
    data(){
        return {
            cardTypee:"",//证件类型
            cardName:"", //证件姓名
            cardNum:"", //证件号码
            qq:"", //QQ
            wechat:"",//微信
            isShowType:true, //是否显示证件类型
            isGrayOrBlue: true, //是否显示蓝色按钮
            numStatus:false,
            cardTypeeNum:0,
            name:"",
            card:false,
        }
    },
    computed: {
        ...mapState("business", {
            businessId:"businessId",
            businessName:"businessName"
        }),
        ...mapGetters("business", {
            _businessId:"_businessId",
            _businessName:"_businessName",
        })

    },
    mounted(){
        console.log("cao",this._businessName)
    },
    methods:{
        ...mapActions("business", {
            secondTwo:"secondTwo",
        }),
        // 去到第三步
        toSucess(){
            // console.log(this.cardTypeeNum)
            if(!this.isGrayOrBlue){
                // debugger
                let params = {
                    Id: this.$route.query.id,
                    CertType:this.cardTypeeNum,
                    CertName:this.cardName,
                    CertNumber:this.cardNum,
                    QQ:this.qq,
                    WechatNumber:this.wechat
                }
                // this.secondTwo(params);
                getData.secondTwo(params).then((res) => {
                    console.log("000.",res.data.ShopName)
                    this.name = res.data.ShopName
                    this.$router.push({path:"/business/sucess",query:{id:this.$route.query.id,name:this.name}});
                })
            }else{
                this.$vux.toast.text('请填写完整信息', 'middle');
            }
        },
        // 验证证件姓名
        checkName(){
            if(this.cardName.length != 0){
                let status = tool.regularJudgement("person",this.cardName);
                if(!status){
                    return false;
                }
                return status;
            }
        },
        checkName2(){
            if(this.cardName.length >= 2){
                return true;
            }else {
                return false;
            }
        },
        // 验证证件号码
        checkNum(){
            if(this.cardNum.length != 0){
                if(this.cardTypee == "身份证"){
                    let status = tool.regularJudgement("idcardNum",this.cardNum);
                    if(!status){
                        return false;
                    }
                    this.numStatus = status;
                    return this.numStatus
                }else if(this.cardTypee == "护照"){
                    let status = tool.regularJudgement("passport",this.cardNum);
                    if(!status){
                        return false;
                    }
                    this.numStatus = status;
                    return this.numStatus
                }
            }
        },
        checkNum2(){
            let status = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/.test(this.cardNum.trim());
            return status;
        },
        checkNum3(){
            let status = /^[a-zA-Z]{5,17}$/.test(this.cardNum.trim());
            let status2 = /^[a-zA-Z0-9]{5,17}$/.test(this.cardNum.trim());
            if(status || status2){
                return true;
            }else {
                return false;
            }
        },
        // 验证qq
        checkQQ(){
            if(this.qq.length != 0){
                let status = tool.regularJudgement("qq",this.qq);
                if(!status){
                    return false;
                }
                return status;
            }else{
                if(this.wechat.length == 0){
                    this.$vux.toast.text('qq或微信必填一项', 'middle')
                }
            }
        },
        checkQQ2(){
            let regqq = /^[1-9][0-9]{4,14}$/;
            let status = regqq.test(this.qq);
            // console.log(status);
            return status;
        },
        // 验证微信号
        checkWechat(){
            // var qqStr="12345"
            // var qqReg=/^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
            // console.log(qqReg.test(qqStr));//qq正则  
            if(this.wechat.length != 0){
                let status = tool.regularJudgement("wechat",this.wechat);
                console.log(status)
                if(!status){
                    return false;
                }
                return status;
            }else{
                if(this.qq.length == 0){
                    this.$vux.toast.text('qq或微信必填一项', 'middle')
                }
            }
        },
        checkWechat2(){
            let regwechat = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/;
            let status = regwechat.test(this.wechat);
            // console.log(status);
            return status;
        },
        check(){
            console.log("4",this.card)
            if(this.card && this.checkName2() && (this.checkNum2()  || this.checkNum3()) && (this.checkQQ2() || this.checkWechat2())){
                this.isGrayOrBlue = false;
            }else{
                this.isGrayOrBlue = true;
            }
        },
        // 弹窗传过来的值
        value(val){
            if(val == null || val.length == 0){
                return
            }
            this.cardTypee = val;
            this.card = true;
            console.log("1",this.cardTypee)
            switch(this.cardTypee){
                case "身份证":
                    this.cardTypeeNum = 1;
                    return this.cardTypeeNum;
                break;
                case "护照":
                    this.cardTypeeNum = 4;
                    return this.cardTypeeNum;
                break;
            }
        }
    },
    components:{
        cardType,
        Group
    }
}
</script>
