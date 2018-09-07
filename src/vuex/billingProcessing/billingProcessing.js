import getD from "../ajaxAPI/getData";
import Vue from 'vue'
import { ToastPlugin} from 'vux'

const state = {
  invoiceList: { list: [], recordCount: 0 },
  iDetail:[],
  detailI:[],
  isTrue:false
};

const getters = {
  getinvoiceList(state) {
    console.log("此处打印不准!", state.invoiceList);
    return state.invoiceList;
  },
  detail(state){
    console.log("dfdfdfdf",state.iDetail)
    return state.iDetail;
  },
  detailInfo(state){
    return state.detailI;
  },
  _confirmInvoice_(state){
    console.log("_confirmInvoice_",state.isTrue)
    return state.isTrue;
  },
};

const mutations = {
  //下拉刷新
  _GetInvListRefresh(state, { data, xiala }) {
    console.log(data,'?')
    
    state.invoiceList.list = data.list ;
    state.invoiceList.recordCount = data.recordCount;
  },
  _GetInvList(state, { data, xiala }) {
    // console.log( data )
    state.invoiceList.list.push(...data.list);
    // state.invoiceList.list = data.list;
    state.invoiceList.recordCount = data.recordCount;
    // console.log("push",state.invoiceList.list);
    // console.log("0000",state.invoiceList.list)
  },
  delInvoice_getinvoiceList(state, index) {
    //处理删除数据库后, view数据
    state.invoiceList.list.splice(index, 1);
  },
  _invoiceDetail(state,data){
    state.iDetail = data.InvImgList;
    state.detailI = data.InvoiceProdList;
    // console.log("state.detailI",state.detailI)
  },
  _confirmInvoice(state,data){
    state.isTrue = data.success;
    console.log("_confirmInvoice1",state.isTrue)
  },
};

const actions = {
  GetInvListRefresh({ state, commit }, params) {
    //下拉刷新 
    console.log('zouni ')
    return getD.GetInvList(params).then(res => { 
      console.log(res,'111')
      return commit("_GetInvListRefresh", { data: res.data, ...params });
    });
  },
  GetInvList({ state, commit }, params) {
    //下拉刷新 
    return getD.GetInvList(params).then(res => { 
      console.log(res,'ddd')
      return commit("_GetInvList", { data: res.data, ...params });
    }).catch(()=>{
      console.log(3);
      return Promise.reject('ddddddddd')
    });
  },
  // 确认开票
  confirmInvoice({state,commit},params){
    return getD.confirmInvoice(params).then((res) => {
      console.log("确认开票",res);
        if(!res.success){
          Vue.$vux.toast.text(res.msg, 'middle');
          return;
        }else{
          console.log("555555",res.success)
          return commit('_confirmInvoice',res)
        }
    }).catch((err) => {

    })
  },
// 发票详情
  invoiceDetail({state,commit},params){
    return getD.invoiceDetail(params).then((res) => {
        console.log("发票详情",res.data);
        return commit('_invoiceDetail',res.data)
    })
  }
};

export default {
  state,
  getters,
  mutations,
  actions,
  namespaced: true
};
