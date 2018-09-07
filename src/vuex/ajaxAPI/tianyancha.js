import axios from 'axios'
 
// 自定义设置创建一个新的实例
var tianyancha = axios.create({
    baseURL:  process.env.gobleNetPort,
    timeout:11111,
});

tianyancha.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//添加一个请求拦截器
tianyancha.interceptors.request.use((config)=>{
	 
     
    return config;
},function(error){
    //当出现请求错误时做以下操作
    return Promise.reject(error);
});

//添加一个返回拦截器
tianyancha.interceptors.response.use(function(response){
    //对返回的数据进行一些处理
    console.log(response)
    if (response.data.error_code == '300000') {
        //300000 代表无数据
		return Promise.reject(response);
        
	}  
    return response;
},function(error){
     //用来判断天眼查接口 不可随意变动
     console.log('天严查v和a报错',error)
	if (error.data.error_code == '0') {
		return res;
	} else {
        //对返回的错误进行一些处理
        
		return Promise.reject(error);
	}
   
});


export default {
    fetch(type, url, params){
        return new Promise((resolve,reject) => {
            switch(type){
                case 'post':
                tianyancha.post(url, params).then((response) => {
                	 
                    resolve(response.data);
                }).catch((error) => {
                	 
                    reject(error);
                })
                break;
            }
        })
    }
}