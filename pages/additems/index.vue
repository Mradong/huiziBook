<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home='false' :titleCenter="true" type="fixed" title="添加用户">
		</nav-bar>

		<view class="form">
			<view class="form-row">
				<label class="form-row-title">项目人名称：</label>
				<input type="text" maxlength="11" v-model="name" placeholder="请输入项目人名称" class="form-row-input " />
			</view>
			<view class="form-row">
				<label class="form-row-title">项目人描述：</label>
				<input type="text" maxlength="11" v-model="login" placeholder="请输入项目人描述" class="form-row-input " />
			</view>
			<view class="form-row">
				<label class="form-row-title">项目人电话：</label>
				<input type="text" maxlength="11" v-model="login" placeholder="请输入项目人电话" class="form-row-input " />
			</view>
			<view class="form-row">
				<label class="form-row-title">项目人地址：</label>
				<input type="text" maxlength="11" v-model="login" placeholder="请输入项目人地址" class="form-row-input " />
			</view>
		</view>
		<button type="warn" class="but">完成</button>
	</view>

</template>

<script>
	export default {
		data() {
			return {
				name: '',
				description:'',
				phone:'',
				site:''
			}
		},
		onLoad() {

		},
		methods: {

		},

	}
</script>

<style lang="less">
	.form {
		&-row {
			display: flex;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
			border-bottom: 1px solid #C8C7CC;
			margin: 10rpx 20rpx;

			&-title {
				flex: 3;
			}

			&-input {
				flex: 5;
				height: 100rpx;
				text-align: left;
			}
		}
	}
	.but{
		margin-top: 200rpx;
		width: 80%;
	}
</style>
