<template>
	<view class="data">
		<nav-bar fontColor="#000" backState="1000" :home='false' :titleCenter="true" type="fixed" title="数据中心">
		    <view class="icon_setUp data-nav-add" slot="right">+</view>
		</nav-bar>
		
<!-- 		<view class="data-nav">
			数据中心
			<view class="data-nav-add">
				+
			</view>
		</view>
		<view class="data-user">
			<view class="data-user-item">
				<view class="data-user-item-logo">
					<image src="../../static/logo.png" mode=""></image>
				</view>
				<view class="data-user-item-detail">
					<text>嘻嘻嘻</text>
				</view>
			</view>
		</view> -->
	</view>
</template>

<script>
	import navBar from "@/components/zhouWei-navBar";
	export default {
		methods:{
			backClick(){
				console.log( 'haha')
			}
		},
	    components: {navBar}
	}
</script>

<style lang="less">
	.data{
		&-nav{
			height: 120rpx;
			line-height: 120rpx;
			border-bottom: 1px #C0C0C0;
			box-shadow: 0 5px 5px #F1F1F1;
			text-align: center;
			position: relative;
			&-add{
				margin-right: 10px;
				width: 60rpx;
				text-align: center;
				font-size: 28px;
			}
		}
		&-user{
			&-item{
				display: flex;
				height: 105rpx;
				box-shadow: 5px 5px 5px #999999;
				margin-top: 5px;
				&-logo{
					flex: 1;
				}
				&-detail{
					flex: 4;
				}
			}
		}
	}
</style>
