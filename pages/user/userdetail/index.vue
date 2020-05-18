<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home='true' :titleCenter="true" type="fixed" :title="title">
		</nav-bar>
		<view class="user-message">
			<view class="user-message-l">
				<view class="user-message-l-top">
					{{ uesr_huizi_data.name }} | {{ uesr_huizi_data.phone }} | {{ tableData.length }}名
				</view>
				<view class="user-message-l-con">
					<text>已支付(元)</text>
					<view>
						{{delivered }}
					</view>
				</view>
				<view class="">
					<text>目前收益:{{ earned_surplus }}元</text>
				</view>
			</view>
			<view class="user-message-r">
				<button size="mini" @click="toChange">编辑</button>
			</view>
		</view>
		<view v-if=" isHaveHuizi">
			<m-table :tableData="tableData"/>
		</view>
		<view class="noData" v-if=" !isHaveHuizi">
			<image src="../../../static/images/nodata.svg" mode=""></image>
			<view class="noData-hint">
				<view class="noData-text">
					您的数据空荡荡的
				</view>
				<view class="none-userData-img-button"><button @click="createHuizi">去建一个</button></view>
			</view>
		</view>
		<button type="default" class="create" @click="createHuizi"  v-if=" isHaveHuizi">新建会子</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				id: null,
				isHaveHuizi:false,
				title: '会子详情',
				uesr_huizi_data:{},
				tableData:[],
				delivered:0,
				earned_surplus:0,
			}
		},
		onLoad: function(option) {
			//获取具体用户ID，用于查询具体会子
			this.id = option.id;
		},
		onShow( ){
			this.initHuizi();
		},
		methods:{
			initHuizi(){
				uni.getStorage({
				    key: this.id + '_key',
				    success:( res ) => {
				       this.isHaveHuizi = res.data.self_huzi.length == 0 ? false : true ;
					   this.uesr_huizi_data = {
						   name : res.data.name,
						   phone : res.data.phone,
					   }
					 
					   this.tableData = res.data.self_huzi;
					   this.getDelivered( this.tableData );
				    }
				});
			},
			createHuizi(){
				uni.navigateTo({
					url: '/pages/user/createhuizi/index?id='+ this.id,
					animationType: 'pop-in',
					animationDuration: 200,
				});
			},
			getDelivered( data ){
				let len = data.length;
				let delivered = 0 ;
				let earned_surplus = 0;
				for( let i = 0 ;i <len ;i++){
					delivered += data[i].delivered;
					earned_surplus += data[i].earned_surplus;
				}
				this.delivered= delivered;
				this.earned_surplus= earned_surplus;
			},
			toChange(){
				uni.navigateTo({
					url: "/pages/user/userdetail/changeUser/index?id="+ this.id,
					animationType: 'pop-in',
					animationDuration: 200,
				});
			},
		},
	}
</script>

<style lang="less">
	.user-message {
		width: 94%;
		height: 278rpx;
		background-color: #DD524D;
		margin: 15rpx auto 0;
		border-radius: 10rpx;
		display: flex;
		color: #fff;
		font-size: 26upx;
		&-l {
			flex: 3;
			padding: 20upx;
			&-top {
				font-size: 32upx;
			}
			&-con {
				margin-top: 40upx;
				text {
					font-size: 26upx;
				}
				view {
					margin: 12upx 0;
					font-size: 50upx;
				}
			}
			
		}

		&-r {
			flex: 1;
			margin: 20upx;
		}
	}
	.noData{
		margin-top: 300rpx;
		text-align: center;
		color:#555555;
		image{
			width: 80upx;
			height: 80upx;
		}
		&-hint{
			line-height: 100upx;
			height: 100upx;
			.noData-text{
				    color: #808080;
				    font-size: 26upx;
				    text-align: center;
			}
			.none-userData-img-button {
				button {
					width: 100%;
					height: 100%;
					font-size: 24upx;
					color: #a6a6a6;
				}
				width: 160upx;
				height: 60upx;
				margin: 0 auto;
			}
		}

	}
	.create{
		position: fixed;
		bottom: 0;
		width: 100%;
		color: #DD524D;
	}
</style>
