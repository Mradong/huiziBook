<template>
	<view class="home">
		<view class="home-nav">
			<view class="home-nav-t">
				<view class="to-month-money ">
					本月支出(元)
					<br />
					<text>{{ tomonth_money.money | e }}</text>
				</view>
				<view class="to-month-detail">
					<view class="to-month-detail-c">
						本月项目：
						<text>{{ tomonth_money.expect | e }}</text>
						期
					</view>
					<view class="to-month-detail-c">
						本月逾期：
						<text>{{ tomonth_money.uncalled | e }}</text>
						期
					</view>
					
				</view>
			</view>
			<view class="home-nav-b">
				<view class="to-day">
					本日项目
					<br />
					<text>{{ today_money.expect | e }}</text>
					期
				</view>
				<view class="to-day to-day-c">
					本日未缴
					<br />
					<text>{{ today_money.uncalled | e }}</text>
					期
				</view>
				<view class="to-day">
					本日支付 (元)
					<br />
					<text>{{ today_money.money | e }}</text>
				</view>
			</view>
		</view>
		<view class="clearfix"></view>
		<view class="huizi-title">本日会子详情</view>
		<huizi-deatil class="huiz-com" :huiziData="huiziData"></huizi-deatil>
		<!-- 悬浮组件-->
		<view><uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction" @trigger="trigger"></uni-fab></view>
	</view>
</template>

<script>
import uniFab from '@/components/uni-fab/uni-fab.vue';
import huiziDeatil from '@/components/huizi-deatil/huizi-detail.vue';
import navBar from "@/components/zhouWei-navBar";
import publicFnc from '@/static/js/public.js';
import {
	mapMutations
} from "vuex" 
export default {
	data() {
		return {
			title: 'Hello',
			pattern: {
				color: '#3c3e49',
				selectedColor: '#ea6566',
				backgroundColor: '#ea656600',
				buttonColor: '#ea6566'
			},
			content: [
				// {
				// 	iconPath: "/static/images/item_3.svg",
				// 	selectedIconPath: "/static/images/item_3.svg",
				// 	text: '',
				// 	model: 'home',
				// 	active: false
				// },
				{
					iconPath: "/static/images/rili_1.svg",
					selectedIconPath: "/static/images/hover_rili_1.svg",
					text: '',
					model: 'calendar',
					active: false
				}
			],
			huiziData: [],
			today_money:{},
			tomonth_money:{},
			horizontal: 'right',
			vertical: 'bottom',
			direction: 'vertical',
			popMenu: true
		};

	},
	filters:{
		e(val){ return val || '0'}
	},
	onShow(){
		this.initToday();
		this.initLoginStatu();	
	},
	methods: {
		...mapMutations(['login']),
		initLoginStatu(){
			try {
				const user_isLogin = uni.getStorageSync('user_isLogin');
				if ( user_isLogin ) {
					//用户已登录或者授权的情况下
					let user_code = uni.getStorageSync('wx_userCode');//获取用户code
					let user_info = uni.getStorageSync( user_code );//获取用户信息
					console.log( user_info )
					let user = {
						username:user_info.userInfo.nickName,
						id: user_code,
						logo :user_info.userInfo.avatarUrl,
					}
					this.login( user )
					
				}
			} catch (e) {
				console.log(e);
			}
		},
		trigger(e) {
			let model = e.item.model;
			switch (model) {
				case 'calendar':
					uni.navigateTo({
						url: '/pages/calendar/index',
						success: res => {},
						fail: () => {},
						complete: () => {}
					});
					break;
				default:

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
			this.huiziData =[];
			this.huiziData =  publicFnc.customFnc.getToDayData( today_data );
			let tomonth_money = publicFnc.customFnc.getToMonthData( today_data );
			this.today_money = this.getMoney( this.huiziData);
			this.tomonth_money = this.getMoney( tomonth_money );
		},
		getMoney( data ){
			let len = data.length;
			let money= 0 ;
			let uncalled = 0 ;
			for( let i = 0; i<len ;i++){
				if( data[i].huizi_arr[0].cost == 0){
					uncalled += 1 ;
				}
				money += Number( data[i].huizi_arr[0].cost );
			}
			let money_data ={
				uncalled:uncalled,
				money:money,
				expect:len
			}

			return money_data ;
		}
	},
	onShareAppMessage: function (optiom) {
		if (optiom.from === 'button') {
			// 来自页面内转发按钮
			return {
				title: "标题",
				desc: "描述2",
				imageUrl: "分享要显示的图片，如果不设置就会默认截图当前页面的图片",
				path: '/page/test_details/test_d?housesid=' + 123,
			}
		}
		return {
			title: "会子簿",
			desc: "专门记录会子的小程序",
			imageUrl: "../../static/images/cyf.jpg",
			path: "../../pages/index/index" + 123,
			success: function (res) {
				// 转发成功
				console.log("转发成功:" + JSON.stringify(res));
			},
			fail: function (res) {
				// 转发失败
				console.log("转发失败:" + JSON.stringify(res));
			}
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
.home {
	width: 100%;
	height: 100%;
	color: #ffffff;
	display: flex;
	flex-direction: column;

	&-nav {
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		width: 100%;
		height: 307rpx;
		background-image: -webkit-linear-gradient(top left, #ea6566, rgba(212, 98, 44, 0.68));
		align-items: flex-start;
		position: fixed;
		z-index: 9999;
		&-t {
			text-align: left;
			font-size: 24upx;
			flex: 1;
			padding-top: 70upx;
			margin-left: 20upx;
			width: 100%;
			.to-month-money {
				text {
					font-size: 48upx;
				}
			}
			.to-month-detail {
				display: flex;
				&-c {
					margin-right: 10upx;
				}
			}
		}
		&-b {
			border-top: 1px solid #f8f8f8;
			text-align: left;
			display: flex;
			font-size: 24upx;
			width: 100%;
			text-align: center;
			.to-day {
				flex: 1;
				text {
					font-size: 36upx;
				}
			}
			.to-day-c {
				border-left: 1px solid #f8f8f8;
				border-right: 1px solid #f8f8f8;
			}
		}
	}
	.budget {
		font-size: 32upx;
		text {
			font-size: 40upx;
			padding: 0 10upx;
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
		box-shadow: 0 3px 5px #3f536e26;
		margin-top: 307rpx;
	}
}

/deep/ .uni-fab__circle {
	background-image: -webkit-linear-gradient(top left, #ea6566, rgba(209, 212, 44, 0.62));
}

/deep/ .uni-fab__item--active {
	border-radius: 50%;
	border: 1px solid #fff;
	background-image: -webkit-linear-gradient(top left, #ea6566, rgba(209, 212, 44, 0.62));
	image {
		width: 70upx;
		height: 70upx;
	}
}
</style>
