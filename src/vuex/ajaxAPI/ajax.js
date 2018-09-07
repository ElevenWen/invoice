//ajax 
//测试 http://112.74.135.230:27078/share/Share
//正式 http://120.78.225.141:17078/share/Share
// const  _ajax = function ({method, houtaiURL:data, success,title,desc,link,customURL,imgUrl,url="http://112.74.135.230:27078/share/Share"}) {  //测试


/**************
*method 请求方法
*houtaiURL:  
* 
****/          
 
const  _ajax = function ({method, houtaiData:data, success ,url=`${process.env.weixinAuth}`}) {    //正式   
  var xhr = null;
  try {
    xhr = new XMLHttpRequest();
  } catch (e) {
    xhr = new ActiveXObject('Microsoft.XMLHTTP');
  } 
  if (method.toLowerCase() == 'get' && data) { 
    url +="?"+encodeURIComponent(data); 
  }
 
 // //console.log("自定义url",imgUrl );
  xhr.onreadystatechange = function() { 
    if ( xhr.readyState == 4 ) {
      if ( xhr.status == 200 ) {  
         console.log("描述", JSON.parse(xhr.responseText)[0]);
        return  JSON.parse(xhr.responseText)[0].map ;
      } else {
        //alert('出错了,Err：' + xhr.status);
      }
    } 
  } 
  
  xhr.open(method,url,false); 

  if (method.toLowerCase() == 'get') { 
    xhr.send();
  } else {
    console.log(data,'data')
    xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    xhr.send( encodeURIComponent(data)   );
  } 
}//_ajax==>END 

 
export default{
  weixinJSSDK({method,houtaiData,url=`${process.env.weixinAuth}`}){
    return new Promise((resolve, reject)=>{
      _ajax(method,houtaiURL,url)
    })
  }
}
