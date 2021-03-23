<template>
<div id="main-container">
    <Header></Header>
    <Bread></Bread>
    <div class="w">
     <el-row  class="list">
         <el-col :span="24">
             <el-row v-for="rows in this.branchData" :key="rows" class="mt30">
                 <el-col :span="6" class="rowList" v-for="cols in rows" :key="cols.id">
                    <div>
                        <el-row>
                         <el-col :span="24" class="cover">
                              <img v-lazy="cols.activeCover" alt />
                         </el-col>
                    </el-row>
                    <el-row class="card">
                         <el-col :span="24">
                             <div>
                                 <div style="height:278px">
                                     <el-row>
                            <el-col :span="24">
                                <div class="listTitle">{{ cols.activeTitle }}</div>
                            </el-col>
                        </el-row>
                        <el-row class="lt">
                            <el-col :span="6">
                                <div class="listContent">报名时间:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.reservePart }}</div>
                            </el-col>
                        </el-row>
                        <el-row  class="lt">
                            <el-col :span="6">
                                <div class="listContent">活动时间:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.timePart }}</div>
                            </el-col>
                        </el-row>
                        <el-row  class="lt">
                            <el-col :span="6">
                                <div class="listContent">时间段:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.beginPart }} - {{ cols.endPart }}</div>
                            </el-col>
                        </el-row>
                        <el-row  class="lt">
                            <el-col :span="6">
                                <div class="listContent">所属场馆:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.venue }}</div>
                            </el-col>
                        </el-row>
                        <el-row  class="lt">
                            <el-col :span="6">
                                <div class="listContent">详细地址:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.address }}</div>
                            </el-col>
                        </el-row>
                        <el-row  class="lt">
                            <el-col :span="6">
                                <div class="listContent">单日上限:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">
                                    {{ cols.maxPeople }}人
                                </div>
                            </el-col>
                        </el-row>
                                 </div>
                                
                        <el-row  class="lt">
                            <el-col :span="8" :offset="8">
                                <div class="listBtn">
                                    <el-button v-if="verifyDate(cols) == 0" type="primary" @click="getInfo(cols.id)">预约</el-button>
                                    <el-button v-else-if="verifyDate(cols) == -1" :disabled="true" type="primary">未开始</el-button>
                                    <el-button v-else-if="verifyDate(cols) == 1" :disabled="true" type="info">已结束</el-button>
                                    <el-button v-else-if="cols.peopleCount >= cols.maxPeople" :disabled="true" type="info">预约已满</el-button>
                                </div>
                            </el-col>
                        </el-row>
                             </div>
                         </el-col>
                     </el-row>
                    </div>
                 </el-col>
             </el-row>
         </el-col>
     </el-row>            
    </div>
    <!-- <div class="row" v-for="rows in this.branchData" :key="rows">
        <div class="rowList" v-for="cols in rows" :key="cols.id">
            <div class="activ">
                <div class="act acimg">
                    <img :src="cols.activeCover" alt />
                </div>
                <el-card>
                    <div class="act aclist">
                        <el-row>
                            <el-col :span="24">
                                <div class="listTitle">{{ cols.activeTitle }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="listContent">报名时间:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.reservePart }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="listContent">活动时间:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.timePart }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="listContent">所属场馆:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.venue }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="listContent">详细地址:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.address }}</div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="6">
                                <div class="listContent">报名人数:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">
                                    {{ cols.peopleCount }}/{{ cols.maxPeople }}
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8" :offset="8">
                                <div class="listBtn">
                                    <el-button v-if="verifyDate(cols) == 0" type="primary" @click="getInfo(cols.id)">预约</el-button>
                                    <el-button v-else-if="verifyDate(cols) == -1" :disabled="true" type="primary">未开始</el-button>
                                    <el-button v-else-if="verifyDate(cols) == 1" :disabled="true" type="info">已结束</el-button>
                                    <el-button v-else-if="cols.peopleCount >= cols.maxPeople" :disabled="true" type="info">预约已满</el-button>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-card>
            </div>
        </div>
    </div> -->
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total"></el-pagination>
<Footer></Footer>
</div>
</template>

<script>
import indexApi from "@/api/index";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Bread from "@/components/bread";

export default {
    components: {
        Header,
        Footer,
        Bread,
    },
    data() {
        return {
            current: 1,
            limit: 9,
            total: 0,
            activityList: [],
            venue: "",
            branchData: [],
            activityIndex: []
        };
    },
    created() {
        this.venue = this.$route.query.venue;
        this.getCommonActivity();
    },
    mounted() {},
    methods: {
        getCommonActivity() {
            let activityVo = {}
            activityVo.venueName = this.venue;
            indexApi.getCommonActivity(activityVo,this.limit,this.current).then((response) => {
                this.activityList = response.data.data.activityList;
                this.total = response.data.data.total;
                this.getRow();

            });
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getActivity();
        },
        handleCurrentChange(val) {
            this.current = val;
            this.getActivity();
        },
        verifyDate(cols) {
            if (new Date().getTime() < new Date(cols.reserveBegin).getTime()) {
                return -1;
            } else if (new Date().getTime() > new Date(cols.reserveEnd).getTime()) {
                return 1;
            } else {
                return 0;
            }
        },
        getInfo(id) {
            this.$router.push({
                path: "/activity/detail/" + id,
            });
        },
        getRow() {
            let arr = [];
            let row = Math.ceil(this.activityList.length / 4);
            for (let i = 0; i < row; i++) {
                arr[i] = [];
                let modLast =
                    this.activityList.length % 4 === 0 ? 4 : this.activityList.length % 4;
                let lastRow = i === row - 1 ? modLast : 4;
                for (let j = 0; j < lastRow; j++) {
                    arr[i][j] = this.activityList[4 * i + j];
                }
            }
            this.branchData = arr;
        },
    },
};
</script>

<style scoped>
.content {
   font-size: 14px;
    color: #585858;
    overflow: hidden;
      text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
}

.listContent {
    font-size: 14px;
    color: #585858;
    line-height: 25px;
}

.lt {
    margin-top: 10px;
}

.listTitle {
    font-size: 16px;
    color: #A48260;
}

.card {
    width: 280px;
    height: 350px;
    background: #FAF5EB;
    border: 1px solid #A48260;
    border-top: none;
    padding: 10px;
    box-sizing: border-box;
    background: url('../../../../assets/bj.png') no-repeat;
}

.cover {
    width: 280px;
    height: 180px;
    overflow: hidden;
    border-radius: 10px 10px 0 0;
}

.cover img {
    width: 300px;
    height: 180px;
    transition: all 0.6s;
}
.cover img:hover {
    transform: scale(1.1);
    cursor: pointer;
}

/* .Header {
    background-color: #fff;
}

.row {
    display: flex;
    flex-direction: row;
    margin-top: 50px;
}

.rowList {
    float: left;
    display: flex;
    width: 33.33%;
}

.activ {
    position: relative;
    width: 400px;
    height: 600px;
    float: left;
    margin: 0 auto;
}

.acimg {
    position: absolute;
    width: 400px;
    height: 240px;
    top: 0;
}

.acimg img {
    width: 400px;
    height: 240px;
}

.aclist {
    position: absolute;
    width: 360px;
    height: 350px;
    background-color: #fff;
    top: 210px;
    left: 20px;
}

.el-row {
    padding: 10px;
}

.listTitle {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.listContent {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
} */
</style>
