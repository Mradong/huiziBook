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
			<view class="my-login " @click="outLogin" v-if="hasLogin">
				<text>{{ userName }}</text>
				<image class="login-out" src="../../static/images/tuichu.svg" mode=""></image>
			</view>
		</view>
		<view class="my-datas">
			<view class="my-data" @click="!isClick?clicIsLogin():to_self()">
				<view class="my-data-img">
					<image src="../../static/images/gerenziliao.svg" mode=""></image>
				</view>
				<view class="my-data-go">
					<text>个人资料</text>
					<image src="../../static/images/go.svg" mode=""></image>
				</view>
			</view>
			<view class="my-data box-yx-b" @click="!isClick?clicIsLogin():openDataUp()">
				<view class="my-data-img">
					<image src="../../static/images/beifen.svg" mode=""></image>
				</view>
				<view class="my-data-go">
					<text>数据备份</text>
					<image src="../../static/images/go.svg" mode=""></image>
				</view>
			</view>
			<uni-popup ref="data_up_popup" type="center" :maskClick="false">
				<view class="up_popup" style="margin: 0 auto; text-align: center;">
					{{ loadText }}<text @click="outDataUp" v-if=" loadPercent == 100 ">关闭</text>
				</view>
				<load-line loadType="ball" :ballInfo="ballInfo" :loadPercent="loadPercent"></load-line>
			</uni-popup>
		</view>
		
		<view class="my-datas box-yx-t">
			<view class="my-data">
				<view class="my-data-img">
					<image src="../../static/images/bmfk.svg" mode=""></image>
				</view>
				<view class="my-data-go" @click="to_self('/pages/my/personaldata/index')">
					<text>帮助反馈</text>
					<image src="../../static/images/go.svg" mode=""></image>
				</view>
			</view>
		</view>
		
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="error" mode="base" content="确定退出登录" :duration="2000" :before-close="true"
			 @close="close" @confirm="confirm">
			</uni-popup-dialog>
		</uni-popup>
		<uni-popup ref="is_to_login" type="dialog">
			<uni-popup-dialog type="error" mode="base" title="未登录" content="是否前往登录" :duration="2000" :before-close="true"
			 @close="to_login_close" @confirm="to_login_confirm">
			</uni-popup-dialog>
		</uni-popup>
	</view>
	
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
	import LoadLine from '@/components/load-line/load-line.vue'
	import {
		mapState,
		mapMutations,
	
	} from "vuex" 
	export default {
		computed:mapState(['hasLogin','userName','userLogo']),
		data() {
			return {
				content:"确定退出登录",
				isClick:false,
				loadText:"备份中...",
				ballInfo:{ ballType:'center',ballSize:100,waveColor:'#fff',ballPadding:'5px'},
				loadPercent:0,
				loadpercentFnc:null,
			}
		},
		onLoad: function() {
		},
		onShow:function(){
			this.isClick = this.hasLogin;
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
				this.isClick = false;
				done();
			},
			close(done) {
				done();
			},
			clicIsLogin(){
				this.$refs.is_to_login.open();
			},
			to_self( data ){
				uni.navigateTo({
					url: data,
					animationType: 'pop-in',
					animationDuration: 200,
				});
			},
			to_login_confirm(done, value){
				uni.navigateTo({
					url: '/pages/my/login/index',
					animationType: 'pop-in',
					animationDuration: 200,
				});
				done();
			},
			to_login_close( done ){
				done();
			},
			openDataUp(){
				clearInterval( this.loadpercent ) ;
				this.loadPercent = 0 ;
				this.loadText = "备份中..."
				this.$refs.data_up_popup.open();
				this.loadpercentFnc = setInterval( ()=> {
					this.loadPercent += 1 ;
				},50)
			},
			outDataUp(){
				this.$refs.data_up_popup.close();
			}
		},
		components: {
			uniPopup,
			uniPopupDialog,
			LoadLine,
		},
		watch:{
			loadPercent( val ){
				if( val == 100 ){
					clearInterval( this.loadpercentFnc )
					console.log( val )
					this.loadpercentFnc = null ;
					this.loadText = "备份成功！"
				}
			}
		}
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
				top:0;
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
					width: 50upx;
					height: 40upx;
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
		.up_popup{
			    position: relative;
			    top: -20upx;
			    color: #fff;
				text{
					color: #dcdcdc;
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
