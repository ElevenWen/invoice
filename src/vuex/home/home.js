import   getData  from '@vuex/ajaxAPI/getData';
 

const state = {
    scanInvoice:{  
             
    },
    getInvHeadInfoData:{ 
            "Id": "",
            "WxId":"",
            "Name": "",
            "TypeId": "",
            "InvType": "",
            "InvCode": "",
            "Mobile": "",
            "Email": "",
            "Tax":"",
            "BankName": "",
            "Account": "",
            "Address": "",
            "Tel": "",
            "QrCode":"",
            "CreateTime": "",
    
    },
    //获取发票抬头列表  可以从天严查查询 也可以从天严查和后台查询    
    getInvHeadlistData:{
        recordCount:0,// 返回数据条数 
        list :[
            {Id:'',
            Name :'',
            TypeId :'',
            InvType :'',
            InvCode :'',
            Tax :'',
            Mobile :'',
            QrCode :'',
            CreateTime :''}
        ]
    },
    info: {},  //用户信息
}

const mutations = {
    _getCodee(state, data) {
		if(!data){
			return
		}    	
    //   state.telCode =' data.items';
        state.code = data;
	  //数据返回取消mask
	//   console.log("data数据",state,data);
	  
    },
    //获取发票抬头详情 
    _getInvHeadInfo(state, data) { 
      //数据返回取消mask
      state.getInvHeadInfoData = data;
    },
     
    _getUserInfo(state,data){ //用户信息
        console.log(data,'用户信息存入本地')
        state.info = data
    },
    _applyInvoice(state,data){ //编辑发票抬头 保存发票抬头
        
    },
    _getInvHeadlist(state,data){ 
        //获取发票抬头列表  可以从天严查查询 也可以从天严查和后台查询
        //清空
        state.getInvHeadlistData = {
            recordCount:0,// 返回数据条数 
            list :[
                {Id:'',
                Name :'',
                TypeId :'',
                InvType :'',
                InvCode :'',
                Tax :'',
                Mobile :'',
                QrCode :'',
                CreateTime :''}
            ]
        };
        state.getInvHeadlistData.recordCount = data.recordCount 
        state.getInvHeadlistData.list = data.list
    }
}

const actions = {
   
    // 成为商户第三步==企业信息
    thirdThree({state,commit},data){
        return getData.thirdThree(data).then((res) => { 
            return commit('_thirdThree2', res.data);
        })
    },
    //获取发票抬头详情(
    getInvHeadInfo({state,commit},data){
        return getData.getInvHeadInfo(data).then((res) => { 
            return commit('_getInvHeadInfo', res.data);
        }).catch((error)=>{
            console.log('获取发票抬头详情报错===' , error )
            return Promise.reject(error.msg);
        })
    },
    
    getUserInfo({state,commit},params){  //用户信息
       
        
        return getData.getUserInfo(params).then(res=>{ 
            return commit('_getUserInfo',res.data.data)
        }).catch((error)=>{
        //   alert('用户信息 ==='  )
            return Promise.reject(error.msg);
        })
    } 
    ,
    applyInvoice({state,commit},params){  //用户信息
        return getData.applyInvoice(params).then(res=>{ 
            if(res.success){
                return commit('_applyInvoice',res);
            }else{
                Promise.reject(res.msg)
            }
        }).catch((error)=>{
            return Promise.reject(error)
        })
    },
    //获取发票抬头列表  可以从天严查查询 也可以从天严查和后台查询
    getInvHeadlist({state,commit},params){  //用户信息
        return getData.getInvHeadlist(params).then(res=>{ 
            return commit('_getInvHeadlist',res.data)
        }).catch((error)=>{
            return Promise.reject(error)
        })
    },
}

const getters = {
    _info(){ //信息
        return state.info
    },
}

export default {
	strict: true,
	namespaced:true,
	state,
	getters,
	mutations,
	actions
}