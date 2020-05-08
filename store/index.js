import Vue from "vue" //引入vue
import Vuex from "vuex" // 引入vuex
Vue.use(Vuex) // 让vue使用vuex


// 通过vuex构造函数创建store对象
const store = new Vuex.Store({
	//将vuex中的值赋值给组件保存的变量，无法直接在标签中使用vuex的任何数据或者方法
	//栗子：this.$data.allMoney = this.$store.state.shopcar.allMoney
	state: {
		init_date:null,
	},
	//type对应的是vuex中保存的mutations的方法名，无论是保存到mutations还是保存到modules的mutations中，都能成功。
	// arguments 对应的是传过去的参数
	// this.$store.commit({
	// 	type:"changeAllMoney",
	// 	arguments: {
	// 		allMoney: allMoney
	// 	}
	// })

	mutations: {
		changeInitDate (state,initDate) {
			state.init_date = initDate.arguments.init_date
		}
	},
	//组件中调用vux中modules的state
	//this.$store.state.modules名.属性名
	//引入某个store对象import dialog_store from '../components/dialog_store.js';
	//做出这样的修改之后 , 我们将之前我们使用的 $store.state.show 统统改为 $store.state.dialog.show 即可。
	//store的子模块，内容就相当于是store的一个实例。调用方式和前面介绍的相似，只是要加上当前子模块名，如：store.a.getters.xxx()。
	// modules: {
	//     dialog: dialog_store
	// }
})
export default store //导出store对象
