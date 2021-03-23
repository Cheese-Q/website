<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="w mt60">
        <el-header>        
                <span><img src="../../../assets/tsg/wh.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right"  @click="toList(rentalInfo[0].articleCategory, rentalInfo[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="rentalInfo"></Information>
    </el-container>
    <el-container class="w mt60">
         <el-header>        
                <span><img src="../../../assets/tsg/hd.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toDetailList(activityIndex[0].venue)" class="mt30"></span>      
        </el-header>
        <Activity :activityIndex="activityIndex"></Activity>
    </el-container>
    <el-container class="w mt60">
        <el-header>        
                <span><img src="../../../assets/tsg/gz.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(wondPer[0].articleCategory, wondPer[0].regionId)" class="mt30"></span>      
        </el-header>
        <Performance :articleIndex="wondPer"></Performance>
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
import Activity from "@/components/commonactive";
import Performance from "@/components/commonTwo";
import cookie from "js-cookie";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Figure,
        Information,
        Activity,
        Performance,
        Footer,
        Bread,
    },
    data() {
        return {
            limit: 9,
            current: 1,
            venueId:"2",
            rentalInfo: [],
            activityIndex: [],
            wondPer: [],
        };
    },
    created() {
        this.getArticle();
        this.getCommonActivity();
    },
    mounted() {},
    methods: {
        toDetailList(venue) {
            this.$router.push({
                path: "/information/opera/components",
                query: {
                    venue: venue,
                },
            });
        },
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
            articleVo.venueName = "图书馆";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.rentalInfo);
            let articleVoThree = {};
            articleVoThree.categoryName = "工作动态";
            articleVoThree.venueName = "图书馆";
            articleVoThree.num = 4;
            this.getArticleApi(articleVoThree, this.wondPer);
        },
        getArticleApi(articleVo, info) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "文化资讯") {
                    this.rentalInfo = response.data.data.articleList;
                } else if (articleVo.categoryName == "工作动态") {
                    this.wondPer = response.data.data.articleList;
                }
            });
        },
        getCommonActivity() {
            let activityVo = {};
            activityVo.num = 3;
            activityVo.venueName = "图书馆";
            indexApi.getCommonActivity(activityVo,this.limit,this.current).then((response) => {
                this.activityIndex = response.data.data.activityList;
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
