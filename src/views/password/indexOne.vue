<template>
<div id="main-container">
    <Header></Header>
    <el-card class="login">
        <div class="text">
            <span>上虞文体公共服务平台</span>
        </div>
        <div>
            <el-steps :active="2" align-center>
                <el-step title="步骤1" description="手机号验证"> </el-step>
                <el-step title="步骤2" description="请输入新密码"></el-step>
                <el-step title="步骤3" description="新密码设置成功"></el-step>
            </el-steps>
            <el-form :model="pass" status-icon :rules="rules" ref="pass" label-width="100px" class="ruleForm">
                <el-form-item label="密码:" prop="password">
                    <el-input auto-complete="new-password" type="password" v-model="pass.password" placeholder="请输入密码,长度为8-16位,必须包含数字、字母和字符"></el-input>
                </el-form-item>
                <el-form-item label="确认密码:" prop="passwordAgain">
                    <el-input auto-complete="new-password" type="password" v-model="pass.passwordAgain" placeholder="确认密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="btn">
                <el-button @click="toLogin('pass')" type="primary">下一步</el-button>
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
import cookie from "js-cookie";
import {
    validatePass
} from "@/utils/validate";
export default {
    components: {
        Header,
        Footer
    },

    data() {
        var validatePass2 = (rule, value, callback) => {
            if (value === "") {
                callback(new Error("请再次输入密码"));
            } else if (value !== this.pass.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            pass: {
                code: "",
                mobile: "",
                password: "",
                passwordAgain: "",
            },
            rules: {
                password: [{
                    required: true,
                    validator: validatePass,
                    trigger: "blur",
                }, ],
                passwordAgain: [{
                    required: true,
                    validator: validatePass2,
                    trigger: "blur",
                }, ],
            },
        };
    },
    created() {
        this.pass.mobile = this.$route.params.mobile;
        this.pass.code = this.$route.params.code;
    },
    methods: {

        toLogin(pass) {
            this.$refs[pass].validate((valid) => {
                if (valid) {
                    if (this.pass.password === this.pass.passwordAgain) {
                        loginApi
                            .updatePassword(this.pass)
                            .then((response) => {
                                if (response.data.code == 200) {
                                    cookie.set("lc_token", "", {
                                    });
                                    cookie.set("lc_ucenter", "", {
                                    });
                                    this.$router.push({
                                        path: "/password/indexTwo",
                                    });
                                }
                                
                            })
                    }
                } else {
                    return false;
                }
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
