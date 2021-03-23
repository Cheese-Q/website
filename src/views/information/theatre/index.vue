<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="mt60 w">
         <el-header>        
                <span><img src="../../../assets/ys/zcxx.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(rentalInfo[0].articleCategory, rentalInfo[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="rentalInfo"></Information>
    </el-container>
    <el-container class="w mt60">
         <el-header>        
                <span><img src="../../../assets/ys/ycyg.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(perPre[0].articleCategory, perPre[0].regionId)" class="mt30"></span>      
        </el-header>
        <Film :articleIndex="perPre"></Film>
    </el-container>
    <el-container class="mt60 w">
        <el-header>        
                <span><img src="../../../assets/ys/jcyc.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right"  @click="toList(wondPer[0].articleCategory, wondPer[0].regionId)" class="mt30"></span>      
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
import Film from "@/components/commonOne";
import Performance from "@/components/commonTwo";
import cookie from "js-cookie";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Figure,
        Information,
        Film,
        Performance,
        Footer,
        Bread,
    },
    data() {
        return {
            venueId:"6",
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
            articleVo.categoryName = "租场信息";
            articleVo.venueName = "艺术推广服务中心";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.rentalInfo);
            let articleVoTwo = {};
            articleVoTwo.categoryName = "演出预告";
            articleVoTwo.venueName = "艺术推广服务中心";
            articleVoTwo.num = 3;
            this.getArticleApi(articleVoTwo, this.perPre);
            let articleVoThree = {};
            articleVoThree.categoryName = "精彩演出";
            articleVoThree.venueName = "艺术推广服务中心";
            articleVoThree.num = 4;
            this.getArticleApi(articleVoThree, this.wondPer);
        },
        getArticleApi(articleVo, info) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "租场信息") {
                    this.rentalInfo = response.data.data.articleList;
                } else if (articleVo.categoryName == "演出预告") {
                    this.perPre = response.data.data.articleList;
                } else if (articleVo.categoryName == "精彩演出") {
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
