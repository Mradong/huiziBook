<template>
	<view class="calendar-list">
		<view>
		    <dark-calendar 
			:signeddates="signeddates"
		    @click="change"
		     ></dark-calendar>
		</view>
		
		<view class="calendar-list-item">
			11111
		</view>
	</view>
</template>

<script>
	import darkCalendar from '@/components/dark-calendar/dark-calendar.vue'
	export default {
		data() {
			return {
				title: 'Hello',
				signeddates:['2020-4-15','2020-4-17']
			}
		},
		onLoad() {
	
		},
		methods: {
			change(){
				console.log('点击了')
			}
		},
		    components: {
		        darkCalendar
		    }
	}
</script>

<style lang="less">
	.calendar-list{
		display: flex;
		flex-direction: column;
		&-item{
			
			background-color: red;
		}
	}
	
</style>
