 
import { PerformanceObserver } from 'perf_hooks';
<!--注意使用改组件需要吧move设置为relative-->


<template>
    <div class="leftDelete">
        <div class="move"
             @touchstart="_touchStart($event)"
             @touchmove="_touchMove()"
             @touchend="_touchEnd"
             :style="txtStyle">
            <slot></slot>
            <div class="deleteIcon" :style="zIndex"    @click.prevent="deleteItem(index,item)">删除</div>
        </div>
        
    </div>
</template>

<script>
export default {
  props: {
    item: Object,
    index: Number
  },
  data() {
    return {
      startX: 0, //触摸位置X
      moveX: 0, //滑动时的位置X
      disX: 0, //移动距离X
      startY: 0, //触摸位置 Y
      moveY: 0, //滑动时的位置Y
      disY: 0, //移动距离Y
      txtStyle: "",
      delWidth: 200,
      top: "",
      zIndex: "z-index:-1"
    };
  },
  methods: {
    _initStyle(ev){
     let _class = ev.target.offsetParent.getAttribute("class");
      let len = ev.target.ownerDocument.getElementsByClassName(_class).length;
      for (let i = 0; i < len; ++i) {
        //所有的move 重置
        document.getElementsByClassName("move")[i].style =
          "transform:translateX(0rem);transition:0.3s all";
      }
    },
    _touchStart: function(ev, ddd) {
      var ev = ev || event;
       
     this._initStyle(ev)

      if (ev.touches.length == 1) {
        // 手指按下的时候记录按下的位置
        this.startX = ev.touches[0].clientX;
        this.startY = ev.touches[0].clientY;
      }
    },
    _touchMove: function(ev) {
      //  此处节点查找需要优化
      ev = ev || event;
      // document.body.style.overflow = 'hidden'
      if (ev.touches.length == 1) {
        // 滑动过程中的实时位置
        this.moveX = ev.touches[0].clientX;
        // 滑动过程中实时计算滑动距离
        this.disX = this.startX - this.moveX;

        // 滑动过程中的实时位置
        this.moveY = ev.touches[0].clientY;
        // 滑动过程中实时计算滑动距离
        this.disY = this.startY - this.moveY;

        if (Math.abs(this.disY) >= 25) {
          //判断用户意图为上下滑动 则不出现删除按钮
          
          this._initStyle(ev);
          this.startX  = 0; //重置startX  这样用户滑动滚屏不会出现删除
          return false;
       
        }
        // console.log( '============' ); 
        // 如果是向右滑动或者只是点击，不改变滑动位置
        if (this.disX < 0 || this.disX == 0) {
          // console.log('没有移动');
          ev.target.offsetParent.style =
            "transform:translateX(0rem);transition:0.3s all";
        } else if (this.disX >= 15) {
          //如果是向左滑动，则实时给这个根元素一个向左的偏移-left，当偏移量到达固定值delWidth时，固定元素的偏移量为 delWidth
          ev.target.offsetParent.style = `transform:translateX(-${this
            .delWidth / 100}rem);transition:0.3s all`;
          if (this.disX >= this.delWidth / 100) {
            ev.target.offsetParent.style = `transform:translateX(-${this
              .delWidth / 100}rem);transition:0.3s all`;
            this.zIndex = "z-index:" + 10 + "rem";
          }
        }
      }
    },
    _touchEnd: function(ev) {
      // document.body.style.overflow = 'visible'

      if (event.changedTouches.length == 1) {
        this.startX = 0;
        this.zIndex = "z-index:" + -1 + "rem";
        // 手指移动结束后的水平位置
        let endX = event.changedTouches[0].clientX;
        // 触摸开始与结束,手指移动的距离
        this.disX = this.startX - endX;
        // //如果距离小于删除按钮的1/2，不显示删除按钮
      }
    },
    deleteItem: function(index, itemsv) { 
      this.$emit("deleteItem",index, itemsv.Id);
    }
  }
};
</script>

<style  scoped>
.move {
  position: relative;
}
</style>