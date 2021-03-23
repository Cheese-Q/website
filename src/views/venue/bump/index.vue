<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="w mt60">
        <el-header>        
                <span><img src="../../../assets/wgs/whzx.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(rentalInfo[0].articleCategory, rentalInfo[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="rentalInfo"></Information>
    </el-container>
    <el-container class="mt60 w">
         <el-header>        
                <span><img src="../../../assets/wgs/cem.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(wondPer[0].articleCategory, wondPer[0].regionId)" class="mt30"></span>      
        </el-header>
        <Performance :articleIndex="wondPer"></Performance>
    </el-container>
    <Footer></Footer>
</div>
</template>

<script>
import indexApi from "@/api/index";
import Header from "@/components/header";
import Figure from "@/components/figure";
import Footer from "@/components/footer";
import Information from "@/components/commoninfor";
import cookie from "js-cookie";
import Performance from "@/components/commonTwo";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Figure,
        Information,
        Footer,
        Performance, 
        Bread,
    },
    data() {
        return {
            rentalInfo: [],
            venueId:"4",
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
            articleVo.categoryName = "文化资讯";
            articleVo.venueName = "文物管理服务中心";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.rentalInfo);
             let articleVoThree = {};
            articleVoThree.categoryName = "曹娥庙";
            articleVoThree.venueName = "文物管理服务中心";
            articleVoThree.num = 4;
            this.getArticleApi(articleVoThree, this.wondPer);
        },
        getArticleApi(articleVo) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "文化资讯") {
                    this.rentalInfo = response.data.data.articleList;
                }else if (articleVo.categoryName == "曹娥庙") {
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
