<template>
	<view class="huizi">
		<view class="huizi-none" v-if="isHaveData">
			<view class="huizi-none-img"><image src="../../static/images/wujilu.svg" mode=""></image></view>
			<view class="message">暂无缴费记录</view>
		</view>
		<view class="huizi-data" v-if=" !isHaveData">
			
			<view class="huizi-data-items"  v-for=" (item,index) in huiziData" :key="index">
				<view class="huizi-data-items-item" @click="changData(item.id,item.huizi_arr[0].self_payment_num)">
					<view class="huizi-data-items-item-r">
						<view class="">
							编号:{{ item.id}}
						</view>
						<view class="">
							项目名：{{ item.subitems_name}}
						</view>
						<view class="">
							支出（元）：{{ item.huizi_arr[0].cost == 0 ?'今日尚未缴费':item.huizi_arr[0].cost}}
						</view>
						<view class="">
							当前期数(期)/总期数(期)：{{ item.huizi_arr[0].self_payment_num}} / {{ item.subitems_periods}}
						</view>

					</view>
					<view class="huizi-data-items-item-l">
						<image :src="item.huizi_arr[0].cost != 0 ?'../../static/images/yizhifu.svg':'../../static/images/weizhifu.svg'" mode=""></image>
					</view>
				</view>
			</view>
		
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			// 本月或者本日会子详情
			huiziData: {
				type: Array,
				default: () => []
			},
		},
		data() {
			return {
				isHaveData:false,
			};
		},
		mounted(){
			this.isHaveData =  this.huiziData.length == 0? true:false;
		},
		methods:{
			changData( id, num){
				uni.navigateTo({
					//唯一ID值传入userdetail页面
					url: '/pages/user/userdetail/changehuizidetail/index?id=' + id +'&num='+ num,
					animationType: 'pop-in',
					animationDuration: 200,
				});
			}
		},
		watch:{
			huiziData( newdata ){
				this.isHaveData =  newdata.length == 0? true:false;
			}
			
		}
	}
</script>

<style lang="less">
	.huizi{
		height:  100%;
		display:  flex;
		flex-direction:  column;
		&-none{
			flex-grow:1;
			-webkit-flex-grow:1;
			color: #000;
			display: flex;
			flex-direction: column;
			align-items:center ;
			box-sizing: content-box;
			padding-top: 150rpx;
			&-img{
				margin: 0 auto;
				
				image{
					width: 90upx;
					height: 110upx;
				}
			}
			.message{
				color: rgba(128, 128, 128, 1);
				font-size: 26upx;
				text-align: center;
			}
		}
		&-data{
			&-items{
				height: 300rpx;
				position: relative;
				// box-shadow: 0 0 10px #808080;
				
				&::before{
					content: '';
					display: block;
					width: 15rpx;
					height: 15rpx;
					z-index: 9;
					border-radius: 50%;
					background-color: red;
					position: absolute;
					top: 50%;
					left: 3px;
					margin-top: -8rpx;
				}
				&::after{
					content: '';
					display: block;
					width: 4rpx;
					height: 100%;
					background-color: #CCCCCC;
					position: absolute;
					top: 0;
					left: 6px;
				}
				&-item{
					height: 80%;
					width: 90%;
					background-color: #ea6566;
					margin: 0 auto ;
					position: relative;
					top: 15%;
					box-shadow: 0 0  5px #555555;
					border-radius: 5px;
					-webkit-box-sizing: border-box;
					-moz-box-sizing: border-box;
					box-sizing: border-box;
					padding: 10px;
					display: flex;
					
					&-r{
						font-size: 14px;
						flex:4;
						view{
							margin: 10rpx;
						}
					}
					&-l{
						color: #FFFFFF;
						text-align: center;
						width: 120upx;
						height: 120upx;
						line-height: 120upx;
						text-align: center;
						image{
							width: 100%;
							height: 100%;
						}
					}
				}

			}
		}
	}

</style>
