<template>
<div id="main-container">
    <Header></Header>
    <div class="appoit" v-bind:style="{minHeight: Height+'px'}">
        <el-card>
            <div>
                <el-steps :active="1" simple>
                    <el-step title="请选择预约时间" icon="el-icon-date"></el-step>
                    <el-step title="填写预约信息" icon="el-icon-edit"></el-step>
                    <el-step title="审核状态" icon="el-icon-loading"></el-step>
                </el-steps>
            </div>
            <div class="block">
                <el-date-picker :picker-options="pickerOptions" v-model="selectTime" type="date" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </div>
            <div class="block">
                <el-button type="primary" @click="next()">下一步</el-button>
            </div>
        </el-card>
        
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import venueApi from "@/api/venueAppoint";
import Footer from "@/components/footer";
import Header from "@/components/header";
export default {
    components: {
        Header,
        Footer
    },
    data() {
        return {
            Height:0,
            id: "",
            beginTime: "",
            endTime: "",
            reverseTime: [],
            selectTime: "",
            fullDay:[],
            pickerOptions: {
                disabledDate: (time) => {
                    return this.dealDisabledDate(time);
                },
            },
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.getVenueReserveTime();
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
            let times = new Array(this.reverseTime.length);
            for (var i = 0; i < this.reverseTime.length; i++) {
                times[i] = new Date(this.reverseTime[i]).getTime();
            }
            let days = new Array(this.fullDay.length);
            for (var i = 0; i < this.fullDay.length; i++) {
                days[i] = new Date(this.fullDay[i]).getTime();
            }
            return (
                time.getTime() < Date.now() - 24 * 60 * 60 * 1000 ||
                time.getTime() > Date.now() + 30 * 24 * 3600 * 1000 ||
                (times.indexOf(time.getTime()) > -1) ||
                (days.indexOf(time.getTime()) > -1) 

            );
        },

        getVenueReserveTime() {
            venueApi.getVenueReserveTime(this.id).then((response) => {
                var res = response.data.data;
                this.beginTime = res.beginTime;
                this.endTime = res.endTime;
                this.reverseTime = res.reverseTime;
            });
        },
        check() {},
        next() {
            if (this.reserveTime == "") {
                this.$alert("请选择预约时间", {
                    confirmButtonText: "确定",
                });
                return;
            }
            this.$router.push({
                path: "/appointment/venue/secondStep",
                query: {
                    id: this.id,
                    reserveTime: this.selectTime,
                },
            });
        },
    },
};
</script>

<style scoped>
.appoit {
    width: 60%;
    margin: 100px auto;
}

.block {
    margin: 50px auto;
    text-align: center;
}
</style>
