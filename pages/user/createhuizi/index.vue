<template>
	<view class="">
		
		<button type="warn" class="but" @click="addData">完成</button>
		<lb-picker :list="list" v-model="selectedValue" ref="picker" @change="handleChange" @confirm="handleConfirm"></lb-picker>
		{{ selectedValue }}
		<nav-bar fontColor="#000" backState="1000" :home='false' :titleCenter="true" type="fixed" title="新增会子">
		</nav-bar>
		<view class="create-data">
			<view class="form">
				<view class="form-row">
					
				</view>
				
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				selectedValue:'',
				list: [
				  [
					{ label: '选项1', value: '1' },
					{ label: '选项2', value: '2' },
					{ label: '选项3', value: '3' }
				  ],
				  [
					{ label: '选项11', value: '11' },
					{ label: '选项22', value: '22' },
					{ label: '选项33', value: '33' }
				  ],
				  [
					{ label: '选项111', value: '111' },
					{ label: '选项222', value: '222' },
					{ label: '选项333', value: '333' }
				  ]
				],
				model:'multiSelector'
			}
		},
		methods:{
			addData(){
				this.$refs.picker.show() // 显示
			},
			handleConfirm (e) {
			  console.log(e.item.label) // 选项1
			},
			handleChange (e) {
			  if (e.change === 'init') {
			    console.log(e.item.label) // 单选 选项1
			    console.log(e.item.map(item => item.label).join('-')) // 多选 选项1-选项11
			  }
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
