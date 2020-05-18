<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home='true' :titleCenter="true" type="fixed" title="信息修改">
		</nav-bar>
		<view class="form-one">
			<view class="form-row">
				<label class="form-row-title">姓名：</label>
				<input type="text" maxlength="11" v-model="name" placeholder="请输入项目人姓名" class="form-row-input " />
				<!-- 不能为空值，看到做判断 -->
				<view class="warn" v-if="name == '' ? true : false">
					<image src="../../../../static/images/cuowu.svg" mode=""></image>
				</view>
			</view>
			<view class="form-row">
				<label class="form-row-title">电话：</label>
				<input type="text" maxlength="11" v-model="phone" placeholder="请输入项目人电话" class="form-row-input " />
				<!-- 不能为空值，看到做判断 -->
				<view class="warn" v-if="phone == '' ? true : false">
					<image src="../../../../static/images/cuowu.svg" mode=""></image>
				</view>
			</view>
			<view class="form-row">
				<label class="form-row-title">描述：</label>
				<input type="text" maxlength="11" v-model="description" placeholder="请输入项目人描述" class="form-row-input " />
			</view>
			<view class="form-row">
				<label class="form-row-title">地址：</label>
				<input type="text" maxlength="11" v-model="site" placeholder="请输入项目人地址" class="form-row-input " />
			</view>
		</view>
		<button type="warn" class="create" @click="changeData()">完成</button>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				name: '',
				description: '',
				phone: '',
				site: '',
				id:null,
			};
		},
		onLoad( option ) {
			this.id = option.id;
		},
		methods: {
			changeData(){
				let new_data = {};
				uni.getStorage({
					key: this.id + '_key',
					success: res => {
						res.data.name = this.name ;
						res.data.description = this.description ;
						res.data.phone = this.phone;
						res.data.site = this.site;
						new_data = res.data;
						uni.setStorageSync(this.id + '_key', new_data);
						uni.navigateTo({
							//唯一ID值传入userdetail页面
							url: '/pages/user/userdetail/index?id=' + this.id,
							animationType: 'pop-in',
							animationDuration: 200,
						});
					}
				});
			}
		}
	};
</script>

<style lang="less">
	.form-one {
		background-color: #FFFFFF;

		.form-row {
			display: flex;
			padding: 10upx 20upx;
			border-bottom: 1px solid #F1F1F1;
			margin-top: 20upx;
			margin-right: 20upx;
			&-title {
				flex: 1;
				color: rgba(56, 56, 56, 1);
				font-size: 34upx;
				line-height: 150%;
				text-align: left;
				vertical-align: middle;
			}

			&-input {
				flex: 2;
			}

			&-select {
				flex: 2;
				font-size: 34upx;
				line-height: 100%;
				text-align: left;
				vertical-align: middle;
				padding-left: 40upx;

				text {
					position: relative;
					top: -14upx;
				}

				image {
					width: 50upx;
					height: 50upx;
					right: -130px;
				}
			}

			.warn {
				image{
					float: right;
					width: 40upx;
					height: 40upx;
				}
			}

			.time {
				image {
					width: 50upx;
					height: 50upx;
					right: -110px;
				}
			}
		}
	}

	.create {
		margin-top: 30upx;
		width: 90%;
		color: rgba(255, 255, 255, 1);

	}
</style>