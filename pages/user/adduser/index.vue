<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="添加用户"></nav-bar>

		<view class="form">
			<view class="form-row">
				<label class="form-row-title">项目人名称：</label>
				<input type="text" maxlength="11" v-model="name" placeholder="请输入项目人名称" class="form-row-input " />
				<view class="warn" v-if="name == '' ? true : false">必填</view>
			</view>

			<view class="form-row">
				<label class="form-row-title">项目人描述：</label>
				<input type="text" maxlength="11" v-model="description" placeholder="请输入项目人描述" class="form-row-input " />
				<view class="warn" v-if="description == '' ? true : false">必填</view>
			</view>
			<view class="form-row">
				<label class="form-row-title">项目人电话：</label>
				<input type="text" maxlength="11" v-model="phone" placeholder="请输入项目人电话" class="form-row-input " />
				<view class="warn" v-if="phone == '' ? true : false">必填</view>
			</view>
			<view class="form-row">
				<label class="form-row-title">项目人地址：</label>
				<input type="text" maxlength="11" v-model="site" placeholder="请输入项目人地址" class="form-row-input " />
				<view class="warn" v-if="site == '' ? true : false">必填</view>
			</view>
		</view>
		<button type="warn" class="but" @click="addData">完成</button>
	</view>
</template>

<script>
export default {
	data() {
		return {
			name: '',
			description: '',
			phone: '',
			site: ''
		};
	},
	onLoad() {},
	methods: {
		addData() {
			if( this.name && this.description && this.phone && this.site){
				try {
					const keysArray = uni.getStorageSync('huizi_keys');
					//非首次录入数据时
					if (keysArray) {
						let newId = Number(keysArray[keysArray.length - 1]) + 1; //创建唯一ID值
						keysArray[keysArray.length] = newId; //本地储存huizi_keys追加新ID值
						let huiziitem = {
							id: newId,
							name: this.name,
							description: this.description,
							phone: this.phone,
							site: this.site,
							self_huzi:[]
						};
						uni.setStorageSync('huizi_keys', keysArray); //创建本地会子KEY值数组，用于后续遍历查询
						uni.setStorageSync(newId + '_key', huiziitem); //创建具体用户数据
					} else {
						//当为首次录入数据时
						let id = 0;
						let huiziKeys = [id];
						let huiziitem = {
							id: id,
							name: this.name,
							description: this.description,
							phone: this.phone,
							site: this.site,
							self_huzi:[]
						};
						uni.setStorageSync('huizi_keys', huiziKeys); //创建本地会子KEY值数组，用于后续遍历查询
						uni.setStorageSync(id + '_key', huiziitem); //创建具体用户数据
					}
				} catch (e) {
					console.log(e);
				}
				uni.switchTab({
					url: '/pages/user/index',
					animationType: 'pop-in',
					animationDuration: 200,
				});
				
				
			}
			else{
				console.log( ' 请完善资料')
			}

		}
	}
};
</script>

<style lang="less">
.form {
	&-row {
		display: flex;
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		border-bottom: 1px solid #c8c7cc;
		margin: 10rpx 20rpx;
		position: relative;
		.warn {
			position: absolute;
			right: 60rpx;
			top: 0;
			font-size: 14px;
			color: #dd524d;
			display: block;
		}
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
.but {
	margin-top: 200rpx;
	width: 80%;
}
</style>
