// 缓存本地
export const setSession = (name, val) => {
  window.sessionStorage.setItem(
    JSON.stringify(name),
    JSON.stringify(val) || "[]"
  );
};


// 获取本地
export const getSession = name => {
  console.log("获取本地", name,JSON.parse(window.sessionStorage.getItem(JSON.stringify(name))));
  return JSON.parse(window.sessionStorage.getItem(JSON.stringify(name)));
};

// 删除本地
export const removeSession = name => {
  window.sessionStorage.removeItem(JSON.stringify(name));
};






// 此版本用不到本地存储



// const saveToLocal = function saveToLocal(_navigatorName_, id, key, value) {
//   if (typeof id === "object" && !Array.isArray(id)) {
//     //判断对象
//     let value = JSON.stringify(id);
//     window.localStorage.setItem(_navigatorName_, value); //存入数据格式 {_navigatorName_:id}
//   } else {
//     let navigatorName = window.localStorage[_navigatorName_];

//     if (!navigatorName) {
//       navigatorName = {};
//       navigatorName[id] = {};
//     } else {
//       navigatorName = JSON.parse(navigatorName);
//       if (!navigatorName[id]) {
//         navigatorName[id] = {};
//       }
//     }
//     navigatorName[id][key] = value;

//     window.localStorage[_navigatorName_] = JSON.stringify(navigatorName);
//   }
// };

/***
 * loadFromLocal
 *  存入数据 { 'tab':{name:'tab'},'content':{name:'content'} }
 *  举例1:this.commonTool.loadFromLocal('businessSearchKey',"id",'searchName') ==>  return "北京百度网讯科技有限公司"
 *  举例2:this.commonTool.loadFromLocal('businessSearchKey',"ALL") ==> return { 'tab':{name:'tab'},'content':{name:'content'} }
 ***/
// const loadFromLocal = function loadFromLocal(_navigatorName_, id, key) {
//   let navigatorName = window.localStorage[_navigatorName_];
//   if (!navigatorName) {
//     return false;
//   }

//   if (id === "ALL") {
//     //获取_navigatorName_ 下所有数据
//     let idALL = JSON.parse(navigatorName);
//     return idALL;
//   } else {
//     //id 下面所有数据
//     navigatorName = JSON.parse(navigatorName)[id];
//     if (!navigatorName) {
//       return def;
//     }
//     //选择所有数据
//     if (
//       key != undefined &&
//       (key.toString().trim() == "" || key.toString().trim() == "ALL")
//     ) {
//       return navigatorName;
//     }
//     let ret = navigatorName[id][key];
//     return ret || def;
//   }
// };
