import axios from 'axios'
import qs from 'qs'
import { Indicator ,MessageBox,Toast } from 'mint-ui';
import tool from '../util/tool'

// 自定义设置创建一个新的实例
var idCard = axios.create({
    baseURL:  process.env.idCardPort,
    timeout:11111,
});

idCard.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
//添加一个请求拦截器
idCard.interceptors.request.use((config)=>{
	Indicator.open({
      text: '加载中...',
      spinnerType: 'fading-circle'
    });
    //在请求发送之前做以下操作
    config.headers.Authorization = 'APPCODE 9f604f01b44a46b09c78a32a4242fc43';
    return config;
},function(error){
    //当出现请求错误时做以下操作
    return Promise.reject(error);
});

//添加一个返回拦截器
idCard.interceptors.response.use(function(response){
    //对返回的数据进行一些处理
    return response;
},function(error){
	Indicator.close();
    //对返回的错误进行一些处理
    return Promise.reject(error);
});


export default {
    fetch(type, url, params){
        return new Promise((resolve,reject) => {
            switch(type){
                case 'post':
                idCard.post(url, params).then((response) => {
                	Indicator.close();
                    resolve(response.data);
                }).catch((error) => {
                	Indicator.close();
                    reject(error);
                })
                break;
            }
        })
    }
}