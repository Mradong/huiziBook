<template>
	<view>
		<nav-bar fontColor="#000" backState="1000" :home="true" :titleCenter="true" type="fixed" title="项目名"></nav-bar>
		<view class="lists-top">
			<view class="lists-top-title">
				当前{{ huizi_arr.payment_num }}期 | 总{{ huizi_arr.subitems_periods }}期 | {{ huizi_arr.subitems_profit }}元 | {{ huizi_arr.start_time }}
				至
				{{ huizi_arr.end_time }}
			</view>
			<view class="lists-top-con">
				<view class="lists-top-con-r">
					<view>
						取会预计金额(元)：
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
			<view class="lists" v-if="isShow(item,index)">
				<view class="lists-num">
					第
					<text>{{ item.self_payment_num }}</text>
					期
				</view>
				<view class="lists-detail">
					<view class="lists-detail-y" v-if="!item.today_isfull">{{ item.cost == 0 && !item.today_isfull? '未缴' : '已缴' }}</view>
					<view class="lists-detail-y" v-if="item.today_isfull">取会</view>
					<view class="lists-detail-m ">缴费：{{ item.cost }} 元</view>
					<view class="lists-detail-m " v-if="huizi_arr.subitems_timemodel == '新历'">时间：{{ item.year }}-{{ item.month }}-{{ huizi_arr.subitems_new_onetime }}</view>
					<view class="lists-detail-m " v-if="huizi_arr.subitems_timemodel == '农历'">
						时间：{{ item.year }}年{{ item.month }}月{{ huizi_arr.subitems_old_show_onetime }}
					</view>
				</view>

				<view class="lists-img" @click="changData(huizi_arr.id, item.self_payment_num)">
					<image src="../../../../static/images/xg.svg" mode=""></image>
				</view>
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
				anticipated_income: 0,
				delivered: 0,
				earned_surplus: 0,
				crru_index: 0,
			};
		},
		onLoad: function(option) {
			//获取具体用户ID，用于查询具体会子
			this.id = option.id.slice(0, 1);
			let tableData = [];
			let delivered = 0;
			let full_num = 0;
			let full_num_money = 0;
			let death_money = 0;
			let current_num = 0;
			uni.getStorage({
				key: this.id + '_key',
				success: res => {
					for (let i = 0; i < res.data.self_huzi.length; i++) {
						if (res.data.self_huzi[i].id == option.id) {

							let data_arr = res.data.self_huzi[i];
							let payment_num = Number(data_arr.payment_num); //当前已缴期数（可能存在缴费时间已过，但未缴费情况）
							let subitems_profit = Number(data_arr.subitems_profit); //死会金额
							let subitems_periods = Number(data_arr.subitems_periods); //总期数
							let cost = 0;

							let len = data_arr.huizi_arr.length;
							for (let j = 0; j < len; j++) {
								if (new Date(this.y + '/' + this.m + '/01').getTime() == new Date(data_arr.huizi_arr[j].year + '/' +
										data_arr.huizi_arr[j].month + '/01').getTime()) {
									current_num = data_arr.huizi_arr[j].self_payment_num;
									cost = data_arr.huizi_arr[payment_num - 1].cost == 0 ? data_arr.huizi_arr[payment_num - 2].cost : data_arr
										.huizi_arr[payment_num - 1].cost; //当前的上一期缴费
									break;
								}
							}

							if (data_arr.isfull) {
								for (let j = 0; j < current_num - 1; j++) {
									if (data_arr.huizi_arr[j].today_isfull) {
										full_num = data_arr.huizi_arr[j].self_payment_num ;
										full_num_money  = data_arr.huizi_arr[j].cost ;
										break;
									}
									death_money += Number(data_arr.huizi_arr[j].cost) ;
								}
								//当前获益的公式( full_num -1 ) * 死会金额 - death_money  +  (已交期数- 取会期 ) * full_num_money - (已交期数- 取会期 ) * 死会金额
								
								this.earned_surplus = ( full_num -1 ) * subitems_profit - death_money + (current_num - full_num ) * ( full_num_money - subitems_profit)
								console.log( this.earned_surplus )
								this.huizi_arr = res.data.self_huzi[i];
								console.log(this.huizi_arr)
								this.huizi_arr_list = res.data.self_huzi[i].huizi_arr.reverse();
								return;
							}


							// if (res.data.self_huzi[i].id == option.id) {
							// 	//获取总缴纳金额
							// 	for( let j = 0; j < curr_index ;j++){
							// 		delivered += Number( res.data.self_huzi[i].huizi_arr[j].cost ) ;

							// 	}
							// 	console.log( option.curr_index)
							// 	if( res.data.self_huzi[i].isfull){
							// 		for( let j = 0; j < death_money;j++){
							// 			death_money += Number( res.data.self_huzi[i].huizi_arr[j].cost ) ;//到取会期时的缴费总金额
							// 			if(res.data.self_huzi[i].huizi_arr[j].today_isfull){
							// 				full_num = Number( res.data.self_huzi[i].huizi_arr[j].self_payment_num );
							// 				full_num_money = Number( res.data.self_huzi[i].huizi_arr[j].cost );
							// 				break;
							// 			}
							// 		}
							// 		death_money = death_money - Number( res.data.self_huzi[i].huizi_arr[full_num-1].cost ) ;
							// 		//当前获益的公式( full_num -1 ) * 死会金额 - death_money  +  (已交期数- 取会期 ) * full_num_money - (已交期数- 取会期 ) * 死会金额
							// 		this.earned_surplus =
							// 		( ( full_num -1 ) * subitems_profit - death_money ) + ( ( curr_index - full_num ) * full_num_money - ( curr_index - full_num ) * subitems_profit );
							// 		//预测取会时候 所获取的金额
							// 		//公式为（总期数 - 取会期） * 取会金额 + （取会期-1）*死会金额
							// 		this.anticipated_income = (subitems_periods - full_num -1) * full_num_money + ( full_num - 1 )*subitems_profit;

							// 	}
							// 	else{
							// 		this.earned_surplus = ( payment_num) * subitems_profit - delivered;
							// 		//预测说明，在当前为缴费的情况下，预测当前取会金额，当前已缴费的情况下，预测下期取会金额
							// 		this.anticipated_income = (subitems_periods - payment_num - 2 ) * cost + ( payment_num *subitems_profit  );
							// 	}

							// 	this.delivered = delivered ;
							// 	this.huizi_arr_list = res.data.self_huzi[i].huizi_arr.reverse();
							// }
						}
					}
				}
			});
		},
		methods: {
			changData(id, num) {
				uni.navigateTo({
					//唯一ID值传入userdetail页面
					url: '/pages/user/userdetail/changehuizidetail/index?id=' + id + '&num=' + num + '&curr_index=' + this.curr_index,
					animationType: 'pop-in',
					animationDuration: 200
				});
			},
			isShow(data, index) {
				let isShow = new Date(this.y + '/' + this.m + '/01').getTime() >= new Date(data.year + '/' + data.month + '/01')
					.getTime() ?
					true : false;
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

			&-m {}
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
