<template>
	<view class="calendar-list">
		<nav-bar fontColor="#000" backState="1000" :home='false' :titleCenter="true" type="fixed" title="会子本">
		</nav-bar>
		<view><dark-calendar  @on-click="getDayData"></dark-calendar></view>

		<huizi-deatil class="huiz-com" :huiziData="huiziData"></huizi-deatil>
	</view>
</template>

<script>
import darkCalendar from '@/components/dark-calendar/dark-calendar.vue';
import huiziDeatil from '@/components/huizi-deatil/huizi-detail.vue';
export default {
	data() {
		return {
			title: 'Hello',
			huiziData: [],
			huizi: {
				//模拟会子数据
				total: 10,
				totalPay: 200000,
				totalPayment: 150000,
				totalSurplusPay: 50000,
				totalHuizi: [
					{
						//模拟每名会子具体数据
						id: 1,
						projectName: '嘻嘻500',
						model: 'fixed',
						currentHuizi: [
							{
								//模拟每名会子每个月具体数据
								id: '1-1',
								projectName: '嘻嘻500',
								payment: 500,
								currentPeriod: 2,
								totalPeriods: 50,
								actualPayment: 350,
								isPay: true,
								payTime: '2020-1-1'
							},
							
						],
						totalPeriods: 50,
						payment: 500,
						isPay: true,
						creationTime: '2019-1-12'
					},
					{
						id: 2,
						projectName: '嘻嘻500',
						model: 'fixed',
						currentHuizi: [
							{
								id: '2-1',
								currentPeriod: 2,
								actualPayment: 350,
								isPay: true,
								payTime: '2020-1-2'
							}
						],
						totalPeriods: 50,
						payment: 500,
						isPay: true,
						creationTime: '2018-1-1'
					}
				]
			}
		};
	},
	onLoad() {},
	methods: {
		getDayData(date) {
			//data 格式为 'yyyy-m-d'
			const zz = /^(\d{4})-(\d{1,2})-(\d{1,2})$/;
			let currentMonth = Number(zz.exec(date)[2]) - 1;
			let huiziLen = this.huizi.totalHuizi.length;
			let currentMonthHuizi = [];
			let currentDayHuizi = [];
			for (let i = 0; i < huiziLen; i++) {
				//获取每名会子当月的数据
				currentMonthHuizi.push(this.huizi.totalHuizi[i].currentHuizi[currentMonth]);
			}
			let currentMonthHuiziLen = currentMonthHuizi.length;
			for (let i = 0; i < currentMonthHuiziLen; i++) {
				if (currentMonthHuizi[i].payTime == e) {
					currentDayHuizi.push(currentMonthHuizi[i]);
				}
				this.huiziData = currentDayHuizi;
				return true;
			}
		}
	},
	components: {
		darkCalendar,
		huiziDeatil
	}
};
</script>

<style lang="less">
.calendar-list {
	display: flex;
	flex-direction: column;

	&-item {
		background-color: red;
	}
}
</style>
