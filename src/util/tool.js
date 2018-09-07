import Vue from 'vue'
import { ToastPlugin} from 'vux'
import getd from '@vuex/ajaxAPI/getData.js'

Vue.use(ToastPlugin);
/***
 *  argument:value
 *  value : Number ,decimal:2
 *  
 ***/

//从个位数开始截取
const formatPrice = (value) => {    return Boolean(value) ? value.substring(0, value.indexOf(".")) : ""; };

//从小数数开始截取
const formatPriceX = (value) => {    return Boolean(value) ? value.substring(value.indexOf(".")) : "" ;};

//添加RMB标志
const currency = (value) => {   return ("¥" + value); };


//关键词 变色 参数1 需要替换的关键词语, 参数2给需要替换关键词需要添加的样式
// function keyWordColor(value){ 
//  //console.log(value);  
//    // //console.log(value[0].replaceAll( value[1],"<strong  class='keyWordColor'>"+value[1]+"</strong>"));
//  return  value[0].replaceAll( value[1],"<strong  class='keyWordColor'>"+value[1]+"</strong>")
// }



/***
*  saveToLocal  loadFromLocal
*  _navigatorName__:浏览器key, id:存储 本地的Value对应key,value:本地存储id对应的value值:,若没有数据返回{Booean,default:false}
*  举例1:this.commonTool.saveToLocal("businessSearchKey","id","searchName","北京百度网讯科技有限公司") ==>businessSearchKey (对应浏览器key) ;{"id":{"searchName":"北京百度网讯科技有限公司"}}(对应浏览器value)
*  举例2:this.commonTool.saveToLocal("businessSearchKey",{ 'tab':{name:'tab'},'content':{name:'content'} }); ==>businessSearchKey (对应浏览器key) ;{"tab":{"name":"tab"},"content":{"name":"content"}}(对应浏览器value)
*  
* 
*
***/
const saveToLocal = function saveToLocal(_navigatorName_, id, key, value) {

  if (typeof id === 'object' && !Array.isArray(id)) {//判断对象  
    let value = JSON.stringify(id);
    window.localStorage.setItem(_navigatorName_, value);//存入数据格式 {_navigatorName_:id}
  } else {
    let navigatorName = window.localStorage[_navigatorName_];

    if (!navigatorName) {
      navigatorName = {};
      navigatorName[id] = {};
    } else {
      navigatorName = JSON.parse(navigatorName);
      if (!navigatorName[id]) {
        navigatorName[id] = {};
      }
    }
    navigatorName[id][key] = value;

    window.localStorage[_navigatorName_] = JSON.stringify(navigatorName);
  }
};


/***
* loadFromLocal
*  举例1:this.commonTool.loadFromLocal('businessSearchKey',"id",'searchName') ==>  return "北京百度网讯科技有限公司" 
*  举例2:this.commonTool.loadFromLocal('businessSearchKey',"ALL") ==> return { 'tab':{name:'tab'},'content':{name:'content'} }
***/
const loadFromLocal = function loadFromLocal(_navigatorName_, id, key, def) {
  let navigatorName = window.localStorage[_navigatorName_];
  if (!navigatorName) {
    return def;
  }

  if (id === "ALL") {
    //获取_navigatorName_ 下所有数据
    let idALL = JSON.parse(navigatorName)
    return idALL;
  } else {
    //id 下面所有数据
    navigatorName = JSON.parse(navigatorName)[id];
    if (!navigatorName) {
      return def;
    } //选择所有数据 

    if (key != undefined && (key.toString().trim() == "" || key.toString().trim() == "ALL")) {
      return navigatorName;
    }
    let ret = navigatorName[key];
    return ret || def;
  }

};

//session localstorage
const saveSessionStorage = function saveSessionStroage(key, value) {
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.sessionStorage.setItem(key, value);
}

const loadSessionStorage = function saveSessionStroage(key) {

  let value = JSON.parse(window.sessionStorage.getItem(key));
  console.log(key , value)
 
  return value
}



const removeLocal = function removeLocal(_navigatorName_) {
  let navigatorName = window.localStorage[_navigatorName_];
  if (navigatorName) {
    window.localStorage.removeItem(_navigatorName_);
  }
}

/*** 
 *data :1506774708603
 *fmt : yyyy-MM-dd mm:ss
 ***/

// 调用方法 formatDate(/Date(1530244009370)/, "yyyy-MM-dd mm:ss")

function formatDate(date, fmt) { 
  var dataTemp = null;
  if (date == undefined) {
    return
  }
  var date = date.match(/\d/ig).join('')
  //格式化 数据 "/Date(1530244009370)/" 为数字
  if (date.length > 10) {
    dataTemp = new Date(Number(date));
  } else {
    dataTemp = new Date(date.replace(/\./ig, "-"));
  }
  //console.log(dataTemp)
  if (/(y+)/.test(fmt)) {
    // //console.log(RegExp.$1)
    //yeal+ '' 转为字符
    // .substr(4- RegExp.$1.length) 看是yy 还是yyyy 
    //console.log(        RegExp.$1, (dataTemp.getFullYear()  ) );
    fmt = fmt.replace(RegExp.$1, (dataTemp.getFullYear() + '').substr(4 - RegExp.$1.length));
  };
  // console.log(fmt)
  let o = {
    'M+': dataTemp.getMonth() + 1,
    'd+': dataTemp.getDate(),
    'h+': dataTemp.getHours(),
    'm+': dataTemp.getMinutes(),
    's+': dataTemp.getSeconds(),
  }

  for (let k in o) {
    //new RegExp( `(${k})`)  等价于  new RegExp( (M+) )
    if (new RegExp(`(${k})`).test(fmt)) {
      let str = o[k] + '';
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
    };
    // //console.log(RegExp.$1); 
  }
  return fmt;
};

// 调用类型  "/Date(1526026846907)/"  返回 2018-05-11 16:20
function formatDateTime(dataStr) {
  if (dataStr == undefined) {
    return
  }

  var dates = new Date(parseInt(dataStr.toString().slice(6)));
  var y = dates.getFullYear();
  var m = dates.getMonth() + 1;
  m = m < 10 ? ('0' + m) : m;
  var d = dates.getDate();
  d = d < 10 ? ('0' + d) : d;
  var h = dates.getHours();
  var minute = dates.getMinutes();
  minute = minute < 10 ? ('0' + minute) : minute;
  //如果是当天，只显示时分
  if(y-new Date().getFullYear()==0 && m-(new Date().getMonth() + 1)==0 && d-new Date().getDate()==0){
    return h+':'+minute
  }else if(y-new Date().getFullYear()==0){
    return m + '-' + d;
  }else{
    return y + '-' + m + '-' + d;
  }
  
}


function padLeftZero(str) {
  return ('00' + str).substr(str.length);
}

//正则判断(str:判断类型，val:输入框的值)s
function regularJudgement(str, val) {
  //手机号判断
  if (str == "phone") {
    var reg = /(^1[3|4|5|7|8][0-9]{9}$)/.test(val);
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('手机号码错误', 'middle')
      return false;
    } //判断密码
  } else if (str == "password") {
    if (val.length > 5) {
      return true;
    } else {
      Vue.$vux.toast.text('密码错误,请至少输入6位字符', 'middle')
      return false;
    } //确认密码
  } else if (str == "enterPassword") {
    if (val.password == val.enterPassword) {
      return true;
    } else {
      Vue.$vux.toast.text('二次密码错误,请核对', 'middle')
      return false;
    } //验证码判断
  } else if (str == "noteCode") {
    if (val.length < 6) {
      return false;
      Vue.$vux.toast.text('验证码错误', 'middle');
    } else {
      return true;
    } //税号/账号判断
    if (val.length > 6) {
      return true;
    } else {
      Vue.$vux.toast.text('验证码错误', 'middle')
      return false;
    } //税号/账号判断
  } else if (str == "taxNumber") {
    //console.log(val.length)
    var reg = /^[A-Za-z0-9]{15,}$/.test(val);
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('请输入正确的税号', 'middle')
      return false;
    } //账号判断
  } else if (str == "accountNumber") {
    //console.log(val.length)
    var reg = /^[A-Za-z0-9]{15,}$/.test(val);
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('请输入正确的账号', 'middle')
      return false;
    } //公司地址/名称
  } else if (str == "companyAddress") {
    var reg = /^[\(\)\（\）\u4e00-\u9fa5\w]{2,}$/.test(val); 
    if (reg && val != undefined && val.trim().length != 0) {
      return true;
    } else {
      Vue.$vux.toast.text('地址输入有误请重新输入', 'middle')
      return false;
    } //电话判断
  } else if (str == "telephone") {
    var reg = /^((\(\d{3,4}\)|\d{3,4}-)?\d{7,8})|(1[3|4|5|7|8|9][0-9]{9})$/.test(val);
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('电话错误', 'middle')
      return false;
    }
  } else if (str == "person") {
    if (val.length >= 2) {
      return true;
    } else {
      Vue.$vux.toast.text('请填写正确的姓名', 'middle')
      return false;
    }
  }else if(str == 'hanzi'){ //银行
    var reg = /^[\u4e00-\u9fa5]+$/gi.test(val)
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('输入错误', 'middle')
      return false;
    }
  }else if(str == 'account'){
    var reg = /^\d{4}(?:\s\d{4}){3}$/.test(val)
    // var reg = /^\d{6,18}$/g.test(val)
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('输入错误', 'middle')
      return false;
    }
  }else if(str == 'tel'){
    var reg = /0\d{2,3}-\d{7,8}/.test(val)
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('输入错误', 'middle')
      return false;
    }
  }else if(str == "qq"){ //qq号
    var reg = /^[1-9][0-9]{4,14}$/.test(val.trim());
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('qq号输入错误', 'middle')
      return false;	
    }
  }else if(str == "wechat"){ //微信号
    var reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(val.trim());
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('微信号输入错误', 'middle')
      return false;	
    }
  }else if(str == "HongKong"){ //港澳通行证
    var reg = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(val.trim());
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('港澳通行证输入错误', 'middle')
      return false;	
    }
  }else if(str == "passport"){ //护照
    var reg = /^[a-zA-Z]{5,17}$/.test(val.trim());
    var reg2 = /^[a-zA-Z0-9]{5,17}$/.test(val.trim());
    if (reg || reg2) {
      return true;
    } else {
      Vue.$vux.toast.text('护照输入错误', 'middle')
      return false;	
    }
  }else if (str == "idcardNum"){ //身份证号==只验证格式
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/.test(val.trim());
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('身份证号码输入错误', 'middle')
      return false;	
    }
  }else if(str == "email"){ //邮箱
    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(val.trim());
    console.log(reg,str,val)
    if (reg) {
      return true;
    } else {
      Vue.$vux.toast.text('邮箱输入错误', 'middle')
      return false;	
    } 
  }

}



//正则判断(str:判断类型，val:输入框的值) -- 实时监控 不弹窗
function regularJudgementPromptly(str, val) {
  //手机号判断
  if (str == "phone") {
    var reg = /(^1[3|4|5|7|8][0-9]{9}$)/.test(val);
    if (reg) { 
      return true;
    } else {  
      return false;
    } //判断密码
  } else if (str == "password") {
    if (val.length > 5) {
      return true;
    } else { 
      return false;
    } //确认密码
  } else if (str == "enterPassword") {
    if (val.password == val.enterPassword) {
      return true;
    } else { 
      return false;
    } //验证码判断
  } else if (str == "noteCode") {
    if (val.length > 5) {
      return true;
    } else { 
      return false;
    } //税号/账号判断
  } else if (str == "taxNumber") {
    //console.log(val.length)
    var reg = /^[A-Za-z0-9]{15,}$/.test(val);
    if (reg) {
      return true;
    } else { 
      return false;
    } //账号判断
  } else if (str == "accountNumber") {
    //console.log(val.length)
    var reg = /^[A-Za-z0-9]{15,}$/.test(val);
    if (reg) {
      return true;
    } else { 
      return false;
    } //公司地址/名称
  } else if (str == "companyAddress") {
    var reg = /^[\(\)\（\）\u4e00-\u9fa5\w]{2,}$/.test(val); 
    if (reg && val != undefined && val.trim().length != 0) {
      return true;
    } else { 
      return false;
    } //电话判断
  } else if (str == "telephone") {
    var reg = /^((\(\d{3,4}\)|\d{3,4}-)?\d{7,8})|(1[3|4|5|7|8|9][0-9]{9})$/.test(val);
    if (reg) {
      return true;
    } else { 
      return false;
    }
  } else if (str == "person") {
    if (val.length >= 2) {
      return true;
    } else { 
      return false;
    }
  }else if(str == 'hanzi'){ //银行
    var reg = /^[\u4e00-\u9fa5]+$/gi.test(val)
    if (reg) {
      return true;
    } else { 
      return false;
    }
  }else if(str == 'account'){
    var reg = /^\d{4}(?:\s\d{4}){3}$/.test(val)
    // var reg = /^\d{6,18}$/g.test(val)
    if (reg) {
      return true;
    } else { 
      return false;
    }
  }else if(str == 'tel'){
    var reg = /0\d{2,3}-\d{7,8}/.test(val)
    if (reg) {
      return true;
    } else { 
      return false;
    }
  }else if(str == "qq"){ //qq号
    var reg = /^[1-9][0-9]{4,14}$/.test(val.trim());
    if (reg) {
      return true;
    } else { 
      return false;	
    }
  }else if(str == "wechat"){ //微信号
    var reg = /^[a-zA-Z][a-zA-Z0-9_-]{5,19}$/.test(val.trim());
    if (reg) {
      return true;
    } else { 
      return false;	
    }
  }else if(str == "HongKong"){ //港澳通行证
    var reg = /^[HMhm]{1}([0-9]{10}|[0-9]{8})$/.test(val.trim());
    if (reg) {
      return true;
    } else { 
      return false;	
    }
  }else if(str == "passport"){ //护照
    var reg = /^[a-zA-Z]{5,17}$/.test(val.trim());
    var reg2 = /^[a-zA-Z0-9]{5,17}$/.test(val.trim());
    if (reg || reg2) {
      return true;
    } else { 
      return false;	
    }
  }else if (str == "idcardNum"){ //身份证号==只验证格式
    var reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)$/.test(val.trim());
    if (reg) {
      return true;
    } else { 
      return false;	
    }
  }else if(str == "email"){ //邮箱
    var reg = /^[A-Za-z\d]+([-_.][A-Za-z\d]+)*@([A-Za-z\d]+[-.])+[A-Za-z\d]{2,4}$/.test(val.trim());

    if (reg) {
      return true;
    } else { 
      return false;	
    } 
  }

}
//存入历史记录(str:搜索类型，val:搜索词)"pro":查商品，"com"：查公司，"sha"：查股东，"tra":查商标,"pat":查专利，record：历史记录,判断是否为记账 1：是
function judgment(str, record, val, num) {
  if (num == 1) {
    if (!loadFromLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, false)) {
      var arr = [];
      arr.unshift(val);
      saveToLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, arr);
    } else {
      var searchRecord = loadFromLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, false);
      //历史记录不重复
      //区分是否为记账页面的
      var isTrue = true;
      //只要有一个相同就为false
      if (val.companyName) {
        for (var i = 0; i < searchRecord.length; i++) {
          if (val.companyName == searchRecord[i].companyName) {
            isTrue = false;
          }
        }
      } else {
        for (var i = 0; i < searchRecord.length; i++) {
          if (val.subName == searchRecord[i].subName) {
            isTrue = false;
          }
        }
      }

      if (isTrue) {
        searchRecord.unshift(val);
        saveToLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, searchRecord);
      }
    };
  } else {
    var value = val.replace(/\s/g, "");
    if (value) {
      if (!loadFromLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, false)) {
        var arr = [];
        arr.unshift(value);
        saveToLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, arr);
      } else {
        var searchRecord = loadFromLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, false);
        //历史记录不重复
        if (searchRecord.indexOf(value) == -1) {
          searchRecord.unshift(value);
          saveToLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, searchRecord);
        };
      };
    }
  }


}

//读取历史记录(str:搜索类型)
function readRecord(str, record) {
  var searchRecord = loadFromLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, false);
  var val = [];
  if (searchRecord) {
    if (searchRecord.length > 10) {
      val = searchRecord.splice(0, 10);
      saveToLocal('historical_search_' + str + record, 'historical_search_' + str + record, 'historical_search_' + str + record, val);
    } else {
      val = searchRecord;
    };
  } else {
    val = "";
  };
  return val;
}

//清除历史记录(str:搜索类型)
//参数1 代表本地存储的key  参数2 代表当前vue页面需要清空的历史值， that 代表当前vue实例
function cleanSearchList(str, record, searchRecord, that) {
  MessageBox.confirm('', {
    message: '确认清空历史搜索吗？',
    title: '提示',
  }).then(action => {
    if (action == 'confirm') {
      localStorage.removeItem('historical_search_' + str + record);
      if (searchRecord == "searchRecord") {
        that.searchRecord = [];
      } else {
        that.browsingHistory = [];
      }
    };
  }).catch(err => {
    if (err == 'cancel') {
      if (searchRecord == "searchRecord") {
        that.searchRecord = that.searchRecord;
      } else {
        that.browsingHistory = that.browsingHistory;
      }
    };
  });
}

//模糊查询
function fuzzySearch(val, result) {
  if (val) {
    return result.filter(function (v) {
      return Object.keys(v).some(function (name) {
        return String(v[name]).toLowerCase().indexOf(val) > -1
      });
    });
  };
  return result;
}

//在用户输入一次后和再次输入之间的时间间隔大于500ms就让第一次发送(newVal:新输入的值，
// oldVal：原先输入的值，searchName：当前vue页面data中定义的搜索词，
// isShow：当前vue页面data中定义的是否显示搜索结果，
// searchResult：当前vue页面data中定义的搜索结果数组，
// port：接口url,num:是否查商品（1是)
//api：商式查询接口
//param：商式查询接口参数
function sendSearchName(newVal, oldVal, searchName, isShow, searchResult, port, that, num, api, param) {
  var timer = null;
  //清除延时器
  clearTimeout(timer);
  //去除空格
  var newValue = newVal.replace(/\s/g, "");
  that.searchName = newValue;
  if (newValue) {
    if (newVal != oldVal.replace(/\s/g, "")) {
      that.isShow = true;
      //再创建延时器
      if (num == 1) {
        var params = {
          searchName: newValue,
          datatype: "json"
        };
        timer = setTimeout(() => {
          getd.commonSearch("get", port, params)
            .then((res) => {
              var arr = [];
              res.data.list.forEach((val) => {
                var obj = {};
                obj.name = val.Name;
                arr.push(obj);
              });
              that.searchResult = arr;
            });
        }, 500);
      } else if (num == 2) {
        var str = encodeURI(param + "=" + newValue);
        var params = {
          "params": {
            api: api,
            args: str,
          }
        };
        timer = setTimeout(() => {
          getd.commonSearch("get", port, params)
            .then((res) => {
              that.searchResult = res.result.items;
            })
            .catch((error) => {
              //console.log("00error",error);
              that.isShow = false;
              Indicator.close();
              Toast({
                message: error.data.reason,
                duration: 2000
              });
            });
        }, 500);
      }
    };
  } else {
    that.isShow = false;
    that.searchResult = [];
  };

}
//是否是安卓手机QQ浏览器
function is_androidMQQBrower() {
  if (navigator.userAgent.match(/MQQBrowser/i) == "MQQBrowser") {
    return true;
  } else {
    return false;
  };
}
//是否是ios手机QQ浏览器
function is_iosMQQBrower() {
  if (navigator.userAgent.match(/AppleWebKit.*QQ/i)) {
    return true;
  } else {
    return false;
  };
}

//是否是微信
function is_weixn() {
  var ua = navigator.userAgent.toLowerCase();
  if (ua.match(/MicroMessenger/i) == "micromessenger") {
    return true;
  }
  return false;
};

//是否是苹果移动设备
function is_ios() {
  if ((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i)) || (navigator.userAgent.match(/iPad/i))) {
    return true;
  }
  return false;
};

//是否是安卓产品
function is_android() {
  if (navigator.userAgent.match(/Android/i) == "Android") {
    return true;
  } else {
    return false;
  };
}

//是否为QQ浏览器 
function is_MQQBrower() {
  if ( !!navigator.userAgent.toLowerCase().match(/mqqbrowser|qzone|qqbrowser/i)    ) {
    return true;
  } else {
    return false;
  };
}


//获取url地址参数
function getQueryString(name) {
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) {

    return unescape(r[2]);
  }
  return null;
}




function getQueryStringHash(name) {
  var reg = new RegExp("(^|&|/?)" + name + "=([^&]*)(&|$)", "i");
  var _index = window.location.href.indexOf("?");
  //console.log(_index)
  var r = window.location.href.substr(_index + 1);
  var strs = r.split("&");
  for (var i = 0; i < strs.length; i++) {
    var strs1 = strs[i].split("=");
    if (strs1[0] == name) {
      //console.log("??======", strs1[1])
      return strs1[1]
    }
  }
  return "";
}

//聊天工具引入方法
function talkFn(DOM) {
  // //console.log(DOM)
  var scriptDom = document.createElement("script");
  scriptDom.src = 'http://dut.zoosnet.net/JS/LsJS.aspx?siteid=DUT46021401&float=1&lng=cn';
  scriptDom.language = "javascript";
  // //console.log(document.getElementsByTagName("body")[0])
  document.getElementsByTagName("body")[0].appendChild(scriptDom);
}

//是否在app 之内
function is_app() {
  var ua = navigator.userAgent.toLowerCase();

  if (ua.match(/wqbol/i) == "wqbol") {
    return true
  } else {
    return false
  }
}

// 上传身份证识别图片  inputId为input的id  type为传入的类型（1==身份证正面，2==身份证反面，3==营业执照） 
function uploadIdcard(inputId, type, info, self) {
  // return new Promise((resolve,reject)=>{
  var obj = {};
  //console.log("info", info);
  // 选择的文件对象
  var file = null;
  var baseStr = null;
  var eleFile = document.querySelector(inputId);

  // self.loading = true; //点击上传时 进入等待
  // 压缩图片需要的一些元素和对象
  var reader = new FileReader(),
    img = new Image();
  file = eleFile.files[0];
  if (!eleFile.files.length) return;
  // 选择的文件是图片
  if (file.type.indexOf("image") == 0) {
    reader.readAsDataURL(file); //转base64
  }
  // 缩放图片需要的canvas
  var canvas = document.createElement('canvas');
  var context = canvas.getContext('2d');

  // base64地址图片加载完毕后
  img.onload = function () {
    // 图片原始尺寸
    var originWidth = this.width;
    var originHeight = this.height;
    // 最大尺寸限制
    var maxWidth = 400,
      maxHeight = 400;
    // 目标尺寸
    var targetWidth = originWidth,
      targetHeight = originHeight;
    // 图片尺寸超过400x400的限制
    if (originWidth > maxWidth || originHeight > maxHeight) {
      if (originWidth / originHeight > maxWidth / maxHeight) {
        // 更宽，按照宽度限定尺寸
        targetWidth = maxWidth;
        targetHeight = Math.round(maxWidth * (originHeight / originWidth));
      } else {
        targetHeight = maxHeight;
        targetWidth = Math.round(maxHeight * (originWidth / originHeight));
      }
    }

    // canvas对图片进行缩放
    canvas.width = targetWidth;
    canvas.height = targetHeight;
    // 清除画布
    context.clearRect(0, 0, targetWidth, targetHeight);
    // 图片压缩
    context.drawImage(img, 0, 0, targetWidth, targetHeight);
    baseStr = canvas.toDataURL("image/png"); //压缩后base64数据
  };

  //传给后台
  function uploadImgToNet() {
    var token = loadFromLocal('login_user_id', 'login_user_id', 'login_user_id', false).Token;
    var acv = new FormData();
    acv.append('file', file);
    acv.append('Token', token);
    if (type = 1 || type == 2) {
      acv.append('type', 'idCard');
    } else if (type == 3) {
      acv.append('type', 'businessLicense');
    }
    console.log("acv", acv);

    getd.upNetImage(acv)
      .then((res) => {
        obj.Img = res.data.storeResult.path;
        Object.assign(info, obj);
      })
      .catch((error) => {
        console.log('idcard', error);
      })
  }

  // 对接阿里云身份证识别接口
  function recognitionIdcard(params) {
    getd.idcard(params)
      .then((response) => {
        //      console.log('123', response)
        // self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  加载完毕后停止loading 界面
        //   self.loading = false;
        // });

        if (type == 1) {
          self.isPerson = true;
          self.isIdentityCard = true;

          obj.name = response.name;
          obj.code = response.num;
          Object.assign(info, obj);
          uploadImgToNet();
        } else if (type == 2) {
          uploadImgToNet();
        }
      })
      .catch((error) => {
        console.log(error);
        if (type == 1) {
          self.isPerson = false;
          self.isIdentityCard = false;

          self.idcardInfo.name = '';
          self.idcardInfo.code = '';
          self.idcardInfo.Img = '';
        } else if (type == 2) {
          self.idcardBack.Img = '';
        }
        info = {};
        // self.$message.error('请重新上传清晰的身份证图像');
        alert('请重新上传清晰的身份证图像')
      });
  }

  // 对接阿里云营业执照识别接口
  function businessLicense(params) {
    getd.businessLicense("post", params)
      .then((response) => {
        console.log('营业执照', response)

        self.isCompany = true;
        self.isCrediect = true;

        // self.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  加载完毕后停止loading 界面
        //   self.loading = false;
        // });
        var objResult = JSON.parse(response.outputs[0].outputValue.dataValue);
        // that.creditCodeC = obj.reg_num;
        // that.companyName = obj.name;
        obj.name = objResult.name;
        obj.code = objResult.reg_num;
        Object.assign(info, obj);
        //传给后台
        uploadImgToNet();
        //判断是否识别出
        if (objResult.name && (objResult.name != "FailInRecognition")) {
          obj.name = objResult.name;
        } else {
          obj.name = "";
        }
        if (objResult.reg_num && (objResult.reg_num != "FailInRecognition")) {
          obj.code = objResult.reg_num;
        } else {
          obj.code = "";
        }
        // if(obj.person&&(obj.person!="FailInRecognition")){
        // 	that.companyForm.person = obj.person;
        // }else{
        // 	that.companyForm.person = "";
        // }
        // if(obj.establish_date&&(obj.establish_date!="FailInRecognition")){
        // 	that.companyForm.establishmentDate = obj.establish_date.substring(0,4)+"-"+obj.establish_date.substring(4,6)+"-"+obj.establish_date.substring(6);
        // }else{
        // 	that.companyForm.establishmentDate = "";
        // }
      })
      .catch((error) => {
        self.isCompany = false;
        self.isCrediect = false;

        self.business.Img = "";
        self.business.code = "";
        self.business.name = "";
        // that.$nextTick(() => { // 以服务的方式调用的 Loading 需要异步关闭  加载完毕后停止loading 界面
        //   self.loading = false;
        // });
        console.log("营业执照错误", error);
        // that.businessImg = "";
        // that.companyName = "";
        // that.creditCodeC = "";
        info = {};
        // that.$message.error('请重新上传清晰的营业执照图像');
        alert('请重新上传清晰的营业执照图像');
      });
  }

  // 文件base64化，以便获知图片原始尺寸
  reader.onload = function (e) {
    //压缩前base64数据
    var imgData = e.target.result;
    // console.log("imgData",imgData);
    imgData = imgData.substring(imgData.indexOf(",") + 1); //去掉base64前的字符串
    if (type == 1) { //身份证正面
      var params = {
        "image": imgData, //图片二进制数据的base64编码
        "configure": "{\"side\":\"face\"}" //身份证正反面类型:face/back
      }
      recognitionIdcard(params);
    } else if (type == 2) { //身份证反面
      var params = {
        "image": imgData, //图片二进制数据的base64编码
        "configure": "{\"side\":\"back\"}" //身份证正反面类型:face/back
      }
      recognitionIdcard(params);
    } else if (type == 3) { //营业执照
      var params = {
        "inputs": [{
          "image": {
            "dataType": 50,
            "dataValue": imgData
          }
        }]
      }
      businessLicense(params);
    }
  }
} // uploadIdcard End 


function appUpload(self) {
  if (ua.match(/wqbol/i) == "wqbol") {
    showActionSheet();
  }

  //点击事件，弹出选择摄像头和相册的选项
  function showActionSheet() {
    // var self = this;
    var bts = [{
      title: "拍照"
    }, {
      title: "从相册选择"
    }];
    plus.nativeUI.actionSheet({
      cancel: "取消",
      buttons: bts
    },
      function (e) {
        if (e.index == 1) {
          getImage();
        } else if (e.index == 2) {
          galleryImgs();
        }
      });
  }

  //拍照
  function getImage() {
    // 获取设备默认的摄像头对象 
    // var self = this;
    var cmr = plus.camera.getCamera(1);
    cmr.captureImage(
      function (capturedFile) {
        //通过URL参数获取目录对象或文件对象
        plus.io.resolveLocalFileSystemURL(capturedFile, function (entry) {

          var task = plus.uploader.createUpload("http://api.wqbol.com/Upload/Save", {}, function (t, status) {
            // 上传完成
            if (status == 200) {
              console.log("Upload success: " + JSON.stringify(t));
              self.business.Img = JSON.parse(t.responseText).data.storeResult.path;
            } else {
              console.log("Upload failed: " + status);
            }
          });
          task.addFile(entry.toLocalURL(), { key: "testdoc" });
          task.addData("type", "businessLicense");
          task.addData("file", entry.toLocalURL());
          task.addData("Token", self.getToken());
          task.start();

          compressImage(entry.toLocalURL(), entry.name);
        }, function (e) {
          plus.nativeUI.toast("读取拍照文件错误：" + e.message);
        });
      },
      function (error) {
        console.log('拍照失败' + error.code + error.message)
      },
      {
        filter: 'image'
      }
    )
  }

  //压缩图片    
  function compressImage(url, filename) {
    // var self = this;
    var name = "_doc/upload/" + filename;
    plus.zip.compressImage({
      src: url,//src: (String 类型 )压缩转换原始图片的路径    
      dst: name,//压缩转换目标图片的路径    
      quality: 40,//quality: (Number 类型 )压缩图片的质量.取值范围为1-100    
      overwrite: true//overwrite: (Boolean 类型 )覆盖生成新文件    
    },
      function (zip) {
        //页面显示图片  
        showPics(zip.target, name);
      }, function (error) {
        plus.nativeUI.toast("压缩图片失败，请稍候再试");
      });
  }

  //显示图片
  function showPics(url, name) {
    // var self = this;
    //根据路径读取到文件   
    plus.io.resolveLocalFileSystemURL(url, function (entry) {
      entry.file(function (file) {
        var fileReader = new plus.io.FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onloadend = function (e) {
          var img = e.target.result.toString();
          var picUrl = e.target.result.toString();
          picUrl = picUrl.substring(picUrl.indexOf(",") + 1);
          axios({
            method: 'post',
            url: 'http://dm-58.data.aliyun.com/rest/160601/ocr/ocr_business_license.json',
            data: {
              "inputs": [
                {
                  "image": {
                    "dataType": 50,
                    "dataValue": picUrl
                  }
                }
              ]
            },
            headers: { 'Authorization': 'APPCODE d941f350729443bfb8e1c6884d66dfab' },
          })
            .then(function (response) {
              Indicator.close();
              var obj = JSON.parse(response.data.outputs[0].outputValue.dataValue);
              //判断是否识别出
              //  if(obj.name&&(obj.name!="FailInRecognition")){
              //    self.companyName = obj.name;
              //  }else{
              //    self.companyName = "";
              //  }
              //  if(obj.reg_num&&(obj.reg_num!="FailInRecognition")){
              //    self.socialCreditCode = obj.reg_num;
              //  }else{
              //    self.socialCreditCode = "";
              //  }
              //  if(obj.person&&(obj.person!="FailInRecognition")){
              //    self.legalRepresentative = obj.person;
              //  }else{
              //    self.legalRepresentative = "";
              //  }
              //  if(obj.establish_date&&(obj.establish_date!="FailInRecognition")){
              //    self.establishmentDate = obj.establish_date.substring(0,4)+"-"+obj.establish_date.substring(4,6)+"-"+obj.establish_date.substring(6);
              //  }else{
              //    self.establishmentDate = "";
              //  }
              //  if(obj.address&&(obj.address!="FailInRecognition")){
              //    self.companyAddress = obj.address;
              //  }else{
              //    self.companyAddress = "";
              //  }
            })
            .catch(function (error) {
              console.log(error);
              self.business.Img = "";
              self.business.name = "";
              self.business.code = "";
              //  self.companyAddress = "";
              alert("请重新上传清晰图像");
            });
        }
      });
    });
  }

  //从相册选择照片  
  function galleryImgs() {
    // var self = this;
    plus.gallery.pick(function (e) {
      var task = plus.uploader.createUpload("http://api.wqbol.com/Upload/Save", {}, function (t, status) {
        // 上传完成
        if (status == 200) {
          console.log(self.getToken(), "token")
          console.log("Upload success: " + JSON.stringify(t));
          self.business.Img = JSON.parse(t.responseText).data.storeResult.path;
        } else {
          console.log("Upload failed: " + status);
        }
      });
      task.addFile(e, { key: "testdoc" });
      task.addData("type", "businessLicense");
      task.addData("file", e);
      task.addData("Token", self.getToken());
      task.start();
      var name = e.substr(e.lastIndexOf('/') + 1);
      compressImage(e, name);
    }, function (e) {
    }, {
        filter: "image"
      });
  }
}




export default {
  formatPrice,
  formatPriceX,
  currency,
  saveToLocal,
  loadFromLocal,
  removeLocal,
  formatDate,
  formatDateTime,
  regularJudgement,
  regularJudgementPromptly,
  is_androidMQQBrower,
  is_iosMQQBrower,
  is_weixn,
  is_ios,
  is_android,
  is_MQQBrower,//QQ浏览器
  is_app,
  getQueryString,
  talkFn,
  getQueryStringHash,
  judgment,
  readRecord,
  cleanSearchList,
  fuzzySearch,
  sendSearchName,
  loadSessionStorage,
  saveSessionStorage,
  // keyWordColor,
  uploadIdcard,
  appUpload
}
