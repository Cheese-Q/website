<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="w mt60">
       <el-header>        
                <span><img src="../../../assets/yg/whzx.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(rentalInfo[0].articleCategory, rentalInfo[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="rentalInfo"></Information>
    </el-container>
    <el-container class="w mt60">
       <el-header>        
                <span><img src="../../../assets/yg/myjtzs.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(theatreIndex[0].articleCategory, theatreIndex[0].regionId)" class="mt30"></span>      
        </el-header>
        <Theatre :articleIndex="theatreIndex"></Theatre>
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
import Theatre from "@/components/commonTwo";
import cookie from "js-cookie";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Footer,
        Header,
        Figure,
        Information,
        Theatre,
        Bread,
    },
    data() {
        return {
            venueId:"10",
            rentalInfo: [],
            theatreIndex: [],
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
            articleVo.venueName = "阳光文化演出";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.rentalInfo);
            let articleVoTwo = {};
            articleVoTwo.categoryName = "民营剧团展示";
            articleVoTwo.venueName = "阳光文化演出";
            articleVoTwo.num = 4;
            this.getArticleApi(articleVoTwo, this.theatreIndex);
        },
        getArticleApi(articleVo, info) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "文化资讯") {
                    this.rentalInfo = response.data.data.articleList;
                } else if (articleVo.categoryName == "民营剧团展示") {
                    this.theatreIndex = response.data.data.articleList;
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
