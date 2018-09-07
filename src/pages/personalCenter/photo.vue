<style lang="less" scoped>
    @import '../../common/index.less';
    @import '../business/business.less';
    .ceshi {
    line-height: 0.733333rem;
    height: 0.733333rem;
    border: 1px solid red;
    margin-top: 44px;
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
    #fourth .firstRow2 div{
        width: 4.533334rem;
    }
    #fourth .firstRow{
        margin-bottom: 0;
    }
</style>
<template>
<div>
    <div id="fourth">
        <router-view></router-view>
        <headerCom :titleScoped="'商家信息'"></headerCom>
        <!-- 图片 -->
        <div class="imgWrap">
            <div class="firstRow">
                <div class="businessImg" v-if="obj.BusinessLicense">
                    <!-- <img :src="srcPreview2" alt=""> -->
                    <img :src="obj.BusinessLicense" alt="">
                    <span>营业执照</span>
                    <input type="hidden">
                </div>
                <div class="idcardFace" v-if="obj.LegalCardFront">
                    <img :src="obj.LegalCardFront" alt="">
                    <span>法人身份证正面</span>
                    <input type="hidden">
                </div>
            </div>
            <div class="firstRow2">
                <div class="openAccount" v-if="obj.LegalCardBack">
                    <img :src="obj.LegalCardBack" alt="">
                    <span>法人身份证反面</span>
                    <input type="hidden">
                </div>
                <div class="businessImg" v-if="obj.BankFront">
                    <img :src="obj.BankFront" alt="">
                    <span>银行卡正面</span>
                    <input type="hidden">
                </div>
            </div>
            <div class="firstRow2">
              <div class="idcardFace" v-if="obj.BankBack">
                  <img :src="obj.BankBack" alt="">
                  <span>银行卡背面</span>
                  <input type="hidden">
              </div>
            </div>
        </div>

    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            obj:{}
        }
    },
    created(){
       this.obj = JSON.parse(sessionStorage.getItem('info'))
    }
}
</script>
