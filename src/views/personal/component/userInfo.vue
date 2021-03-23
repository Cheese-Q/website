<template>
<div class="perLabel">
    <el-row>
        <el-col class="personalInfo">
            <span> 个人信息 </span>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="list">
        <el-row>
            <el-col :span="24" class="perLabel">
                <i class="el-icon-success"></i>
                个人信息:
            </el-col>
        </el-row>
        <el-row class="info">
            <el-col :span="6">真实姓名:</el-col>
            <el-col :span="18">{{ memberInfo.name }}</el-col>
        </el-row>
        <el-row class="info">
            <el-col :span="6">手机号码:</el-col>
            <el-col :span="18">{{memberInfo.mobile}}</el-col>
        </el-row>
        <el-row>
            <el-col :span="6" class="perLabel">
                <i class="el-icon-success"></i>
                修改密码:
            </el-col>
            <el-col :span="18">
                <span @click="updatePassword()" class="btn">修改密码</span>
            </el-col>
        </el-row>
        <el-row class="mt20">
            <el-col :span="6" class="perLabel">
                <i class="el-icon-success"></i>
                实名认证:
            </el-col>
            <el-col :span="18">
                <span v-if="this.memberInfo.identity">已实名</span>
                <el-button  v-else @click="getIdentity()" class="btn">实名认证</el-button>
            </el-col>
        </el-row>
    </div>
</div>
</template>

<script>
import cookie from "js-cookie";
export default {
    data() {
        return {
            up:true,
            memberInfo: {},
        }
    },
    created() {
        this.getMemberInfo();
    },
    methods: {
        getMemberInfo() {
            var v = JSON.parse(cookie.get("lc_ucenter"));
            this.memberInfo = v;
        },
        updatePassword() {
            this.$router.push({
                path: "/password",
            });
        },
        getIdentity() {
            this.$router.push({
                path: "/certification",
            });
        },
    }
}
</script>

<style scoped>
.btn {
    border: none;
    color: #5C86FD;
    cursor: pointer;
}

.list {
    width: 400px;
    height: 400px;
    margin: 50px 0 0 100px;
}

.perLabel {
    font-size: 14px;
    color: #000;
}

.person {
    width: 1200px;
    margin: 60px auto;
}

.portrait {
    width: 100px;
    height: 100px;
    border-radius: 50%;
    background-color: pink;
    margin: 10px auto;
}

.perLabel i {
    color: #52c41a;
    font-size: 14px;
}

.personalInfo span {
    font-size: 22px;
    line-height: 22px;
    float: left;
    color: #000;
    margin: 32px 0 0 32px;
}

.info {
    font-size: 14px;
    color: #555;
    margin: 20px 0;
}
</style>
