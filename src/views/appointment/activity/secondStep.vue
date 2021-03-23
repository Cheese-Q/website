<template>
<div id="main-container">
    <Header></Header>
    <div class="appoit">
        <el-card>
            <div>
                <el-steps :active="2" simple>
                    <el-step title="请选择预约时间" icon="el-icon-date"></el-step>
                    <el-step title="填写预约信息" icon="el-icon-edit"></el-step>
                    <el-step title="预约信息" icon="el-icon-loading"></el-step>
                </el-steps>
            </div>

            <div class="block">
                <el-table :data="appointTable" stripe :header-cell-style="{ background: '#eef1f6', color: '#606266' }">
                    <el-table-column label="姓名">
                        <template slot-scope="scope">
                            <div>
                                <el-input v-model="scope.row.userName" placeholder="请填写姓名"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="证件类型">
                        <template>
                            <div>身份证</div>
                        </template>
                    </el-table-column>
                    <el-table-column label="证件号码">
                        <template slot-scope="scope">
                            <div>
                                <el-input v-model="scope.row.identity" placeholder="请填写证件号码"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="手机号">
                        <template slot-scope="scope">
                            <div>
                                <el-input v-model="scope.row.mobile" placeholder="请填写手机号码"></el-input>
                            </div>
                        </template>
                    </el-table-column>
                    <el-table-column label="操作" width="160px">
                        <template slot-scope="scope">
                            <el-button type="success" size="mini" icon="el-icon-circle-plus-outline" v-if="scope.row.show === 'true'" plain @click="pushNewAppoint(scope.$index)"></el-button>
                            <el-button type="danger" size="mini" icon="el-icon-delete" plain @click="deleteAppoint(scope.$index)"></el-button>
                        </template>
                    </el-table-column>
                </el-table>
            </div>
            <div class="block">
                <el-button @click="previous()" class="btn">上一步</el-button>
                <el-button v-loading.fullscreen.lock="fullscreenLoading" :disabled="submit" type="primary" @click="next()" @blur="check()" class="btn">提交</el-button>
            </div>
        </el-card>
    </div>
    <Footer class="foot"></Footer>
</div>
</template>

<script>
import activityApi from "@/api/activity";
import Footer from "@/components/footer";
import Header from "@/components/header";
import cookie from "js-cookie";

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            fullscreenLoading:false,
            submit:false,
            id: "",
            count: 0,
            reserveTime: "",
            memberId: "",
            appointTable: [{
                userName: "",
                reserveTime: "",
                identity: "",
                mobile: "",
                show: "true",
                mermberId: "",
                activeId: "",
            }, ],
            reserveUser: {},
            maxCount: "",
            
        };
    },
    created() {
        this.id = this.$route.query.id;
        this.reserveTime = this.$route.query.reserveTime;
        this.memberId = JSON.parse(cookie.get("lc_ucenter")).id;
        this.getMaxcount();
    },
    methods: {
        getMaxcount() {
            var maxPeople = 0;
            var peopleCount = 0;
            activityApi.getActivityInfo(this.id).then(response=>{
                maxPeople = response.data.data.activityInfo.maxPeople;
                activityApi.getPeopleCount(this.id,this.reserveTime).then((response) => {
                  peopleCount = response.data.data.peopleCount;
                  this.maxCount = maxPeople-peopleCount
            });
            })
        },
        check() {},
        next() {
            this.fullscreenLoading = true;
            this.submit = true;
            var len = this.appointTable.length;
            if (
                this.appointTable[len - 1].identity == null ||
                this.appointTable[len - 1].userName == null ||
                this.appointTable[len - 1].identity == null ||
                this.appointTable[len - 1].identity == "" ||
                this.appointTable[len - 1].userName == "" ||
                this.appointTable[len - 1].identity == ""
            ) {
                this.$message({
                    type: "warning",
                    message: "信息不能为空",
                });
                this.submit = false;
                this.fullscreenLoading = false;
                return;
            }
            if(len>1){
                    for(var i=0;i<len-1;++i) {
                    if(this.appointTable[i].identity == this.appointTable[len-1].identity) {
                        this.$message({
                        type: "warning",
                        message: "预约人信息不能重复",
                        });
                        this.submit = false;
                        this.fullscreenLoading = false;
                        return;
                    }
                 }
                }
            activityApi
                .verifyReserve(this.id, this.reserveTime, this.appointTable[len - 1])
                .then((response) => {
                    if (response.data.code == 200) {
                        activityApi.getReserveCount(this.memberId, this.id, this.reserveTime).then((response) => {
                            this.count = response.data.data.reserveCount;
                            if (this.count > 4) {
                                this.$confirm("每个账号最多只能预约5个人", "提示", {
                                    confirmButtonText: "确定",
                                    cancelButtonText: "取消",
                                    type: "warning",
                                });
                                this.submit = false;
                                this.fullscreenLoading = false;
                                return;
                            } else {
                                for (var i = 0; i < len; ++i) {
                                    this.appointTable[i].reserveTime = this.reserveTime;
                                    this.appointTable[i].memberId = this.memberId;
                                    this.appointTable[i].activeId = this.id;
                                }
                                activityApi.reserveActivity(this.appointTable).then((response) => {
                                    this.$router.push({
                                        path: "/appointment/activity/thirdStep/" + this.id,
                                    });
                                });
                            }
                        });
                    }
                });
        },
        previous() {
            this.$router.push({
                path: "/appointment/activity/firstStep/" + this.id,
            });
        },
        handleCurrentChange(val) {
            this.currentRow = val;
        },
        pushNewAppoint(index) {
            if (
                this.appointTable[index].identity == null ||
                this.appointTable[index].userName == null ||
                this.appointTable[index].identity == null ||
                this.appointTable[index].identity == "" ||
                this.appointTable[index].userName == "" ||
                this.appointTable[index].identity == ""
            ) {
                this.$message({
                    type: "warning",
                    message: "信息不能为空",
                });
                return;
            } else {
                if(index>0){
                    for(var i=0;i<index;++i) {
                    if(this.appointTable[i].identity == this.appointTable[index].identity) {
                        this.$message({
                        type: "warning",
                        message: "预约人信息不能重复",
                        });
                        return;
                    }
                 }
                }   
                activityApi
                    .verifyIdentity(this.appointTable[index])
                    .then((response) => {
                        if (response.data.code == 200) {
                            this.verifyReserve(index);
                        }
                    });
            }
        },
        verifyReserve(index) {
            activityApi
                .verifyReserve(this.id, this.reserveTime, this.appointTable[index])
                .then((response) => {
                    if (response.data.code == 200) {
                        activityApi
                            .getReserveCount(this.memberId, this.id,this.reserveTime)
                            .then((response) => {
                                var count = response.data.data.reserveCount;
                                if (count >= 5 - index - 1) {
                                    this.$confirm("每个账号最多只能预约5个人", "提示", {
                                        confirmButtonText: "确定",
                                        cancelButtonText: "取消",
                                        type: "warning",
                                    });
                                    return;
                                }
                                if (index == this.maxCount-1) {
                                    this.$message({
                                        type: "warning",
                                        message: "预约人数已满",
                                    });
                                    return;
                                }
                                if (index == 4) {
                                    this.$confirm("最多可预约5人", "提示", {
                                        confirmButtonText: "确定",
                                        cancelButtonText: "取消",
                                        type: "warning",
                                    });
                                    return;
                                }
                                const list = this.appointTable;
                                list[index].show = "false";
                                list.push({
                                    name: "",
                                    identity: "",
                                    mobile: "",
                                    memberId: "",
                                    reserveTime: "",
                                    activeId: "",
                                    show: "true",
                                });
                                this.appointTable = list;
                            });
                    }
                });
        },
        deleteAppoint(index) {
            const list = this.appointTable;
            if (index === 0 && list.length === 1) {
                list.splice(index, 1);
                list.push({
                    name: "",
                    identity: "",
                    mobile: "",
                    memberId: "",
                    reserveTime: "",
                    activeId: "",
                    show: "true",
                });
            } else {
                list.splice(index, 1);
            }
            if (index === list.length) {
                list[index - 1].show = "true";
            }
            list = this.appointTable;
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
    margin-right: 50px;
}

#main-container {
    position: relative;
}
</style>
