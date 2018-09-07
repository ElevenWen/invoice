<template>
<div>
    <div id="companyInfo">
        <router-view></router-view>
        <headerCom :titleScoped="'商家信息'"></headerCom>
        <div class="head">
            <p>{{_companyInfo.ShopName}}</p>
            <div class="code_box" v-if="$route.query.status=='已通过'" @click="goCode(_companyInfo.Id,_companyInfo.ShopName)">
                <qrcode id="codeImg" :value="value+_companyInfo.Id" type="img" :size="150"></qrcode>
            </div>
            <div class="loser" v-if="$route.query.status=='已驳回'">
                <div class="loser_i">
                    <img src="../../assets/images/notthrough@3x.png" alt="">
                </div>
                <p class="nopast">未通过</p>
                <p class="reson">{{_companyInfo.Remark}}</p>
            </div>
        </div>
        <div class="detail">
            <ul>
                <li>
                    <span>商户名称</span>
                    <span>{{_companyInfo.ShopName}}</span>
                </li>
                <li>
                    <span>用户名</span>
                    <span>{{_companyInfo.Name}}</span>
                </li>
                <li>
                    <span>手机号码</span>
                    <span>{{_companyInfo.Mobile}}</span>
                </li>
                <li>
                    <span>证件类型</span>
                    <span>{{_companyInfo.CertTypeName}}</span>
                </li>
                <li>
                    <span>证件号码</span>
                    <span>{{_companyInfo.CertNumber}}</span>
                </li>
                <li>
                    <span>证件姓名</span>
                    <span>{{_companyInfo.CertName}}</span>
                </li>
                <li>
                    <span>开户银行</span>
                    <span>{{_companyInfo.BankName}}</span>
                </li>
                <li>
                    <span>银行账号</span>
                    <span>{{_companyInfo.BankNo}}</span>
                </li>
                <li>
                    <span>开户姓名</span>
                    <span>{{_companyInfo.AccountName}}</span>
                </li>
                <li>
                    <span>所属区域</span>
                    <span>{{_companyInfo.Province}}{{_companyInfo.City}}{{_companyInfo.Area}}</span>
                </li>
                <li class="addressLi">
                    <span>经营地址</span>
                    <span>{{_companyInfo.Address}}</span>
                </li>
                <li>
                    <span>纳税识别号</span>
                    <span>{{_companyInfo.Tax}}</span>
                </li>
                <li>
                    <span>QQ</span>
                    <span>{{_companyInfo.QQ}}</span>
                </li>
                <li>
                    <span>微信</span>
                    <span>{{_companyInfo.WechatNumber}}</span>
                </li>
                <li>
                    <span>查看附件</span>
                    <span class="more" @click="goPhoto">点击查看附件信息 >></span>
                </li>
            </ul>
        </div>
    </div>
</div>
</template>

<style lang="less" scoped>
@import './personalCenter.less';
</style>

<script>
import {mapActions,mapGetters} from 'vuex';
import { Qrcode } from 'vux'
import { getSession } from "@util/sessionStorage";
    export default{
        data(){
            return{
                successInfo: false, //状态
                value:`${process.env.innerGobleNetPort}?fapiaoId=`
            }
        },
        created(){
            this._getInfo();
            this.$nextTick(()=>{  //二维码rem自适应
                document.getElementById('codeImg').children[1].style.width = '4.533333333333333rem';
                document.getElementById('codeImg').children[1].style.height = '4.533333333333333rem';
            })
        },
        computed:{
            ...mapGetters(
                'personalCenter',{
                    '_companyInfo':'_companyInfo'
                }
            )
        },
        methods:{
            ...mapActions(
                'personalCenter',['GetInfo']
            ),
            goPhoto(){
                this.$router.push('/personalcenter/photo')
            },
            _getInfo(){
                let params = {
                     'UnionId':getSession('_id')
                }
                this.GetInfo(params).then(res=>{
                    sessionStorage.setItem('info',JSON.stringify(this._companyInfo))
                })
            },
            goCode(id,name){
                this.$router.push({path:'/business/businessCreateCode',query:{id:id,name:name}})
            }
        },
        components: {
            Qrcode
        }
    }
</script>

