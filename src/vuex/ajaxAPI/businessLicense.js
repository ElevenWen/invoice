import axios from 'axios'
import tool from '@util/tool'
// import { Indicator ,MessageBox,Toast } from 'mint-ui';
// import qs from 'qs'
// // import api from './getDataPack';
 
// 自定义设置创建一个新的实例
var upload = axios.create({
    baseURL:  process.env.businessLicensePort,
    timeout:11111,
});
upload.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//添加一个请求拦截器
upload.interceptors.request.use((config)=>{
	// Indicator.open({
 //      text: '加载中...',
 //      spinnerType: 'fading-circle'
 //    });
    //在请求发送之前做以下操作
    config.headers.Authorization = 'APPCODE d941f350729443bfb8e1c6884d66dfab';
//  console.log(JSON.stringify(config) ,'参数')
    return config;
},function(error){
    //当出现请求错误时做以下操作
    return Promise.reject(error);
});

//添加一个返回拦截器
upload.interceptors.response.use(function(response){
//	console.log(response ,'fanhui')
    //对返回的数据进行一些处理
    if (response.status == '200') {
		return response;
	} else {
		return Promise.reject(response);
	}
},function(error){
//	console.log(error ,'cuo')
	//Indicator.close();
    //对返回的错误进行一些处理
    return Promise.reject(error);
});

export default {
    fetch(type, url, params){
        return new Promise((resolve,reject) => {
            switch(type){
                case 'post':
                upload.post(url,params).then( res => {
                	//Indicator.close();
                    resolve(res.data);
                }).catch((error) => {
                	//Indicator.close();
                    reject(error);
                })
                break;
            }
        })
    }
}
