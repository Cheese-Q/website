<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="w mt60">
           <el-header>        
                <span><img src="../../../assets/yxb/whzx.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(newsIndex[0].articleCategory, newsIndex[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="newsIndex"></Information>
    </el-container>
    <el-container class="w mt60">
      <el-header>        
                <span><img src="../../../assets/yxb/pydt.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(scheduleIndex[0].articleCategory, scheduleIndex[0].regionId)" class="mt30"></span>      
        </el-header>
        <Schedule :articleIndex="scheduleIndex"></Schedule>
    </el-container>
    <el-container class="w mt60">
       <el-header>        
                <span><img src="../../../assets/yxb/dyxx.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(movieIndex[0].articleCategory, movieIndex[0].regionId)" class="mt30"></span>      
        </el-header>
        <Movie :articleIndex="movieIndex"></Movie>
    </el-container>
    <Footer></Footer>
</div>
</template>

<script>
import indexApi from "@/api/index";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Figure from "@/components/figure";
import Information from "@/components/commoninfor";
import Schedule from "@/components/commonOne";
import Movie from "@/components/commonTwo";
import cookie from "js-cookie";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Figure,
        Information,
        Schedule,
        Movie,
        Footer,
        Bread,
    },
    data() {
        return {
            venueId:"9",
            newsIndex: [],
            scheduleIndex: [],
            movieIndex: [],
        };
    },
    created() {
        this.getArticle();
    },
    mounted() {},
    methods: {
        toList(categoryId, venueId) {
            this.$router.push({
                path: "/articleList",
                query: {
                    categoryId: categoryId,
                    venueId: venueId,
                },
            });
        },
        getArticle() {
            let articleVo = {};
            articleVo.categoryName = "文化资讯";
            articleVo.venueName = "影讯吧";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.newsIndex);
            let articleVoTwo = {};
            articleVoTwo.categoryName = "排影动态";
            articleVoTwo.venueName = "影讯吧";
            articleVoTwo.num = 3;
            this.getArticleApi(articleVoTwo, this.scheduleIndex);
            let articleVoThree = {};
            articleVoThree.categoryName = "电影下乡";
            articleVoThree.venueName = "影讯吧";
            articleVoThree.num = 4;
            this.getArticleApi(articleVoThree, this.movieIndex);
        },
        getArticleApi(articleVo, info) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "文化资讯") {
                    this.newsIndex = response.data.data.articleList;
                } else if (articleVo.categoryName == "排影动态") {
                    this.scheduleIndex = response.data.data.articleList;
                } else if (articleVo.categoryName == "电影下乡") {
                    this.movieIndex = response.data.data.articleList;
                }
            });
        },
    },
};
</script>

<style scoped>
.el-row {
    margin-bottom: 20px;
}

.box-card {
    width: 80%;
    margin: 30px auto;
}

.contentTitle {
    font-size: 30px;
    color: rgba(0, 0, 0, 0.85);
}
</style>
