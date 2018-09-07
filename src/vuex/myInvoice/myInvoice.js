import getD from '../ajaxAPI/getData'

const state = {  
}

const getters = {
     
}

const mutations = { 
    _delInvoice(state  ){ 
    },
}

const actions = {
    //删除开票记录  
    delInvoice({state,commit},params){ 
        return getD.delInvoice(params).then(res=>{
            console.log(res,'删除成功')
            return commit('_delInvoice')
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