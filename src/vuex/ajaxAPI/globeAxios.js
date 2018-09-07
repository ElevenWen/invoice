

import axios from 'axios'
import qs from 'qs'
import router from '@router'
import Vue from 'vue'
import  { ToastPlugin } from 'vux'
Vue.use(ToastPlugin);


let  _vuex = new Vue();//为了绑定vuex


// 自定义设置创建一个新的实例
 


axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
 
axios.defaults.baseURL = process.env.gobleNetPort;  
axios.defaults.timeout =  3000
//POST传参序列化
axios.interceptors.request.use((config) => {  
        if (config.method === 'post') {  
                config.data.datatype = "json";
        } else if (config.method === 'get') {
            if (config.params) {
                //当属性存在覆盖
                config.params.datatype = "json";
            } else {
                //不存在添加 
                config.params = {
                    "datatype": "json"
                }
            }
         }  
        //  console.log(config) 
    return config;
}, (error) => {
    return Promise.reject(error);
});

//返回状态判断
axios.interceptors.response.use((res) => { 
    console.log(res)
    console.log(res.data.msg)
    if(res.data.success){  
        //sucecss == true 返回正确
       return res; 
    }else{
        //sucecss == false  引导,返回catch
        return Promise.reject(res.data.msg) ;
    }
  // 若不是正确的返回code，且已经登录，就抛出错误
  //保留手动抛错 代用
  // const err = new Error('error')
  // err.data = 'data'
  // err.response = 'response' 
  // throw err
}, (error) => {   
    var reg = /(timeout)|(exceeded)/;
    //超时处理
    if(reg.test(error)){
        //当 ajax请求超时, 则提示用户网络超时 重新刷新页面
        _vuex.$vux.toast.text('网络信号不稳定,链接超时', 'middel') ;
         return Promise.reject('网络信号不稳定,链接超时');

    }
    return Promise.reject(error);
});


export default {
    fetch(type, url, params) {
        return new Promise((resolve, reject) => {
            switch (type) {
                case 'post': 
                    axios.post(url, params)
                        .then(response => {  
                              resolve(response.data);   
                        }) 
                        .catch((error) => {  
                            //此处做全局的 错误处理, 当success = false 提示弹框
                            _vuex.$vux.toast.text(error, 'middel')
                            reject(error); 
                        })
                    break;
                case 'get': 
                        axios.get(url, params)
                        .then(response => {   
                            resolve(response.data);
                        })
                        .catch((error) => {   
                            //此处做全局的 错误处理, 当success = false 提示弹框
                            _vuex.$vux.toast.text(error, 'middel')
                            reject(error);  
                        }) ;
                    break;
            }

        })
    }
}

