<style lang="less" scoped>
    @import '../../common/index.less';
    @import 'business.less';
</style>
<template>
<div>
    <div id="third" class="routerView-44px">
        <!-- 标题 -->
        <headerCom :titleScoped="'成为商家'"></headerCom>
        <router-view></router-view>
        <div class="firstOne">第一步：企业信息</div>
        <!-- 表单信息 -->
        <!-- <div class="name" v-if="isShowW" @click="showLoad">
            <span class="redStart">*</span>
            <span class="nameWord space">所属区域</span>
            <input type="text" placeholder="请填写所属区域" v-model="province" disabled>
            <span class="rightArrow"></span>
        </div> -->
        <group>
            <template slot="title" slot-scope="props">
                <div class="name">
                    <span class="redStart">*</span>
                    <span class="nameWord space">所属区域</span>
                    <input type="text" placeholder="请填写所属区域" v-model="province" disabled>
                    <span class="rightArrow"></span>
                </div>
            </template>
        </group>
        <div class="name">
            <span class="redStart">*</span>
            <span class="nameWord space">开户银行</span>
            <input type="text" placeholder="请填写开户银行" v-model="bank" @blur="checkBank" maxlength="200" @input="check">
        </div>
        <div class="name">
            <span class="redStart">*</span>
            <span class="nameWord space">开户姓名</span>
            <input type="text" placeholder="请填写开户姓名" v-model="name" @blur="checkName" maxlength="20" @input="check">
        </div>
        <div class="name">
            <span class="redStart">*</span>
            <span class="nameWord space">银行账号</span>
            <input type="num" placeholder="请填写银行账号" v-model="bankAccount.name" @blur="checkBankA($event)" @input="check">
        </div>
        <div class="name">
            <span class="redStart">*</span>
            <span class="nameWord">纳税识别号</span>
            <input type="text" placeholder="请填写纳税识别号" v-model="num" @blur="checkNum" @input="check">
        </div>
        <div class="name">
            <span class="nameWord space noStart">经营地址</span>
            <input type="text" placeholder="请填写经营地址" v-model="address" @blur="checkAddress" maxlength="200">
        </div>
         <!-- 下一步 -->
        <div class="confirmIviW" @click="toFourth">
            <img src="../../assets/images/highlighted-button2@2x.png" alt="" class="confirmIvi" v-if="isGrayOrBlue">
            <img src="../../assets/images/highlighted-button@2x.png" alt="" class="confirmIvi" v-else>
            <span>下一步</span>
        </div>
        <!-- 证件类型弹窗 -->
        <div>
            <threeCascades @addressInfo="addressInfo" @completed="completed"></threeCascades>
        </div>
        <!-- <load-more tip="正在加载"></load-more> -->
    </div>
</div>
</template>
<script>
import tool from '@util/tool.js';
import threeCascades from '@components/threeCascades';
import { Group,LoadingPlugin,Loading  } from "vux";
import { mapState, mapActions, mapGetters } from "vuex";
import Vue from 'vue'
Vue.use(LoadingPlugin)
export default {
    data(){
        return {
            bank:"",
            name:"",
            num:"",
            bankAccount:{
                name:"",
            },
            address:"",
            province:"",
            isGrayOrBlue: true, //是否显示蓝色按钮
            ProvinceId:"",
            CityId:"",
            AreaId:"",
            isShowW:true,
        }
    },
    methods:{
        ...mapActions("business", {
            thirdThree:"thirdThree",
        }),
        // 去到第四步
        toFourth(){
            // console.log("000000",this.ProvinceId,this.CityId,this.AreaId)
            // console.log("00",this.bankAccount.name)
            let result = this.bankAccount.name.replace(/(^\s+)|(\s+$)/g,"");
            let result2 = result.replace(/\s/g,"");
            // console.log("result2",result,result2)
            if(!this.isGrayOrBlue){
                let params = {
                    Id:this.$route.query.id,
                    ProvinceId:this.ProvinceId,
                    CityId:this.CityId,
                    AreaId:this.AreaId,
                    BankName:this.bank,
                    BankNO:result2,
                    Name:this.name,
                    Tax:this.num,
                    Address:this.address
                }
                this.thirdThree(params);
                this.$router.push({path:"/business/fourth",query:{id:this.$route.query.id}});
            }else {
                this.$vux.toast.text('请填写完整信息', 'middle');
            }
        },
        checkBank(){
            if(this.bank.length != 0){
                let status = tool.regularJudgement("hanzi",this.bank);
                if(!status){
                    return false;
                }
                return status;
            }
        },
        checkBank2(){
            let regBank = /^[\u4e00-\u9fa5]+$/gi.test(this.bank);
            return regBank;
        },
        checkBankA(e){
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
            this.$set(this.bankAccount, "name", replaceStr(str));
        },
        checkName(){
            if(this.name.length != 0){
                let status = tool.regularJudgement("person",this.name);
                if(!status){
                    return false;
                }
                return status;
            }
        },
        checkName2(){
            if(this.name.length >= 2){
                return true;
            }else{
                return false;
            }
        },
        checkNum(){
            if(this.num.length != 0){
                let status = tool.regularJudgement("taxNumber",this.num);
                if(!status){
                    return false;
                }
                return status;
            }
        },
        checkNum2(){
            let status = /^[A-Za-z0-9]{15,}$/.test(this.num);
            return status;
        },
        checkAddress(){
            if(this.address.length != 0){
                let status = tool.regularJudgement("companyAddress",this.address);
                if(!status){
                    return false;
                }
                return status;
            }
        },
        check(){
            if(this.checkBank2() && this.checkName2() && this.checkNum2()){
                this.isGrayOrBlue = false;
            }else{
                this.isGrayOrBlue = true;
            }
        },
        addressInfo(val){
            // console.log("000000",val);
            if(val == null || val.length == 0){
                this.province = "";
                return;
            }
            this.province = val[1].name+" "+val[2].name+" "+val[3].name;
            // console.log("this.province",this.province)
            this.ProvinceId = val[1].id;
            this.CityId = val[2].id;
            this.AreaId = val[3].id;
        },
        completed(val){
            // console.log("completed",val);
            // 隐藏
            this.$vux.loading.hide();
            this.isShowW = false;
        },
        showLoad(){
            this.$vux.loading.show({
                text: 'Loading'
            })
        }
    },
    components:{
        threeCascades,
        Group,
        Loading
    }
}
</script>
