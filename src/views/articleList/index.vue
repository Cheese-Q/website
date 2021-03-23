<template>
<div id="main-container">
    <Header></Header>
    <Bread></Bread>
    <Article :articleIndex="branchData"></Article>
    <el-pagination v-if="this.newsList.length>0" @size-change="handleSizeChange" @current-change="handleCurrentChange" background layout="prev, pager, next" :total="total"></el-pagination>
     <Footer></Footer>
</div>
</template>

<script>
import articleApi from "@/api/articleList";
 import Footer from "@/components/footer";
import Article from "@/components/information";
import Header from "@/components/header";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Article,
        Bread,
        Footer,
    },
    data() {
        return {
            categoryId: "",
            venueId: "",
            current: 1,
            limit: 9,
            total: 0,
            newsList: [],
            branchData: [],
        };
    },
    created() {
        this.categoryId = this.$route.query.categoryId;
        this.venueId = this.$route.query.venueId;
        this.getArticleList();
    },
    mounted() {},
    methods: {
        handleSizeChange(val) {
            this.limit = val;
            this.getArticleList();
        },
        handleCurrentChange(val) {
            this.current = val;
            this.getArticleList();
        },
        getArticleList() {
            articleApi
                .getArticleList(this.current, this.limit, this.categoryId, this.venueId)
                .then((response) => {
                    this.newsList = response.data.data.articleList;
                    this.total = response.data.data.total;
                    this.getRow();
                });
        },
        getRow() {
            let arr = [];
            let row = Math.ceil(this.newsList.length / 4);
            for (let i = 0; i < row; i++) {
                arr[i] = [];
                let modLast =
                    this.newsList.length % 4 === 0 ? 4 : this.newsList.length % 4;
                let lastRow = i === row - 1 ? modLast : 4;
                for (let j = 0; j < lastRow; j++) {
                    arr[i][j] = this.newsList[4 * i + j];
                }
            }
            this.branchData = arr;
        },
    },
};
</script>
