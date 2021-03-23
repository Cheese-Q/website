<template>
<div id="main-container">
    <Header></Header>
    <div class="personal">
        <div class="perLeft">
            <div class="img">
                <img :src="img" alt="">
            </div>
            <div class="name"></div>
            <el-menu :default-active="this.$route.path" class="el-menu-vertical-demo" router background-color="#E0D2C2" text-color="#555" >
                <el-menu-item index="/personal/component/userInfo">
                    <span slot="title">个人信息</span>
                </el-menu-item>
                <el-menu-item index="/personal/component/activity">
                    <span slot="title">活动预约</span>
                </el-menu-item>
                <el-menu-item index="/personal/component/venue">
                    <span slot="title">场馆预约</span>
                </el-menu-item>
                <el-menu-item index="/personal/component/subscribe">
                    <span slot="title">我的订阅</span>
                </el-menu-item>
                <el-menu-item index="/personal/component/reading">
                    <span slot="title">阅读记录</span>
                </el-menu-item>
            </el-menu>
        </div>
        <div class="perRight">
            <router-view></router-view>
        </div>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import Footer from "@/components/footer";
import Header from "@/components/header";
import cookie from "js-cookie";
import perApi from "@/api/personal";

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            img:"",
        };
    },
    created() {
        this.getImg();
    },
    methods: {
        getImg(){
            var v = JSON.parse(cookie.get("lc_ucenter"));
            this.img = v.avatar;
        },
    },
    mounted() {
    },
};
</script>

<style scoped>
.el-menu-item.is-active {
   background-color: #FAF5EB !important;
}

.el-menu-item {
    text-align: center;
}

.name {
    height: 20px;
    font-size: 14px;
    color: #555;
    line-height: 20px;
    text-align: center;
}

.img {
    width: 100px;
    height: 100px;
    margin: 36px auto;
    border-radius: 50%;
}

.img img {
    width: 100px;
    height: 100px;
    margin: 36px auto;
    border-radius: 50%;
}

.personal {
    width: 1238px;
    height: 832px;
    margin: 30px auto;
}

.perLeft {
    width: 206px;
    height: 832px;
    background-color: #E0D2C2;
    box-shadow: 5px 5px 20px #DADADA;
    display: inline-block;
    float: left;
    border-radius: 20px 0 0 20px;
}

.perRight {
    width: 1000px;
    height: 832px;
    display: inline-block;
    margin-left: 32px;
    background: #FFF;
    box-shadow: 5px 5px 20px #DADADA;
    border-radius: 0 20px 20px 0;
}

.bookList {
    width: 332px;
    height: 600px;
}

.book {
    width: 300px;
    width: 120px;
    background-color: rgba(43, 63, 134, 0.1);
}

#chart {
    width: 560px;
    height: 376px;
}
</style>
