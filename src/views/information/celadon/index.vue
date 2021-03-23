<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="w mt60">
       <el-header>        
                <span><img src="../../../assets/qc/whzx.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(newsIndex[0].articleCategory, newsIndex[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="newsIndex"></Information>
    </el-container>
    <el-container class="mt60 w">
      <el-header>        
                <span><img src="../../../assets/qc/wszt.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="
            toList(
              exhibitionIndex[0].articleCategory,
              exhibitionIndex[0].regionId
            )
          " class="mt30"></span>      
        </el-header>
        <Legal :articleIndex="exhibitionIndex"></Legal>
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
            venueId:"11",
            newsIndex: [],
            exhibitionIndex: [],
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
            articleVo.venueName = "上虞越窑青瓷研究传习中心";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.newsIndex);
            let articleVoTwo = {};
            articleVoTwo.categoryName = "网上展厅";
            articleVoTwo.venueName = "上虞越窑青瓷研究传习中心";
            articleVoTwo.num = 3;
            this.getArticleApi(articleVoTwo, this.exhibitionIndex);
        },
        getArticleApi(articleVo, info) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "文化资讯") {
                    this.newsIndex = response.data.data.articleList;
                } else if (articleVo.categoryName == "网上展厅") {
                    this.exhibitionIndex = response.data.data.articleList;
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
