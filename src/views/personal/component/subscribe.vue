<template>
<div >
    <div style="height:1000px">
        <el-row>
        <el-col class="personalInfo">
            <span> 我的订阅 </span>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <div class="subscribe">
        <el-tabs v-model="activeName" @tab-click="handleClick">
            <el-tab-pane v-for="(item) in venueCategory" :key="item.venueId" :label="item.venueName" :name="item.venueId">
                <el-badge :hidden="category.count==0" v-for="(category) in item.categoryVoList" :key="category.categoryId" :value="category.count" class="item">
                    <el-button  size="small" @click="getMemberArticle(item.venueId,category.categoryId)">{{category.categoryName}}</el-button>
                </el-badge>
            </el-tab-pane>
        </el-tabs>
    </div>
    <div id="info">
        <el-row v-for="(article) in articleList" :key="article.id">
            <div :class="{information1:article.readStatus==1,information2:article.readStatus==0}" @click="getInfo(article.id)">
                <el-col :span="6"><img :src="article.articleCover" alt="" /></el-col>
                <el-col :span="18">
                    <el-row>
                        <el-col class="til">{{article.articleTitle}}</el-col>
                    </el-row>
                    <el-row>
                        <el-col class="art">{{article.articleAbstract}}</el-col>
                    </el-row>
                </el-col>
            </div>
        </el-row>
    </div>
    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total"></el-pagination>
    </div>
</div>
</template>

<script>
import perApi from "@/api/personal";
import cookie from "js-cookie";
export default {
    data() {
        return {
            venueCategory: [],
            memberId: "",
            memberArticle: {},
            articleList: [],
            current: 1,
            limit: 10,
            total:0,
            activeName:"",
        }
    },
    created() {
        this.memberId = JSON.parse(cookie.get("lc_ucenter")).id;
        this.getVenueCategory();
    },
    methods: {
        getInfo(id) {
            perApi.readArticle(id,this.memberId).then(response => {
                this.$router.push({
                    path: "/news/detail/" + id,
                });
            })
        },
        getVenueCategory() {
            perApi.getVenueCategory(this.memberId).then(response => {
                this.venueCategory = response.data.data.venueCategory;
                if(this.venueCategory.length>0){
                    this.activeName = this.venueCategory[0].venueId;
                    this.getMemberArticle(this.venueCategory[0].venueId,this.venueCategory[0].categoryVoList[0].categoryId)
                }
            })
        },
        getMemberArticle(venueId, categoryId) {
            perApi.getMemberArticle(this.memberId, venueId, categoryId).then(response => {
                this.memberArticle = response.data.data.memberArticle;
                this.getSubscribeArticle();
            })
        },
        getSubscribeArticle() {
            perApi.getSubscribeArticle(this.current, this.limit, this.memberArticle).then(response => {
                this.articleList = response.data.data.articleList;
                this.total = response.data.data.total;
            })
        },
        handleClick() {},
        handleSizeChange(val) {
            this.limit = val;
            this.getSubscribeArticle();
        },
        handleCurrentChange(val) {
            this.current = val;
            this.getSubscribeArticle();
        },
    }
}
</script>

<style scoped>
#info {
    width: 920px;
    height: 500px;
    margin: auto;
}

.subscribe {
    width: 920px;
    margin: auto;
}

.personalInfo span {
    font-size: 22px;
    line-height: 22px;
    float: left;
    color: #000;
    margin: 32px 0 0 32px;
}

.art {
    font-size: 14px;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-indent: 2em;
    margin-top: 12px;
}

.til {
    font-size: 14px;
    color: #555;
}

.information1 {
    width: 900px;
    height: 148px;
    padding: 24px;
    margin-top: 20px;
    background-color: #FAFAFA;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
}
.information2 {
    width: 900px;
    height: 148px;
    padding: 24px;
    margin-top: 20px;
    background-color: #FAFAFA;
    box-sizing: border-box;
    -moz-box-sizing: border-box;
    -webkit-box-sizing: border-box;
    border-left: 4px solid #C5B099;
}

.information1:hover {
    cursor: pointer;
}

.information1 img {
    width: 180px;
    height: 100px;
}
.information2:hover {
    cursor: pointer;
}

.information2 img {
    width: 180px;
    height: 100px;
}

.item {
    margin-top: 10px;
    margin-right: 40px;
    float: left;
}
</style>
