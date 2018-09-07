// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
require("es6-promise").polyfill();
const FastClick = require("fastclick");
FastClick.attach(document.body);

import Vue from "vue";
import App from "./App";
import router from "./router";
import store from "./vuex";
import { JSSDKCONFIG } from "./vuex/ajaxAPI/JSSDKCONFIG";
import { weixinRequest } from "./vuex/ajaxAPI/weixinRequest";

import {
  AlertPlugin,
  Group,
  Cell,
  Flexbox,
  ToastPlugin,
  XDialog,
  TransferDom
} from "vux";
 
Vue.use(AlertPlugin);
Vue.use(ToastPlugin);

Vue.component("group", Group);
Vue.component("cell", Cell);
Vue.component("flexbox", Flexbox);
Vue.component("x-dialog", XDialog);
Vue.directive("transfer-dom", TransferDom);

import headerCom from "@components/headerCom";
Vue.component("headerCom", headerCom);

import VueScroller from "vue-scroller";
Vue.use(VueScroller);


function test() {}

test();

//export const JSSDKCONFIG = async ({method='GET',houtaiData=`url=${location.href}`,houtaiUrl="//share.wqbol.com/share/Share"})=>{

//  给weixin函数的参数 加上{houtaiData:`url=${location.href}`,title,desc,link,imgUrl} 即可
/****其他页面调用微信分享功能的方法***
 *给weixin函数的参数 加上{houtaiData:`url=${location.href}`,title,desc,link,imgUrl} 即可
 *用例1:this.weixin({houtaiData:`url=${location.href}`,title,desc,link,imgUrl})  --此为分享调用
 *用例2:this.weixin({houtaiData:`url=${location.href}`})  -- 此为单纯授权页面
 *说明 houtaiData:请求授权页面,  title(名字),desc(描述),link(链接),imgUrl(缩略图)
 *
 *
 */
  
Vue.prototype.weixin = function(...values) {
  JSSDKCONFIG(...values)
    .then(successData => { 
      weixinRequest(successData, ...values);
    })
    .catch(ee => {
      console.log("错误微信分享", ee);
    });
};

//全局调用微信授权
Vue.prototype.weixin({});

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  store,
  components: { App },
  template: "<App/>"
});
