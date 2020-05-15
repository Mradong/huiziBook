<template>
	<view class="login">
		<nav-bar fontColor="#000" backState="1000" :home='true' :titleCenter="true" type="fixed" title="登录">
		</nav-bar>
		<view class="login-top">
			<image src="../../../static/images/ic_launcher.png" mode=""></image>
		</view>
		<view class="login-button">
			<button type="primary" class="wx_login" open-type="getUserInfo" lang="zh_CN" @getuserinfo="appLoginWx" >微信一键登录</button>
			<button type="default" class="wx_login" >手机验证码登录</button>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
			}
		},
		onLoad: function() {
		},
		methods:{
            appLoginWx(){
                // #ifdef MP-WEIXIN
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
                    //#endif
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
		width: 90%;
		margin: 0 auto;
		button{
			margin: 20upx 0;
		}
	}
</style>
