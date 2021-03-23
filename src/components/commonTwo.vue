<template>
<div class="w">
    <el-main>
            <el-row>
                <el-col :span="6" v-for="(item, index) in articleIndex" :key="item.id">
                    <div class="img">
                        <el-row>
                             <img v-lazy="item.articleCover" class="image"  @click="getDetails(item.id)"/>
                         </el-row>
                    </div>                
                    <div class="card"  @click="getDetails(item.id)">
                    <el-row>
                        <el-col :span="24"> <div class="venue"> {{ item.articleTitle }}</div></el-col>
                     </el-row>
                     <el-row class="address">
                            <el-col :span="24">
                                <div class="grid-content" v-html="item.articleAbstract"></div>
                             </el-col>
                     </el-row>
                    </div>
                </el-col>
            </el-row>
    </el-main>
</div>
</template>

<script>
import indexApi from "@/api/index";

export default {
    name: "performance",
    props: {
        articleIndex: Array,
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
.img,.card {
    cursor: pointer;
}

.ti {
    font-size: 14px;  
}
.grid-content {
    font-size: 14px;
    color: #A58260;
    height: 40px;
    line-height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-indent: 2em;
}
.img {
     width: 284px;
    height: 200px;
    overflow: hidden;
}
.img img {
    width: 284px;
    height: 200px;
    transition: all 0.6s;
}
.img img:hover {
      transform: scale(1.1);
}
.card {
    background: url('../assets/index/bj.png') no-repeat;
    height: 150px;
    padding: 0 10px;
    box-sizing: border-box;
}

.venue {
    font-size: 16px;
    color: #134A5B;
    height: 50px;
    line-height: 50px;
    text-align: center;
    white-space:nowrap;
    overflow:hidden;
    text-overflow:ellipsis;  
}
</style>
