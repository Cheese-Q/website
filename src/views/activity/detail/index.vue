<template>
<div id="main-container">
    <Header></Header>
    <Bread ></Bread>
    <el-card class="box-card">
        <el-row>
            <el-col :span="24">
                <div class="contentTitle">{{ activity.activeTitle }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="14" style="margin-top: 50px" class="activityImg">
                <div>
                    <img :src="this.activity.activeCover" alt />
                </div>
            </el-col>
            <el-col :span="10" style="margin-top: 60px">
                <div>
                    <el-row>
                        <el-col :span="6">活动时间:</el-col>
                        <el-col :span="18">{{ activity.timePart }}</el-col>
                    </el-row>
                    <el-row>
                            <el-col :span="6">
                                <div class="listContent">时间段:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ activity.beginPart }} - {{ activity.endPart }}</div>
                            </el-col>
                        </el-row>
                    <el-row>
                        <el-col :span="6">报名时间:</el-col>
                        <el-col :span="18">{{ activity.reservePart }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">所属场馆:</el-col>
                        <el-col :span="18">{{ activity.venue }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">详细地址:</el-col>
                        <el-col :span="18">{{ activity.address }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">联系电话:</el-col>
                        <el-col :span="6">{{ activity.telephone }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">收费标准:</el-col>
                        <el-col :span="18">{{ activity.cost }}元/人</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">单人人数上限:</el-col>
                        <el-col :span="18">{{ activity.maxPeople }}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div style="margin-top: 40px">
                                <el-button v-if="verifyDate() == 0" type="success" @click="toAppoint()">预约</el-button>
                                <el-button v-else-if="verifyDate(cols) == -1" :disabled="true" type="primary">未开始</el-button>
                                <el-button v-else-if="verifyDate(cols) == 1" :disabled="true" type="info">已结束</el-button>
                                <!-- <el-button v-else-if="cols.peopleCount < cols.maxPeople" :disabled="false" type="info">已结束</el-button> -->
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="margin-top: 50px">活动介绍：</el-col>
            <el-col :span="24" style="margin-top: 10px">
                <div class="ac" v-html="this.activity.activeDescription"></div>
            </el-col>
        </el-row>
    </el-card>
    <Footer></Footer>
</div>
</template>

<script>
import activityApi from "@/api/activity";
import Footer from "@/components/footer";
import Header from "@/components/header";
import cookie from "js-cookie";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Footer,
        Bread
    },
    data() {
        return {
            id: "",
            activity: {},
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.getActivityInfo();
    },
    mounted() {},
    methods: {
        verifyDate() {
            if (
                new Date().getTime() < new Date(this.activity.reserveBegin).getTime()
            ) {
                return -1;
            } else if (
                new Date().getTime() > new Date(this.activity.reserveEnd).getTime()
            ) {
                return 1;
            } else {
                return 0;
            }
        },
        toAppoint() {
            var v = "";
            v = cookie.get("lc_ucenter");
            if (v) {
                var mem = JSON.parse(v);

                if (!mem.identity) {
                this.$confirm("未实名，请先实名?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        this.$router.push({
                            path: "/certification",
                            query: { redirect: this.$route.fullPath }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "取消",
                        });
                    });
            } else {
                this.$router.push({
                    path: "/appointment/activity/firstStep/" + this.id,
                });
            }
            } else
             {
                this.$confirm(
                        "本次活动仅在登陆且实名认证后方可预约！请先登录",
                        "提示", {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning",
                        }
                    )
                    .then(() => {
                        this.$router.push({
                            path: "/loginIn",
                            query: { redirect: this.$route.fullPath }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "取消",
                        });
                    });
            }  
        },
        getActivityInfo() {
            activityApi.getActivityInfo(this.id).then((response) => {
                this.activity = response.data.data.activityInfo;
            });
        },
    },
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.box-card {
    width: 1200px;
    margin: 30px auto;
}

.contentTitle {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.85);
}

.activityImg img {
    height: 400px;
    width: 600px;
    padding: 5px;
}
.ac >>>img {
    max-width: 100%;
}
.el-col {
    font-size: 16px;
}
</style>
