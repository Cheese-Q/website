<template>
<div id="main-container">
    <Header></Header>
    <el-card class="login">
        <div class="text">
            <span>上虞文体公共服务平台</span>
        </div>
        <div>
            <el-steps :active="1" align-center>
                <el-step title="步骤1" description="手机号验证"> </el-step>
                <el-step title="步骤2" description="请输入新密码"></el-step>
                <el-step title="步骤3" description="新密码设置成功"></el-step>
            </el-steps>
            <el-form :model="pass" status-icon :rules="rules" ref="pass" label-width="100px" class="ruleForm">
                <el-form-item label="手机号:" prop="mobile">
                    <el-input @blur="phoneExist()" placeholder="请输入手机号" prefix-icon="el-icon-mobile" v-model="pass.mobile"></el-input>
                </el-form-item>
                <el-form-item label="验证码:" prop="code">
                    <el-input placeholder="请输入验证码" v-model="pass.code" class="signCode"></el-input>
                    <el-button v-show="show" @click="getCode()" class="fr" type="primary">{{ codeTest }}</el-button>
                    <el-button v-show="!show" class="count fr" type="primary" :disabled="true">重新获取（{{ count }}）秒</el-button>
                </el-form-item>
            </el-form>
            <div class="btn">
                <el-button @click="loginPassword()" type="primary">下一步</el-button>
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
            pass: {
                mobile: "",
                code: "",
            },
            verify: true,
            show: true,
            count: "",
            codeTest: "获取验证码",
            second: 60,
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
            },
        };
    },
    methods: {
        loginPassword() {
            loginApi.passwordCode(this.pass).then((response) => {
                if(response.data.code==200){
                    this.$router.push({
                    name: "updatePassword",
                    params: {
                        mobile: this.pass.mobile,
                        code: this.pass.code,
                    },
                });
                }
                
            });
        },
        phoneExist() {
            loginApi.phoneExist(this.pass.mobile).then((response) => {
                if (response.data.message != "200") {
                    this.$message({
                        message: "该手机号未注册",
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
        getCode() {
            if (this.pass.mobile == "") {
                this.$message({
                    message: "电话号码不能为空",
                    type: "warning",
                });
                return;
            }
            const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
            if (!reg.test(this.pass.mobile) && this.pass.mobile != "") {
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
                loginApi.send(this.pass.mobile).then((response) => {});
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

.signCode {
    width: 50%;
}
</style>
