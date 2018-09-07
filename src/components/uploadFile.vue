
<!-- 此页面作为图片上传单独组件 -->
<template>
  <div  id="uploadFileWrap">
      <div id="fileWrap">
          <input  id="index1" type="file" @change="requestData" accept="image/*" />     
     </div>
    
    <!-- 进度条 -->
    <div class="progress">
      <x-progress :percent="percent1" :show-cancel="false"></x-progress> 
    </div>
    <!-- 加载画面 --> 
    <div v-transfer-dom>
       <x-dialog v-model="showDialogStyle" :dialog-style="{'max-width': '100%', width: '100%', height: '50%', 'background-color': 'transparent'}">
        <loading :show="show2" :text="text"></loading> 
    </x-dialog>
</div>

   </div>
</template>

<script>
import axios from "axios";
import { POINT_CONVERSION_COMPRESSED } from "constants";
import { XProgress, Loading } from "vux";

var fileUploadAJAX = axios.create({
  baseURL: "https://api.wqbol.net",
  timeout: 33333333333
});
let noData = {};
export default {
  props: {
    id: {
      default: 0
    },
    fileName: {
      type: String,
      default: "file"
    },
    type: {
      type: String,
      default: "avatar"
    },
    url: {
      type: String,
      default: "/Upload/Save"
    },
    DOM: {}
  },
  data() {
    return {
      percent1: 0,
      show2: false,
      text: "",
      showDialogStyle: false
    };
  },
  components: {
    XProgress,
    Loading
  },
  created() { 
  },
  methods: {
    requestData(e) {
      var that = this;
      let files = e.target.files || e.dataTransfer.files;
      if (!files.length) return;
      //传给后台
      var params = new FormData();
      params.append("file", files[0]);
      params.append("type", this.type);
      this.show2 = true;
      this.text = "正在上传";
      this.showDialogStyle = true;
      fileUploadAJAX
        .post("/Upload/Save", params, {
          onUploadProgress(a) {
            // console.log(a, "进度啊2");
            that.percent1 = Number(a.loaded / a.total * 100);
          }
        })
        .then(response => {
          // console.log("上传图片成功", response.data.data.storeResult);
          // resolve(newProvinceList);
          this.text = "上传成功";
          this.show2 = false;
          this.showDialogStyle = false;
          //上传成功把数据返回到 父组件 business /fourth.vue
          this.$emit(
            "changeImageDefault",
            response.data.data.storeResult.path,
            this.DOM
          );
        })
        .catch(error => {
          // console.log("上传图片失败", error);
          this.text = "网络超时,请刷新后重试";

          // reject(error);
        });
    }
  }
};
</script>


<style lang="less"  scoped>
#fileWrap {
  height: 100%;
  width: 100%;
  input {
    height: 100%;
    width: 100%;
    background: red;
    opacity: 0;
  }
}
.progress /deep/ .weui-progress__bar {
  background-color: #fff;
}
</style>
