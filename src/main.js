import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import axios from "axios";
import "./assets/common.css";
import "./assets/Normal.css";
import "./assets/iconfont/iconfont.css";
import "../node_modules/swiper/swiper-bundle.css";
import VueAwesomeSwiper from "vue-awesome-swiper/dist/ssr";
import BaiduMap from "vue-baidu-map";
import animated from "animate.css";
import "lib-flexible/flexible.js";
import $ from "jquery";
import "amfe-flexible";
import echarts from "echarts";
import cookie from "js-cookie";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload);
Vue.use(VueLazyload, {
    preLoad: 1.3,
    error: 'dist/error.png',
    loading: 'dist/loading.gif',
    attempt: 1
})
NProgress.configure({
    easing: 'ease',
    speed: 300,
    showSpinner: false,
    trickleSpeed: 200,
    minimum: 0.3,
})
router.afterEach(() => {
    NProgress.done()
})
router.beforeEach((to, from, next) => {
    NProgress.start();
    next();
    if (to.matched.some(record => record.meta.requireAuth)) {
        if (cookie.get("lc_token")) {
            next();
        } else {
            next({
                path: '/loginIn',
                query: { redirect: to.fullPath }
            })
        }
    } else {
        next();
    }
});
Vue.prototype.bus = new Vue;
Vue.prototype.$echarts = echarts;
Vue.use(animated);
Vue.use(BaiduMap, {
    ak: "jIgDL7VSrBtt0q80tpOyC9OQBrsrHmGz",
});
Vue.prototype.$http = axios;
Vue.use(ElementUI);
Vue.use(VueAwesomeSwiper);
Vue.config.productionTip = false;
new Vue({
    router,
    store,
    render: (h) => h(App),
}).$mount("#app");
(function() {
    var rem = document.createElement("script");
    rem.src = "./rem.js";
    document.body.appendChild(rem);
})();