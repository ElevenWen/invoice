 
//测试 http://112.74.135.230:27078/share/Share
//正式 http://120.78.225.141:17078/share/Share
// const  _ajax = function ({method, houtaiURL:data, success,title,desc,link,customURL,imgUrl,url="http://112.74.135.230:27078/share/Share"}) {  //测试

/**************
*method 请求方法
*houtaiURL:  
* 
****/        
// export const JSSDKCONFIG = async ({method='GET',houtaiData=`url=${location.href}`,houtaiUrl="//120.78.225.141:17078/share/Share"})=>{
export const JSSDKCONFIG = async ({method='GET',houtaiData=`url=${location.href}`,houtaiUrl="//share.wqbol.com/share/Share"})=>{
  
  //share.wqbol.com/share/Share


    let CONFIG = await new Promise((resolve ,reject)=>   {    //正式   
      var xhr = null; 
      try {
        xhr = new XMLHttpRequest();
      } catch (e) {
        xhr = new ActiveXObject('Microsoft.XMLHTTP');
      } 
      if (method.toLowerCase() == 'get' && houtaiData) { 
        // console.log(houtaiData ,'============')
        houtaiUrl+="?"+encodeURIComponent(houtaiData); 
        // houtaiUrl+="?"+houtaiData; 
        // console.log(houtaiUrl ,'============')

      };
      
      xhr.onreadystatechange = function() { 
        if ( xhr.readyState == 4 ) {
          if ( xhr.status == 200 ) {    
            resolve( JSON.parse(xhr.responseText)[0].map)
          } else {
            // console.log(xhr)
            alert('微信授权失败,请刷新页面重试');
          }
        } 
      } 
      
      xhr.open(method,houtaiUrl,true); 
    
      if (method.toLowerCase() == 'get') { 
        xhr.send();
      } else { 
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send( encodeURIComponent(houtaiData)   );
      } 
    }) 
    return CONFIG;
  
}
  
 
 
