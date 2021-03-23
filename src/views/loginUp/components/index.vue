<template>
<div id="main-container">
    <Header></Header>
    <el-card class="login">
        <div class="text">
            <span>上虞文体公共服务平台</span>
        </div>
        <div class="icon">
            <i class="el-icon-success"></i>
        </div>
        <div class="text">
            <span>注册成功</span>
        </div>
        <div class="btn">
            <el-button type="primary" @click="certification()">实名认证</el-button>
            <el-button type="success" @click="signIn()">直接登陆</el-button>
            <el-button type="primary" @click="toView()">返回首页</el-button>
        </div>
    </el-card>
    <Footer>
    </Footer>
</div>
</template>

<script>
import loginApi from "@/api/login";
import Footer from "@/components/footer";
import Header from "@/components/header";
export default {
    components: {
        Header,
        Footer
    },
    methods: {
        certification (){
            this.$router.push({
                path: "/certification",
            });
        },
        signIn() {
            this.$router.push({
                path: "/loginIn",
            });
        },
        toView() {
            this.$router.push({
                path: "/",
            });
        },
    },
};
</script>

<style scoped>
.login {
    width: 600px;
    margin: 100px auto;
}

.icon {
    margin: 40px auto;
    text-align: center;
    color: #74c041;
    font-size: 100px;
}

.text {
    text-align: center;
    font-size: 21px;
    margin: 30px;
    color: #6a6a6a;
}

.btn {
    text-align: center;
}
</style>
