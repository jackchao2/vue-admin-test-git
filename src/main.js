import 'babel-polyfill'
import Vue from 'vue';
import App from './App.vue';
import router from './router/index.js';
import store from './store/'
import 'element-ui/lib/theme-chalk/index.css';
import element from 'element-ui';
import './components/iconSvg'; // iconSvg
import './permission.js'
import './mock'; // mock数据

//hello 我是develop分支  测试成功dev_01
import i18n from './i18n'
Vue.config.productionTip = false
Vue.use(element)

new Vue({
    i18n,
    router,
    store,
    render: h => h(App)
}).$mount('#app')