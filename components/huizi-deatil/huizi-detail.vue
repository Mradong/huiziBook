<template>
	<view class="huizi">
		<view class="huizi-none" v-if=" isHaveDaata">
			<view class="message">Good,您今天没有新增缴费记录<br>请继续保持</view>
		</view>
		<view class="huizi-data" v-if=" !isHaveDaata">
			<view class="huizi-data-items">
				<view class="huizi-data-items-item">
					
				</view>
				<view class="huizi-data-items-item-r">
					$450.00
				</view>
				<view class="huizi-data-items-item-r">
					
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				isHaveDaata:false,
			};
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
			flex-direction: row;
			align-items:center ;
			.message{
				flex: 1;
				text-align: center;
			}
		}
		&-data{
			&-items{
				height: 121rpx;
				position: relative;
				// box-shadow: 0 0 10px #808080;
				margin: 5rpx;
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
					height: 90rpx;
					width: 95%;
					&-r{
						
					}
					&-l{
						
					}
				}

			}
		}
	}

</style>
