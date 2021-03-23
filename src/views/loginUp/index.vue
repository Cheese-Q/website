<template>
<div id="main-container">
    <Header></Header>
    <el-card class="login">
        <div class="text">
            <span>上虞文体公共服务平台</span>
        </div>
        <el-form ref="signUp" :rules="rules" :model="signUp" label-width="120px">
            <el-form-item label="手机号码:" prop="mobile">
                <el-input @blur="phoneExist()" v-model="signUp.mobile" placeholder="请输入手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="password">
                <el-input auto-complete="new-password" type="password" v-model="signUp.password" placeholder="请输入密码,长度为8-16位,必须包含数字、字母和字符"></el-input>
            </el-form-item>
            <el-form-item label="确认密码:" prop="passwordAgain">
                <el-input auto-complete="new-password" type="password" v-model="signUp.passwordAgain" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-form-item label="验证码:" prop="code">
                <el-input v-model="signUp.code" placeholder="请输入验证码" style="width:60%"></el-input>
                <el-button v-show="show" @click="getCode()" class="fr" type="primary">{{ codeTest }}</el-button>
                <el-button v-show="!show" class="count" type="primary" :disabled="true">重新获取（{{ count }}）秒</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit('signUp')" class="btn">立即注册</el-button>
            </el-form-item>
            <el-form-item>
                <el-button class="btn bt" @click="getLogin()">已有帐户 直接登陆</el-button>
            </el-form-item>
        </el-form>
    </el-card>
    <Footer></Footer>
</div>
</template>

<script>
import loginApi from "@/api/login";
import Footer from "@/components/footer";
import Header from "@/components/header";
import {
    validatePass,
    validatePhone
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
            } else if (value !== this.signUp.password) {
                callback(new Error("两次输入密码不一致!"));
            } else {
                callback();
            }
        };
        return {
            verify: true,
            timer: null,
            show: true,
            codeTest: "获取验证码",
            count: "",
            isTimeDown: false,
            signUp: {
                mobile: "",
                password: "",
                passwordAgain: "",
                code: "",
            },
            rules: {
                mobile: [{
                    required: true,
                    validator: validatePhone,
                    trigger: "blur",
                }, ],
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
                code: [{
                    required: true,
                    message: "请输入验证码",
                    trigger: "blur",
                }, ],
            },
        };
    },

    created() {},
    mounted() {},
    methods: {
        getLogin() {
            this.$router.push({
                path: "/loginIn",
            });
        },
        phoneExist() {
            loginApi.phoneExist(this.signUp.mobile).then((response) => {
                if (response.data.message == "200") {
                    this.$message({
                        message: "该手机号已被注册",
                        type: "warning",
                    });
                    this.verify = false;
                } else {
                    if (!this.isTimeDown) {
                        this.verify = true;
                    }
                }
            });
        },
        onSubmit(signUp) {
            this.$refs[signUp].validate((valid) => {
                if (valid) {
                    loginApi.register(this.signUp).then((response) => {
                        if (response.data.code != 200) {
                        }  else {
                            
                            this.$router.push({
                                path: "/loginUp/components",
                            });
                        }
                    });
                } else {
                    return false;
                }
            });

        },
        getCode() {
            if (this.signUp.mobile == "") {
                this.$message({
                    message: "电话号码不能为空",
                    type: "warning",
                });
                return;
            }
            const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
            if (!reg.test(this.signUp.mobile) && this.signUp.mobile != "") {
                this.$message({
                    message: "请输入正确的手机号",
                    type: "warning",
                });
                return;
            }
            if (!this.verify) {
                this.$message({
                        message: "该手机号已被注册",
                        type: "warning",
                    });
                return;
            } else {
                this.timeDown();
                loginApi.send(this.signUp.mobile).then((response) => {});
            }
        },
        timeDown() {
            const TIME_COUNT = 60;
            if (!this.timer) {
                this.count = TIME_COUNT;
                this.show = false;
                this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME_COUNT) {
                        this.count--;
                    } else {
                        this.show = true;
                        clearInterval(this.timer);
                        this.timer = null;
                    }
                }, 1000);
            }
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

.bt {
    border: none;
}
</style>
