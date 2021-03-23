<template>
<div class="perLabel">
    <el-row>
        <el-col class="personalInfo">
            <span> 场馆预约 </span>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="activityList">
        <el-table :data="venue" stripe style="width: 100%;height:90%"  :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
            <el-table-column prop="venue" label="场馆" min-width="20%"></el-table-column>
            <el-table-column prop="reserveTime" label="预约时间" min-width="20%"></el-table-column>
            <el-table-column prop="userName" label="预约人" min-width="20%"></el-table-column>
            <el-table-column prop="verify" label="状态" min-width="20%">
                <template slot-scope="scope">
                    <span v-if="scope.row.verify == 1">已通过</span>
                    <span v-else-if="scope.row.verify == 0">未审核</span>
                    <span v-else-if="scope.row.verify == -2">已取消</span>
                    <span v-else style="color:#FF0000">未通过</span>
                </template>
            </el-table-column>
            <el-table-column fixed="right" label="操作" min-width="20%">
                <template slot-scope="scope">
                    <el-button type="text" size="small" @click="cancellation(scope.row)" :disabled="scope.row.verify==-1||scope.row.verify==-2?true:false">取消预约</el-button>
                    <el-button type="text" size="small" @click="appointmentAgain(scope.row)" :disabled="scope.row.verify==1||scope.row.verify==0?true:false">重新预约</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-pagination background layout="prev, pager, next" :total="total" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    </el-pagination>
</div>
</template>

<script>
import Footer from "@/components/footer";
import Header from "@/components/header";
import cookie from "js-cookie";
import perApi from "@/api/personal";

export default {
    components: {
        Header,
        Footer,
    },

    data() {
        return {
            total: 0,
            current: 1,
            limit: 10,
            venue: [],
            memberId: "",
            tableHeight: window.innerHeight - 200,
        };
    },

    created() {
        this.getReserveVenue();
    },

    methods: {
        appointmentAgain(row) {
            this.$router.push({
                path: "/venueAppoint/detail/" + row.venueId,
            });
        },
        cancellation(row) {
            this.$confirm("此操作将取消当前预约, 是否继续?", "提示", {
                    confirmButtonText: "确定",
                    cancelButtonText: "取消",
                    type: "warning",
                })
                .then(() => {
                    perApi
                        .offReserveVenue(row.id)
                        .then((response) => {
                            this.$message({
                                type: "success",
                                message: "您已成功取消预约!",
                            });
                            this.getReserveVenue();
                        });
                })
                .catch(() => {
                    this.$message({
                        type: "info",
                        message: "已取消",
                    });
                });
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getReserveVenue();
        },
        handleCurrentChange(val) {
            this.current = val;
            this.getReserveVenue();
        },
        getReserveVenue() {
            var v = cookie.get("lc_ucenter");
            if (v != undefined) {
                v = JSON.parse(v);
            }
            this.memberId = v.id;
            perApi
                .getReserveVenue(this.current, this.limit, this.memberId)
                .then((response) => {
                    this.venue = response.data.data.reserveVenue;
                    this.total = response.data.data.total;
                });
        },
    },

};
</script>

<style scoped>
.activityList {
    width: 930px;
    margin: auto;
}

.perLabel {
    font-size: 14px;
    color: #000;
    height: 100%;
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
}
</style>
