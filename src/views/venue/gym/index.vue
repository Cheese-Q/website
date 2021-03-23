<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="w mt60">
         <el-header>        
                <span><img src="../../../assets/tyg/hd.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(rentalInfo[0].articleCategory, rentalInfo[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="rentalInfo"></Information>
    </el-container>
    <el-container class="w mt60">
        <el-header>        
                <span><img src="../../../assets/tyg/ssxx.png" alt="" style="float:left"></span> 
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
import Performance from "@/components/commonTwo";
import cookie from "js-cookie";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Figure,
        Information,
        Performance,
        Footer,
        Bread,
    },
    data() {
        return {
            venueId:"1",
            id: "",
            activity: {},
            rentalInfo: [],
            perPre: [],
            wondPer: [],
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
            articleVo.categoryName = "体育活动发布";
            articleVo.venueName = "体育馆";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.rentalInfo);
            let articleVoThree = {};
            articleVoThree.categoryName = "赛事信息";
            articleVoThree.venueName = "体育馆";
            articleVoThree.num = 4;
            this.getArticleApi(articleVoThree, this.wondPer);
        },
        getArticleApi(articleVo, info) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "体育活动发布") {
                    this.rentalInfo = response.data.data.articleList;
                } else if (articleVo.categoryName == "赛事信息") {
                    this.wondPer = response.data.data.articleList;
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
