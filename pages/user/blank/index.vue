<template>
	<view class="">
		
	</view>
</template>

<script>
export default {
	onShow(){
		this.back();
	},
	methods:{
		back(){
			uni.switchTab({
				url: '/pages/user/index',
			});
		}
	}

};

</script>

<style>
</style>
