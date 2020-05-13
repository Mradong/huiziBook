<template>
	<view class="content">
		<view class="custom-area" v-for="( item,index ) in tableData" :key="index" >
			
			<view class="tc thead">
				<view class="tc-r" >编码：{{item.id}}</view>
				<view class="tc-l" >未取</view>
			</view>
			<view class="td">
				<view class="td-r" >
					<view class="" >
						每月缴费时间：{{ item.subitems_timemodel == '新历'? item.subitems_new_onetime +'号': item.subitems_old_show_onetime}}
					</view>
					<view class="" >
						开始时间：{{item.start_time}}
					</view>
					<view class="" >
						结束时间：{{item.end_time}}
					</view>

				</view>
				<view class="td-l" >
					<view class="" >
						已缴费期数：{{item.payment_num}}期
					</view>
					<view class="" >
						已缴费金额：{{item.delivered}}
					</view>
					<view class="" >
						已收益金额：{{item.earned_surplus}}
					</view>
				</view>
			</view>
			<view class="tf">
				<view class="tf-r">
					项目名：{{item.subitems_name}}
				</view>
				<view class="tf-l">
					<button type="default" class="tf-button" @click="toLists(item.id)">查看详情</button>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			tableData:{
				type:Array,
				default () {
					return []
				}
			},
		},
		data() {
			return {
				delivered:0,
			};
		},
		methods:{
			toLists( id ){
				uni.navigateTo({
					//唯一ID值传入userdetail页面
					url: '/pages/user/userdetail/lists/index?id=' + id,
					animationType: 'pop-in',
					animationDuration: 200,
				});
			}
		}
	}
</script>

<style lang="scss">
	.content{
		margin-bottom: 150upx;
	}
	.custom-area{
		width: 95%;
		
		margin: 30upx auto;
		color: rgba(80, 80, 80, 1);
		background-color: rgba(255, 255, 255, 1);
		font-size: 14px;
		line-height: 150%;
		text-align: center;
		.tc,.td, .tf{
			width: 100%;
			height: 60upx;
			color: rgba(166, 166, 166, 1);
			font-size: 13px;
			line-height: 60upx;
			border: 1px solid rgba(242, 242, 242, 1);
			display: flex;
			padding: 0 30upx;
			box-sizing: border-box;
			&-r{
				flex:2;
				text-align: left;
				
			}
			&-l{
				flex:1;
				text-align: right;
				
			}
		}
		.td{
			height: 200upx;
			&-r{
				flex:1;
				text-align: left;
				
			}
			&-l{
				flex:1;
				text-align: left;
				
			}
		}
		.tf{
			height: 80upx;
			&-r{
				flex:2;
				text-align: left;
				
			}
			&-l{
				flex:1;
				text-align: right;
				
				.tf-button{
					margin-top: 12upx;
					width: 200upx;
					height: 56upx;
					color: rgba(144, 192, 239, 1);
					box-shadow: rgba(144, 192, 239, 1) solid 1px;
					border-radius: 4px;
					font-size: 13px;
					line-height: 56upx;
					text-align: center;
				}
			}
		}
	}

		
	
</style>
