'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')


let  gobleNetPort = null;               // 接口
let  businessLicensePort = null ;      // 阿里巴巴营业执照接口
let  idCardPort = null;                // 身份证识别接口
let weixinAuth = null ; 			   // 微信授权
let  loginPort = null ;                // 登陆接口
let  urlShortPort = null ;             // 短链接转换接口


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



// module.exports = merge(prodEnv, {
//   NODE_ENV: '"development"',
//   gobleNetPort:'"http://api.wqbol.net/"',
//   _gobleNetPort:'"http://api.wqbol.com/"',
//   businessLicensePort:'"http://dm-58.data.aliyun.com"',
//   idCardPort:'"http://dm-51.data.aliyun.com"',
//   weixinAuth:'"http://share.wqbol.com/share/Share"'
// })




module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  gobleNetPort:'"//api.wqbol.net/"',
  _gobleNetPort:'"//api.wqbol.com/"',
  innerGobleNetPort:"'//host.wqbol.net/'", 
  businessLicensePort:'"//dm-58.data.aliyun.com"',
  idCardPort:'"//dm-51.data.aliyun.com"',
  weixinAuth:'"//share.wqbol.com/share/Share"'
})
