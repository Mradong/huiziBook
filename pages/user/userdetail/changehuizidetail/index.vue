<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home="true" :titleCenter="true" type="fixed" title="录入/修正 缴费"></nav-bar>
		<view class="form-one">
			<view class="">
				<text > 当期若为取会期,请</text><button type="primary"  @click="isFetch">点我</button>
			</view>
			<view class="form-row">
				<label class="form-row-title">金额</label>
				<input type="text" maxlength="11" v-model="money"  :disabled="isDisabled" placeholder="请输入正确缴费" class="form-row-input " />
				<!-- 不能为空值，看到做判断 -->
				<view class="warn" v-if="money == '' ? true : false"></view>
			</view>
		</view>
		<button type="warn" class="create" @click="changeMoney(id,num) " >完成</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="error" title="警告" mode="base" content="请再次确认,当期是否为取会期" :duration="2000" :before-close="true" @close="close" @confirm="confirm"> </uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
	import uniPopup from '@/components/uni-popup/uni-popup.vue'
	import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
export default {
	data() {
		return {
			id:null,
			num:null,
			money:'',
			isDisabled:false,
		};
	},
	computed: {

	},
	onLoad: function(option) {
		this.id = option.id ,
		this.num  = option.num -1
		
	},
	methods: {
		changeMoney(id,num ){
			let Userid = id.slice(0, 1);
			let payment_num = 0;
			let delivered = 0;
			let earned_surplus = 0;
			uni.getStorage({
				key: Userid + '_key',
				success: res => {
					for (let i = 0; i < res.data.self_huzi.length; i++) {
						if (res.data.self_huzi[i].id == id) {
							res.data.self_huzi[i].huizi_arr[num].cost = this. money;
							for( let j = 0; j < res.data.self_huzi[i].huizi_arr.length; j++ ){
								if(  res.data.self_huzi[i].huizi_arr[j].cost != 0){
									payment_num += 1;
								}
								delivered += Number( res.data.self_huzi[i].huizi_arr[j].cost ) ;
							}
							earned_surplus =  payment_num * res.data.self_huzi[i].subitems_profit - delivered ;
							res.data.self_huzi[i].payment_num = payment_num;
							res.data.self_huzi[i].delivered = delivered;
							res.data.self_huzi[i].earned_surplus = earned_surplus;
							
							uni.setStorageSync(Userid + '_key', res.data);
							uni.navigateTo({
								//唯一ID值传入userdetail页面
								url: '/pages/user/userdetail/lists/index?id=' + id ,
								animationType: 'pop-in',
								animationDuration: 200,
							});
						}
					}
				}
			});
		},
		isFetch(){
			this.$refs.popup.open();
		},
		close(done) {
			
			this.isDisabled = false ;
			done();
		},
		confirm(done, value) {
			this.money = -1 ;
			this.isDisabled = true ;
			done();
		}
	},
	components: {
		uniPopup,
		uniPopupDialog
	},
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
	
			&-select{
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
				padding-left: 15upx;
				width: 50upx;
				height: 100%;
	
				image {
					width: 30upx;
					height: 30upx;
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
	.create{
		margin-top: 30upx;
		width: 90%;
		color: rgba(255, 255, 255, 1);
		
	}

</style>
