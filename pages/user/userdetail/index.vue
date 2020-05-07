<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home='true' :titleCenter="true" type="fixed" :title="title">
		</nav-bar>
		<view class="user-message">
			<view class="user-message-l">
				<view class="user-message-l-top">
					{{ uesr_huizi_data.name }} | {{ uesr_huizi_data.phone }}
				</view>
				<view class="user-message-l-con">
					<text>预计总收入（元）</text>
					<view>
						11500000.00
					</view>
				</view>
			</view>
			<view class="user-message-r">
				编辑
			</view>
		</view>
		<view v-if=" isHaveHuizi">
			<m-table :theadData='theadData' :tableData="tableData"/>
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
				theadData:[{name:'会子名称'},{name:'上期收益'},{name:'总收益'}],
				tableData:[],
			}
		},
		onLoad: function(option) {
			//获取具体用户ID，用于查询具体会子
			this.id = option.id;
			let tableData =[];
			uni.getStorage({
			    key: this.id + '_key',
			    success:( res ) => {
			       this.isHaveHuizi = res.data.self_huzi.length == 0 ? false : true ;
				   this.uesr_huizi_data = {
					   name : res.data.name,
					   phone : res.data.phone,
				   }
				   for(let i = 0 ;  i< res.data.self_huzi.length ;i++){
					   tableData.push({
						   subitems_name:res.data.self_huzi[i].subitems_name,
						   payment:res.data.self_huzi[i].payment_num,
					   })
				   }
				   this.tableData = tableData;
				   
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
			}
		},
	}
</script>

<style lang="less">
	.user-message {
		width: 90%;
		height: 278rpx;
		background-color: #DD524D;
		margin: 15rpx auto 0;
		border-radius: 10rpx;
		display: flex;
		color: #fff;

		&-l {
			flex: 3;
			padding: 20rpx;

			&-top {
				font-size: 16px;
			}

			&-con {
				margin-top: 40rpx;

				text {
					font-size: 16px;
				}

				view {
					margin-top: 5rpx;
					font-size: 24px;
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
