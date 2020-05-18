<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home='true' :titleCenter="true" type="fixed" title="登录">
		</nav-bar>
		帮助中心
		<!-- 基础用法 -->
		<uni-swipe-action>
		    <uni-swipe-action-item :options="options" @click="onClick" @change="change">
		        <view class='cont'>SwipeAction 基础使用场景</view>
		    </uni-swipe-action-item>
		</uni-swipe-action>
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue'
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue'
export default {
  data(){
    return {
      options:[
        {
            text: '取消',
            style: {
                backgroundColor: '#007aff'
            }
        }, {
            text: '确认',
            style: {
                backgroundColor: '#dd524d'
            }
        }
      ]
    }
  },
  methods:{
    onClick(e){
      console.log('当前点击的是第'+e.index+'个按钮，点击内容是'+e.content.text)
    },
    change(open){
      console.log('当前开启状态：'+ open)
    }
  }
}
</script>

<style>
</style>
