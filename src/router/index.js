import Vue from "vue";
import Router from "vue-router";
import { getSession } from "@util/sessionStorage";

import invoiceTitle from "@pages/invoiceTitle/invoiceTitle.vue";
import myInvoiceTitle from "@pages/invoiceTitle/myInvoiceTitle.vue";
import personalcenter from "@pages/personalCenter/personalcenter.vue";
import binding from "@pages/personalCenter/binding.vue";
import companyInfo from "@pages/personalCenter/companyInfo.vue";

//首页
import home from "@pages/home/home";
const scanInvoice = resolve => require(["@pages/home/scanInvoice"], resolve);

// 开票处理
const invoiceList = resolve =>
  require(["@pages/billingProcessing/invoiceList"], resolve);
const addInvoice = resolve =>
  require(["@pages/billingProcessing/addInvoice"], resolve);
const editInvoice = resolve =>
  require(["@pages/billingProcessing/editInvoice"], resolve);
const invoiced = resolve =>
  require(["@pages/billingProcessing/invoiced"], resolve);

// 我的发票
const myInvoice = resolve => require(["@pages/myInvoice/myInvoice"], resolve);
const invoiceDetail = resolve =>
  require(["@pages/myInvoice/invoiceDetail"], resolve);

// 成为商户
const first = resolve => require(["@pages/business/first"], resolve);
const second = resolve => require(["@pages/business/second"], resolve);
const third = resolve => require(["@pages/business/third"], resolve);
const fourth = resolve => require(["@pages/business/fourth"], resolve);
const businessCreateCode = resolve =>
  require(["@pages/business/businessCreateCode"], resolve);
const sucess = resolve => require(["@pages/business/sucess"], resolve);
const titleDetail = resolve =>
  require(["@pages/invoiceTitle/titleDetail"], resolve);

//个人中心
const photo = resolve => require(["@pages/personalCenter/photo"], resolve);

// 组件
// 公用组件----图片上传
const uploadFile = resolve => require(["@components/uploadFile"], resolve);
// 公用组件---微信授权
const isWeixinAuth = resolve => require(["@components/isWeixinAuth"], resolve);

Vue.use(Router);

var router = new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "home",
      component: home,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },

    {
      path: "/scanInvoice",
      name: "scanInvoice",
      component: scanInvoice,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/business/businessCreateCode",
      name: "businessCreateCode",
      component: businessCreateCode,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      //新增发票抬头
      path: "/invoiceTitle/invoiceTitle",
      name: "invoiceTitle",
      component: invoiceTitle,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },

    {
      path: "/invoiceTitle/myInvoiceTitle",
      name: "myInvoiceTitle",
      component: myInvoiceTitle,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requiresAuth: true }
        }
      ]
    },
    {
      path: "/myInvoice/myInvoice",
      name: "myInvoice",
      component: myInvoice,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/personalcenter",
      name: "personalcenter",
      component: personalcenter,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/personalcenter/binding",
      name: "binding",
      component: binding,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/personalcenter/companyInfo",
      name: "companyInfo",
      component: companyInfo,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/billingProcessing/invoiceList",
      name: "invoiceList",
      component: invoiceList,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/billingProcessing/addInvoice",
      name: "addInvoice",
      component: addInvoice,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/billingProcessing/editInvoice",
      name: "editInvoice",
      component: editInvoice,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/billingProcessing/invoiced",
      name: "invoiced",
      component: invoiced,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/business/first",
      name: "first",
      component: first,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/business/second",
      name: "second",
      component: second,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/business/third",
      name: "third",
      component: third,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },

    {
      path: "/business/fourth",
      name: "fourth",
      component: fourth,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/personalcenter/photo",
      name: "photo",
      component: photo,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/business/sucess",
      name: "sucess",
      component: sucess,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/myInvoice/invoiceDetail",
      name: "invoiceDetail",
      component: invoiceDetail,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
      path: "/invoiceTitle/titleDetail",
      name: "titleDetail",
      component: titleDetail,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    },
    {
     //防止进入/isWeixinAuth  所以用了/isWeixinAuth/isWeixinAuth 
      path: "/isWeixinAuth/isWeixinAuth",
      name: "isWeixinAuth",
      component: isWeixinAuth,
      meta: { requireAuth: false }
    },
    {
      path: "*",
      name: "/",
      component: home,
      meta: { requireAuth: true },
      children: [
        {
          path: "isWeixinAuth",
          component: isWeixinAuth,
          meta: { requireAuth: false }
        }
      ]
    }
   
  ]
});

router.beforeEach((to, from, next) => {
  document.documentElement.scrollTop = document.body.scrollTop = "0px";
  // 路由进入下一个路由对象前，判断是否需要登陆
  // 在路由meta对象中由个requireAuth字段，只要此字段为true，必须做鉴权处理
  
  if (to.meta.requireAuth) {
    next();
    return;

    // userData为存储在本地的一些用户信息 若是无值表示没有获取到微信授权
    let userData = getSession("_id");
    // 未登录和已经登录的处理
    // getSession方法处理后如果userData.token没有值就是undefined，下面直接判断
    // console.log('获取的用户unionid',userData , userData != undefined ||  userData != null );

    //本地存储信息后 不用再次授权
    if (userData != undefined || userData != null) {
      next();
      return;
    } else if (to.query.code) {
      //防止页面多次刷新
      next();
      return;
    }
    //手动调整页面进入 /isWeixinAuth子窗口
    let path = to.path == "/" ? "/home" : `${to.path + "/isWeixinAuth"}`;
    // console.log("即将进入的页面path==>") ;
    // console.log(to.path )
    // console.log(  to)
    // console.log(  path)
    
    // 未授权 统一进入微信授权组件进行授权
   
    next({
      path: path,
      query: {
        beforeRedirect:to.path, //需要手动history.replaceState的网址
        redirect: to.name == "/" ? "home" : to.name
      }
    });
    history.replaceState(null, null, to.path);
     

  } else {
 
    // 微信授权页面isWeixinAuth 
    if(to.path == '/isWeixinAuth/isWeixinAuth'){
      //执行第二步子 
      next();
      return false;
    }else{
      // 第一步  先定向到这里 /scanInvoice/isWeixinAuth  然后执行第二步子 
      let replacePath =to.path.substring(
        0,
        to.path.indexOf("/isWeixinAuth")
      );
      if(replacePath == ''){
        replacePath = '/'
      }
      let  len  = replacePath.match(/(\/[0-9a-zA-Z]*$)/gi).length
      var  filterLastRouter = replacePath.match(/(\/[0-9a-zA-Z]*$)/gi)[len-1]

 
     
      if (filterLastRouter != null  && (filterLastRouter == ""  ||  filterLastRouter == "/") ) {
        history.replaceState(null, null, '/'); 
        filterLastRouter = "home";
      }else  {
        history.replaceState(null, null, replacePath);
        filterLastRouter = filterLastRouter.substr(1);
      }
     
      
      
      // if(to.path == '/scanInvoice/isWeixinAuth'){
      //   console.log( to.query.code )
      //   console.log( what.tc )
      // }
      // 路由历史记录覆盖
     //防止进入/isWeixinAuth  所以用了/isWeixinAuth/isWeixinAuth
      next({
        path: '/isWeixinAuth/isWeixinAuth',
        query: { 
          // 告诉后台 需要回调的 路由地址 相当于 state
          redirect:filterLastRouter,
          beforeRedirect:replacePath, //需要手动history.replaceState的网址
          //加入code 防止微信授权页面不能进入后台回调 跳转 
          //和后台获取code 交换unionId
          code: Boolean(to.query.code) ? to.query.code : 0 
        }
      });
      return false;
    }
    
    
  }
});

export default router;

 
