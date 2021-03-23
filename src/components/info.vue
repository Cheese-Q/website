<template>
<div class="main-container w" v-bind:style="{minHeight: Height+'px'}">
     <el-row>
         <el-col :span="4">
            <div class="list">
             <ul>
                 <li @click="getAll()" class="wh">文化资讯</li>
                 <li @click="getOpera()">公共文化服务中心</li>
                 <li @click="getMovie()">影讯吧</li>
                 <li @click="getPerformance()">阳光文化演出</li>
                 <li @click="getCeladon()">上虞越窑青瓷研究传习中心</li>
                 <li @click="getArchaeological()">凤凰山考古遗址公园</li>
                 <li @click="getCultureRoom()">文化客厅</li>
                 <li @click="getLibrary()">图书馆</li>
                 <li @click="getBump()">文物管理服务中心</li>
             </ul>
            </div>
         </el-col>
           <el-col v-if="articleIndex.length <= 0" :span="20">
             <div class="zw">
                 <img src="../assets/sw.png" alt="">
             </div>
         </el-col>
         <el-col :span="20" v-else>
             <el-row v-for="rows in this.articleIndex" :key="rows.id" class="list">
                 <el-col :span="8" class="rowList" v-for="cols in rows" :key="cols.id">
                    <div>
                    <el-row>
                         <el-col :span="24" class="cover">
                             <img v-lazy="cols.articleCover" alt  @click="getInfo(cols.id)"/>
                         </el-col>
                    </el-row>
                    <el-row class="card" @click="getInfo(cols.id)">
                         <el-col :span="24">
                             <div>
                        <el-row>
                                  <el-col :span="24">
                                  <div class="listTitle">
                                    {{ cols.articleTitle }}
                                  </div>
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
                                <div class="listContent">摘要:</div>
                            </el-col>
                            <el-col :span="18">
                                <div class="content">{{ cols.articleAbstract }}</div>
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
     <el-pagination v-if="total>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total"></el-pagination>
</div>

</template>

<script>
import newsApi from "@/api/news";
export default {
    data() {
        return {
            Height:0,
            articleIndex: [],
            current: 1,
            limit: 9,
            total: 0,
            newsList:[],
            articleVo:{},
        };
    },
    created(){
        this.getArticlePage();
    },
  mounted() {
       this.Height = document.documentElement.clientHeight - 310;  
       window.onresize = ()=> {this.Height = document.documentElement.clientHeight - 310}
    },
    methods: {
        getAll(){
            this.articleVo={};
            this.current = 1;
            this.getArticlePage();
        },
        getOpera(){
            this.articleVo.venueId="7";
            this.current = 1;
            this.getArticlePage();

        },
        getMovie(){
            this.articleVo.venueId="9";
            this.current = 1;
            this.getArticlePage();
        },
        getPerformance(){
            this.articleVo.venueId="10";
            this.current = 1;
            this.getArticlePage();
        },
        getCeladon(){
            this.articleVo.venueId="11";
            this.current = 1;
            this.getArticlePage();
        },
        getArchaeological(){
            this.articleVo.venueId="12";
            this.current = 1;
            this.getArticlePage();
        },
        getCultureRoom(){
            this.articleVo.venueId="13";
            this.current = 1;
            this.getArticlePage();
        },
        getLibrary(){
            this.articleVo.venueId="2";
            this.current = 1;
            this.getArticlePage();
        },
        getBump(){
            this.articleVo.venueId="4";
            this.current = 1;
            this.getArticlePage();
        },
        handleSizeChange(val) {
            this.limit = val;
            this.getArticlePage();
        },
        handleCurrentChange(val) {
            this.current = val;
            this.getArticlePage();
        },
        getArticlePage() {
            this.articleVo.categoryName = "文化资讯";
            newsApi
                .getArticlePage(this.current, this.limit, this.articleVo)
                .then((response) => {
                    this.newsList = response.data.data.articleList;
                    this.total = response.data.data.total;
                    this.getRow();
                });
        },
        getRow() {
            let arr = [];
            let row = Math.ceil(this.newsList.length / 3);
            for (let i = 0; i < row; i++) {
                arr[i] = [];
                let modLast =
                    this.newsList.length % 3 === 0 ? 3 : this.newsList.length % 3;
                let lastRow = i === row - 1 ? modLast : 3;
                for (let j = 0; j < lastRow; j++) {
                    arr[i][j] = this.newsList[3 * i + j];
                }
            }
            this.articleIndex = arr;
        },
        getInfo(id) {
            this.$router.push({
                path: "/news/detail/" + id,
            });
        },

    },
};
</script>

<style scoped>
.zw img{
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

ul li:nth-child(9) {
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
    color: #A48260;
}

.card {
    width: 300px;
    height: 174px;
    background: #FAF5EB;
    border: 1px solid #A48260;
    padding: 10px;
    box-sizing: border-box;
    background: url('../assets/hdyy.png') no-repeat;
    border-top: none;
}

.card:hover {
    cursor: pointer;
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

.list {
    margin-top: 30px;
}
</style>
