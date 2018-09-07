<template>
  <div id="app"  > 
    <router-view id="routerView" />
  </div>
</template>

<script>

  import { Icon } from 'vux'

export default {
  name: 'App',
   
  data(){
    return {

    }
  },
  computed:{
    // ...mapState(
    //   'businessQuery',['companyList']
    // ),
  },
  created(){ 
    
   },
   methods:{
    // ...mapActions(
    //   "businessQuery",{
    //     'QUERYCOMPANY' :'QUERYCOMPANY' 
    //   }
    // ),
      
    AAA(){
       
      this.$vux.alert.show({
        title: 'VUX is Cool',
        content:  ('Do you agree?'),
        onShow () {
          console.log('Plugin: I\'m showing')
        },
        onHide () {
          console.log('Plugin: I\'m hiding now')
        }
      })
    }
   }
}
</script>

<style lang="less">
@import '~vux/src/styles/1px.less';
@import '../static/reset.css';
  #app {
    height: 100%;
    width: 100%;
  }
  
  #routerView{  
    padding-top:0.1px;
    height: 100%;  
    >div[class]{
      margin-top:1.173333rem;
    }
  }
</style>
