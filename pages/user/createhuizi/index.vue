<template>
	<view class="">

		<nav-bar fontColor="#000" backState="1000" :home='false' :titleCenter="true" type="fixed" title="新增会子">
		</nav-bar>
		<view class="create-data">
			<view class="form">
				<view class="form-row">
					<label class="form-row-title">子项目名称</label>
					<input type="text" maxlength="11" v-model="subitems_name" placeholder="请输入子项目名称" class="form-row-input " />
					<view class="warn" v-if="subitems_name == '' ? true : false">必填</view>
				</view>
				<view class="form-row">
					<label class="form-row-title">子项目描述</label>
					<input type="text" maxlength="11" v-model="subitems_description" placeholder="子项目描述" class="form-row-input " />
					<view class="warn" v-if="subitems_description == '' ? true : false">必填</view>
				</view>
				<view class="form-row">
					<label class="form-row-title">子项目总期数</label>
					<input type="text" maxlength="11" v-model="subitems_periods" placeholder="请输入子项目总期数" class="form-row-input " />
					<view class="warn" v-if="subitems_periods == '' ? true : false">必填</view>
				</view>
				<view class="form-row">
					<label class="form-row-title">子项目回报</label>
					<input type="text" maxlength="11" v-model="subitems_profit" placeholder="请输入子项目回报" class="form-row-input " />
					<view class="warn" v-if="subitems_profit == '' ? true : false">必填</view>
				</view>

				<view class="form-row">
					<label class="form-row-title">子项目是否定投</label>
					<view class="form-row-select" @click="selectFixation"> {{ subitems_fixation }} <text> > </text> </view>
					<lb-picker ref="fixation" v-model="subitems_fixation" :list="subitems_fixation_list"></lb-picker>
				</view>

				<view class="form-row">
					<label class="form-row-title">缴纳份额</label>
					<view class="form-row-select" @click="selectShare"> {{ subitems_share }} <text> > </text> </view>
					<lb-picker ref="share" v-model="subitems_share" :list="subitems_share_list"></lb-picker>
				</view>
				<view class="form-row">
					<label class="form-row-title">会头缴纳期数</label>
					<view class="form-row-select" @click="selectNum"> {{ subitems_num }} <text> > </text> </view>
					<lb-picker ref="num" v-model="subitems_num" :list="subitems_num_list"></lb-picker>
				</view>
				<view class="form-row">
					<label class="form-row-title">每月缴纳次数</label>
					<view class="form-row-select" @click="selectMonthnum"> {{ subitems_monthnum }} <text> > </text> </view>
					<lb-picker ref="timemodel" v-model="subitems_monthnum" :list="subitems_monthnum_list"></lb-picker>
				</view>
				
				<view class="form-row">
					<label class="form-row-title">缴纳时间模式</label>
					<view class="form-row-select" @click="selectTimemodel"> {{ subitems_timemodel }} <text> > </text> </view>
					<lb-picker ref="monthnum" v-model="subitems_timemodel" :list="subitems_timemodel_list"></lb-picker>
				</view>
				
				<view class="form-row">
					<label class="form-row-title">首次缴纳时间</label>
					<view class="form-row-select" @click="selectOnetime" v-if=" subitems_timemodel == '新历' ">
						<view class="form-row-select-time">(新历)</view> {{ subitems_onetime }} 号<text> > </text>
					</view>
					<lb-picker ref="onetime" v-model="subitems_onetime" :list="ssubitems_time_list"></lb-picker>
				</view>
				<view class="form-row" v-if=" subitems_monthnum == '2次'">
					<label class="form-row-title">再次缴纳时间</label>
					<view class="form-row-select" @click="selectTwotime">
						<view class="form-row-select-time">(新历)</view> {{ subitems_twotime }} 号<text> > </text>
					</view>
					<lb-picker ref="twotime" v-model="subitems_twotime" :list="ssubitems_time_list"></lb-picker>
				</view>

				<view class="form-row">
					<label class="form-row-title">子项目开始时间</label>
					<ePicker startYear="2015" endYear="2030" mode="date" :defaultValue="start_time" @btnConfirm="confirm" class="form-row-select">
						<view class="time">{{ start_time }}<text> > </text></view>
					</ePicker>
				</view>
				<view class="form-row">
					<label class="form-row-title">子项目结束时间</label>
					<view class="form-row-select"> {{ end_time }} <text style="color: #fff;"> > </text> </view>
						
					</ePicker>
				</view>

			</view>
		</view>
		<button type="warn" class="create" @click="createHuizi">完成</button>
	</view>
</template>

<script>
	import ePicker from '@/components/e-picker/e-picker.vue'

	export default {
		data() {
			return {
				id:null,
				subitems_name: '',
				subitems_description: '',
				subitems_periods: '',
				subitems_profit: '',
				subitems_fixation: '不定投',
				subitems_fixation_list: ['不定投', '定投'],
				subitems_share: "1名",
				subitems_share_list: ["1名", "2名"],
				subitems_num: '1期',
				subitems_num_list: ["1期", "2期"],
				subitems_timemodel:'新历',
				subitems_timemodel_list: ["新历", "农历"],
				subitems_monthnum: '1次',
				subitems_monthnum_list: ["1次", "2次"],
				subitems_onetime: 1,
				subitems_twotime: null,
				ssubitems_time_list: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26,
					27, 28
				],
				start_time: this.formatDate ( new Date() ),
				end_time: this.formatDate ( new Date() ),

			}
		},
		onLoad: function(option) {
			//获取具体用户ID，用于关联创建的会子
			this.id = option.id;
			
		},
		methods: {
			selectFixation() {
				this.$refs.fixation.show() // 定投选择显示
			},
			selectShare() {
				this.$refs.share.show() // 缴纳期数显示
			},
			selectNum() {
				this.$refs.num.show() // 缴纳期数显示
			},
			selectMonthnum() {
				this.$refs.monthnum.show() // 缴纳期数显示
			},
			selectTimemodel(){
				this.$refs.timemodel.show() // 缴纳期数显示
			},
			selectOnetime() {
				this.$refs.onetime.show() // 缴纳期数显示
			},
			selectTwotime() {
				this.$refs.twotime.show() // 缴纳期数显示
			},
			confirm( date ) {
				if( this.subitems_periods != '' &&  this.subitems_monthnum == "1次"){
					let integer = parseInt(this.subitems_periods/ 12 ) 
					let remainder  = this.subitems_periods % 12 ;
					let endTimeArr = date.split('-');
					
					let end_timeY = Number(endTimeArr[0]) + integer;
					let end_timeM =  ( Number(endTimeArr[1]) + remainder )< 10 ? '0' + ( Number(endTimeArr[1]) + remainder ):( Number(endTimeArr[1]) + remainder );
					this.end_time = end_timeY + '-'+ end_timeM + '-'+ endTimeArr[2];
					console.log( this.end_time );
				}
				this.start_time= date;

			},
			formatDate( date ){
				var y = date.getFullYear(); 
				var m = date.getMonth() + 1; 
				m = m < 10 ? '0' + m : m; 
				var d = date.getDate(); 
				d = d < 10 ? ('0' + d) : d; 
				return y + '-' + m + '-' + d; 
			},
			createHuizi(){
				if( this.subitems_name && this.subitems_description && this.subitems_periods && this.subitems_profit && this.end_time !=this.formatDate ( new Date() )){
					let dataArr ={
						subitems_name:this.subitems_name,
						subitems_description:this.subitems_description,
						subitems_periods: this.subitems_periods,
						subitems_profit :this.subitems_profit,
						subitems_share:this.subitems_share,
						subitems_num:this.subitems_num,
						subitems_monthnum:this.subitems_monthnum,
						subitems_new_onetime:this.subitems_onetime,
						subitems_new_twotime:this.subitems_twotime,
						start_time:this.start_time,
						end_time:this.end_time,
						isfull:true
					}
					
					
					
				}
			}
		},
		components: {
			ePicker
		},
		watch:{
			subitems_monthnum( num ){
				console.log( num )
			}
		}
	}
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
				color: grey;
				text-align: left;
			}

			&-input {
				flex: 5;
				height: 100rpx;
				text-align: left;
			}

			&-select {
				flex: 2;
				text-align: left;
				
				text {
					color: grey;
					position: absolute;
					top: 0;
					right: 15rpx;
					font-size: 60rpx;

				}
				view.time{
					color: #000;
				}
				view {
					color: grey;
					padding-right: 20rpx;
					display: inline-block;
				}
			}
		}
	}
	.create{
		
		margin-top: 200rpx;
		width: 90%;
		color: #fff;
	}
</style>
