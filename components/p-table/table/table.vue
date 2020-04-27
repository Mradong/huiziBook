<template>
	<view class="content">
		
		<view class="custom-area">
			<view class="flex-box tc thead">
				<view class="item-3"  v-for=" (item,index) in theadData" :key=index >{{ item.name }}</view>
			</view>
			<view class="flex-box table tc" v-for=" (item,index) in tableData" :key=index >
				<view class="item-3"> 
					<view class="">
						{{ item.subitems_name }}
					</view>
					<view class="fbColor">
						已缴纳{{ item.payment }}期
					</view>
				</view>
				<view class="item-3 hsColor">
					+{{ item.subitems_name }}
					<view class="fbColor">
						{{ item.subitems_name }}
					</view>
				</view>
				<view class="item-3 hsColor">
					+{{ item.subitems_name }}
					<view class="fbColor">
						{{ item.subitems_name }}
					</view>
				</view>
			</view>
		</view>
		 <!-- <view class="title">多行合并表格</view>
		<view  class="advance-area">
			<view class="flex-box tc thead">
				<view class="item-3">功率范围(瓦)</view>
				<view class="item-3">金额(元)</view>
				<view class="item-3">分钟</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-3">
					1-100
				</view>
				<view class="item-3">
					<view class="table-flex">
						<view class="item">1</view>
						<view class="item">2</view>
						<view class="item">2</view>
					</view>
				</view>
				<view class="item-3">
					<view class="table-flex">
						<view class="item">1</view>
						<view class="item">2</view>
						<view class="item">2</view>
					</view>
				</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-3">
					1-100
				</view>
				<view class="item-3">
					<view class="table-flex">
						<view class="item">1</view>
						<view class="item">2</view>
						<view class="item">3</view>
					</view>
				</view>
				<view class="item-3">
					<view class="table-flex">
						<view class="item">1</view>
						<view class="item">2</view>
						<view class="item">3</view>
					</view>
				</view>
			</view>
			<view class="flex-box table tc">
				<view class="item-3">
					1-100
				</view>
				<view class="item-3">
					<view class="table-flex">
						<view class="item">1</view>
						<view class="item">2</view>
					</view>
				</view>
				<view class="item-3">
					<view class="table-flex">
						<view class="item">1</view>
						<view class="item">2</view>
					</view>
				</view>
			</view>
		</view>
			 -->
	</view>
</template>

<script>
	export default {
		props: {
			theadData:{
				type:Array,
				default () {
					return []
				}
			},
			tableData:{
				type:Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				
			};
		}
	}
</script>

<style lang="scss">
	.fbColor{
		color: #C8C7CC;
	}
	.hsColor{
		color: #DD524D;
	}
	$color:#e0e0e0;
	.content {
		display: flex;
		flex: 1;
		flex-direction: column;
	}
	
	.flex-box {
		display: flex;
		flex-wrap: wrap;
	}
	
	
	.flex-box>.item-2 {
		flex: 0 0 50%;
	}
	
	.flex-box>.item-3 {
		flex: 0 0 33.3333%;
		text-align:center;
	}
	
	.title{
		margin: 20upx 0;
		color: red;
	}
	//自定义表格
	.custom-area {
		.item-3 {
			font-size: 26upx;
			border-width: 1upx 1upx 0 0;
			padding: 16upx 0;
			box-sizing: border-box;
			text-align: center;
		}
	
		.thead {
			
			margin-top: 20rpx;
			.item-3 {
				font-size: 32rpx;
				font-weight: bold;
				box-sizing: border-box;
			}
		}
		.table {
			border-bottom: 1upx solid $color;
			
			.item-3 {
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}
	}
		
		
		
	//普通表格
	.genaral-area {
		.item-3 {
			font-size: 26upx;
			border: 1upx solid $color;
			border-width: 1upx 1upx 0 0;
			padding: 16upx 0;
			box-sizing: border-box;
			text-align: center;
	
			&:first-child {
				border-left-width: 1upx;
			}
	
			&:last-child {
				border-right-width: 1upx;
			}
		}
	
		.thead {
			.item-3 {
				font-weight: bold;
	
				box-sizing: border-box;
			}
		}
	
		.table {
			&:last-child {
				border-bottom: 1upx solid $color;
			}
	
			.item-3 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}
	}
	
	
	// 多行合并表格
	.advance-area {
		.item-3 {
			font-size: 26upx;
			border: 1upx solid $color;
			border-width: 1upx 1upx 0 0;
			box-sizing: border-box;
			text-align: center;
	
			&:first-child {
				border-left-width: 1upx;
			}
	
			&:last-child {
				border-right-width: 1upx;
			}
		}
	
		.thead {
			.item-3 {
				font-weight: bold;
				padding: 16upx 0;
				box-sizing: border-box;
			}
		}
	
		.table {
			&:last-child {
				border-bottom: 1upx solid $color;
			}
	
			.item-3 {
				display: flex;
				justify-content: center;
				align-items: center;
				box-sizing: border-box;
			}
		}
	
		.table-flex {
			flex: 1;
	
			.item {
				border-bottom: 1upx solid $color;
				padding: 10upx 0;
				box-sizing: border-box;
	
				&:last-child {
					border-width: 0;
				}
			}
		}
	}
</style>
