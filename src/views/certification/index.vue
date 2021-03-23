<template>
<div id="main-container">
    <Header></Header>
    <el-card class="login">
        <div class="text">
            <span>上虞文体公共服务平台</span>
        </div>
        <el-form ref="certi" :rules="rules" :model="certi" label-width="120px">
            <el-form-item label="姓名:" prop="username">
                <el-input v-model="certi.userName" placeholder="请输入真实姓名"></el-input>
            </el-form-item>
            <el-form-item label="身份证号码:" prop="identity">
                <el-input v-model="certi.identity" placeholder="请输入身份证号码"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button :disabled="up" type="primary" @click="onSubmit()" class="btn">提交</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <Footer></Footer>
</div>
</template>

<script>
import certificationApi from "@/api/certification";
import loginApi from "@/api/login";
import Footer from "@/components/footer";
import Header from "@/components/header";
import cookie from "js-cookie";
export default {
    components: {
        Header,
        Footer
    },

    data() {
        return {
            up:false,
            certi: {},
            rules: {
                username: [{
                    required: true,
                    message: "请输入姓名",
                    trigger: "blur",
                }, ],
                identity: [{
                    required: true,
                    message: "请输入身份证号码",
                    trigger: "blur",
                }, ],
            },
        };
    },

    created() {},
    mounted() {},
    methods: {
        onSubmit() {
            var v = JSON.parse(cookie.get("lc_ucenter"));
            this.certi.id = v.id;
            certificationApi.identityVerify(this.certi).then((response) => {
                loginApi.getLoginUserInfo().then((response) => {
                    this.loginInfo = response.data.data.userInfo;
                    cookie.set("lc_ucenter", this.loginInfo, {
                        expires: 7,
                    });
                    this.up = true;
                    if(response.data.code==200){
                        this.$alert("实名认证成功", "提示", {
                    confirmButtonText: "确定",
                    callback: (action) => {
                        if (this.$route.query.redirect) {
                        let redirect = this.$route.query.redirect;
                        this.$router.push(redirect);
                    } else {
                        this.$router.push({
                            path: "/",
                        });
                      }
                    },
                });
                    } 
                });
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

.text {
    text-align: center;
    font-size: 21px;
    margin: 30px;
    color: #6a6a6a;
}

.btn {
    width: 100%;
}
</style>
