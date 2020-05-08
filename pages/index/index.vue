<template>
	<view class="home">
		<view class="home-nav">
			<view class="home-nav-l">
				<view>本月需支出</view>
				<view class="expend">00.00</view>
				<view>本月已支付：00.00</view>
			</view>
			<view class="home-nav-r font-c">
				<view class="budget">本月未支付：00.00</view>
			</view>
		</view>
		<view class="clearfix">
		</view>
		<view class="huizi-title">
			本月会子详情
		</view>
		<huizi-deatil class='huiz-com' :huiziData='huiziData'></huizi-deatil>
		<!-- 悬浮组件-->
		<view>
			<uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction"
			 @trigger="trigger"></uni-fab>
		</view>
	</view>
</template>

<script>
	import uniFab from '@/components/uni-fab/uni-fab.vue';
	import huiziDeatil from '@/components/huizi-deatil/huizi-detail.vue';
	import navBar from "@/components/zhouWei-navBar";
	import publicFnc from '@/static/js/public.js';
	export default {
		data() {
			return {
				title: 'Hello',
				pattern: {
					color: '#3c3e49',
					selectedColor: '#007AFF',
					backgroundColor: '#fff',
					buttonColor: '#e80e09'
				},
				content: [{
						iconPath: '/static/logo.png',
						selectedIconPath: '/static/logo.png',
						text: '首页',
						model: 'home',
						active: true
					},
					{
						iconPath: '/static/logo.png',
						selectedIconPath: '/static/logo.png',
						text: '汇总',
						model: 'calendar',
						active: false
					}
				],
				huiziData: [],
				horizontal: 'right',
				vertical: 'bottom',
				direction: 'vertical',
				popMenu: true
			};
		},
		onLoad() {
			this.initToday();
		},
		methods: {
			trigger(e) {
				let model = e.item.model;
				switch (model) {
					case 'calendar':
						console.log('11');
						uni.navigateTo({
							url: '/pages/calendar/index',
							success: res => {},
							fail: () => {},
							complete: () => {}
						});
						break;
					default:
						console.log('butiao');
				}
			},
			initToday() {
				let date = new Date();
				let y = date.getFullYear();
				let m = date.getMonth();
				let d = date.getDate();
				let lunar = publicFnc.calendar.solar2lunar(y, m + 1, d);
				let today_data = {
					date: d,
					lunar: lunar.IDayCn,
					month: m,
					year:y
				}
				this.huiziData =  publicFnc.toDay.getToDayData( today_data );
			}
		},
		components: {
			uniFab,
			huiziDeatil,
			navBar
		}
	};
</script>

<style lang="less">
	.font-c {
		font-size: 16px;
		font-weight: 600;
	}

	.home {
		width: 100%;
		height: 100%;
		color: #ffffff;
		display: flex;
		flex-direction: column;

		&-nav {
			box-sizing: border-box;
			display: flex;
			flex-direction: row;
			align-items: flex-end;
			width: 100%;
			height: 307rpx;
			background-color: #ea6566;
			background-image: linear-gradient(top left, #ea6566, #e69495);
			padding: 10rpx 25rpx 50rpx;
			position: fixed;
			z-index: 9999;

			&-r {
				flex: 1;
				text-align: right;

				.budget {}
			}

			&-l {
				flex: 1;
				text-align: left;

				.expend {
					margin: 5px 0;
					.font-c;
				}
			}
		}

		.huizi-title {
			text-align: center;
			font-size: 18px;
			color: #0b64e8;
			font-weight: bold;
			height: 45px;
			line-height: 45px;
			background-color: #f8f8f8;
			box-shadow: 0 3px 5px #3F536E;
			margin-top: 307rpx;
		}
	}
</style>
