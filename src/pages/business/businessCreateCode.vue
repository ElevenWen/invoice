<style lang="less" scoped>
   
     #businessCreateCode{
        height:  100%  ;  
     }
     .main{
         .mainBg{
            background-repeat: no-repeat;
            height: 2.133333rem;
            background-size:100%; 
            @media only screen and (-webkit-min-device-pixel-ratio: 1.0), only screen and (min-device-pixel-ratio:2.0){
                background-image: url('../../assets/images/stores@2x.png') 
            }
            @media only screen and (-webkit-min-device-pixel-ratio: 3), only screen and (min-device-pixel-ratio: 5){
                background-image: url('../../assets/images/stores@3x.png')
            }
         }
        height: calc(100% - 1.173333rem); 
        padding-top:0.1px;
        text-align: center;
        
         background: -webkit-linear-gradient(top,#1561ee 75%,#3b89ff 99%,#3b89ff 100%); /* Safari 5.1 - 6.0 */
        background: -o-linear-gradient(top,#1561ee 75%,#3b89ff 99%,#3b89ff 100%); /* Opera 11.1 - 12.0 */
        background: -moz-linear-gradient(top,#1561ee 75%,#3b89ff 99%,#3b89ff 100%); /* Firefox 3.6 - 15 */
       background: linear-gradient(to bottom,#1561ee 75%,#3b89ff 99%,#3b89ff 100%); 
        
     }
    .title{
        margin-top:1.053333rem;
        font-size: 0.48rem;
        color:#ffffff;
    }
    .codeWrap{
        margin-top: 1.2rem;
        .code{
            width:5.6rem;
            height: 5.6rem;
            margin: 0 auto;
            border: 4px solid #fff;
            #codeImg{
                width: 100%;
                height: 100%;
               
            }
             #codeImg  img{
                width: 100% ! important;
                    height: 100% ! important;
            }
        }
    }
    .codeInfo{
        margin-top: 0.533333rem;
        font-size: 0.346667rem;
        color:#b9c9ff;
        
    }
</style>
<template> 
     <div id="businessCreateCode">
          <headerCom :titleScoped="'商户信息'"/>
          <router-view></router-view>
        <div class="main">
            <div class="mainBg"></div>
            <p class="title">{{$route.query.name}}</p>
            <div class="codeWrap">
                <div class="code"  >
                    <qrcode id="codeImg" :value="value+$route.query.id" type="img"></qrcode>
                </div>
            </div>
            <div class="codeInfo">
                扫一扫商户二维码开发票
            </div>
        </div>
    </div> 
</template>



<script>
import { Qrcode } from 'vux'
import { setTimeout } from 'timers';
export default {
    data(){
        return {
            // sizeCode:100,
            value:`${process.env.innerGobleNetPort}?fapiaoId=`
            // value: "https://host.wqbol.net/?fapiaoId="
        }
    },
    components: {
        Qrcode
    },
    created(){
        setTimeout(()=>{
            this.$nextTick(()=>{  //二维码rem自适应
            document.getElementById('codeImg').children[1].style.width = "5.386667rem"
            document.getElementById('codeImg').children[1].style.height = '5.386667rem';
         })
        },100)
         
    },
}
</script>
