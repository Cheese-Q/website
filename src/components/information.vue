<template>
<div class="main-container w" v-bind:style="{minHeight: Height+'px'}">
       <el-row>
         <el-col :span="24">
             <el-row v-for="rows in this.articleIndex" :key="rows" class="list">
                 <el-col :span="6" class="rowList" v-for="cols in rows" :key="cols.id">
                    <div class="art_list">
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
</div>
</template>

<script>
import newsApi from "@/api/news";
export default {
    props: {
        articleIndex: Array,
    },
    mounted() {
       this.Height = document.documentElement.clientHeight - 310;  
       console.log(this.Height)
       window.onresize = ()=> {this.Height = document.documentElement.clientHeight -310}
    },
    methods: {
        getInfo(id) {
            this.$router.push({
                path: "/news/detail/" + id,
            });
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
    height: 174px;
    background: #FAF5EB;
    border: 1px solid #A48260;
    padding: 10px;
    box-sizing: border-box;
    background: url('../assets/bj.png') no-repeat;
    border-top: none;
}

.card:hover {
    cursor: pointer;
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

.list {
    margin-top: 30px;
}
</style>
