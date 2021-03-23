<template>
<div class="in-wrap">
    <header id="header">
        <section class="container" :style="{width:scrollerWidth}">
            <div class="menu" >
                 <el-menu   router  class="el-menu-demo" mode="horizontal"  background-color="#AD8764" text-color="#fff" active-text-color="#274DA1">
                <el-menu-item index="/">
                    <!-- <div>
                        <img src="../assets/index/tb.png" alt class="img" />
                        <img src="../assets/index/wz.png" alt class="wz ml10" />
                    </div>             -->
                </el-menu-item>
                <el-menu-item index="/">
                    <div slot="title">首页</div>
                </el-menu-item>
                <el-submenu index="2">
                    <template  slot="title">公共信息服务</template>
                    <el-menu-item class="el-menu-item" index="/information/theatre">
                        <span slot="title">艺术推广服务中心</span>
                    </el-menu-item>
                    <el-menu-item index="/information/opera">
                        <span slot="title">公共文化服务中心 </span>
                    </el-menu-item>
                    <el-menu-item index="/information/info">
                        <span slot="title">文化市场</span>
                    </el-menu-item>
                    <el-menu-item index="/information/movie">
                        <span slot="title">影讯吧</span>
                    </el-menu-item>
                    <el-menu-item index="/information/performance">
                        <span slot="title">阳光文化演出</span>
                    </el-menu-item>
                    <el-menu-item index="/information/celadon">
                        <span slot="title">越窑青瓷研究传习中心</span>
                    </el-menu-item>
                    <el-menu-item index="/information/archaeological">
                        <span slot="title">考古遗址公园</span>
                    </el-menu-item>
                    <el-menu-item index="/information/cultureRoom">
                        <span slot="title">文化客厅</span>
                    </el-menu-item>
                </el-submenu>
                <el-submenu index="3">
                    <template slot="title">场馆直达</template>
                    <el-menu-item index="/venue/library">
                        <span slot="title">图书馆</span>
                    </el-menu-item>
                    <el-menu-item index="/venue/gym">
                        <span slot="title">体育馆</span>
                    </el-menu-item>
                    <el-menu-item index="/venue/museum">
                        <span slot="title">博物馆</span>
                    </el-menu-item>
                    <el-menu-item>
                        <span @click="toChaoXing()">数字文化馆</span>
                    </el-menu-item>
                    <el-menu-item index="/venue/bump">
                        <span slot="title">文物管理服务中心 </span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item index="/news">
                    <div slot="title">文化资讯</div>
                </el-menu-item>
                <el-menu-item index="/activity">
                    <div slot="title">活动预约</div>
                </el-menu-item>
                <el-menu-item index="/venueAppoint">
                    <div slot="title">场馆预约</div>
                </el-menu-item>
                <el-menu-item index="/culture">
                    <div slot="title">文化地图</div>
                </el-menu-item>
                <el-submenu index="4">
                    <template slot="title">更多</template>
                    <el-menu-item index="/about">
                        <div slot="title">关于我们</div>
                    </el-menu-item>
                    <el-menu-item index="/suggest">
                        <div slot="title">建言献策</div>
                    </el-menu-item>                    
                </el-submenu>
                 <el-submenu index="5" v-if="!userInfo.id">
                    <template slot="title" v-if="!userInfo.id">
                          <i class="el-icon-s-custom"></i>
                    </template>
                    <el-menu-item v-if="!userInfo.id" index="/loginIn">
                        <span slot="title">登录</span>
                    </el-menu-item> 
                    <el-menu-item v-if="!userInfo.id" index="/loginUp">
                        <span slot="title">注册</span>
                    </el-menu-item>                   
                </el-submenu>
                  <el-submenu index="5" v-if="userInfo.id">
                    <template slot="title" v-if="userInfo.id" index="/personal/component/userInfo">
                           <img width="30" height="30" :src="userInfo.avatar" @click="toPersonal()" style=" border-radius: 50%;" />
                    </template>
                    <el-menu-item v-if="userInfo.id">
                        <span slot="title"  @click="logout()">退出登录</span>
                    </el-menu-item>              
                </el-submenu>
            </el-menu> 
            </div>
        </section>
    </header>
</div>
</template>

<script>
import cookie from "js-cookie";
import headerApi from "@/api/header";
export default {
    name: "Header",
    data() {
        return {
            scrollerWidth:1440,
            screenWidth: 1440,
            userInfo: {
                id: "",
                mobile: "",
                avatar: "",
                passward: "",
                nickname: "",
                sex: "",
                age: "",
            },
        };
    },
    watch:{
     scrollerWidth:function(){
            return (window.innerWidth)+'px';
        }
    },
    mounted(){
        window.onresize = () =>{
            return (()=>{
                this.scrollerWidth = (window.innerWidth)+'px';
            })
        }
    },
    created() {
        this.showInfo();
    },
    mounted() {
        window.addEventListener("scroll", function () {
            let t = $("body, html").scrollTop(); 
            if (t > 0) {
                $(".box").addClass("box-active");
            } else {
                $(".box").removeClass("box-active");
            }
        });
        this.screenWidth = document.body.clientWidth; 
        this.user = localStorage.getItem("username");
        let that = this;
        window.addEventListener("resize", function () {
            return (() => {
                window.screenWidth = document.body.clientWidth;
                that.screenWidth = window.screenWidth;
            })();
        });
    },
    methods: {
        toChaoXing(){
            window.open('http://zhwt.shangyu.gov.cn:8001/');
        },
        infoList() {},
        logout() {
            cookie.set("lc_token", "", {
            });
            cookie.set("lc_ucenter", "", {
            });
            window.location.href = "/";
        },
        showInfo() {
            var userStr = cookie.get("lc_ucenter");

            if (userStr) {
                this.userInfo = JSON.parse(userStr);
            }
        },
        signUp() {
            this.$router.push({
                path: "/loginUp",
            });
        },
        signIn() {
            this.$router.push({
                path: "/loginIn",
            });
        },
        toPersonal() {
            this.$router.push({
                path: "/personal/component/userInfo",
            });
        },
    },
};
</script>

<style scoped>
.el-submenu>>>.el-submenu__title{
    padding:0 8px !important;
}

.el-menu-item {
    padding:0 16px !important;
}

.el-icon-s-custom {
    color: #fff;
}

.container {
    height: 60px;
    background-color: #AD8764;
}

.in-wrap {
    position: relative;
    height: 60px;
    z-index: 999;
}

.menu {
    width: 100%;
    min-width: 1220px; 
}

.el-menu-demo {
    align-content: center;
    height: 60px;
    width: 100%;
    left: 50%;
    transform: translate(-606px);
}

#header {
    width:100%;   
    position: fixed;
}

li {
    height: 60px;
    line-height: 60px;
}

.h-r-user img {
    border-radius: 50%;
}

.img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}
.wz {
       height: 30px;
       margin-right: 60px;
}
</style>
