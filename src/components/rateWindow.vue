
<!-- 此页面作为数据联动单独组件 -->
<template>
  <div>
    <div  id="aaa">
      

         <popup-picker   @on-shadow-change="aaaa"   @on-show="onShow" @on-hide="onHide" :fixed-columns="2" :columns="2"  
          :data="rateArr" v-model="rate" popup-title="选择税率"
          show-name>
          </popup-picker>
     </div>

   </div>
</template>

<i18n>
  'Normal usage, the first one is selected without setting default value':
    zh-CN: 默认，不设置默认值时选中第一个
  Asynchronous loading and dynamic change of data:
    zh-CN: 异步加载及动态改变数据
  Set data 1:
    zh-CN: 设置数值1
  Set data 2:
    zh-CN: 设置数值2
  Set data 3:
    zh-CN: 设置数值3
  With default value:
    zh-CN: 设置默认值时
  Two-way data binding:
    zh-CN: 双向绑定
  Multi cols in non chained-mode:
    zh-CN: 非联动多列
  Five columns:
    zh-CN: 五列
  Locations in chained-mode:
    zh-CN: 地区联动
  Text corresponding to the value:
    zh-CN: 选中值所对应的文字
  3 cols data but only show 2 cols:
    zh-CN: 3列的数据，只显示两列
</i18n>

<script>
import { PopupPicker } from "vux";
import getData from "@vuex/ajaxAPI/getData";
import axios from "axios";
export default {
  data() {
    return {
      rate: [],
      rateArr: [],
    };
  },

  created() {
    // province();
    getData.rate().then((res) => {
      console.log("res",res);
      this.rateArr = res.data.list;
    })
  },
  mounted(){

  },
  components: {
    PopupPicker
  },
  methods: {
    onShow() {
      console.log("on show5问题个体户如何");
    },
    onHide(type) {
      console.log("on hide防御塔聚义", type);
    },
    aaaa(value) {
      this.yearyear = value;
      // console.log("===============================", value);
    },
  }
};
</script>

<style  >
</style>


<style lang="less" type="stylesheet/css" scoped>
</style>
