<template>
    <div>
        <div id="personalCenter">
        <router-view></router-view>    
        <headerCom :titleScoped="'个人中心'"></headerCom>    
        <div class="baseInfo">
            <div class="top">
                <div class="photo">
                    <img :src="_info.HeadImgUrl" alt="">
                </div>
                <p class="name">{{_info.NickName}}</p>
            </div>
            <div class="bottom">
                <ul>
                    <li>
                        <div>
                            <div>
                                <span>
                                    <img src="../../assets/images/gender@3x.png" alt="">
                                </span>
                                <span>
                                    性别
                                </span>
                            </div>
                            <div>{{sex}}</div>
                        </div>
                    </li>
                    <li>
                        <div>
                            <div>
                                <span>
                                    <img src="../../assets/images/mobile@3x.png" alt="">
                                </span>
                                <span>
                                    手机
                                </span>
                            </div>
                            <div>{{_info.Mobile}}</div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <h3>
            我的商家
        </h3>
        <div class="nobinding" v-if="!_info.IsShop">
            <div class="top">
                <div class="infBox">
                    <img src="../../assets/images/emptyshops@3x.png" alt="">
                </div>
                <p>您还没有绑定商户</p>
            </div>  
            <div class="bottom" @click="goBinding">
                <img src="../../assets/images/binding@3x.png" alt="">
                <span class="r_b">立即绑定</span>
            </div> 
        </div>
        <div class="nobinding binding" v-else>
            <div class="ulContainer">
                <ul>
                    <li @click="goCompanyDetail">
                        <div class="one_left">
                            <span>
                                <span class="img_d">
                                    <img src="../../assets/images/shopname@3x.png" alt="">
                                </span>
                                <span class="ming">名称</span>
                            </span>
                            <span class="rightT">
                                {{_info.ShopName}}
                            </span>
                        </div>
                    </li>
                    <li>
                        <div class="left">
                             <span class="img_d">
                                 <img src="../../assets/images/state@3x.png" alt="">
                             </span>
                             <span>状态</span>
                        </div>
                        <div class="right">
                            {{status}}
                        </div>
                    </li>
                </ul>
            </div>
            <div class="bottom noBottom" @click="cancelBinding">
                <img src="../../assets/images/binding@3x.png" alt="">
                <span>{{buttomHtml}}</span>
            </div> 
        </div>
        <!-- 取消绑定弹窗 -->
        <div class="cancelM" v-if="toastShow">
            <p>请耐心等待平台审核</p>
            <p>审核通过后将展示详细信息</p>
        </div>
        <div class="cancelM" v-if="toastShow2">
            <p>请去完善商户信息</p>
        </div>
    </div>
    </div>
</template>

<style lang="less" scoped>
@import './personalCenter.less';
</style>

<script>
import {mapActions,mapGetters} from 'vuex';
import { getSession } from "@util/sessionStorage";
    export default{
        data(){
            return{
                // hasC: false,  //我的商家有无
                buttomHtml: '取消绑定', //取消绑定按钮文字
                toastShow: false, //toast
                toastShow2:false,
                sex: '', //性别
                status: '', //状态
            }
        },
        created(){
            this.getInfo();
        },
        computed:{
            ...mapGetters(
                'personalCenter',['_info','_cancel']
            )
        },
        methods:{
            ...mapActions(
                'personalCenter',{
                    'getUserInfo':'getUserInfo',
                    'RemoveBindShop':'RemoveBindShop'
                }
            ),
            cancelBinding(){  //取消绑定
                this.buttomHtml = '取消中...';
                this.RemoveBindShop({WxId:this._info.WxId}).then(res=>{
                    if(this._cancel.success){
                        this.getInfo();
                        this.buttomHtml = '取消绑定';
                    }
                })
            },
            goBinding(){  //立即绑定
                this.$router.push({path:'/personalCenter/binding',query:{'id':this._info.WxId}})
            }, 
            goCompanyDetail(){  //点击跳转公司详情
                if(this._info.Status==1){
                    this.toastShow = true;
                    this.timer = setInterval(() => {
                        this.toastShow = false;
                    }, 2000)
                }else if(this._info.Status==0){
                    this.toastShow1 = true;
                    this.timer = setInterval(() => {
                        this.toastShow1 = false;
                    }, 2000)
                }else{
                    this.$router.push({path:'/personalCenter/companyInfo',query:{'status':this.status}})
                }
            },
            getInfo(){  //获取用户信息
                let params = {
                     'UnionId':getSession('_id')
                }
                this.getUserInfo(params).then(res=>{
                    console.log('哈哈哈哈',JSON.stringify(this._info))
                    sessionStorage.setItem('customerInfo',JSON.stringify(this._info))
                    console.log('哈哈哈哈22222',JSON.stringify(this._info))
                    if(this._info.Sex==1){
                        this.sex = '男'
                    }else if(this._info.Sex==2){
                        this.sex = '女'
                    }else{
                        this.sex = '未知'
                    }
                    if(this._info.Status==0){
                        this.status = '数据待完善'
                    }else if(this._info.Status == 1){
                        this.status = '待处理'
                    }else if(this._info.Status==2){
                        this.status = '已通过'
                    }else if(this._info.Status==3){
                        this.status = '已驳回'
                    }
                })
            },
        },
        beforeDestroy () {
            clearInterval(this.timer)
        }
    }
</script>

