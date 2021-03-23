<template>
<div id="main-container">
    <Header></Header>
    <el-card class="login">
        <div class="text">
            <span>上虞文体公共服务平台</span>
        </div>
        <div>
            <el-steps :active="3" align-center>
                <el-step title="步骤1" description="手机号验证"> </el-step>

                <el-step title="步骤2" description="请输入新密码"></el-step>
                <el-step title="步骤3" description="新密码设置成功"></el-step>
            </el-steps>
            <div class="icon">
                <i class="el-icon-success"></i>
            </div>
            <div class="text">
                <span>密码更改成功</span>
            </div>
            <div class="btn">
                <el-button @click="login()" type="primary">重新登录</el-button>
            </div>
        </div>
    </el-card>
    <Footer></Footer>
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
    data() {
        return {
            pass: {
                mobile: "",
                code: "",
            },
        };
    },
    methods: {
        login() {
            this.$router.push({
                path: "/loginIn",
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

.ruleForm {
    margin-top: 30px;
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
