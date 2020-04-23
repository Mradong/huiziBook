import Vue from 'vue'
import App from './App'
import zhouWeiNavBar from "@/components/zhouWei-navBar";
import table from '@/components/p-table/table/table.vue';
import LbPicker from '@/components/lb-picker'

Vue.component("lb-picker", LbPicker)
Vue.component("nav-bar", zhouWeiNavBar);
Vue.component('m-table',table);
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()

