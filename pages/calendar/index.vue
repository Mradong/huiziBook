<template>
	<view class="calendar-list">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="会子本"></nav-bar>
		<view><dark-calendar @on-click="getDayData"></dark-calendar></view>

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
			huiziData: []
		};
	},
	onLoad() {},
	methods: {
		getDayData(item) {
			console.log( item )
			let keysArray = uni.getStorageSync('huizi_keys');
			let len = keysArray.length;
			let date = `${item.year}-${item.month}-${item.date}`;
			let dateData = {};
			let c_huizi_arr = {};
			let self_day_data = [];
			if (keysArray) {
				for (let i = 0; i < len; i++) {
					uni.getStorage({
						key: i + '_key',
						success: res => {
							let huiziLen = res.data.self_huzi.length;
							let day = null;
							for (let j = 0; j < huiziLen; j++) {
								if (res.data.self_huzi[j].subitems_timemodel == '新历') {
									day = res.data.self_huzi[j].subitems_new_onetime;
									for (let index in res.data.self_huzi[j].huizi_arr) {
										let time = `${res.data.self_huzi[j].huizi_arr[index].year}-${res.data.self_huzi[j].huizi_arr[index].month -1 }-${day}`;
										console.log( time )
										if (date == time) {
											dateData = res.data.self_huzi[j].huizi_arr[index];
											c_huizi_arr = { ...res.data.self_huzi[j] };
											c_huizi_arr.huizi_arr = [];
											c_huizi_arr.huizi_arr.push(dateData);
											self_day_data.push(c_huizi_arr);
										}
									}
								} else {
									day = res.data.self_huzi[j].subitems_old_show_onetime;
									if (day == item.lunar) {
										for (let index in res.data.self_huzi[j].huizi_arr) {
											if (res.data.self_huzi[j].huizi_arr[index].year == item.year && res.data.self_huzi[j].huizi_arr[index].month -1 == item.month) {
												dateData = res.data.self_huzi[j].huizi_arr[index];
												c_huizi_arr = { ...res.data.self_huzi[j] };
												c_huizi_arr.huizi_arr = [];
												c_huizi_arr.huizi_arr.push(dateData);
												self_day_data.push(c_huizi_arr);
											}
										}
									}
								}
							}
						}
					});
				}
				this.huiziData = self_day_data;
			}

			// for (let i in this.dateDetail) {
			// 	if( this.dateDetail[i].subitems_timemodel == '新历' ){
			// 		day = this.dateDetail[i].subitems_new_onetime;
			// 	}
			// 	else {
			// 		day = this.dateDetail[i].subitems_old_show_onetime;
			// 	}
			// 	for (let j in this.dateDetail[i].huizi_arr) {
			// 		let time =
			// 			`${this.dateDetail[i].huizi_arr[j].year}-${this.dateDetail[i].huizi_arr[j].month}-${day}`;
			// 		date == time ? console.log( this.dateDetail[i].huizi_arr[j] ) : false;

			// 	}
			// }
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
