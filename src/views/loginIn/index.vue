<template>
<div id="main-container">
    <Header></Header>
    <div class="view">
        <div><img src="../../assets/2.jpeg" alt=""></div>
        <el-card class="login">
            <div class="text">
                <span>上虞文体公共服务平台</span>
            </div>
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="验证码登陆" name="first">
                    <el-form :model="signIn" status-icon :rules="rules" ref="signIn" label-width="100px" class="ruleForm">
                        <el-form-item label="手机号:" prop="mobile">
                            <el-input @blur="phoneExist()" placeholder="请输入手机号" prefix-icon="el-icon-mobile" v-model="signIn.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="验证码:" prop="code">
                            <el-input placeholder="请输入验证码" v-model="signIn.code" class="signCode"></el-input>
                            <el-button v-show="show" @click="getCode()" class="fr" type="primary">{{ codeTest }}</el-button>
                            <el-button v-show="!show" class="count fr" type="primary" :disabled="true">重新获取（{{ count }}）秒</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loginCode(signIn)" type="primary" class="btn">登 陆</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="btn" @click="signUp()">注册账户</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="密码登陆" name="second">
                    <el-form :model="signIn" status-icon :rules="rules" ref="signIn" label-width="16%" class="ruleForm">
                        <el-form-item label="手机号:" prop="mobile">
                            <el-input @blur="phoneExist()" placeholder="请输入手机号" prefix-icon="el-icon-mobile" v-model="signIn.mobile"></el-input>
                        </el-form-item>
                        <el-form-item label="密码:" prop="password">
                            <el-input placeholder="请输入密码" auto-complete="new-password" type="password" prefix-icon="el-icon-lock" v-model="signIn.password"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button @click="loginPassword()" type="primary" class="btn">登 陆</el-button>
                        </el-form-item>
                        <el-form-item>
                            <el-button class="bt" @click="signUp()">注册账户</el-button>
                            <el-button class="bt" @click="forget()">忘记密码</el-button>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </el-card>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import loginApi from "@/api/login";
import Footer from "@/components/footer";
import Header from "@/components/header";
import cookie from "js-cookie";
import {
    validatePhone
} from "@/utils/validate";
export default {
    components: {
        Header,
        Footer
    },

    data() {
        return {
            verify: true,
            isTimeDown: false,
            activeName: "first",
            timer: null,
            show: true,
            count: "",
            codeTest: "获取验证码",
            second: 60,
            signIn: {
                mobile: "",
                password: "",
                code: "",
            },

            rules: {
                mobile: [{
                    required: true,
                    validator: validatePhone,
                    trigger: "blur",
                }, ],
                code: [{
                    required: true,
                    message: "请输入验证码",
                    trigger: "blur",
                }, ],
                password: [{
                    required: true,
                    message: "请输入密码",
                    trigger: "blur",
                }, ],
            },
        };
    },

    created() {},
    mounted() {},
    methods: {
        signUp() {
            this.$router.push({
                path: "/loginUp",
            });
        },
        forget() {
            this.$router.push({
                path: "/password",
            });
        },
        handleClick(tab, event) {},
        loginPassword() {
            loginApi.loginPassword(this.signIn).then((response) => {
                if(response.data.code==200){
                    cookie.set("lc_token", response.data.data.token, {
                    expires: 7,
                });
                this.getUserInfo();
                }
                
            });
        },
        phoneExist() {
            loginApi.phoneExist(this.signIn.mobile).then((response) => {
                if (response.data.message != "200") {
                    this.$message({
                        message: "该手机号未注册",
                        type: "warning",
                    });

                    this.verify = false;
                } else {
                    this.verify = true;
                }
            });
        },
        getCode() {
            if (this.signIn.mobile == "") {
                this.$message({
                    message: "电话号码不能为空",
                    type: "warning",
                });
                return;
            }
            const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
            if (!reg.test(this.signIn.mobile) && this.signIn.mobile != "") {
                this.$message({
                    message: "请输入正确的手机号",
                    type: "warning",
                });
                return;
            }
            this.phoneExist();
            if (!this.verify) {
                return;
            } else {
                this.timeDown();
                loginApi.send(this.signIn.mobile).then((response) => {});
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
        loginCode() {
            if (this.signIn.code == "") {
                this.$message({
                    message: "请输入验证码",
                    type: "warning",
                });
                return;
            }
            loginApi.loginCode(this.signIn).then((response) => {
                if(response.data.code==200){
                    cookie.set("lc_token", response.data.data.token, {
                        expires: 7,
                    });
                    this.getUserInfo();
                }
            });
        },
        getUserInfo() {
            loginApi.getLoginUserInfo().then((response) => {
                this.loginInfo = response.data.data.userInfo;
                cookie.set("lc_ucenter", this.loginInfo, {
                    expires: 7,
                });
                var v = "";
                v = cookie.get("lc_ucenter");
                if (v != "") {
                    if (this.$route.query.redirect) {
                        let redirect = this.$route.query.redirect;
                        this.$router.push(redirect);
                    } else {
                        this.$router.push({
                            path: "/",
                        });
                    }

                }
            });
        },
    },
};
</script>

<style scoped>
.view {
    width: 100%;
    position: relative;
}

.view img {
    width: 100%;
}

.login {
    position: absolute;
    width: 600px;
    left: 50%;
    top: 140px;
    transform: translate(-50%, 0);
}

.text {
    text-align: center;
    font-size: 21px;
    margin: 30px;
    color: #6a6a6a;
}

.ruleForm {
    margin-top: 30px;
}

.signCode {
    width: 50%;
}

.mw {
    margin-top: 30px;
}

.btn {
    width: 100%;
    border: none;
}

.bt {
    border: none;
    width: 30%;
    margin: 0 40px;
}
</style>
