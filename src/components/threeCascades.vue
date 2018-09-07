
<!-- 此页面作为数据联动单独组件 -->
<template>
  <div>
    <div  id="aaa">
         <popup-picker   @on-shadow-change="aaaa"   @on-show="onShow" @on-hide="onHide" :fixed-columns="3" :columns="3"  
          :data="year7" v-model="year7Value"  popup-title="选择所属地区"
          show-name @on-change="bbb">
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

var count = 0;

var liandongAJAX = axios.create({
  baseURL: process.env.gobleNetPort,
  timeout: 11111
});

function province() {
  return new Promise((resolve, reject) => {
    liandongAJAX
      .post("/System/GetProinveList")
      .then(response => {
        // console.log("response", response);
        var newProvinceList = response.data.data.list.map(province => {
          return Object.assign(province, {
            name: province.Name,
            value: String(province.Id),
            parent: 0
          });
        });
        resolve(newProvinceList);
      })
      .catch(error => {
        console.log("error", error);
        reject(error);
      });
  });
}
function city(aa) {
  let arr = [];

  for (let i = 0; i < aa.length; i++) {
    function test() {
      return new Promise((resolve, reject) => {
        let params = {
          datatype: "json",
          Id: aa[i].Id //默认显示北京市
        };
        liandongAJAX
          .post("/System/GetAreaListById", params)
          .then(response => {
            var cityList = response.data.data.list.map(city => {
              return Object.assign(city, {
                name: city.Name,
                value: String(city.Id),
                parent: String(aa[i].Id)
              });
            });
            resolve(cityList);
          })
          .catch(error => {
            reject(error);
          });
      });
    }
    arr.push(test());
  }

  let xx = [];
  return Promise.all([...arr]).then(function(values) {
    for (var i of values) {
      xx.push(...i);
    }
    return xx;
  });
}

function initCity() {
  var that = this;
  var aa = [];
  async function all() {
    let aa = await province();
    let bb = await city(aa);
    let cc = await city(bb);

    aa.push(...aa, ...bb, ...cc);
    // console.log( ...aa )
    // console.log(  ...bb)
    // console.log( ...cc)
    return aa;
  }
  return all();
}

export default {
  data() {
    return {
      year7: [],
      year7Value: [],
      arrInfo:[],
    };
  },

  created() {
    initCity().then(e => {
      this.year7 = e;
      this.$emit("completed",true);
    });
  },

  components: {
    PopupPicker
  },
  methods: {
    onShow() {
      // console.log("on show5问题个体户如何");
    },
    onHide(type) {
      // console.log("on hide防御塔聚义", type);
      this.year7.forEach((items,index) => {
        if(items.Id == this.year7Value[0]){
          this.arrInfo.push({"name":items.Name,"id":items.Id});
        }
        if(items.Id == this.year7Value[1]){
          this.arrInfo.push({"name":items.Name,"id":items.Id});
        }
        if(items.Id == this.year7Value[2]){
          this.arrInfo.push({"name":items.Name,"id":items.Id});
        }
      })
      // console.log("...",this.arrInfo)
      if(!type){
        this.arrInfo = [];
      }
      this.$emit("addressInfo",this.arrInfo);
      this.arrInfo = [];
    },
    aaaa(value) {
      this.year7Value = value;
      // console.log("aaaa", this.year7Value);
    },
    bbb(value){
      this.year7Value = value;
      if(value.length == 0){
        this.year7Value = ["758ab661-991b-4d27-95f2-d076abafd847", "62937eb0-e1db-44c4-884b-a1b28fe21192", "c53e0bdb-e353-4f66-a7d6-145225276935"];
      }
      // console.log("bbb", this.year7Value);
    }
  },
};
</script>

<style  >
</style>


<style lang="less" type="stylesheet/css" scoped>
</style>
