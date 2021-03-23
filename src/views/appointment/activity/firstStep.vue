<template>
<div id="main-container">
    <Header></Header>
    <div class="appoit" v-bind:style="{minHeight: Height+'px'}">
        <el-card>
            <div>
                <el-steps :active="1" simple>
                    <el-step title="请选择预约时间" icon="el-icon-date"></el-step>
                    <el-step title="填写预约信息" icon="el-icon-edit"></el-step>
                    <el-step title="预约信息" icon="el-icon-loading"></el-step>
                </el-steps>
            </div>
            <div class="block">
                <el-date-picker :picker-options="pickerOptions" v-model="reserveTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="block">
                <el-button type="primary" @click="next()" >下一步</el-button>
            </div>
        </el-card>
    </div>
    <div class="footer">
        <Footer></Footer>
    </div>
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
            Height:0,
            fullDay:[],
            id: "",
            reserveTime: "",
            activityInfo: {},
            pickerOptions: {
                disabledDate: (time) => {
                    return this.dealDisabledDate(time);
                },
            },
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.getActivityInfo();
        this.getFullDay();
    },
    mounted() {
       this.Height = document.documentElement.clientHeight - 350;  
       window.onresize = ()=> {this.Height = document.documentElement.clientHeight -100}

    },
    methods: {
        getFullDay() {
            venueApi.getFullDay(this.id).then(response=>{
                this.fullDay = response.data.data.fullDayList;
            })
        },
        dealDisabledDate(time) {
            let beginTime = new Date(this.activityInfo.beginTime);
            let endTime = new Date(this.activityInfo.endTime);
            let days = new Array(this.fullDay.length);
            for (var i = 0; i < this.fullDay.length; i++) {
                days[i] = new Date(this.fullDay[i]).getTime();
            }
            return (
                time.getTime() < beginTime.getTime() - 86400000 ||
                time.getTime() > endTime.getTime() ||
                time.getTime() < Date.now() - 24 * 60 * 60 * 1000 ||
                (days.indexOf(time.getTime()) > -1) 
            );
        },
        getActivityInfo() {
            activityApi.getActivityInfo(this.id).then((response) => {
                this.activityInfo = response.data.data.activityInfo;
            });
        },

        next() {
            if (this.reserveTime == "") {
                this.$alert("请选择预约时间", {
                    confirmButtonText: "确定",
                });
                return;
            }
            this.$router.push({
                path: "/appointment/activity/secondStep",
                query: {
                    id: this.id,
                    reserveTime: this.reserveTime,
                },
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
</style>
