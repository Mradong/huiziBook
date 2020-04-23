<template>
	<view class="data">
		<nav-bar fontColor="#000" backState="1000" :shadow='true' :home='false' :titleCenter="true" type="fixed" title="数据中心">
			<view class="icon_setUp data-nav-add" slot="right" @click="add" :animation="animationData">+</view>
		</nav-bar>

		<view class="data-user" v-for=" (item,index) in userData" :key=item.id>
			<view class="data-user-item" @click="toDetail(item.id)">
				<view class="data-user-item-logo">
					<view class="data-user-item-logo-ball">
						{{ item.selfHuzi.length + 1 }}
					</view>
					<image src="../../static/logo.png" mode=""></image>
				</view>
				<view class="data-user-item-detail">
					<text>{{ item.name }}</text>
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import navBar from "@/components/zhouWei-navBar";
	export default {
		data() {
			return {
				animationData: {},
				animation: {},
				userData: []
			}
		},
		methods: {
			butAimation() {
				var animation = uni.createAnimation({
					duration: 150,
					timingFunction: "ease",
					delay: 0
				})
				this.animation = animation
				this.animation.opacity('0.1').step()
				this.animation.opacity('1').step()
				this.animationData = this.animation.export()
			},
			add() {
				this.butAimation();
				uni.navigateTo({
					url: '/pages/user/adduser/index',
					animationType: 'pop-in',
					animationDuration: 200,
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
					animationDuration: 200,
				});
			}
		},
		onShow() {
			this.getHuiData();
		},
		components: {
			navBar
		}
	}
</script>

<style lang="less">
	.data {
		&-nav {
			height: 120rpx;
			line-height: 120rpx;
			border-bottom: 1px #C0C0C0;
			box-shadow: 0 5px 5px #F1F1F1;
			text-align: center;
			position: relative;

			&-add {
				margin-right: 10px;
				width: 60rpx;
				text-align: center;
				font-size: 28px;
				background-color: #FFFFFF;
			}
		}

		&-user {
			&-item:first-child {
				border-bottom: 0;
			}

			&-item {
				display: flex;
				height: 140rpx;
				line-height: 140rpx;
				border-top: 1px solid #C0C0C0;
				border-bottom: 1px solid #C0C0C0;

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
				}
			}
		}
	}
</style>
