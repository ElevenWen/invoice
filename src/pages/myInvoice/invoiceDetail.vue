<template>
    <div>
        <div id="invoiceDetail">
            <headerCom :titleScoped="'发票详情'"></headerCom>
            <router-view></router-view>
            <div class="box" v-for="(items,index) in detail" :key="index">
                <img :src="items.InvImage" alt="" class="box_i">
            </div>
        </div>  
    </div>
</template>

<style lang="less" scoped>
#invoiceDetail {
  height: 100%;
  background: #000;
  .box {
    height: 100%;
    .box_i {
      margin-top: 40%;
    }
  }
}
a {
  width: 100%;
  height: 100%;
}
</style>
<script>
import { mapState, mapActions, mapGetters } from "vuex";
export default {
  data() {
    return {};
  },
  created() {
    this.$nextTick(() => {
      this.weixin({
        houtaiData: `url=${location.href}`,
        title: "电子发票分分钟搞定，你还在等什么？",
        desc: "我在微企宝服务平台开具电子发票，省心又省力，快来看看吧！",
        link: location.href,
        imgUrl:`${process.env.innerGobleNetPort}invoiceDetail.jpg`  
      });
    });
  },
  computed: {
    ...mapGetters("billingProcessing", ["detail"])
  },
  mounted() {
    let params = {
      params: {
        Id: this.$route.query.id,
        IsCus:"1",
      }
    };
    this.invoiceDetail(params).then(() => {
      console.log("_iDetail", this.detail);
    });
  },
  methods: {
    ...mapActions("billingProcessing", {
      invoiceDetail: "invoiceDetail"
    })
  }
};
</script>

