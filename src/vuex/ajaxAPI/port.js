/*
    此文件用来动态配制各个页面内嵌的请求地址
    命名规则:vue文件名_***
    例:loginDialog.vue文件中二维码图片需要动态获取, 此文件中,命名为 loginDialog_scanIng
    引入文件规则: 页面引入应该为按需引入方式 import {loginDialog_scanIng} form '~/store/ajaxAPI/vueDynamicParams'
    注意:按要求写且写好备注!  按要求写且写好备注!!  按要求写且写好备注!!! 未按要求写或未写备注的 拖出去鞭尸




 
===========================================================
该文件暂时保留    ! 
该文件暂时保留    ! 
该文件暂时保留    ! 









===========================================================




*/

let  gobleNetPort = null;               // 接口
let  businessLicensePort = null ;      // 阿里巴巴营业执照接口
let  loginPort = null ;                // 登陆接口
let  urlShortPort = null ;             // 短链接转换接口
let  idCardPort = null;                // 身份证识别接口

let otherLoginBind_login = null ;// 第三方登录后台请求接口

let loginDialog_scanIng = null;       //二维码图片
let loginDialog_qqLogin = null;       //QQ 第三方登陆
let loginDialog_wxAccredit = null;    //微信 第三方登陆
let loginDialog_allowWeiboLogin = null;    //新浪 第三方登陆

let payment_wxCode = null ; // 微信支付 支付宝支付 银联支付payment 页面 unionpay页面

let invoiceDetail_invoice = null ;// 发票下载接口

let myserver_operation = null ;//用户操作手册

let download_iosAPK  = 'https://itunes.apple.com/cn/app/%E5%BE%AE%E4%BC%81%E5%AE%9D/id1313109529?mt=8';  // 下载苹果
let download_apk = 'http://host.wqbol.com/wqbol.apk'; // 下载安卓apk
  

let  ajaxAPI_ajaxShareJS = null  ;//分享java接口
let  reportPort = null ; // java记账报税执照接口

 
console.log(process.env)

 

// if(( _NODE_ENV.indexOf('Net') >= 0)){
//     //case 'devNet' || 'startNet'  ||  'generateNet':// net开发环境 || net生产环境 || net静态站点 
//     otherLoginBind_login = 'http://other.wqbol.net' ;
//     loginDialog_scanIng = 'http://api.wqbol.net';  
//     loginDialog_qqLogin = 'http://www.wqbol.net';        
//     loginDialog_wxAccredit = 'http://www.wqbol.net';  
//     loginDialog_allowWeiboLogin = 'http://www.wqbol.net';  
//     payment_wxCode = 'http://api.wqbol.net'; 
//     invoiceDetail_invoice = "http://manage.wqbol.net" ; 
//     myserver_operation = "http://host.wqbol.net/readMe.doc" 
//     recommend_mobileCode = 'http://host.wqbol.com';
//     productDetails_type = 'http://www.wqbol.net'; 
//     ajaxAPI_ajaxShareJS = "http://share.wqbol.net/share/Share";
//     reportPort = 'http://acct.wqbol.net';
//     paid_scanIng = "http://host.wqbol.net";
//     paid_link = "http://www.wqbol.net";
//     prePayment_link = "http://host.wqbol.net";
    
//     if(_NODE_ENV.indexOf('devNet') >= 0){ //本地环境
//          urlShortPort =`http://${_host}:${port}`;    
//     }else if(_NODE_ENV.indexOf('startNet') >= 0){//net 服务环境  === 切换环境需要 手动切换域名
//         urlShortPort =`http://www.wqbol.net`;    
//         // urlShortPort =`http://wwww.wqbol.net`;    
        
//     }
//     //loginPort = `http://api.wqbol.net`; 
//   }else if(( _NODE_ENV.indexOf('Com') >= 0)){
//     // case 'devCom' || 'startCom' || 'generateCom':// com开发环境 || com生产环境 || com静态站
    
//     otherLoginBind_login = 'http://other.wqbol.com' ;
//     loginDialog_scanIng = 'http://api.wqbol.com';       
//     loginDialog_qqLogin = 'http://www.wqbol.com';         
//     loginDialog_wxAccredit = 'http://www.wqbol.com';  
//     loginDialog_allowWeiboLogin = 'http://www.wqbol.com'; 
//     urlShortPort =`http://${_host}:${port}`;    
//     payment_wxCode = 'http://api.wqbol.com'; 
//     invoiceDetail_invoice = "http://manage.wqbol.com" ; 
//     myserver_operation = "http://host.wqbol.com/readMe.doc" 
//     recommend_mobileCode = 'http://host.wqbol.com';
//     productDetails_type = 'http://www.wqbol.com';
//     ajaxAPI_ajaxShareJS = "http://share.wqbol.com/share/Share";
//     reportPort = 'http://acct.wqbol.com';
//     paid_scanIng = "http://host.wqbol.com";
//     paid_link = "http://www.wqbol.com";
//     prePayment_link = "http://host.wqbol.com";
    
//     if(_NODE_ENV.indexOf('devCom') >= 0){ //本地环境
//         urlShortPort =`http://${_host}:${port}`;    
       
//    }else if(_NODE_ENV.indexOf('startCom') >= 0){//com  服务器环境 
//        urlShortPort =`http://www.wqbol.com`;     
//    }

//   }
  
export  { 
    loginDialog_scanIng, //二维码图片
    otherLoginBind_login,// 第三方登陆授权 后台接口
    loginDialog_qqLogin, //QQ 第三方登陆
    loginDialog_wxAccredit, //微信 第三方登陆
    loginDialog_allowWeiboLogin, //新浪 第三方登陆
    urlShortPort,//长连接转短链接
    payment_wxCode ,// 微信支付 
    download_iosAPK,// 下载苹果 
    download_apk,// 下载安卓apk
    invoiceDetail_invoice , // 发票下载接口
    myserver_operation ,//操作手册下载
    recommend_mobileCode ,//手机二维码分享
    productDetails_type,//长链接转短链接 分享的url域名
    ajaxAPI_ajaxShareJS, //分享java接口   
    reportPort,//java 记账报税
    paid_scanIng,//找人代付页面二维码
    paid_link, //找人代付页面链接
    prePayment_link, //帮他付款页面链接

}
 

console.log('---------vueDynamicParams---------' ,urlShortPort );

