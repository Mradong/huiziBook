<template>
	<view class="data">
		<nav-bar fontColor="#000" backState="1000" :shadow="true" :home="false" :titleCenter="true" type="fixed" title="数据中心">
			<view class="icon_setUp data-nav-add" slot="right" @click="add" :animation="animationData" v-if="userData.length != 0">
				<image src="../../static/images/jiahao.svg" mode=""></image>
			</view>
		</nav-bar>

		<view class="data-user" v-for="(item, index) in userData" :key="item.id">
			<!-- 基础用法 -->
			<uni-swipe-action>
				<uni-swipe-action-item :options="options" @click="onClick( item.id )" @change="change">
					<view class="data-user-item" @click="toDetail(item.id)">
						<view class="data-user-item-logo">
							<view class="data-user-item-logo-ball">{{ item.self_huzi.length }}</view>
							<image src="../../static/images/tx.png" mode=""></image>
						</view>
						<view class="data-user-item-detail">
							<view class="">项目人：{{ item.name }}</view>
							<view class="">联系电话：{{ item.phone }}</view>
						</view>
					</view>
				</uni-swipe-action-item>
			</uni-swipe-action>
		</view>

		<view v-if="userData.length == 0" class=" none-userData">
			<view class="none-userData-img">
				<image src="../../static/images/kong-item.png" mode=""></image>
				<view class="none-userData-img-text">您的列表有点寂寞</view>
				<view class="none-userData-img-button"><button @click="add">去建一个</button></view>
			</view>
		</view>
	</view>
</template>

<script>
import uniSwipeAction from '@/components/uni-swipe-action/uni-swipe-action.vue';
import uniSwipeActionItem from '@/components/uni-swipe-action-item/uni-swipe-action-item.vue';
import navBar from '@/components/zhouWei-navBar';
import publicFnc from '@/static/js/public.js';
export default {
	data() {
		return {
			animationData: {},
			animation: {},
			userData: [],
			options: [
				{
					text: '取消',
					style: {
						backgroundColor: '#007aff'
					}
				},
				{
					text: '确认',
					style: {
						backgroundColor: '#dd524d'
					}
				}
			]
		};
	},
	methods: {
		butAimation() {
			var animation = uni.createAnimation({
				duration: 150,
				timingFunction: 'ease',
				delay: 0
			});
			this.animation = animation;
			this.animation.opacity('0.1').step();
			this.animation.opacity('1').step();
			this.animationData = this.animation.export();
		},
		add() {
			this.butAimation();
			uni.navigateTo({
				url: '/pages/user/adduser/index',
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		getHuiData() {
			try {
				let keysArray = uni.getStorageSync('huizi_keys');
				let len = keysArray.length;
				let huizi_data = [];
				if (keysArray) {
					for (let i = 0; i < len; i++) {
						uni.getStorage({
							key: i + '_key',
							success: function(res) {
								//huizi_data[i] = res.data;小程序中无法使用！
								huizi_data.push(res.data);
							}
						});
					}
					this.userData = huizi_data;
				}
			} catch (e) {
				// error
			}
		},
		toDetail(id) {
			uni.navigateTo({
				//唯一ID值传入userdetail页面
				url: '/pages/user/userdetail/index?id=' + id,
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		onClick(id ) {
			publicFnc.customFnc.remove(id);
			uni.switchTab({
				url: '/pages/user/index?id',
				success: function(e) {
					var page = getCurrentPages().pop();
					if (page == undefined || page == null) return;
					if( page.hasOwnProperty('onLoad') ){
						page.onLoad();
					}else{
						location.reload();
						
					}
					
				}
			});
		},
		change(open) {
			console.log('当前开启状态：' + open);
		}
	},
	onShow() {
		this.getHuiData();
	},
	components: {
		navBar
	}
};
</script>

<style lang="less">
.data {
	&-nav {
		height: 120rpx;
		line-height: 120rpx;
		border-bottom: 1px #c0c0c0;
		box-shadow: 0 5px 5px #f1f1f1;
		text-align: center;
		position: relative;

		&-add {
			margin-right: 10px;
			width: 60rpx;
			text-align: center;
			font-size: 28px;
			background-color: #ffffff;
		}
	}

	&-user {
		&-item {
			display: flex;
			height: 140rpx;
			flex: 1;
			border-bottom: 1px solid #c0c0c0;

			&-logo {
				flex: 1;
				text-align: center;
				position: relative;

				&-ball {
					width: 50rpx;
					height: 50rpx;
					text-align: center;
					line-height: 40rpx;
					background-color: red;
					position: absolute;
					right: 15rpx;
					top: 15rpx;
					border-radius: 50%;
					z-index: 9;
					color: #fff;
				}

				image {
					margin-top: 20rpx;
					border-radius: 50%;
					width: 100rpx;
					height: 100rpx;
				}
			}

			&-detail {
				flex: 4;
				padding-left: 50upx;
				line-height: 70upx;

				view {
					height: 50%;
					color: rgba(56, 56, 56, 1);
					font-size: 14px;
				}
			}
		}
	}
}

.icon_setUp {
	image {
		width: 35upx;
		height: 35upx;
		position: relative;
		top: -10upx;
	}
}

.none-userData {
	display: flex;
	flex-direction: column;
	text-align: center;

	&-img {
		width: 320upx;
		height: 320upx;
		position: absolute;
		top: 50%;
		right: 50%;
		margin-top: -160upx;
		margin-right: -160upx;

		image {
			width: 120upx;
			height: 120upx;
		}

		&-text {
			color: rgba(166, 166, 166, 1);
			font-size: 13px;
		}

		&-button {
			button {
				width: 100%;
				height: 100%;
				font-size: 24upx;
				color: #a6a6a6;
			}
			width: 160upx;
			height: 60upx;
			margin: 20upx auto;
		}
	}
}
</style>
