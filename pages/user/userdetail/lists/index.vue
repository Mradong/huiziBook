<template>
	<view>
		<nav-bar fontColor="#000" backState="1000" :home="true" :titleCenter="true" type="fixed" title="项目名"></nav-bar>
		<view class="lists-top">
			<view class="lists-top-title">
				当前{{ huizi_arr.payment_num }}期 | 总{{ huizi_arr.subitems_periods }}期 | {{ huizi_arr.subitems_profit }}元 | {{ huizi_arr.start_time }} 至
				{{ huizi_arr.end_time }}
			</view>
			<view class="lists-top-con">
				<view class="lists-top-con-r">
					<view>
						当前取会预计金额(元)：
						<br />
						{{ anticipated_income }}
					</view>
					<view class="self_m">
						当前收益：
						<br />
						{{earned_surplus}}元
					</view>
				</view>
				<view class="lists-top-con-l">
					当前支出：
					<br />
					{{delivered}}元
				</view>
			</view>
		</view>
		<view v-for="(item, index) in huizi_arr_list" :key="index">
			<view class="lists" v-if="isShow(item)">
				<view class="lists-num">
					第
					<text>{{ item.self_payment_num }}</text>
					期
				</view>
				<view class="lists-detail">
					<view class="lists-detail-y ">{{ item.cost == 0 ? '未缴' : '已缴' }}</view>
					<view class="lists-detail-m ">缴费：{{ item.cost }} 元</view>
					<view class="lists-detail-m " v-if="huizi_arr.subitems_timemodel == '新历'">时间：{{ item.year }}-{{ item.month }}-{{ huizi_arr.subitems_new_onetime }}</view>
					<view class="lists-detail-m " v-if="huizi_arr.subitems_timemodel == '农历'">
						时间：{{ item.year }}年{{ item.month }}月{{ huizi_arr.subitems_old_show_onetime }}
					</view>
				</view>

				<view class="lists-img" @click="changData(huizi_arr.id, item.self_payment_num)"><image src="../../../../static/images/xg.svg" mode=""></image></view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			huizi_arr: {},
			huizi_arr_list: [],
			y: new Date().getFullYear(), // 年
			m: new Date().getMonth() + 1, // 月
			d: new Date().getDate(), // 日,
			anticipated_income:0,
			delivered:0,
			earned_surplus:0,
		};
	},
	onLoad: function(option) {
		//获取具体用户ID，用于查询具体会子
		this.id = option.id.slice(0, 1);
		let tableData = [];
		let delivered = 0;
		uni.getStorage({
			key: this.id + '_key',
			success: res => {
				for (let i = 0; i < res.data.self_huzi.length; i++) {
					if (res.data.self_huzi[i].id == option.id) {
						let payment_num = Number(res.data.self_huzi[i].payment_num);
						let subitems_profit = Number(res.data.self_huzi[i].subitems_profit);
						let subitems_periods = Number(res.data.self_huzi[i].subitems_periods);
						let cost = res.data.self_huzi[i].huizi_arr[payment_num-1].cost;
						
						this.anticipated_income = payment_num * subitems_profit + (subitems_periods - payment_num) * cost;
						
						for( let j = 0; j < payment_num;j++){
							delivered += Number( res.data.self_huzi[i].huizi_arr[j].cost ) ;
						}
						
						
						this.delivered = delivered ;
						this.earned_surplus = payment_num * subitems_profit - delivered;
						this.huizi_arr = res.data.self_huzi[i];
						this.huizi_arr_list = res.data.self_huzi[i].huizi_arr.reverse();
					}
				}
			}
		});
	},
	methods: {
		changData(id, num) {
			uni.navigateTo({
				//唯一ID值传入userdetail页面
				url: '/pages/user/userdetail/changehuizidetail/index?id=' + id + '&num=' + num,
				animationType: 'pop-in',
				animationDuration: 200
			});
		},
		isShow(data) {
			console.log('11');
			let isShow = new Date(this.y + '/' + this.m + '/01').getTime() >= new Date(data.year + '/' + data.month + '/01').getTime() ? true : false;
			return isShow;
		}
	}
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
		font-size: 24upx;

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
				font-size: 24upx;
				padding-top: 25upx;
			}
		}

		&-l {
			flex: 1;
			font-size: 24upx;
		}
	}
}

.lists {
	display: flex;
	height: 100upx;
	border-bottom: 1px solid #c8c7cc;
	margin-bottom: 15upx;

	&-num {
		flex: 3;
		color: rgba(56, 56, 56, 1);
		font-size: 28upx;
		line-height: 100upx;
		text-align: center;

		text {
			color: rgba(56, 56, 56, 1);
			font-size: 48upx;
		}
	}

	&-detail {
		flex: 7;
		color: rgba(56, 56, 56, 1);
		font-size: 28upx;
		line-height: 150%;
		text-align: left;

		&-y {
			float: left;
			width: 80upx;
			height: 80upx;
			border: 1px solid #dd524d;
			transform: rotate(-50deg);
			border-radius: 50%;
			text-align: center;
			line-height: 80upx;
			background-color: #dd524d;
			color: #ffffff;
			margin-right: 20upx;
			font-size: 38upx;
			filter: alpha(opacity=60);
			/* CSS3 standard */
			opacity: 0.6;
		}

		&-m {
		}
	}

	&-img {
		width: 50upx;
		height: 50upx;
		position: relative;
		top: 18upx;
		left: -24upx;

		image {
			width: 100%;
			height: 100%;
		}
	}
}
</style>
