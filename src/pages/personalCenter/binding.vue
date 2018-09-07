<template>
    <div>
        <div id="bingding">
        <router-view></router-view>    
        <headerCom :titleScoped="'绑定商家'"></headerCom>
        <div class="ulContainer">
            <ul>
                <li>
                    <div class="libox">
                        <span>用户名</span>
                        <span class="i_span"><input type="text" placeholder="请输入用户名" v-model="name"></span>
                    </div>
                </li>
                <li class="line">
                    <div class="left_y">
                        <span>手机号</span>
                        <span class="i_span"><input type="tel" v-model="phone" placeholder="请输入手机号" @blur="verifyP" maxlength="11"></span>
                    </div>
                    <!-- <div class="right_y">
                        <span class="botton_y">获取验证码</span>
                    </div> -->
                </li>
                <li class="line yanzheng">
                    <div class="left_y">
                        <span>验证码</span>
                        <span class="i_span"><input type="num" placeholder="请输入验证码" v-model="code"></span>
                    </div>
                    <div class="right_y" v-if="verificationCode">
                        重新获取<span>{{num}}</span>s
                    </div>
                    <div v-else class="getCode" @click="getCode">
                        <span>获取验证码</span>
                    </div>
                </li>
            </ul>
        </div>
        <div class="button_container" @click="bindingF">
            <span>绑定</span>
        </div>
    </div>
    </div>
</template>

<style lang="less" scoped>
    @import './personalCenter.less';
</style>

<script>
import tool from '../../util/tool.js'
import {mapActions,mapGetters} from 'vuex'
import { getSession } from "@util/sessionStorage";
    export default{
        data(){
            return{
                verificationCode: false, //验证码倒计时显示隐藏
                num: 60, //倒计时
                phone: '', //手机号
                isPhone: false, //验证手机
                code:'',
                name:''
            }
        },
        computed:{
            ...mapGetters(
                'personalCenter',['verifyCode','_binding','_info']
            ),
        }, 
        methods:{
            ...mapActions(
                'personalCenter',{
                    'getVerifyCode':'getVerifyCode', //获取验证码
                    'BindShop':'BindShop', //绑定
                    'getUserInfo':'getUserInfo' //用户信息
                }
            ),
            verifyP(){ //验证手机号
                if(!this.phone.trim()){
                    return;
                }
                var phoneV = tool.regularJudgement('phone',this.phone)
                if(phoneV){
                    this.isPhone = true;
                }else{
                    this.isPhone = false;
                }
            },
            getCode(){ //点击获取验证码
                
                this.num = 60;
                if(this.isPhone&&this.phone){
                    let params = {
                        "mobile":this.phone
                    }
                    this.getVerifyCode(params).then((res)=>{
                        if(this.verifyCode.success){
                            this.$vux.toast.text(this.verifyCode.msg)
                            this.verificationCode = true;
                            var timer = setInterval(()=>{
                                if(this.num > 0){
                                    this.num--;
                                }else{
                                    this.verificationCode = false;
                                    clearTimeout(timer)
                                    return;
                                }
                            }, 1000);
                        }else{
                            this.$vux.toast.text(this.verifyCode.msg)
                        }
                    })
                }else{
                    this.verifyP()
                    return;
                }
            },
            bindingF(){ //绑定
                if(this.name && this.isPhone && this.phone && this.code){
                    let params = {
                        'ShopName': this.name,
                        'Mobile': this.phone,
                        'VerifyCode': this.code,
                        'WxId': this.$route.query.id
                    }
                    this.BindShop(params).then(res=>{
                        if(this._binding.success){
                            let params = {
                                'UnionId':getSession('_id')
                            }
                            this.getUserInfo(params).then(res=>{
                                sessionStorage.setItem('customerInfo',JSON.stringify(this._info))
                            })
                            this.$router.push('/personalcenter')
                        }else{
                            this.$vux.toast.text(this._binding.msg)
                        }
                    })
                }else{
                    this.$vux.toast.text('请填写正确的信息')
                }
            }
        },
    }
</script>

