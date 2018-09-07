import Vue from "vue";
import Vuex from "vuex";

// import businessQuery from './businessQuery/businessQuery'
import personalCenter from "./personalCenter/personalCenter";
import business from "./business/business";
import invoiceTitle from "./invoiceTitle/invoiceTitle";
import billingProcessing from "./billingProcessing/billingProcessing";
import home from "./home/home";
import myInvoice from "./myInvoice/myInvoice";

import getData from "@vuex/ajaxAPI/getData";
import axios from "axios";

Vue.use(Vuex);

const state = {
  ab: 1111,
  weixinAuthData: {
    //微信关注和授权数据
    isFocus: false,
    openid: "",
    unionid: ""
  },
  tianyanchaMohuData: [], //天严查数据 模糊
  tianyanchaJingqueData: [] //天严查数据 精确
};

const mutations = {
  ab() {},
  _weixinIsFocus(stata, success) {
    // 巴拉巴拉
    //console.log('comone' ,success)
    state.weixinAuthData.isFocus = success;
  },
  _weixinAuthOpenid(stata, { openid, unionid }) {
    // console.log('dddddd',openid,unionid)
    // 巴拉巴拉
    state.weixinAuthData.openid = openid;
    // state.weixinAuthData.unionid = unionid
  },
  _weixinBindCusAndRefCode(stata, data) {
    //    console.log('weixinBindCusAndRefCode微信数据库保存',data,data.unionId)

    state.weixinAuthData.openid = data.success;
    state.weixinAuthData.unionid = data.unionId;
  },
  _mohu(stata, data) {
    let tempChange = /<.*>?/gi;
    let target = null;
    let filterData = data.slice(0, 5).map(item => {
      if (item.name.match(tempChange)) {
        //当前dom中的innerHTML若存在<em> 且替换
        return (target = item.name.replace(/(<.*?>)/gi, ""));
      } else {
        return item.name;
      }
    });

    console.log("模糊", data);
    state.tianyanchaMohuData = filterData;
  },
  _jingque(stata, data) {
    console.log("精确", data);
    state.tianyanchaJingqueData = data;
  }
};

const actions = {
  a1b() {},
  //判断用户是否关注
  weixinIsFocus({ state, commit }, data) {
    return getData.weixinIsFocus(data).then(res => {
      console.log("w判断用户是否关注us", res);
      return commit("_weixinIsFocus", res.success);
    }).catch((error)=>{
      Promise.reject(error)
    });
  },
  weixinAuthOpenid({ state, commit }, data) {
    return getData.weixinAuthOpenid(data).then(res => {
      console.log("weixinAuthOpenid",res);
      return commit("_weixinAuthOpenid", res.data);
    }).catch((error)=>{
      console.log('报错了');
     return Promise.reject(error);
    });
  },
  weixinBindCusAndRefCode({ state, commit }, data) {
    return getData.weixinBindCusAndRefCode(data).then(res => {
      // console.log("weixinBindCus数据库同步AndRefCode",res.data);
      return commit("_weixinBindCusAndRefCode", res.data);
    });
  },
  //天眼查+ 后台数据
  tianyanchaAddHoutai({ state, commit }, data) {
    return getData.tianyancha(data).then(res => {
      console.log("天眼查", res.result.items);
      /**
       * api = 1 表示模糊匹配
       * api = 3 表示精确查找公司
       *
       * */
      if (data.api == 1) {
        return commit("_mohu", res.result.items);
      } else if (data.api == 3) {
        return commit("_jingque", res.result);
      }
    });
  }
  ,
  //天眼查
  tianyancha({ state, commit }, data) {
    return getData.tianyancha(data).then(res => {
      console.log("天眼查", res.result.items);
      /**
       * api = 1 表示模糊匹配
       * api = 3 表示精确查找公司
       *
       * */
      if (data.api == 1) {
        return commit("_mohu", res.result.items);
      } else if (data.api == 3) {
        return commit("_jingque", res.result);
      }
    });
  }
};

const getters = {
  ab2() {}
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters,
  modules: {
    business,
    personalCenter,
    invoiceTitle,
    billingProcessing,
    home,
    myInvoice
  }
});
