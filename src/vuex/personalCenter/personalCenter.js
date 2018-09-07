import getD from '../ajaxAPI/getData'

const state = {
    verifyCode: {}, //验证码
    info: {},  //用户信息
    bingding:'',
    companyInfo:{}, //公司信息
    cancel:{}
}

const getters = {
    verifyCode(){ //验证码
        return state.verifyCode
    }, 
    _info(){ //信息
        return state.info
    },
    _binding(){
        return state.bingding
    },
    _companyInfo(){
        return state.companyInfo
    },
    _cancel(){
        return state.cancel
    }
}

const mutations = {
    _getVerifyCode(state,data){ //验证码
        state.verifyCode = data
    },
    _getUserInfo(state,data){ //用户信息
        state.info = data
    },
    _BindShop(state,data){
        state.bingding = data
    },
    _GetInfo(state,data){
        state.companyInfo = data
    },
    _RemoveBindShop(state,data){
        state.cancel = data
    }
}

const actions = {
    getVerifyCode({state,commit},params){ //获取验证码
        return getD.getVerifyCode(params).then((res)=>{
            return commit('_getVerifyCode',res)
        })
    },
    getUserInfo({state,commit},params){  //用户信息
        
        return getD.getUserInfo(params).then(res=>{

            return commit('_getUserInfo',res.data.data)
        }).catch(()=>{
        
        })
    },
    BindShop({state,commit},params){  //绑定商户
        return getD.BindShop(params).then(res=>{
            return commit('_BindShop',res)
        })
    },
    GetInfo({state,commit},params){ //获取商家信息
        return getD.GetInfo(params).then(res=>{
            return commit('_GetInfo',res.data.data)
        })
    },
    RemoveBindShop({state,commit},params){
        return getD.RemoveBindShop(params).then(res=>{
            console.log('shenmehihi',res)
            return commit('_RemoveBindShop',res)
        })
    }
}

export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}
