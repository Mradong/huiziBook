<template>
	<view class="home">
		<view class="home-nav">
			<view class="home-nav-l">
				<view>本月支出</view>
				<view class="expend">00.00</view>
				<view>本月收入：00.00</view>
			</view>
			<view class="home-nav-r font-c"><view class="budget">本月预算：00.00</view></view>
		</view>
		<huizi-deatil class='huiz-com'></huizi-deatil>
		<!-- 悬浮组件-->
		<view><uni-fab :pattern="pattern" :content="content" :horizontal="horizontal" :vertical="vertical" :direction="direction" @trigger="trigger"></uni-fab></view>
	</view>
</template>

<script>
import uniFab from '@/components/uni-fab/uni-fab.vue';
import huiziDeatil from '@/components/huizi-deatil/huizi-detail.vue';
export default {
	data() {
		return {
			title: 'Hello',
			pattern: {
				color: '#3c3e49',
				selectedColor: '#007AFF',
				backgroundColor: '#ffffff',
				buttonColor: '#EA6566'
			},
			content: [
				{
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
			horizontal: 'right',
			vertical: 'bottom',
			direction: 'vertical',
			popMenu: true
		};
	},
	onLoad() {},
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
		}
	},
	components: {
		uniFab,
		huiziDeatil
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
		&-r {
			flex: 1;
			text-align: right;
			.budget {
			}
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
	.huiz-com{
		flex-grow:1;
		-webkit-flex-grow:1; 
	}
}
</style>
