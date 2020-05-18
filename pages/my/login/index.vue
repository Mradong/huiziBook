<template>
	<view class="login">
		<nav-bar fontColor="#000" backState="1000" :home='true' :titleCenter="true" type="fixed" title="登录">
		</nav-bar>
		<view class="login-top">
			<image src="../../../static/images/ic_launcher.png" mode=""></image>
		</view>
		<view class="login-button">
			<!-- #ifdef MP-WEIXIN -->
			<button type="primary" class="wx_login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx" >微信一键登录</button>
			<!-- #endif -->
			
			<!-- #ifdef H5 || APP-PLUS -->
				(ps:抱歉因为某些问题，暂不开放H5登录功能,将在下个版本开放。您可以使用小程序，进行账号登录~)
				<view class="form">
					<view class="form-row">
						<input type="text" maxlength="11" v-model="data1" placeholder="请输入手机号" class="form-row-input " />
					</view>
					<view class="form-row">
						<input type="text" maxlength="11" v-model="data1" placeholder="请输入密码" class="form-row-input " />
					</view>
					
					<button type="warn" class="login-succes" @click="createHuizi">完成</button>
					<view class="forget">忘记密码?</view>
					<view class="seperator">或者</view>
					<view href="/login/wechat" class="hollow-btn no-icon wechat-btn">微信登录</view>
				</view>
			<!-- #endif -->
			
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				data1:'',
			}
		},
		onLoad: function() {
		},
		methods:{
            appLoginWx(){
                
                    uni.getProvider({
                      service: 'oauth',
                      success: function (res) {
                        if (~res.provider.indexOf('weixin')) {
                            uni.login({
                                provider: 'weixin',
                                success: (res) => {
                                    uni.getUserInfo({
                                        provider: 'weixin',
                                        success: (info) => {//这里请求接口
                                            console.log(res);
                                            console.log(info);
											uni.setStorageSync('wx_userCode', res.code); //创建用户唯一code
											uni.setStorageSync(res.code, info); //创建用户数据
											uni.setStorageSync('user_isLogin', true); //改变用户登录状态
											uni.switchTab({
												url: '/pages/index/index',
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
                                        fail: () => {
                                            uni.showToast({title:"微信登录授权失败",icon:"none"});
                                        }
                                    })
                            
                                },
                                fail: () => {
                                    uni.showToast({title:"微信登录授权失败",icon:"none"});
                                }
                            })
                            
                        }else{
                            uni.showToast({
                                title: '请先安装微信或升级版本',
                                icon:"none"
                            });
                        }
                      }
                    });
            }

		},
	}
</script>

<style lang="less">
	.login-top{
		height: 400upx;
		position: relative;
		image{
			width: 180upx;
			height: 180upx;
			position: absolute;
			top: 50%;
			right: 50%;
			transform: translate(50%,-50%);
		}
	}
	.login-button{
		width: 85%;
		margin: 0 auto;
		button{
			margin: 20upx 0;
		}
		.form {
			.form-row {
				display: flex;
				padding: 10upx 20upx;
				&-input {
					flex: 2;
					border-radius: 8upx;
					box-shadow: 0 2upx 2upx rgba(0,0,0,.3) inset, 0 2upx 0 rgba(255,255,255,.2);
					background: rgba(37, 33, 33, 0.01);
					color:#1b1818;
					text-shadow: 0 0 2upx rgba(0,0,0,.4);
					position: relative;
					border: 2upx solid #eee;
					box-sizing: border-box;
					width: 100%;
					height: 100%;
					line-height: 60upx;
					padding: 20upx 40upx;
				}
		
			}
			.login-succes{
				margin: 20upx auto;
				width: 94%;
			}
			.forget{
				font-size: 28upx;
				color: #797373;
				text-align: center;
				text-decoration: underline;
				display: block;
				margin-top: 30upx;
			}
			.seperator{
				font-size: 28upx;
				text-align: center;
				margin-top: 40upx;
				position: relative;
				opacity: .7;

				&::after, &::before {
				    content: '';
				    position: absolute;
				    top: 10px;
				    width: 240upx;
				    height: 2upx;
				    background: #a5a4a4;
				}
				&::after{
					right: 0;
				}
				&::before{
					left: 0;
				}
			}
			.wechat-btn {
			    position: relative;
			    color: #3eb74f;
			    border: 1px solid #3eb74f;
			    text-indent: 40upx;
			}
			.hollow-btn {
			    opacity: .6;
			    transition: opacity .3s;
			    margin-top: 40upx;
			}
			.hollow-btn.no-icon {
			    text-align: center;
			}
			.wechat-btn:before {
			    content: '';
			    position: absolute;
			    top: 20upx;
			    left: 150upx;
			    background-image: url(https://img.xiaopiu.com/images/images-abb0efe34b.png);
			    background-position: -822px -296px;
			    width: 64upx;
			    height: 64upx;
			}
			.base-btn, .hollow-btn {
			    width: 100%;
			    box-sizing: border-box;
			    height: 100upx;
			    line-height: 100upx;
			    font-size: 32upx;
			    margin-top: 50upx;
			}
			.hollow-btn:hover {
			    opacity: 1;
				background: #f5faf5d4;
			}
		}
	}

</style>
