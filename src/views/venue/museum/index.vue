<template>
<div id="main-container">
    <Header></Header>
    <Figure :venueId="venueId"></Figure>
    <Bread></Bread>
    <el-container class="w mt60">
          <el-header>        
                <span><img src="../../../assets/bwg/ztjs.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(rentalInfo[0].articleCategory, rentalInfo[0].regionId)" class="mt30"></span>      
        </el-header>
        <Information :newsIndex="rentalInfo"></Information>
    </el-container>
    <el-container class="w mt60">
         <el-header>        
                <span><img src="../../../assets/bwg/zpjs.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(perPre[0].articleCategory, perPre[0].regionId)" class="mt30"></span>      
        </el-header>
        <Film :articleIndex="perPre"></Film>
    </el-container>
    <el-container class="w mt60">
         <el-header>        
                <span><img src="../../../assets/bwg/gzdt.png" alt="" style="float:left"></span> 
                <span><img src="../../../assets/index/lo.png" alt="" style="float:right" @click="toList(wondPer[0].articleCategory, wondPer[0].regionId)" class="mt30"></span>      
        </el-header>
        <Performance :articleIndex="wondPer"></Performance>
    </el-container>
    <div class="w">
         <el-container class="w mt60">
       <el-header>        
                <span><img src="../../../assets/bwg/zxzt.png" alt="" style="float:left"></span> 
        </el-header>
        <el-main>
            <el-row>
            <el-col :span="6" >
                <div style="padding: 14px;" class="image">
                     <a href="https://720yun.com/t/dbvkOb2hspw?scene_id=58370400">
                           <img src="../../../assets/vr1.jpg"  style="border-radius:3px">
                      </a>
                  </div>
                  <div class="title">红色百年革命展</div>
            </el-col>
            <el-col :span="6" :offset="2">
                <div style="padding: 14px;" class="image">
                     <a href="https://720yun.com/t/8avkOh19r2w?scene_id=57959553">
                           <img src="../../../assets/vr2.jpg"  style="border-radius:3px">
                      </a>
                  </div>
                  <div class="title">馆藏文物精品展</div>
            </el-col>
            <el-col :span="6" :offset="2">
                <div style="padding: 14px;" class="image">
                     <a href="https://720yun.com/t/06vksy2wdqm?scene_id=45871196">
                           <img src="../../../assets/vr3.jpg"  style="border-radius:3px">
                      </a>
                  </div>
                  <div class="title">越窑青瓷展厅</div>
            </el-col>
            </el-row>   
        </el-main>
    </el-container>
    </div>
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
            venueId:"3",
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
            articleVo.categoryName = "展厅介绍";
            articleVo.venueName = "博物馆";
            articleVo.num = 7;
            this.getArticleApi(articleVo, this.rentalInfo);
            let articleVoTwo = {};
            articleVoTwo.categoryName = "展品介绍";
            articleVoTwo.venueName = "博物馆";
            articleVoTwo.num = 3;
            this.getArticleApi(articleVoTwo, this.perPre);
            let articleVoThree = {};
            articleVoThree.categoryName = "工作动态";
            articleVoThree.venueName = "博物馆";
            articleVoThree.num = 4;
            this.getArticleApi(articleVoThree, this.wondPer);
        },
        getArticleApi(articleVo, info) {
            indexApi.getArticle(articleVo).then((response) => {
                if (articleVo.categoryName == "展厅介绍") {
                    this.rentalInfo = response.data.data.articleList;
                } else if (articleVo.categoryName == "展品介绍") {
                    this.perPre = response.data.data.articleList;
                } else if (articleVo.categoryName == "工作动态") {
                    this.wondPer = response.data.data.articleList;
                }
            });
        },
    },
};
</script>

<style scoped>
.title {
    font-size: 20px;
    text-align: center;
}

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

.image{
     width: 284px;
    height: 200px;
    overflow: hidden;
    
}

.image img{
    width: 284px;
    height: 200px;
    transition: all 0.6s;
}

.image img:hover{
    transform: scale(1.1);
}  
</style>
