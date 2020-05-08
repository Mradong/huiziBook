<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="项目名"></nav-bar>
		<view class="lists-top">
			<view class="lists-top-title">
				当前{{ huizi_arr.payment_num }}期 | 总{{ huizi_arr.subitems_periods }}期 | {{ huizi_arr.subitems_profit }}元 | {{ huizi_arr.start_time }} 至 {{ huizi_arr.end_time }}
			</view>
			<view class="lists-top-con">
				<view class="lists-top-con-r">
					<view>
						当前可获取金额(元)：
						<br />
						00.00
					</view>
					<view class="self_m">
						当前总回报：
						<br />
						00.00
					</view>
				</view>
				<view class="lists-top-con-l">
					当前总投入：
					<br />
					00.00
				</view>
			</view>
		</view>
		<view class="lists">
			<view class="lists-list" v-for="(item,index) in reverseData">
				<view class="lists-list-item">
					{{ item.year}}-{{ item.month}}-{{ item.day}}
					<br />
					<text>第{{ item.self_payment_num}}期</text>
				</view>
				<view class="lists-list-item">
					<view class="red">+{{ item.cost}}</view>
					<text>活期</text>
				</view>
				<view class="lists-list-item">
					<view class="red">+{{ huizi_arr.subitems_profit }}</view>
					<text>死期</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			huizi_arr: {}
		};
	},
	computed: {
		reverseData() {
			return this.huizi_arr.huizi_arr.reverse();
		}
	},
	onLoad: function(option) {
		//获取具体用户ID，用于查询具体会子
		this.id = option.id.slice(0, 1);
		let tableData = [];
		uni.getStorage({
			key: this.id + '_key',
			success: res => {
				for (let i = 0; i < res.data.self_huzi.length; i++) {
					if (res.data.self_huzi[i].id == option.id) {
						this.huizi_arr = res.data.self_huzi[i];
					}
				}
			}
		});
	},
	methods: {}
};
</script>

<style lang="less">
.red {
	color: red;
}
.lists-top {
	width: 721upx;
	height: 308upx;
	background-color: #eb6869;
	margin: 20upx auto;
	padding: 25upx;
	box-sizing: border-box;
	color: #fff;
	position: relative;
	&-title {
		font-size: 14upx;
		&::before {
			content: '';
			display: block;
			width: 0;
			height: 0;
			border-left: 1upx solid transparent;
			border-right: 54upx solid transparent;
			border-bottom: 60upx solid #00a1ff;
			transform: rotate(180deg);
			position: absolute;
			top: 0;
			right: -2upx;
		}
	}
	&-con {
		margin-top: 20upx;
		display: flex;
		align-items: flex-end;
		&-r {
			flex: 3;
			.self_m {
				font-size: 12upx;
				padding-top: 25upx;
			}
		}
		&-l {
			flex: 1;
			font-size: 12upx;
		}
	}
}
.lists {
	&-list {
		display: flex;
		width: 721upx;
		margin: 20upx auto;
		border-bottom: 1upx solid #c8c7cc;
		font-size: 28upx;
		line-height: 60upx;
		&-item {
			flex: 1;
			text-align: center;
			text {
				color: #999999;
			}
		}
	}
}
</style>
