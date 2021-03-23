<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="w mt60">
      <el-header>        
                <span><img src="../../../assets/qc/whzx.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right"  @click="toList(rentalInfo[0].articleCategory, rentalInfo[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="rentalInfo"></Information>
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
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Figure,
        Information,
        Footer,
        Bread,
    },
    data() {
        return {
            venueId:"12",
            rentalInfo: [],
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
            articleVo.venueName = "凤凰山考古遗址公园";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.rentalInfo);
        },
        getArticleApi(articleVo) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "文化资讯") {
                    this.rentalInfo = response.data.data.articleList;
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
