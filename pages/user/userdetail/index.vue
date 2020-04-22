<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home='false' :titleCenter="true" type="fixed" :title="title">
		</nav-bar>
		<view class="user-message">
			<view class="user-message-l">
				<view class="user-message-l-top">
					娃哈哈 | 12345678
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
		<view>
			<m-table :theadData='theadData' :tableData="tableData"/>
		</view>
	</view>

</template>

<script>


	export default {
		data() {
			return {
				id: null,
				title: '详情',
				theadData:[{
					name:'会子名称'
				},{
					name:'会子名称'
				},{
					name:'会子名称'
				}],
				tableData:[{
					name:'会子名称',
					upYield:2000,
					sumYield:200000
				},
				{
					name:'会子名称',
					upYield:2000,
					sumYield:200000
				},
				{
					name:'会子名称',
					upYield:2000,
					sumYield:200000
				},{
					name:'会子名称',
					upYield:2000,
					sumYield:200000
				}]
			}
		},
		onLoad: function(option) {
			this.id = option.id;

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
</style>
