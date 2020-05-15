<template>
	<view class="">
		<view class="my-top">
			<view class="my-tx">
				<image :src="hasLogin?userLogo :'../../static/images/tx.png' " mode=""></image>
			</view>
			<view class="my-login" @click="toLogin" v-if="!hasLogin">
				<text>立即登录</text>
				<image src="../../static/images/yjiantou.svg" mode=""></image>
			</view>
			<view class="my-login " @click="outLogin" >
				<text>{{ userName }}学习使我快乐</text>
				<image class="login-out" src="../../static/images/tuichu.svg" mode=""></image>
			</view>
		</view>
		<view class="my-datas" @click="isClick&&clicIsLogin()">
			<view class="my-data">
				<view class="my-data-img">
					<image src="../../static/images/grzl.svg" mode=""></image>
				</view>
				<view class="my-data-go">
					<text>个人资料</text>
					<image src="../../static/images/yjiantou.svg" mode=""></image>
				</view>
			</view>
			<view class="my-data">
				<view class="my-data-img">
					<image src="../../static/images/grzl.svg" mode=""></image>
				</view>
				<view class="my-data-go">
					<text>账号安全</text>
					<image src="../../static/images/yjiantou.svg" mode=""></image>
				</view>
			</view>
			<view class="my-data box-yx-b">
				<view class="my-data-img">
					<image src="../../static/images/grzl.svg" mode=""></image>
				</view>
				<view class="my-data-go">
					<text>数据安全</text>
					<image src="../../static/images/yjiantou.svg" mode=""></image>
				</view>
			</view>
		</view>
		<view class="my-datas box-yx-t">
			<view class="my-data">
				<view class="my-data-img">
					<image src="../../static/images/grzl.svg" mode=""></image>
				</view>
				<view class="my-data-go">
					<text>帮助反馈</text>
					<image src="../../static/images/yjiantou.svg" mode=""></image>
				</view>
			</view>
		</view>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="error" mode="base" :content="content" :duration="2000" :before-close="true"
			 @close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
	
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import {
		mapState,
		mapMutations,
	
	} from "vuex" 
	export default {
		computed:mapState(['hasLogin','userName','userLogo']),
		data() {
			return {
				content:"确定退出登录",
				isClick:true,
			}
		},
		onLoad: function() {
		},
		methods:{
			...mapMutations(['logout']),
			toLogin(){
				uni.navigateTo({
					url: '/pages/my/login/index',
					animationType: 'pop-in',
					animationDuration: 200,
				});
			},
			outLogin(){
				this.$refs.popup.open();
			},
			confirm(done, value){
				this.logout();
				uni.setStorageSync('user_isLogin', false); //改变用户登录状态
				let user_code = uni.getStorageSync('wx_userCode');//获取用户code
				uni.removeStorageSync('wx_userCode');
				uni.removeStorageSync(user_code);
				done();
			},
			close(done) {
				done();
			},
			clicIsLogin(){
				if( this.hasLogin ){
					this.isClick = false ;
				}
			}
		},
		components: {
			uniPopup,
			uniPopupDialog
		},
	}
</script>

<style lang="less">
	.my-top{
		width: 100%;
		height: 307rpx;
		background-color:rgba(100, 76, 60, 1);
		display: flex;
		align-items:center ;
		.my-tx{
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			overflow: hidden;
			background-color: #007AFF;
			margin-left: 40upx;
			image{
				width: 100%;
				height:  100%;
			}
		}
		.my-login{
			line-height: 70upx;
			flex: 1;
			margin-left: 20upx;
			position: relative;
			text{
				color: rgba(255, 255, 255, 1);
				font-size: 18px;
				line-height: 150%;
				text-align: left;
			}
			image{
				width: 32upx;
				height:  32upx;
				position: absolute;
				top: 28upx;
				right: 40upx;
			}
			image.login-out {
				width: 68upx;
				height:  68upx;
			}
		}

	}
	.my-datas{
		margin-bottom: 40upx;
		
		.my-data{
			width: 100%;
			height: 100upx;
			border-bottom:1px solid  #d0cfcf ;
			display: flex;
			align-items: center;
			position: relative;
			&-img{
				margin-left: 30upx;
				image{
					width: 40upx;
					height: 28upx;
				}
			}
			&-go{
				flex: 1;
				color: rgba(56, 56, 56, 1);
				font-size: 28upx;
				line-height: 150%;
				text-align: left;
				margin-left: 20upx;
				image{
					width: 28upx;
					height:  28upx;
					position: absolute;
					top: 40upx;
					right: 40upx;
				}
			}
		}
	}		
	.box-yx-b{
		box-shadow: 0 2px 5px  #c3a3a32e;
		border-bottom: none !important;
	}
	.box-yx-t{
		box-shadow: 0 -2px 5px  #c3a3a32e;
	}
</style>
