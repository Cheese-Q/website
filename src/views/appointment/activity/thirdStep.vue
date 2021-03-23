<template>
<div id="main-container">
    <Header></Header>
    <div class="appoit">
        <el-card>
            <div>
                <el-steps :active="3" simple>
                    <el-step title="请选择预约时间" icon="el-icon-date"></el-step>
                    <el-step title="填写预约信息" icon="el-icon-edit"></el-step>
                    <el-step title="预约信息" icon="el-icon-loading"></el-step>
                </el-steps>
            </div>
            <div class="icon">
                <i class="el-icon-success"></i>
            </div>
            <div class="text">
                <el-row>
                    <el-col>预约结果将以短信的形式发送至您的手机</el-col>
                </el-row>
                <el-row>
                    <el-col>预约结果可在个人中心查看，微信公众号同步</el-col>
                </el-row>
                <el-row>
                    <el-col>入馆费用请在入馆时现场支付</el-col>
                </el-row>
                <el-row>
                    <el-col>若您无法按时到馆，请您提前取消预约</el-col>
                </el-row>

            </div>
            <div class="block">
                <el-button type="primary" @click="next()" class="btn">查看审核结果</el-button>
            </div>
        </el-card>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import activityApi from "@/api/activity";
import Footer from "@/components/footer";
import Header from "@/components/header";
export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            id: "",
            appointTable: [{
                name: "",
                idClass: "",
                idCard: "",
                tel: "",
                show: "true",
            }, ],
        };
    },
    created() {
        this.id = this.$route.params.id;
    },
    methods: {

        next() {
            this.$router.push({
                path: "/personal/component/activity",
            });
        },
    },
};
</script>

<style scoped>
.appoit {
    width: 70%;
    margin: 100px auto;
}

.block {
    margin: 50px auto;
    text-align: center;
}

.btn {
    margin: 0 auto;
}

.icon {
    margin: 30px auto;
    text-align: center;
    color: #74c041;
    font-size: 100px;
}

.text {
    height: 120px;
    font-size: 20px;
    margin: 30px;
    color: #555;
    text-align: center;
}

.text .el-row {
    margin-top: 10px;
}
</style>
