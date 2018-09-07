
<!-- 此页面作为数据联动单独组件 -->
<template>
  <div>
    <div  id="aaa">
        <popup-picker   @on-shadow-change="aaaa"   @on-show="onShow" @on-hide="onHide" :fixed-columns="1" :columns="1"  
        :data="type" v-model="typeValue" show-name popup-title="选择证件类型" @on-change="bbb">
        </popup-picker>
     </div>

   </div>
</template>

<script>
import { PopupPicker,Group } from "vux";
export default {
  data() {
    return {
      type: ["身份证","护照"],
      typeValue: [],
      valueString:"",
      cancelVal:""
    };
  },
  components: {
    PopupPicker,
    Group
  },
  methods: {
    onShow() {
      // console.log("on show");
      //  console.log("ccc",this.typeValue);  
    },
    onHide(type) {
      this.valueString = this.typeValue.join("");
      // console.log("this.valueString",this.valueString)
      // console.log("on hide", type);
      if(!type){
        this.valueString = "";
      }
      this.$emit("value",this.valueString);
    },
    aaaa(value,name) {
      // console.log("===============================", name);
      this.typeValue = value;
      // console.log("aaa",this.typeValue);  
    },
    bbb(value){
      // console.log("bbb",value);  
      this.typeValue = value;
      if(value.length == 0){
        this.typeValue = ["身份证"];
      }
      // console.log("bbb2", this.typeValue)
    }
  }
};
</script>

<style  >
</style>


<style lang="less" type="stylesheet/css" scoped>
</style>
