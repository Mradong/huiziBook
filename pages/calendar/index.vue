<template>
	<view class="calendar-list">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="会子本"></nav-bar>
		<view><dark-calendar ref="calendar" @on-click="getDayData($event)"></dark-calendar></view>

		<huizi-deatil class="huiz-com" :huiziData="huiziData"></huizi-deatil>
	</view>
</template>

<script>
import darkCalendar from '@/components/dark-calendar/dark-calendar.vue';
import huiziDeatil from '@/components/huizi-deatil/huizi-detail.vue';
import publicFnc from '@/static/js/public.js';
export default {
	data() {
		return {
			title: 'Hello',
			huiziData: []
		};
	},
	mounted() {
		
	},
	methods: {
		getDayData(item) {
			
			this.huiziData =  publicFnc.toDay.getToDayData( item );
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
