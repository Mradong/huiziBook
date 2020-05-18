<template>
	<view class="">
		<nav-bar fontColor="#000" backState="1000" :home="false" :titleCenter="true" type="fixed" title="新增项目"></nav-bar>
		<view class="create-data">
			<view class="form">
				<view class="form-one-title">子项目信息</view>
				<view class="form-one">
					<view class="form-row">
						<label class="form-row-title">名称</label>
						<input type="text" maxlength="11" v-model="subitems_name" placeholder="子项目名称" class="form-row-input " />
						<view class="warn" v-if="subitems_name == '' ? true : false"></view>
					</view>
					<view class="form-row">
						<label class="form-row-title">描述</label>
						<input type="text" maxlength="11" v-model="subitems_description" placeholder="子项目描述" class="form-row-input " />
						<view class="warn" v-if="subitems_description == '' ? true : false"></view>
					</view>
					<view class="form-row">
						<label class="form-row-title">总期数</label>
						<input type="number" maxlength="11" v-model="subitems_periods" placeholder="子项目总期数" class="form-row-input " />
						<view class="warn" v-if="subitems_periods == '' ? true : false"></view>
					</view>
					<view class="form-row">
						<label class="form-row-title">金额</label>
						<input type="number" maxlength="11" v-model="subitems_profit" placeholder="项目死期的金额" class="form-row-input " />
						<view class="warn" v-if="subitems_profit == '' ? true : false"></view>
					</view>
				</view>
				<view class="form-one-title"></view>

				<view class="form-one">
					<view class="form-row fixation">
						<label class="form-row-title">缴费模式</label>
						<view class="form-row-select" @click="selectFixation">
							<text>{{ subitems_fixation }}</text>
							<image src="../../../static/images/hjt.svg" mode=""></image>
						</view>
						<lb-picker ref="fixation" v-model="subitems_fixation" :list="subitems_fixation_list"></lb-picker>
						<view class="warn"><image src="../../../static/images/warn.svg" mode=""></image></view>
						<!-- 					<view class="red fixation-dec" v-if="subitems_fixation == '定投' ">
						将智能生成往期数据
					</view>
					<view class="red fixation-dec" v-if="subitems_fixation == '不定投' ">
						智能生成往期数据,随机取最高与最低缴费之间的值
					</view> -->
					</view>

					<view class="form-row" v-if="subitems_fixation == '定投'">
						<label class="form-row-title">每期定投(元)</label>
						<input type="number" maxlength="11" v-model="subitems_fixation_cost" placeholder="00.00" class="form-row-input " />
					</view>

					<view class="form-row" v-if="subitems_fixation == '不定投'">
						<label class="form-row-title form-fixation-title">最低缴费(元)</label>
						<input type="number" maxlength="11" v-model="subitems_fixation_low_cost" placeholder="每期最低缴费" class="form-row-input " />
					</view>

					<view class="form-row form-fixation" v-if="subitems_fixation == '不定投'">
						<label class="form-row-title form-fixation-title">最高缴费(元)</label>
						<input type="number" maxlength="11" v-model="subitems_fixation_high_cost" placeholder="每期最高缴费" class="form-row-input " />
					</view>
				</view>

				<view class="form-one-title" style="display: none;"></view>
				<view class="form-one" style="display: none;">
					<view class="form-row">
						<label class="form-row-title">缴纳份额</label>
						<view class="form-row-select" @click="selectShare">
							<text>{{ subitems_share }}</text>
							<image src="../../../static/images/hjt.svg" mode=""></image>
						</view>
						<view class="warn"><image src="../../../static/images/warn.svg" mode=""></image></view>
						<lb-picker ref="share" v-model="subitems_share" :list="subitems_share_list"></lb-picker>
					</view>
					<view class="form-row">
						<label class="form-row-title">会头缴纳期数</label>
						<view class="form-row-select" @click="selectNum">
							<text>{{ subitems_num }}</text>
							<image src="../../../static/images/hjt.svg" mode=""></image>
						</view>
						<view class="warn"><image src="../../../static/images/warn.svg" mode=""></image></view>
						<lb-picker ref="num" v-model="subitems_num" :list="subitems_num_list"></lb-picker>
					</view>

					<view class="form-row">
						<label class="form-row-title">每月缴纳次数</label>
						<view class="form-row-select" @click="selectMonthnum">
							<text>{{ subitems_monthnum }}</text>
							<image src="../../../static/images/hjt.svg" mode=""></image>
						</view>
						<view class="warn"><image src="../../../static/images/warn.svg" mode=""></image></view>
						<lb-picker ref="monthnum" v-model="subitems_monthnum" :list="subitems_monthnum_list"></lb-picker>
					</view>
				</view>

				<view class="form-one-title"></view>
				<view class="form-one">
					<view class="form-row">
						<label class="form-row-title">新/农 历</label>
						<view class="form-row-select" @click="selectTimemodel">
							<text>{{ subitems_timemodel }}</text>
							<image src="../../../static/images/hjt.svg" mode=""></image>
						</view>
						<view class="warn"><image src="../../../static/images/warn.svg" mode=""></image></view>
						<lb-picker ref="timemodel" v-model="subitems_timemodel" :list="subitems_timemodel_list"></lb-picker>
					</view>
					<!-- 选择模式为新历时 -->
					<view class="form-row" v-if="subitems_timemodel == '新历'">
						<label class="form-row-title">首次缴纳</label>
						<view class="form-row-select" @click="selectOnetime">
							<view class="form-row-select-time">
								<text>{{ subitems_new_onetime }} 号</text>
								<image src="../../../static/images/hjt.svg" mode=""></image>
							</view>
						</view>
						<view class="warn"><image src="../../../static/images/warn.svg" mode=""></image></view>

						<lb-picker ref="onetime" v-model="subitems_new_onetime" :list="subitems_newtime_list"></lb-picker>
					</view>
					<view class="form-row" v-if="subitems_monthnum == '2次' && subitems_timemodel == '新历'">
						<label class="form-row-title">再次缴纳时间</label>
						<view class="form-row-select" @click="selectTwotime">
							<view class="form-row-select-time">(新历)</view>
							{{ subitems_new_twotime }} 号
							<text>></text>
						</view>
						<lb-picker ref="twotime" v-model="subitems_new_twotime" :list="subitems_newtime_list"></lb-picker>
					</view>

					<!-- 选择模式为农历时 -->
					<view class="form-row" v-if="subitems_timemodel == '农历'">
						<label class="form-row-title">首次缴纳</label>
						<view class="form-row-select" @click="selectOnetime">
							<view class="form-row-select-time">
								<text>{{ subitems_old_show_onetime }}</text>
								<image src="../../../static/images/hjt.svg" mode=""></image>
							</view>
						</view>
						<view class="warn"><image src="../../../static/images/warn.svg" mode=""></image></view>
						<lb-picker ref="onetime" :list="subitems_time_list" @confirm="getOneOldTime"></lb-picker>
					</view>

					<view class="form-row" v-if="subitems_monthnum == '2次' && subitems_timemodel == '农历'">
						<label class="form-row-title">再次缴纳时间</label>
						<view class="form-row-select" @click="selectTwotime">
							<view class="form-row-select-time"></view>
							{{ subitems_old_show_twotime }}
							<text>></text>
						</view>
						<lb-picker ref="twotime" :list="subitems_time_list" @confirm="getTwoOldTime"></lb-picker>
					</view>
				</view>

				<view class="form-one-title"></view>
				<view class="form-one">
					<view class="form-row">
						<label class="form-row-title">开始时间</label>
						<ePicker startYear="2015" endYear="2030" mode="date" :defaultValue="start_time" @btnConfirm="getEndtime" class="form-row-select">
							<view class="time">
								<text>{{ start_time }}</text>
								<image src="../../../static/images/hjt.svg" mode=""></image>
							</view>
						</ePicker>
					</view>
					<view class="form-row">
						<label class="form-row-title">结束时间</label>
						<ePicker startYear="2015" endYear="2030" mode="date" :defaultValue="end_time" class="form-row-select">
							<view class="time">
								<text>{{ end_time }}</text>
								<image src="../../../static/images/hjt.svg" mode=""></image>
							</view>
						</ePicker>
					</view>
				</view>
			</view>
		</view>
		<button type="warn" class="create" @click="createHuizi">完成</button>
		<uni-popup ref="popup" type="dialog">
			<uni-popup-dialog type="error" title="错误" mode="base" content="请完善资料" :duration="2000" :before-close="true" @close="close" @confirm="confirm"> </uni-popup-dialog>
		</uni-popup>
	</view>
</template>

<script>
import ePicker from '@/components/e-picker/e-picker.vue'
import uniPopup from '@/components/uni-popup/uni-popup.vue'
import uniPopupDialog from '@/components/uni-popup/uni-popup-dialog.vue'
export default {
	data() {
		return {
			id: null,
			subitems_name: '',
			subitems_description: '',
			subitems_periods: '',
			subitems_profit: '',
			subitems_fixation: '不定投',
			subitems_fixation_cost: '',
			subitems_fixation_low_cost: '',
			subitems_fixation_high_cost: '',
			subitems_fixation_list: ['不定投', '定投'],
			subitems_share: '1名',
			subitems_share_list: ['1名', '2名'],
			subitems_num: '1期',
			subitems_num_list: ['1期', '2期'],
			subitems_monthnum: '1次',
			subitems_monthnum_list: ['1次', '2次'],
			subitems_timemodel: '新历',
			subitems_new_onetime: 1,
			subitems_new_twotime: null,
			subitems_timemodel_list: ['新历', '农历'],
			subitems_old_show_onetime: '初一',
			subitems_old_show_twotime: '初一',
			subitems_old_onetime: null,
			subitems_old_twotime: null,
			delivered: 0, //已支付,
			earned_surplus: 0, //已获益
			subitems_time_list: [
				{
					label: '初一',
					value: '1'
				},
				{
					label: '初二',
					value: '2'
				},
				{
					label: '初三',
					value: '3'
				},
				{
					label: '初四',
					value: '4'
				},
				{
					label: '初五',
					value: '5'
				},
				{
					label: '初六',
					value: '6'
				},
				{
					label: '初七',
					value: '7'
				},
				{
					label: '初八',
					value: '8'
				},
				{
					label: '初九',
					value: '9'
				},
				{
					label: '初十',
					value: '10'
				},
				{
					label: '十一',
					value: '11'
				},
				{
					label: '十二',
					value: '12'
				},
				{
					label: '十三',
					value: '13'
				},
				{
					label: '十四',
					value: '14'
				},
				{
					label: '十五',
					value: '15'
				},
				{
					label: '十六',
					value: '16'
				},
				{
					label: '十七',
					value: '17'
				},
				{
					label: '十八',
					value: '18'
				},
				{
					label: '十九',
					value: '19'
				},
				{
					label: '二十',
					value: '20'
				},
				{
					label: '廿一',
					value: '21'
				},
				{
					label: '廿二',
					value: '22'
				},
				{
					label: '廿三',
					value: '23'
				},
				{
					label: '廿四',
					value: '24'
				},
				{
					label: '廿五',
					value: '25'
				},
				{
					label: '廿六',
					value: '26'
				},
				{
					label: '廿七',
					value: '27'
				},
				{
					label: '廿八',
					value: '28'
				},
				{
					label: '廿九',
					value: '29'
				},
				{
					label: '三十',
					value: '30'
				}
			],
			// ['初一', '初二', '初三', '初四', '初五', '初六', '初七', '初八', '初九', '初十', '十一', '十二', '十三', '十四', '十五', '十六',
			// 	'十七', '十八', '十九', '二十', '廿一', '廿二', '廿三', '廿四', '廿五', '廿六', '廿七', '廿八', '廿九', '三十'
			// ],
			subitems_newtime_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31],
			start_time: this.formatDate(new Date()),
			end_time: this.formatDate(new Date())
		};
	},
	onLoad: function(option) {
		//获取具体用户ID，用于关联创建的会子
		this.id = option.id;
		console.log(this.id )
	},
	methods: {
		selectFixation() {
			this.$refs.fixation.show();
		},
		selectShare() {
			this.$refs.share.show();
		},
		selectNum() {
			this.$refs.num.show();
		},
		selectMonthnum() {
			this.$refs.monthnum.show();
		},
		selectTimemodel() {
			this.$refs.timemodel.show();
		},
		selectOnetime() {
			this.$refs.onetime.show();
		},
		selectTwotime() {
			this.$refs.twotime.show();
		},
		getOneOldTime(data) {
			console.log(data);
			this.subitems_old_show_onetime = data.item.label;
			this.subitems_old_onetime = data.item.value;
		},
		getTwoOldTime(data) {
			this.subitems_old_show_twotime = data.item.label;
			this.subitems_old_twotime = data.item.value;
		},
		getEndtime(date) {
			//自动生成结束时间
			if (this.subitems_periods != '' && this.subitems_monthnum == '1次') {
				let integer = parseInt(this.subitems_periods / 12);
				let remainder = this.subitems_periods % 12;
				let endTimeArr = date.split('-');
				let end_timeY = Number(endTimeArr[1]) + remainder > 12 ? Number(endTimeArr[0]) + integer + 1 : Number(endTimeArr[0]) + integer;
				let end_timeM = (Number(endTimeArr[1]) + remainder) % 12 == 0 ? 12 : (Number(endTimeArr[1]) + remainder) % 12;
				end_timeM = end_timeM > 9 ? end_timeM : '0' + end_timeM;
				this.end_time = end_timeY + '-' + end_timeM + '-' + endTimeArr[2];
			}
			this.start_time = date;
		},
		formatDate(date) {
			var y = date.getFullYear();
			var m = date.getMonth() + 1;
			m = m < 10 ? '0' + m : m;
			var d = date.getDate();
			d = d < 10 ? '0' + d : d;
			return y + '-' + m + '-' + d;
		},

		random(min, max) {
			return Math.floor(Math.random() * (max - min)) + min;
		},

		createHuizi() {
			if (this.subitems_name && this.subitems_description && this.subitems_periods && this.subitems_profit) {
				let date = new Date();
				let endTimeArr = this.start_time.toString().split('-');
				let payment_num_y = date.getFullYear() - endTimeArr[0]; //当结束时间小于当前时间，存着bug
				let payment_num_m = date.getDate() >= endTimeArr[2] ? date.getMonth() + 1 - endTimeArr[1] : date.getMonth() - endTimeArr[1];
				let payment_num = payment_num_y * 12 + payment_num_m > this.subitems_periods ? this.subitems_periods : payment_num_y * 12 + payment_num_m;
				let  curr_index = payment_num +1 > this.subitems_periods ? this.subitems_periods : payment_num +1 ;
				let huizi_arr = [];
				let delivered = 0; //已支付
				let earned_surplus = 0; //已获益
				if (this.subitems_fixation == '不定投' && this.subitems_monthnum == '1次') {
					for (let i = 0; i < this.subitems_periods; i++) {
						huizi_arr[i] = {
							year: +endTimeArr[1] + (i % 12) > 12 ? +endTimeArr[0] + parseInt(i / 12) + 1 : +endTimeArr[0] + parseInt(i / 12),
							self_payment_num: i + 1,
							month: +endTimeArr[1] + (i % 12) > 12 ? +endTimeArr[1] + (i % 12) - 12 : +endTimeArr[1] + (i % 12),
							day: endTimeArr[2], //是否保留？数据结构有待优化
							cost: i >= payment_num ? 0 : this.random(+this.subitems_fixation_low_cost, +this.subitems_fixation_high_cost),
							today_isfull: false
						};
						delivered += Number(huizi_arr[i].cost);
					}
					this.delivered = delivered;
					this.earned_surplus = payment_num * this.subitems_profit - delivered;
				} else if (this.subitems_fixation == '定投' && this.subitems_monthnum == '1次') {
					for (let i = 0; i < this.subitems_periods; i++) {
						huizi_arr[i] = {
							year: +endTimeArr[1] + (i % 12) > 12 ? +endTimeArr[0] + parseInt(i / 12) + 1 : +endTimeArr[0] + parseInt(i / 12),
							self_payment_num: i + 1,
							month: +endTimeArr[1] + (i % 12) > 12 ? +endTimeArr[1] + (i % 12) - 12 : +endTimeArr[1] + (i % 12),
							day: endTimeArr[2], //是否保留？数据结构有待优化
							cost: i >= payment_num ? 0 : this.subitems_fixation_cost,
							today_isfull: false
						};
						delivered += Number(huizi_arr[i].cost);
					}
					this.delivered = delivered;
					this.earned_surplus = payment_num * this.subitems_profit - this.delivered;
				}
				let dataArr = {
					subitems_name: this.subitems_name, //项目名称
					subitems_description: this.subitems_description, //项目描述
					subitems_periods: this.subitems_periods, //项目总期数
					subitems_profit: this.subitems_profit, //死会金额
					subitems_share: this.subitems_share, //
					subitems_fixation: this.subitems_fixation, //项目是否定投，
					subitems_fixation_cost: this.subitems_fixation_cost, //项目定投模式下，每月缴费
					subitems_fixation_low_cost: this.subitems_fixation_low_cost, //项目不定投模式下，每月最低缴费
					subitems_fixation_high_cost: this.subitems_fixation_high_cost, //项目不定投模式下，每月最高缴费
					subitems_num: this.subitems_num, //会头缴纳期数
					subitems_timemodel: this.subitems_timemodel, //项目时间模式
					subitems_monthnum: this.subitems_monthnum, //月缴费期数
					subitems_new_onetime: this.subitems_new_onetime, //新历第一次缴费时间
					subitems_new_twotime: this.subitems_new_twotime, //新历第二次缴费时间
					subitems_old_show_onetime: this.subitems_old_show_onetime, //农历显示第一次缴费时间
					subitems_old_show_twotime: this.subitems_old_show_twotime, //农历显示农历第二次缴费时间
					subitems_old_onetime: this.subitems_old_onetime, //农历第一次缴费时间
					subitems_old_twotime: this.subitems_old_twotime, //农历第二次缴费时间
					start_time: this.start_time, //项目开始时间
					end_time: this.end_time, //项目结束时间
					payment_num: payment_num, //项目创建时，已缴纳的期数，
					curr_index: curr_index, //项目创建时的当期数
					huizi_arr: huizi_arr,
					delivered: this.delivered, //已支付
					earned_surplus: this.earned_surplus, //已获益
					isfull: false
				};
				let id_huizi = {};
				uni.getStorage({
					key: this.id + '_key',
					success: res => {
						id_huizi = {
							id: this.id + 'lyd' + Date.parse(new Date()),
						};
						res.data.self_huzi.push(Object.assign(id_huizi, dataArr));
						uni.setStorageSync(this.id + '_key', res.data);
						uni.navigateTo({
							url: '/pages/user/userdetail/index?id=' + this.id,
							animationType: 'pop-in',
							animationDuration: 200
						});
					}
				});
			} else {
				this.$refs.popup.open();
			}
		},
		close(done) {
			done();
		},
		confirm(done, value) {
			console.log(value);

			done();
		}
	},
	components: {
		ePicker,
		uniPopup,
		uniPopupDialog
	},
	watch: {
		subitems_monthnum(num) {
			console.log(num);
		}
	}
};
</script>

<style lang="less">
.form {
	&-one-title {
		color: rgba(128, 128, 128, 1);
		font-size: 13px;
		line-height: 150%;
		text-align: left;
		padding: 10upx 20upx;
		min-height: 30upx;
	}

	&-one {
		background-color: #ffffff;

		.form-row {
			display: flex;
			padding: 10upx 20upx;
			border-bottom: 1px solid #f1f1f1;

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
}

.create {
	margin-top: 30upx;
	width: 90%;
	color: rgba(255, 255, 255, 1);
}

.popup-warn {
	width: 540upx;
	height: 200upx;
	color: rgba(80, 80, 80, 1);
	background-color: rgba(255, 255, 255, 1);
	border-radius: 11px;
	font-size: 14px;
	line-height: 200upx;
	text-align: center;
}
/deep/ .uni-dialog-button{
	display: none !important;
}

/deep/ .uni-border-left{
	display: block !important;
	border: none;
	text-align: center;
	.uni-dialog-button-text{
		font-size: 35upx !important;
		line-height: 90upx;
	}
}	
</style>
