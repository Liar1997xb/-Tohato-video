import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import less from 'less'
import axios from 'axios'
import './plugin/vant'
import 'lib-flexible'
import fastClick from 'fastclick'
import 'normalize.css/normalize.css'
import './assets/border.css'
import '../public/global.css'
import './assets/iconfont/iconfont.css'
Vue.use(less)

axios.defaults.baseURL = 'https://baobab.kaiyanapp.com'
Vue.prototype.$http = axios

Vue.config.productionTip = false
fastClick.attach(document.body)

Vue.filter('formatDate', function(date) {
    var d = new Date(date)
    var year = d.getFullYear()
    var month = '' + (d.getMonth() + 1)
    var day = '' + d.getDate()

    if (month.length < 2) {
        month = '0' + month
    }
    if (day.length < 2) {
        day = '0' + day
    }

    return [year, month, day].join('-');
})

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')