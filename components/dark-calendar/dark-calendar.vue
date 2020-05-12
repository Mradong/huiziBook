<template>
	<view class="sign-calendar">
		<view class="top-bar">
			<view @click="turning('prev')">上个月</view>
			<view>{{ y }}{{ text.year }}{{ m + 1 }}{{ text.month }}</view>
			<view @click="turning('next')">下个月</view>
		</view>

		<view class="week">
			<view class="week-day" v-for="(item, index) in weekDay" :key="index">{{ item }}</view>
		</view>

		<view :class="{ hide: !monthOpen }" class="content" :style="{ height: height }">
			<view :style="{ top: positionTop + 'upx' }" class="days">
				<view class="item" v-for="(item, index) in dates" :key="index">
					<view class="day" @click="selectOne(item, $event)" :class="{ choose: choose == `${item.year}-${item.month + 1}-${item.date}`, nolm: !item.lm }">
						{{ item.date }}
						<text class="old-time" :class="{ oldnolm: !item.lm }" v-if="!isSigned(item.year, item.month + 1, item.date)">{{ item.lunar }}</text>
					</view>

					<view class="sign" v-if="isSigned(item.year, item.month + 1, item.date)"></view>
					<view class="today-text" v-if="isToday(item.year, item.month, item.date)">今</view>
				</view>
			</view>
		</view>

		<image src="/static/dark-calendar/ico-arrow-up.png" mode="scaleToFill" @click="trgWeek()" class="weektoggel" :class="{ down: !monthOpen }"></image>
	</view>
</template>

<script>
import publicFnc from '@/static/js/public.js';

export default {
	name: 'dark-calendar',
	props: {
		// 第一列星期几
		weekstart: {
			type: Number,
			default: 7
		},

		// 是否展开
		open: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {
			text: {
				year: '年',
				month: '月',
				week: ['一', '二', '三', '四', '五', '六', '日'],
				today: '今'
			},
			y: new Date().getFullYear(), // 年
			m: new Date().getMonth(), // 月
			dates: [], // 当前月日期集合
			positionTop: 0,
			monthOpen: true,
			choose: '',
			signeddates: [],
			dateDetail: []
		};
	},
	created() {
		this.dates = this.monthDay(this.y, this.m);
		!this.open && this.trgWeek();
		this.getSignedDates(this.y, this.m);
		this.getToLunar();
		this.getTodayData();
	},
	mounted() {
		let date = new Date();
		let y = date.getFullYear();
		let m = date.getMonth();
		let d = date.getDate();
		this.choose = `${y}-${m + 1}-${d}`;
	},
	computed: {
		// 顶部星期栏目
		weekDay() {
			return this.text.week.slice(this.weekstart - 1).concat(this.text.week.slice(0, this.weekstart - 1));
		},
		height() {
			return (this.dates.length / 7) * 80 + 'upx';
		}
	},
	methods: {
		// 获取当前月份天数
		monthDay(y, m) {
			let firstDayOfMonth = new Date(y, m, 1).getDay(); // 当月第一天星期几
			let lastDateOfMonth = new Date(y, m + 1, 0).getDate(); // 当月最后一天
			let lastDayOfLastMonth = new Date(y, m, 0).getDate(); // 上一月的最后一天

			let dates = []; // 所有渲染日历
			let weekstart = this.weekstart == 7 ? 0 : this.weekstart; // 方便进行日期计算，默认星期从0开始
			let startDay = (() => {
				// 周初有几天是上个月的
				if (firstDayOfMonth == weekstart) {
					return 0;
				} else if (firstDayOfMonth > weekstart) {
					return firstDayOfMonth - weekstart;
				} else {
					return 7 - weekstart + firstDayOfMonth;
				}
			})();
			let endDay = 7 - ((startDay + lastDateOfMonth) % 7); // 结束还有几天是下个月的
			for (let i = 1; i <= startDay; i++) {
				//上一个月剩余天数的数据
				dates.push({
					date: lastDayOfLastMonth - startDay + i,
					day: weekstart + i - 1 || 7,
					month: m - 1 >= 0 ? m - 1 : 12,
					year: m - 1 >= 0 ? y : y - 1,
					lunar: ''
				});
			}

			for (let j = 1; j <= lastDateOfMonth; j++) {
				dates.push({
					date: j,
					day: (j % 7) + firstDayOfMonth - 1 || 7,
					month: m,
					year: y,
					lunar: '',
					lm: true
				});
			}
			for (let k = 1; k <= endDay; k++) {
				dates.push({
					//下一个月剩余天数的数据
					date: k,
					day: (lastDateOfMonth + startDay + weekstart + k - 1) % 7 || 7,
					month: m + 1 <= 11 ? m + 1 : 0,
					year: m + 1 <= 11 ? y : y + 1,
					lunar: ''
				});
			}
			return dates;
		},
		// 已经签到处理
		isSigned(y, m, d) {
			let flag = false;
			for (let i = 0; i < this.signeddates.length; i++) {
				let dy = `${y}-${m}-${d}`;

				if (this.signeddates[i] == dy) {
					flag = true;
					break;
				}
			}
			return flag;
		},
		isToday(y, m, d) {
			let date = new Date();
			return y == date.getFullYear() && m == date.getMonth() && d == date.getDate();
		},
		// 切换成周模式
		trgWeek() {
			this.monthOpen = !this.monthOpen;
			if (this.monthOpen) {
				this.positionTop = 0;
			} else {
				let index = -1;
				this.dates.forEach((i, x) => {
					this.isToday(i.year, i.month, i.date) && (index = x);
				});
				this.positionTop = -((Math.ceil((index + 1) / 7) || 1) - 1) * 80;
			}
		},
		//获取当天数据
		getTodayData() {
			let date = new Date();
			let y = date.getFullYear();
			let m = date.getMonth();
			let d = date.getDate();
			let lunar = publicFnc.calendar.solar2lunar(y, m + 1, d);
			let i = {
				date: d,
				month: m,
				year: y,
				lunar: lunar.IDayCn,
				lm: true
			};
			this.selectOne(i);
		},
		// 点击回调
		selectOne(i, event) {
			let date = `${i.year}-${i.month + 1}-${i.date}`;
			let iosDate = `${i.year}/${i.month + 1}/${i.date}`;
			let selectD = new Date(iosDate);
			
			console.log(this.m )
			console.log(selectD.getMonth() )
			if (selectD.getMonth() != this.m) {
				console.log('不在可选范围内');
				return false;
			}
			this.choose = date;
			this.$emit('on-click', i);
		},

		// 上个月，下个月
		turning(_action) {
			if (_action === 'next') {
				if (this.m + 1 == 12) {
					this.m = 0;
					this.y = this.y + 1;
				} else {
					this.m = this.m + 1;
				}
			} else {
				if (this.m + 1 == 1) {
					this.m = 11;
					this.y = this.y - 1;
				} else {
					this.m = this.m - 1;
				}
			}

			this.dates = this.monthDay(this.y, this.m);
			this.getSignedDates(this.y, this.m);
			this.getToLunar(this.dates);
		},
		//获取本月及前后打点数据，
		//打点时间取决了  首次、第二次等的时间，不取决于项目开始时间
		getSignedDates(y, m) {
			console.log(m);
			let keysArray = uni.getStorageSync('huizi_keys');
			let len = keysArray.length;
			let signed_data = [];
			let date_detail = [];
			if (keysArray) {
				for (let i = 0; i < len; i++) {
					uni.getStorage({
						key: i + '_key',
						success: res => {
							let huiziLen = res.data.self_huzi.length;
							for (let j = 0; j < huiziLen; j++) {
								let startTime = res.data.self_huzi[j].start_time.toString().split('-');
								let endTime = res.data.self_huzi[j].end_time.toString().split('-');
								let onetime = null;
								let twotime = null;
								if (startTime[0] <= y && y <= endTime[0]) {
									if (res.data.self_huzi[j].subitems_timemodel == '新历') {
										onetime = res.data.self_huzi[j].subitems_new_onetime;
										twotime = res.data.self_huzi[j].subitems_new_twotime == null ? false : res.data.self_huzi[j].subitems_new_twotime;
										signed_data.push(y + '-' + (m + 1) + '-' + onetime);
										signed_data.push(y + '-' + (m + 1) + '-' + twotime);
									} else {
										if (res.data.self_huzi[j].subitems_old_twotime == null) {
											//第一次缴费时间打点

											y = m == 0 ? y - 1 : y;
											m = m == 0 ? 12 : m;

											let tempTimeArr = publicFnc.calendar.lunar2solar(y, m, +res.data.self_huzi[j].subitems_old_onetime);
											signed_data.push(tempTimeArr.cYear + '-' + tempTimeArr.cMonth + '-' + tempTimeArr.cDay);
										} else {
											//第一次缴费时间打点
											for (let index = 0; index < 3; index++) {
												let tempTimeArr = publicFnc.calendar.lunar2solar(y, m + index, +res.data.self_huzi[j].subitems_old_onetime);
												signed_data.push(tempTimeArr.cYear + '-' + tempTimeArr.cMonth + '-' + tempTimeArr.cDay);
											}
											// //第二次缴费时间打点
											for (let index = 0; index < 3; index++) {
												let tempTimeArr = publicFnc.calendar.lunar2solar(y, m + index, +res.data.self_huzi[j].subitems_old_twotime);
												signed_data.push(tempTimeArr.cYear + '-' + tempTimeArr.cMonth + '-' + tempTimeArr.cDay);
											}
										}
									}
								}
							}
						}
					});
				}

				this.signeddates = signed_data;
			}
		},
		getToLunar() {
			let len = this.dates.length;
			for (let i = 0; i < len; i++) {
				let lunar = publicFnc.calendar.solar2lunar(this.dates[i].year, this.dates[i].month + 1, this.dates[i].date);
				this.dates[i].lunar = lunar.IDayCn;
			}
		}
	}
};
</script>

<style lang="scss" scoped>
.sign-calendar {
	color: #fff;
	font-size: 28upx;
	text-align: center;
	background-color: #ea6566;
	padding-bottom: 10upx;

	.top-bar {
		font-size: 28upx;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1upx solid rgba(255, 255, 255, 0.3);

		display: flex;

		> view {
			flex: 1;
		}
	}

	.week {
		display: flex;
		align-items: center;
		height: 80upx;
		line-height: 80upx;
		border-bottom: 1upx solid rgba(255, 255, 255, 0.2);

		view {
			flex: 1;
		}
	}

	.content {
		position: relative;
		overflow: hidden;
		transition: height 0.4s ease;

		.days {
			transition: top 0.3s;
			display: flex;
			align-items: center;
			flex-wrap: wrap;
			position: relative;

			.item {
				position: relative;
				display: block;
				height: 80upx;
				line-height: 80upx;
				width: calc(100% / 7);

				.day {
					font-style: normal;
					display: inline-block;
					vertical-align: middle;
					width: 80upx;
					height: 80upx;
					line-height: 60upx;
					overflow: hidden;
					border-radius: 60upx;

					&.choose {
						background-color: #477acc;
						color: #fff;
						box-shadow: 0 0 15px #477acc;
					}

					&.nolm {
						color: #fff;
						opacity: 0.3;
					}
				}

				.old-time {
					position: absolute;
					top: 28upx;
					right: 28upx;
					font-size: 12px;
				}

				.oldnolm {
					color: #fff;
					opacity: 0.3;
				}

				.sign {
					font-style: normal;
					width: 20upx;
					height: 20upx;
					background: #fff;
					border-radius: 10upx;
					position: absolute;
					left: 50%;
					margin-left: -10upx;
					bottom: 0;
					pointer-events: none;
					z-index: 9;
				}

				.today-text {
					position: absolute;
					font-size: 20upx;
					font-weight: normal;
					width: 20upx;
					height: 20upx;
					line-height: 20upx;
					right: 0;
					top: 10upx;
					color: #fff;
				}
			}
		}
	}

	.hide {
		height: 80upx !important;
	}

	.weektoggel {
		width: 80upx;
		height: 40upx;
		margin: 10upx auto 0;

		&.down {
			transform: rotate(180deg);
		}
	}
}
</style>
