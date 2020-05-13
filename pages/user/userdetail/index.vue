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
				编辑
			</view>
		</view>
		<view v-if=" isHaveHuizi">
			<m-table :tableData="tableData"/>
		</view>
		<view class="noData" v-if=" !isHaveHuizi">
			没有查询到相关数据-_-||，请尽快录入
		</view>
		<button type="default" class="create" @click="createHuizi">新建会子</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				id: null,
				isHaveHuizi:false,
				title: '详情',
				uesr_huizi_data:{},
				tableData:[],
				delivered:0,
				earned_surplus:0,
			}
		},
		onLoad: function(option) {
			//获取具体用户ID，用于查询具体会子
			this.id = option.id;
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
		methods:{
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
			}
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
			width: 90rpx;
			height: 48rpx;
			border: 1px solid #fff;
			margin: 20rpx;
			text-align: center;
			line-height: 48rpx;
			border-radius: 10rpx;
			box-shadow: 0 0 3px #C8C7CC;
		}
	}
	.noData{
		margin-top: 400rpx;
		text-align: center;
		color:#555555;
	}
	.create{
		position: fixed;
		bottom: 0;
		width: 100%;
		color: #DD524D;
	}
</style>
