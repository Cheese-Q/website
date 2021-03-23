<template>
<div class="w">
   <el-main>
       <el-row v-if="newsIndex.length>0">
           <el-col :span="12">
               <div class="img" @click="getDetails(newsIndex[0].id)">
               <img v-lazy="newsIndex[0].articleCover" alt="" style="width:100%;height:380px;">
               <div class="tit">{{ newsIndex[0].articleTitle}}</div>
               </div>
           </el-col>
           <el-col :span="12" class="card">
               <el-row v-for="item in this.newsIndex" :key="item.id" style="margin-bottom:10px">
                   <el-col :span="6" class="new_img">
                       <img :src="item.articleCover" style="width:100%;height:84px;border-radius: 10px;"  @click="getDetails(item.id)">
                   </el-col>
                   <el-col :span="18">
                       <el-row>
                           <el-col>
                               <div class="title"  @click="getDetails(item.id)">
                               {{ item.articleTitle }}
                            </div>
                            </el-col>
                       </el-row>
                         <el-row>
                           <el-col>
                               <div class="abs">
                               {{ item.articleAbstract }}
                            </div>
                            </el-col>
                       </el-row>
                        <el-row>
                           <el-col>
                               <div class="time">
                               {{ item.gmtCreate }}
                            </div>
                            </el-col>
                       </el-row>
                   </el-col>
               </el-row>
           </el-col>
       </el-row>
   </el-main>
</div>
</template>

<script>
import activityApi from "@/api/activity";
export default {
    name: "IndexNews",
    props: {
        newsIndex: Array,
    },
    methods: {
       getDetails(id) {
            this.$router.push({
                path: "/news/detail/" + id,
            });
        },
    },
};
</script>

<style scoped>
.img{
    position: relative;
    overflow: hidden;
    cursor: pointer;
    border-radius: 10px;

}

.tit {
    position: absolute;
    width: 100%;
    height: 50px;
    line-height: 50px;
    background: rgba(0,0,0,0.50);
    bottom: 6px;
    font-size: 14px;
    color: #fff;
    font-family: PingFangSC-Medium;
    padding-left: 10px;
    cursor: pointer;
}

.title:hover {
    color: #A48260;
}

.card{
   padding-left: 10px;
   box-sizing:border-box;
}

.title {
    font-size: 14px;
    color: #333;
    padding-left: 10px;
    box-sizing: border-box;
    font-family: PingFangSC-Medium;
    cursor: pointer;
}

.time {
    float: right;
    margin-top: 4px;
    color: #555;
}

.abs {
    color: #555;
    padding-left: 10px;
    box-sizing: border-box;
    font-size: 10px;
    line-height: 18px;
    margin-top: 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-indent: 2em;
    font-family: PingFangSC-Medium;
}
</style>
