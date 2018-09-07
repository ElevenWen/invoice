import api from "./globeAxios";
import upload from "./businessLicense";
// import tianyancha from "./tianyancha";


/*
*api.fech argument
* argument[0] :method
* argument[1] :url
* argument[2] :parmas
* return response.data
*/
export default {
  //cart.vue
  getCusCompanyById() {
    return api.fetch("get", "/System/GetProinveList1");
  },
  getVerifyCode(params) {
    return api.fetch("post", "/Customer/SendMobileVerifyCode", params);
  },
  //商户图片上传接口
  pushImageTotal(params) {
    console.log("有问题的结构 应该没人用把?");
    // return api.fetch("post", "/Invoice/GetInvList", params);
  },
  // 获取验证码
  getCodee(parmas) {
    return api.fetch("post", "/Customer/SendMobileVerifyCode", parmas);
  },
  // 成为商户第一步==基本信息
  firstOne(parmas) {
    return api.fetch("post", "/Shop/RegisterBaseInfo", parmas);
  },
  upNetImage(params) {
    return api.fetch("post", "/Upload/Save", params);
  },
  //微信授权 判断用户是否关注
  weixinIsFocus(params) {
    return api.fetch("get", "/Wx/IsFocus", params);
  },
  //微信授权  获取用户openid
  weixinAuthOpenid(params) {
    return api.fetch("get", "/Wx/get_openid", params);
  },
  //微信授权 微信新用户推荐信息记录 传递给后台数据保存
  weixinBindCusAndRefCode(params) {
    return api.fetch("get", "/Wx/BindCusAndRefCode", params);
  },

  getInvHeadlist(params) {
    //获取发票抬头列表  可以从天严查查询 也可以从天严查和后台查询
    return api.fetch("post", "/Invoice/GetInvHeadlist", params);
  },
  editInvHead(params) {
    //编辑发票抬头 后传递给后台 编辑发票抬头 保存发票抬头
    return api.fetch("post", "/Invoice/EditInvHead", params);
  },
   applyInvoice(params) {
    //扫码后 开票申请 
    return api.fetch("post", "/Invoice/ApplyInvoice", params);
  }, 
    getUserInfo(params){ //商户信息
        return api.fetch('post','/Shop/GetUserInfo',params)
    },
    BindShop(params){  //绑定商家
        return api.fetch('post','/Shop/BindShop',parmas)
    },
    GetInfo(params){
        return api.fetch('post','/Shop/GetInfo',params)
    },
    // 成为商户第二步==个人信息
    secondTwo(parmas){ 
        return api.fetch('post', '/Shop/RegisterCertInfo',parmas);
    },
    // 成为商户第三步==企业信息
    thirdThree(parmas){
        return api.fetch('post', '/Shop/RegisterBankInfo',parmas);
    },
    //成为商户第四步==企业信息 企业认证资质信息注册  用来上传营业执照  银行卡2张 身份证2张 
    RegisterCompanyInfo(parmas){
        return api.fetch('post', '/Shop/RegisterCompanyInfo',parmas);
    },
    //获取抬头列表
    GetInvHeadlist(params){
        return api.fetch('get', '/Invoice/GetInvHeadlist',params);
    },
    //删除抬头
    DelInvHead(params){
        return api.fetch('post','/Invoice/DelInvHead',params)
    },
    //开票处理列表 我的发票列表
    GetInvList(params){
        return api.fetch('get','/Invoice/GetInvList',params)
    },
    //获取发票抬头详情
    getInvHeadInfo(params){
        return api.fetch('post','/Invoice/GetInvHeadInfo',params)
    },
    //删除开票记录 
    delInvoice(params){
        return api.fetch('post','/Invoice/DelInvoice',params)
    },
    // 税率
    rate(){
        return api.fetch('get', '/Invoice/GetTaxRate');
    },
    // 获取商品名称
    productName(parmas){
        return api.fetch('post', '/Invoice/GetProdList',parmas);
    },
    BindShop(params) {
        //绑定商家
        return api.fetch("post", "/Shop/BindShop", params);
    },
    GetInfo(params) {
        return api.fetch("post", "/Shop/GetInfo", params);
    },
    //天眼查接口
    tianyancha(parmas) {
        return tianyancha.fetch("post", "/Enterprise/GetTianYanChaApiData", parmas);
    },
    //取消绑定
    RemoveBindShop(params){
        return api.fetch('post','/Shop/RemoveBindShop',params)
    },
    // 删除开票记录
    deletInvoice(params){
        return api.fetch('get','/Invoice/DelInvoice',params)
    },
    // 确认开票
    confirmInvoice(params){
        return api.fetch('post','/Invoice/Invoice',params)
    },
    // 发票详情
    invoiceDetail(params){
        return api.fetch('get','/Invoice/GetInvInfo',params)
    }
 }

    

