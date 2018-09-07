import getData from "@vuex/ajaxAPI/getData";
// import axios from 'axios'

const state = {
  code: "", //验证码
  businessId: "", //商户id
  weixinAuthData: {
    isFocus: false,
    openid: "",
    unionid: ""
  },
  isComfirmShow:false,//商户第四步提交成功则返回true 提出成功弹窗
  businessName:"",
};

const mutations = {
  _getCodee(state, data) {
    if (!data) {
      return;
    }
    //   state.telCode =' data.items';
    state.code = data;
    //数据返回取消mask
    console.log("data数据", state, data);
  },
  _firstOne(state, data) {
    if (!data) {
      return;
    }
    console.log("data数据", state, data);
    state.businessId = data.Id;
    console.log("44", state.businessId);
  },
  _pushImageTotal(stata, data) {
    // 巴拉巴拉
  },

  _secondTwo(state, data) {
    console.log(state,data)
    state.businessName = data.Name;
  },
  _thirdThree(state, data) {},
  _fourthFOURTH(state, isSuccess) {
      state.isComfirmShow  = isSuccess
    console.log(isSuccess);
  }
};

const actions = {
  // 获取验证码
  getCodee({ state, commit, rootState }, data) {
    return getData
      .getCodee(data)
      .then(res => {
        return commit("_getCodee", res.result);
      })
      .catch(function(error) {
        	console.log("获取验证码错误",error)
        //   return  commit('_QUERYCOMPANY', 'res.result');
        // return Promise.reject(error);
      });
  },
  // 成为商户第一步==基本信息
  firstOne({ state, commit }, data) {
    console.log('1111')
    return getData.firstOne(data).then(res => {
      console.log("基本信息",res,!res.success);
      if(!res.success){
        return Promise.reject(res.msg);   
      }
      return commit("_firstOne", res.data);
    },err => {
      console.log("错误1",error)
      return;
    })
    .catch(function(error) { 
      return Promise.reject(error);   
      
  });
  },
  // 成为商户第二步==个人信息
  secondTwo({ state, commit }, data) {
    return getData.secondTwo(data).then(res => {
      console.log("个人信息",res);
      return commit("_secondTwo", res.data);
    });
  },
  pushImageTotal({ state, commit }, data) {
    return getData.pushImageTotal(data).then(res => {
      // console.log("基本信息",res);
      return commit("_pushImageTotal", res.data);
    });
  },

  // 成为商户第三步==企业信息
  thirdThree({ state, commit }, data) {
    return getData.thirdThree(data).then(res => {
      console.log("企业信息", res.data);
      return commit("_thirdThree", res.data);
    });
  },
  //成为商户第四步==企业信息 企业认证资质信息注册  用来上传营业执照  银行卡2张 身份证2张
  fourthFOURTH({ state, commit }, parmas) {
    return getData.RegisterCompanyInfo(parmas).then(res => {
      console.log("第四步", res.data);
      return commit("_fourthFOURTH", res.success);
    }).catch(()=>{
        //报错不弹出窗口
      return commit("_fourthFOURTH", false);
        
    });
  }
};

const getters = {
  _businessId(state) {
    return state.businessId;
  },
  _businessName(state){
    // console.log("66",state.businessName)
    return state.businessName;
  }
};

export default {
  strict: true,
  namespaced: true,
  state,
  getters,
  mutations,
  actions
};
