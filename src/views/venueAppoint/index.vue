<template>
<div id="main-container">
    <Header></Header>
    <Bread ></Bread>
    <div class="w" v-bind:style="{minHeight: Height+'px'}">
     <el-row  class="list">
         <el-col :span="4" class="mt30">
            <div>
            <ul>
                 <li @click="getAll()" class="wh">场馆预约</li>
                 <li @click="getGym()">体育馆</li>
                 <li @click="getLibrary()">图书馆</li>
                 <li @click="getMuseum()">博物馆</li> 
             </ul>
            </div>
         </el-col>
       <el-col v-if="branchData.length <= 0" :span="20">
             <div class="zw">
                 <img src="../../assets/sw.png" alt="">
             </div>
       </el-col>
         <el-col v-else :span="20">
             
             <el-row  v-for="rows in this.branchData" :key="rows.id" class="mt30">
                
                 <el-col  :span="8" class="rowList" v-for="cols in rows" :key="cols.id">
                     
                    <div >
                       <div>
                         <el-row>
                         <el-col :span="24" class="cover">
                               <img v-lazy="cols.cover" alt="" />
                         </el-col>
                       </el-row>
                       </div>
                    <div class="card">
                        <el-row  @click="getInfo(cols.id)">
                         <el-col :span="24">
                             <div>
                                 <div style="height:240px">
                                     <el-row>
                                  <el-col :span="24">
                                  <div class="listTitle">
                                  {{ cols.venue }}
                                  </div>
                            </el-col>
                        </el-row>
                             <el-row class="lt">
                            <el-col :span="6">
                                <div class="listContent">报名时间:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.timePart }}</div>
                            </el-col>
                        </el-row>
                        <el-row  class="lt">
                            <el-col :span="6">
                                <div class="listContent">地点名称:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.venueSpace }}</div>
                            </el-col>
                        </el-row>
                        <el-row  class="lt">
                            <el-col :span="6">
                                <div class="listContent">开放时间:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="listContent">{{ cols.reservePart }}</div>
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
                                    <el-button size="small" v-if="verifyDate(cols) == 0" type="primary" @click="getInfo(cols.id)">预约</el-button>
                                    <el-button size="small" v-else-if="verifyDate(cols) == -1" :disabled="true">未开始</el-button>
                                    <el-button size="small" v-else-if="verifyDate(cols) == 1" :disabled="true">已结束</el-button>
                                    <el-button size="small" v-else-if="cols.peopleCount >= cols.maxPeople" :disabled="true" type="info">预约已满</el-button>
                                </div>
                            </el-col>
                        </el-row>
                             </div>
                         </el-col>
                     </el-row>
                    </div>
                    
                    </div>
                 </el-col>
             </el-row>
         </el-col>
     </el-row>        
    </div>
    <el-pagination v-if="total>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total"></el-pagination>
    <Footer></Footer>
</div>
</template>

<script>
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
            current: 1,
            limit: 9,
            total: 0,
            venueList: [],
            branchData: [],
            query:{},
            Height:0,
        };
    },
    created() {
        this.getVenueReserve();
    },
   mounted() {
       this.Height = document.documentElement.clientHeight - 310;  
       window.onresize = ()=> {this.Height = document.documentElement.clientHeight -310}
    },
    methods: {
        getAll(){
            this.query = {};
            this.current = 1;
            this.getVenueReserve();
        },
        getGym(){
            this.query.venueId = "1";
            this.current = 1;
            this.getVenueReserve();
        },
        getLibrary(){
            this.query.venueId = "2";
            this.current = 1;
            this.getVenueReserve();
        },
        getMuseum(){
            this.query.venueId = "3";
            this.current = 1;
            this.getVenueReserve();
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getVenueReserve();
        },
        handleCurrentChange(val) {
            this.current = val;
            this.getVenueReserve();
        },
        verifyDate(cols) {
            if (new Date().getTime() < new Date(cols.beginTime).getTime()) {
                return -1;
            } else if (new Date().getTime() > new Date(cols.endTime).getTime()) {
                return 1;
            } else {
                return 0;
            }
        },
        getInfo(id) {
            this.$router.push({
                path: "/venueAppoint/detail/" + id,
            });
        },
        getVenueReserve() {
            venueApi.getVenueReserve(this.current, this.limit,this.query).then((response) => {
                this.venueList = response.data.data.venueList;
                this.total = response.data.data.total;
                this.venueList;
                this.getRow();
            });
        },
        getRow() {
            let arr = [];
            let row = Math.ceil(this.venueList.length / 3);
            for (let i = 0; i < row; i++) {
                arr[i] = [];
                let modLast =
                    this.venueList.length % 3 === 0 ? 3 : this.venueList.length % 3;
                let lastRow = i === row - 1 ? modLast : 3;
                for (let j = 0; j < lastRow; j++) {
                    arr[i][j] = this.venueList[3 * i + j];
                }
            }
            this.branchData = arr;
        },
    },
};
</script>

<style scoped>
.zw img {
    margin-top: 150px;
    margin-left: 50%;
    transform: translate(-50%);
}
.wh {
    font-size: 21px;
     color: #fff;
     background-color: #A48260;
}

ul li {
    width: 180px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    border: 1px solid #A48260;
    border-bottom: none;
    cursor: pointer;
}

ul li:hover,ul li:focus {
    color: #fff;
    background-color: #A48260;
}


ul li:nth-child(4) {
    border: 1px solid #A48260;
}

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
}

.card {
    width: 300px;
    height: 300px;
    background: #FAF5EB;
    border: 1px solid #A48260;
    padding: 10px;
    box-sizing: border-box;
    background: url('../../assets/hdyy.png') no-repeat;
    border-top: none;
}

.cover {
    width: 300px;
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
