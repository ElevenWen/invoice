
<!-- 此页面作为数据联动单独组件 -->
<template>
  <div>
    <div  id="aaa">
        <popup-picker   @on-shadow-change="aaaa"   @on-show="onShow" @on-hide="onHide" :fixed-columns="2" :columns="2"  
        :data="productList" v-model="type" show-name popup-title="选择商品" @on-change="bbb">
        </popup-picker>
     </div>

   </div>
</template>

<script>
import { PopupPicker,Group } from "vux";
import getData from "@vuex/ajaxAPI/getData";
import tool from "@util/tool.js";
import { getSession } from "@util/sessionStorage";
export default {
  data() {
    return {
      type:[],
      productList: [],
      valueString:"",
      businessId:"",//商户id
      listLength:0,
      info:[],
    };
  },
  props:{
    productN: String
  },
  created(){
    let params = {
      'UnionId':JSON.parse(sessionStorage.getItem('customerInfo')).UnionId
    }
    getData.GetInfo(params).then((res) => {
      this.businessId = res.data.data.Id;
      // console.log("this.businessId",this.businessId)
    })
  },
  mounted(){
    
  },
  components: {
    PopupPicker,
    Group
  },
  methods: {
    onShow() {
      console.log("1111111")
      // console.log("...0",tool.loadFromLocal("productN","ALL"));
      let _productN = tool.loadFromLocal("productN","ALL");
      if(_productN){
        let last = (last=Object.keys(_productN))[last.length-1];
        let datas = {
          Id : this.businessId,
          Name : last
        }
        getData.productName(datas).then((res) => {
          console.log("商品",res);
          this.listLength = res.data.recordCount;
          if(this.listLength == 0 ){
            this.$emit("noName",true);
            return;
          }
          this.productList = res.data.list;
          this.productList.forEach((items) => {
            return Object.assign(items, {
              name: items.Name + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" + "&nbsp;" +"&nbsp;" +items.Code,
              value: String(items.Id),
              parent: 0
            });
          })
        })
      }else{
        let datas = {
          Id : this.businessId,
        }
        getData.productName(datas).then((res) => {
          console.log("商品",res);
          this.listLength = res.data.recordCount;
          if(this.listLength == 0 ){
            this.$emit("noName",true);
            return;
          }
          this.productList = res.data.list;
          this.productList.forEach((items) => {
            return Object.assign(items, {
              name: items.Name + "&nbsp;" +items.Code,
              value: String(items.Id),
              parent: 0
            });
          })
        })
      }
    },
    onHide(type) {
      // console.log("222222")
      this.productList.forEach((items) => {
        if(items.Id == this.type[0]){
          this.info.push({"name":items.Name,"rate":items.TaxRate,"price":items.Price,"id":items.Id,"unit":items.Unit,"sku":items.SpecificationModel});
        }
      })
      if(!type){
        this.info = [];
        console.log("this.type",this.info)
      }
      this.$emit("inputValue", this.info);
      tool.removeLocal("productN");
      this.info = [];
    },
    aaaa(value) {
      // console.log("===============================", value);
      this.type = value;
    },
    bbb(value){
      // console.log("bbb", value);
      this.type = value;
      if(value.length == 0){
        this.type = this.productList[0];
      }
    }
  },
  beforeDestroy(){
    tool.removeLocal("productN");
  }
};
</script>

<style  >
</style>


<style lang="less" type="stylesheet/css" scoped>
</style>
