import getD from '../ajaxAPI/getData'

const state = {
    infoId: {},
    list: {},
    delete: {}
}

const getters = {
    _infoId(){
        return state.infoId
    },
    _list(){
        return state.list
    },
    _delete(){
        return state.delete
    }
}

const mutations = {
    _GetInvHeadlist(state,data){
        state.list.list.push(...data.list);
        state.list.recordCount = data.recordCount;
    },
    _GetInvList(state,data){
        state.list = data
    },
    _getUserInfo(state,data){ //用户信息
        state.infoId = data.WxId
    },
    _DelInvHead(state,data){
        state.delete = data
    },
    _editInvHead(state,data){ 
    },
    _del(state,index){
        state.list.list.splice(index, 1)
    }
}

const actions = {
    GetInvHeadlist({state,commit},params){
        //获取抬头列表 下拉加载
        return getD.GetInvHeadlist(params).then(res=>{
            return commit('_GetInvHeadlist',res.data)
        })
    },
    GetInvList({ state, commit }, params) {
        //上拉刷新 
        return getD.GetInvHeadlist(params).then(res => { 
          console.log(res,'ddd')
          return commit("_GetInvList",  res.data);
        });
      },
    getUserInfo({state,commit},params){  //用户信息
        return getD.getUserInfo(params).then(res=>{
            // console.log('哈哈哈',res)
            return commit('_getUserInfo',res.data.data)
        })
    },
    DelInvHead({state,commit},params){
        return getD.DelInvHead(params).then(res=>{
            // console.log('里会',res)
            return commit('_DelInvHead',res)
        })
    },
    //编辑发票抬头 后传递给后台 编辑发票抬头 保存发票抬头
    editInvHead({state,commit},params){
        return getD.editInvHead(params).then(res=>{
            // console.log('里会',res)
            return commit('_editInvHead',res)
        }).catch((error)=>{
            console.log('报错')
            return Promise.reject(error.msg)
        })
    },
}

export default{
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}