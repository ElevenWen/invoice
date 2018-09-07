<style lang="less" scoped>
 @import '../../common/index.less';
    #success{
        height: 100%;
        background: #fff;
    }
    .firstOne{
        height: .933333rem;
        line-height: .933333rem;
        background: #e2f2ff;
        color: rgb(51,102,138);
        font-size: .4rem;
        text-align: center;
    }
    .img{
        width: 4.586667rem;
        height: 4.586667rem;
        background-size: 100%;
        margin: 1.333333rem 0 0 2.653333rem;
    }
    .companyName{
        // width: 5.8rem;
        width: 7.866667rem;
        font-size: .4rem;
        color: rgb(51,51,51);
        margin: 0 auto;
        font-weight: 600;
        margin-top: .8rem;
        text-align: center;
        .textIndex1(7.866667rem);
        line-height: .533333rem;
    }
    .word{
        width: 3rem;
        font-size: .373333rem;
        color: rgb(51,51,51);
        margin: .4rem auto;
    }
    .confirmIviW{
        position: absolute;
        margin-top: 1.066667rem;
        .confirmIvi{
            width: 9.333333rem;
            height: 1.6rem;
            background-size: 100%;
            margin-left: .32rem;
        }
        span{
            position: absolute;
            margin: -1.186667rem 0 0 3.6667rem;
            font-size: .48rem;
            color: #fff;
        }
    }
</style>
<template>
<div>
    <div id="success" class="routerView-44px">
        <!-- 标题 -->
        <headerCom :titleScoped="'成为商家'"></headerCom>
        <router-view></router-view>
        <div class="firstOne">注册成功</div>
        <img src="../../assets/images/successfully@2x.png" alt="" class="img">
        <div class="companyName">{{name}}</div>
        <div class="word">恭喜您注册成功！</div>
        <div class="confirmIviW" @click="nextStep">
            <img src="../../assets/images/highlighted-button@2x.png" alt="" class="confirmIvi">
            <span>完善企业信息</span>
        </div>
    </div>
</div>
</template>
<script>
export default {
    data(){
        return {
            name:"",
        }
    },
    mounted(){
        this.name = this.$route.query.name;
        console.log("this.name",this.name)
    },
    methods:{
        nextStep(){
            this.$router.push({path:"/business/third",query:{id:this.$route.query.id}});
        }
    }
}
</script>


