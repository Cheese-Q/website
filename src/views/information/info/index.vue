<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="mt60 w">
           <el-header>        
                <span><img src="../../../assets/sc/scdt.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(rentalInfo[0].articleCategory, rentalInfo[0].regionId)" class="mt30"></span>      
           </el-header>
        <Information :newsIndex="rentalInfo"></Information>
    </el-container>
    <el-container class="mt60 w">
         <el-header>        
                <span><img src="../../../assets/sc/flxc.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(legalIndex[0].articleCategory, legalIndex[0].regionId)" class="mt30"></span>      
        </el-header>
        <Legal :articleIndex="legalIndex"></Legal>
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
import Legal from "@/components/commonOne";
import cookie from "js-cookie";
import Bread from '@/components/bread.vue';

export default {
    components: {
        Header,
        Figure,
        Information,
        Legal,
        Footer,
        Bread,
    },
    data() {
        return {
            venueId:"8",
            rentalInfo: [],
            legalIndex: [],
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
            articleVo.categoryName = "市场动态";
            articleVo.venueName = "文化市场";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.rentalInfo);
            let articleVoTwo = {};
            articleVoTwo.categoryName = "法律宣传";
            articleVoTwo.venueName = "文化市场";
            articleVoTwo.num = 3;
            this.getArticleApi(articleVoTwo, this.legalIndex);
        },
        getArticleApi(articleVo, info) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "市场动态") {
                    this.rentalInfo = response.data.data.articleList;
                } else if (articleVo.categoryName == "法律宣传") {
                    this.legalIndex = response.data.data.articleList;
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
