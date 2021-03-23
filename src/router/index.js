import Vue from "vue";
import Router from "vue-router";
import Index from "@/views/index";
import Layout from "@/views/layout"

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [{
            path: "/",
            name: "首页",
            component: Index,
        },
        {
            path: "/activity",
            name: "活动预约",
            meta: {
                title: "活动预约"
            },
            component: Layout,
            redirect: "/activity",
            children: [{
                    path: "",
                    name: "活动列表展示",
                    meta: {
                        title: "活动列表展示"
                    },
                    component: () =>
                        import ("@/views/activity/index.vue"),
                },
                {
                    path: "detail/:id",
                    name: "活动详情",
                    meta: {
                        title: "活动详情"
                    },
                    component: () =>
                        import ("@/views/activity/detail/index.vue"),
                }
            ]
        },
        {
            path: "/appointment/activity/firstStep/:id",
            name: "活动预约第一步",
            component: () =>
                import ("@/views/appointment/activity/firstStep.vue"),
        },
        {
            path: "/appointment/activity/secondStep",
            name: "活动预约第二步",
            component: () =>
                import ("@/views/appointment/activity/secondStep.vue"),
        },
        {
            path: "/appointment/activity/thirdStep/:id",
            name: "活动预约第三步",
            component: () =>
                import ("@/views/appointment/activity/thirdStep.vue"),
        },
        {
            path: "/venueAppoint",
            name: "venueAppoint",
            meta: {
                title: "场馆预约"
            },
            redirect: "/venueAppoint",
            component: Layout,
            children: [{
                    path: "",
                    name: "场馆列表展示",
                    meta: {
                        title: "场馆列表展示"
                    },
                    component: () =>
                        import ("@/views/venueAppoint/index.vue"),
                },
                {
                    path: "detail/:id",
                    name: "场馆详情",
                    meta: {
                        title: "场馆详情"
                    },
                    component: () =>
                        import ("@/views/venueAppoint/detail/index.vue"),
                }
            ]
        },
        {
            path: "/appointment/venue/firstStep/:id",
            name: "场馆预约第一步",
            meta: {
                requireAuth: true,
            },
            component: () =>
                import ("@/views/appointment/venue/firstStep.vue"),
        },
        {
            path: "/appointment/venue/secondStep",
            name: "场馆预约第二步",
            meta: {
                requireAuth: true,
            },
            component: () =>
                import ("@/views/appointment/venue/secondStep.vue"),
        },
        {
            path: "/appointment/venue/thirdStep/:id",
            name: "场馆预约第三步",
            meta: {
                requireAuth: true,
            },
            component: () =>
                import ("@/views/appointment/venue/thirdStep.vue"),
        },
        {
            path: "/loginUp",
            name: "注册",
            component: () =>
                import ("@/views/loginUp/index.vue"),
        },
        {
            path: "/loginUp/components",
            name: "注册成功",
            component: () =>
                import ("@/views/loginUp/components/index.vue"),
        },
        {
            path: "/loginIn",
            name: "登陆",
            component: () =>
                import ("@/views/loginIn/index.vue"),
        },
        {
            path: "/password",
            name: "修改密码",
            component: () =>
                import ("@/views/password/index.vue"),
        },
        {
            path: "/password/indexOne",
            name: "updatePassword",
            component: () =>
                import ("@/views/password/indexOne.vue"),
        },
        {
            path: "/password/indexTwo",
            name: "修改密码第二步",
            component: () =>
                import ("@/views/password/indexTwo.vue"),
        },
        {
            path: "/certification",
            name: "实名认证",
            component: () =>
                import ("@/views/certification/index.vue"),
        },
        {
            path: "/information/theatre",
            name: "艺术推广服务中心",
            meta: {
                title: "艺术推广服务中心"
            },
            component: () =>
                import ("@/views/information/theatre/index.vue"),
        },
        {
            path: "/information/opera",
            name: "公共文化服务中心",
            meta: {
                title: "公共文化服务中心"
            },
            component: () =>
                import ("@/views/information/opera/index.vue"),
        },
        {
            path: "/information/opera/components",
            name: "公共文化服务中心活动预约清单",
            meta: {
                title: "详情列表"
            },
            component: () =>
                import ("@/views/information/opera/components/index.vue"),
        },
        {
            path: "/information/info",
            name: "文化市场",
            meta: {
                title: "文化市场"
            },
            component: () =>
                import ("@/views/information/info/index.vue"),
        },
        {
            path: "/information/archaeological",
            name: "考古",
            meta: {
                title: "凤凰山考古遗址公园"
            },
            component: () =>
                import ("@/views/information/archaeological/index.vue"),
        },
        {
            path: "/information/performance",
            name: "阳光文化演出",
            meta: {
                title: "阳光文化演出"
            },
            component: () =>
                import ("@/views/information/performance/index.vue"),
        },
        {
            path: "/information/movie",
            name: "影讯吧",
            meta: {
                title: "影讯吧"
            },
            component: () =>
                import ("@/views/information/movie/index.vue"),
        },
        {
            path: "/information/celadon",
            name: "上虞越窑青瓷研究传习中心",
            meta: {
                title: "上虞越窑青瓷研究传习中心"
            },
            component: () =>
                import ("@/views/information/celadon/index.vue"),
        },
        {
            path: "/information/cultureRoom",
            name: "文化客厅",
            meta: {
                title: "文化客厅"
            },
            component: () =>
                import ("@/views/information/cultureRoom/index.vue"),
        },
        {
            path: "/venue/library",
            name: "图书馆",
            meta: {
                title: "图书馆"
            },
            component: () =>
                import ("@/views/venue/library/index.vue"),
        },
        {
            path: "/venue/gym",
            name: "体育馆",
            meta: {
                title: "体育馆"
            },
            component: () =>
                import ("@/views/venue/gym/index.vue"),
        },
        {
            path: "/venue/museum",
            name: "博物馆",
            meta: {
                title: "博物馆"
            },
            component: () =>
                import ("@/views/venue/museum/index.vue"),
        },
        {
            path: "/venue/bump",
            name: "文物管理服务中心",
            meta: {
                title: "文物管理服务中心"
            },
            component: () =>
                import ("@/views/venue/bump/index.vue"),
        },
        {
            path: "/news",
            name: "内容列表",
            meta: {
                title: "内容列表"
            },
            redirect: "/news",
            component: Layout,

            children: [{
                path: "",
                name: "内容清单",
                meta: {
                    title: "内容清单"
                },
                component: () =>
                    import ("@/views/news/index.vue"),
            }, {
                path: "detail/:id",
                name: "内容详情",
                meta: {
                    title: "内容详情"
                },
                component: () =>
                    import ("@/views/news/detail/index.vue"),
            }, ]
        },
        {
            path: "/articleList",
            name: "文章列表",
            meta: {
                title: "文章列表"
            },
            component: () =>
                import ("@/views/articleList/index.vue"),
        },
        {
            path: "/personal",
            name: "个人中心",
            component: () =>
                import ("@/views/personal/index.vue"),
            children: [{
                    path: "/personal/component/userInfo",
                    name: "基础信息",
                    meta: {
                        requireAuth: true,
                    },
                    component: () =>
                        import ("@/views/personal/component/userInfo.vue"),
                },
                {
                    path: "/personal/component/activity",
                    name: "我的活动预约",
                    meta: {
                        requireAuth: true,
                    },
                    component: () =>
                        import ("@/views/personal/component/activity.vue"),
                },
                {
                    path: "/personal/component/venue",
                    name: "我的场馆预约",
                    meta: {
                        requireAuth: true,
                    },
                    component: () =>
                        import ("@/views/personal/component/venue.vue"),
                },
                {
                    path: "/personal/component/subscribe",
                    name: "订阅信息",
                    meta: {
                        requireAuth: true,
                    },
                    component: () =>
                        import ("@/views/personal/component/subscribe.vue"),
                },
                {
                    path: "/personal/component/reading",
                    name: "阅读记录",
                    meta: {
                        requireAuth: true,
                    },
                    component: () =>
                        import ("@/views/personal/component/reading.vue"),
                },
            ]
        },
        {
            path: "/culture",
            name: "文化地图",
            meta: {
                title: "文化地图"
            },
            component: () =>
                import ("@/views/culture/index.vue"),
        },
        {
            path: "/about",
            name: "关于我们",
            meta: {
                title: "关于我们"
            },
            component: () =>
                import ("@/views/about/index.vue"),
        },
        {
            path: "/suggest",
            name: "建言献策",
            meta: {
                title: "建言献策"
            },
            component: () =>
                import ("@/views/suggest/index.vue"),
        },
    ],
});
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
    return originalPush.call(this, location).catch(err => err)
}