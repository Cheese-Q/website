<template>
<div id="main-container">
    <Header></Header>
    <Bread ></Bread>
    <el-card class="box-card">
        <el-row>
            <el-col :span="24">
                <div class="contentTitle">{{ venueInfo.venue }}</div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="14" style="margin-top: 50px">
                <div class="venueImg">
                    <img :src="this.venueInfo.cover" alt />
                </div>
            </el-col>
            <el-col :span="10" style="margin-top: 60px">
                <div>
                    <el-row>
                        <el-col :span="6">地点名称:</el-col>
                        <el-col :span="18">{{ venueInfo.venueSpace }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">报名时间:</el-col>
                        <el-col :span="18">{{ venueInfo.timePart }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">开放时间:</el-col>
                        <el-col :span="18">{{ venueInfo.reservePart }}</el-col>
                    </el-row>
                    <el-row>
                            <el-col :span="6">
                                <div class="listContent">时间段:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ venueInfo.beginPart }} - {{ venueInfo.endPart }}</div>
                            </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">详细地址:</el-col>
                        <el-col :span="18">{{ venueInfo.address }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">联系电话:</el-col>
                        <el-col :span="6">{{ venueInfo.telephone }}</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">收费标准:</el-col>
                        <el-col :span="18">{{ venueInfo.cost }}元/人</el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="6">单日人数上限:</el-col>
                        <el-col :span="18">{{ venueInfo.maxPeople }}</el-col>
                    </el-row>
                    <el-row :gutter="20">
                        <el-col :span="12">
                            <div style="margin-top: 40px">
                                <el-button v-if="verifyDate() == 0" type="primary" @click="toAppoint()">预约</el-button>
                                <el-button v-else-if="verifyDate() == -1" :disabled="true">未开始</el-button>
                                <el-button v-else-if="verifyDate() == 1" :disabled="true">已结束</el-button>
                            </div>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24" style="margin-top: 50px">场馆介绍：</el-col>
            <el-col :span="24" style="margin-top: 10px">
                <div class="ac" v-html="this.venueInfo.venueDescription"></div>
            </el-col>
        </el-row>
    </el-card>
    <Footer></Footer>
</div>
</template>

<script>
import cookie from "js-cookie";
import venueApi from "@/api/venueAppoint";
import Footer from "@/components/footer";
import Header from "@/components/header";
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
            venueInfo: {},
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.getVenueReserveInfo();
    },
    mounted() {},
    methods: {
        
        verifyDate() {
            if (new Date().getTime() < new Date(this.venueInfo.beginTime).getTime()) {
                return -1;
            } else if (
                new Date().getTime() > new Date(this.venueInfo.endTime).getTime()
            ) {
                return 1;
            } else {
                return 0;
            }
        },
        toAppoint() {
            var v = cookie.get("lc_ucenter");
            if (v) {
                var mem = JSON.parse(v);
                if (!mem.identity) {
                this.$confirm("未实名，请先实名?", "提示", {
                        confirmButtonText: "去实名",
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
                    path: "/appointment/venue/firstStep/" + this.id,
                  });
              }
            } else  {
                this.$confirm("场馆仅在登陆且实名认证后方可预约！请先登录", "提示", {
                        confirmButtonText: "去登录",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
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
        getVenueReserveInfo() {
            venueApi.getVenueReserveInfo(this.id).then((response) => {
                this.venueInfo = response.data.data.venueInfo;
            });
        },
    },
};
</script>

<style scoped>
.venueImg {
    height: 400px;
    width: 600px;
    padding: 5px;
}

.venueImg img {
    height: 400px;
    width: 600px;
}

.el-col {
    font-size: 16px;
}

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
.ac >>>img {
    max-width: 100%;
}
</style>
