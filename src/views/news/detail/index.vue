<template>
<div id="main-container">
    <Header></Header>
    <Bread></Bread>
    <div class="contain">
        <el-row>
            <el-col :span="16">
                <div class="content">
                    <el-row>
                        <el-col :span="24">
                            <div class="title">{{ newsList.articleTitle }}</div>
                        </el-col>
                    </el-row>
                    <el-row class="infor">
                        <el-col :offset="2" :span="6">
                            <el-row>
                                <el-col>
                                    <div class="con">{{ newsList.venue }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="4">
                            <el-row>
                                <el-col>
                                    <div class="con">{{ newsList.categoryName }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="6">
                            <el-row>                      
                                <el-col :span="24">
                                    <div class="con">{{ newsList.gmtCreate }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                        <el-col :span="4">
                            <el-row>
                                <el-col :span="12">
                                    <div class="con">浏览量:</div>
                                </el-col>
                                <el-col :span="12">
                                    <div class="con">{{ newsList.click }}</div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                    <hr />
                    <el-row class="infor">
                        <el-col :span="24">
                            <div class="aa">{{ newsList.articleAbstract }}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="ac" v-html="newsList.articleContent"></div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col>
                            <div>
                                <el-button type="text" class="fl mb20" v-if="this.sub == 0" @click="subscribe()">订阅</el-button>
                                <el-button type="text" class="fl mb20" v-if="this.sub == 1" @click="offSubscribe()">取消订阅</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-show="newsList.comment == 1">
                        <el-col :span="24">
                            <div class="com">
                                <el-input v-model="commentVo.content" placeholder="写点评论,50字以内" maxlength="50" class="inputCom"></el-input>
                                <el-button class="btn" @click="submit()">评论</el-button>
                            </div>
                        </el-col>
                    </el-row>
                    <el-row v-for="comment in commentList" v-bind:key="comment.id" class="infor" v-show="newsList.comment == 1">
                        <el-col :span="2">
                            <div class="head"><img :src="comment.avatar" alt="" /></div>
                        </el-col>
                        <el-col :span="22">
                            <el-row>
                                <el-col :span="24">
                                    <div class="mark">
                                        {{ comment.nickName }}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <div class="mark">
                                        {{ comment.content }}
                                    </div>
                                </el-col>
                            </el-row>
                            <el-row>
                                <el-col :span="24">
                                    <div class="mark">
                                        {{ comment.gmtCreate }}
                                    </div>
                                </el-col>
                            </el-row>
                        </el-col>
                    </el-row>
                </div>
            </el-col>
            <el-col :span="8">
                <div class="content-f">
                    <el-row>
                        <el-col :span="24">
                            <div class="recom">
                                <span>推荐</span>
                            </div>
                        </el-col>
                    </el-row>
                    <div class="recomList" v-for="item in articleList" :key="item.id" @click="getDetails(item.id)">
                        <el-row>
                            <el-col :span="24">
                                <div>
                                    <img :src="item.articleCover" alt="" />
                                </div>
                            </el-col>
                        </el-row>
                       <div class="text">
                            <el-row>
                            <el-col :span="24">
                                <div class="til" :span="24">
                                    {{ item.articleTitle }}
                                </div>
                            </el-col>
                        </el-row>
                        <el-row class="updateTime">
                            <el-col :span="24">
                                <div>
                                    {{ item.gmtCreate }}
                                </div>
                            </el-col>
                        </el-row>
                       </div>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>   
    <Footer></Footer>
</div>
</template>

<script>
import newsApi from "@/api/news";
import Footer from "@/components/footer";
import Header from "@/components/header";
import cookie from "js-cookie";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Footer,
        Bread
    },
    data() {
        return {
            sub: 0,
            id: "",
            newsList: {},
            memberId: "",
            venueId: "",
            categoryId: "",
            commentVo: {
                memberId: "",
                articleId: "",
                content: "",
            },
            commentList: [],
            articleList: [],
            subscribeId: "",
        };
    },
    created() {
        this.id = this.$route.params.id;
        this.getArticleInfo();
        this.getComment();

    },

    mounted() {},
    watch: {
        $route: "reload",
    },
    methods: {
        offSubscribe() {
            this.$confirm('此操作将取消订阅此类文章, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'success'
                    }).then(() => {
                        newsApi
                .offSubscribe(this.subscribeId)
                .then((response) => {
                    this.$message({
                            type: 'success',
                            message: '取消订阅成功，个人中心和微信公众号将不再推送该模块消息!'
                        });
                    this.isSubscribe();
                });
                        
                    }).catch(() => {
                        this.$message({
                            type: 'success',
                            message: '已取消'
                        });
                    });
            
        },
        isSubscribe() {
            var v = cookie.get("lc_ucenter");
            if (v != undefined&&v!=null&&v!="") {
                v = JSON.parse(v);

                this.memberId = v.id
                newsApi
                    .isSubscribe(this.memberId, this.venueId, this.categoryId)
                    .then((response) => {
                        this.sub = response.data.data.isSubscribe;
                        if (this.sub == 1) {
                            this.subscribeId = response.data.data.id
                        }
                    });
            } 
        },
        subscribe() {
            var v = "";
            v = cookie.get("lc_ucenter");
            if (v != undefined&&v!=null&&v!="") {
                v = JSON.parse(v);

                this.memberId = v.id
                newsApi
                    .subscribe(this.memberId, this.venueId, this.categoryId)
                    .then((response) => {
                        this.$alert('订阅成功，您可在个人中心和微信公众号查看该模块消息，若您还未关注，请扫描下方二维码关注公众号。', '提示', {
                            confirmButtonText: '确定',
                            callback: action => {
                                this.$message({
                                    type: 'info',
                                    message: "订阅成功"
                                });
                            }
                        });
                        this.isSubscribe();
                    });
            } else
           {
                this.$confirm("仅在登陆后才可订阅！请先登录", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        this.$router.push({
                            path: "/loginIn",
                            query: { redirect: this.$route.fullPath }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "取消",
                        });
                    });
            } 
        },
        reload() {
            this.$router.go(0);
        },
        getDetails(id) {
            this.$router.push({
                path: "/news/detail/" + id,
            });
        },
        getInfoActivity() {
            newsApi
                .getInfoActivity(this.newsList.articleCategory)
                .then((response) => {
                    this.articleList = response.data.data.articleList;
                });
        },
        getArticleInfo() {
            newsApi.getArticleInfo(this.id).then((response) => {
                this.newsList = response.data.data.info;
                this.venueId = this.newsList.regionId;
                this.categoryId = this.newsList.articleCategory;
                var time = this.newsList.gmtCreate.split(" ")[0];
                this.newsList.gmtCreate = time;
                this.isSubscribe();
                this.getInfoActivity();
            });
        },
        getComment() {
            newsApi.getComment(this.id).then((response) => {
                this.commentList = response.data.data.commentList;
            });
        },

        submit() {
            var v = cookie.get("lc_ucenter");
            if (v) {
                v = JSON.parse(v);
                if (v.identity == null) {
                this.$confirm("未实名，请先实名?", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        this.$router.push({
                            path: "/certification",
                            query: { redirect: this.$route.fullPath }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "取消",
                        });
                    });
              } else {
                  this.commentVo.memberId = v.id;
                  this.commentVo.articleId = this.id;
                  this.addComment();
              }
            }
            else {
                this.$confirm("仅在登陆且实名认证后才可评论！请先登录", "提示", {
                        confirmButtonText: "确定",
                        cancelButtonText: "取消",
                        type: "warning",
                    })
                    .then(() => {
                        this.$router.push({
                            path: "/loginIn",
                            query: { redirect: this.$route.fullPath }
                        });
                    })
                    .catch(() => {
                        this.$message({
                            type: "info",
                            message: "取消",
                        });
                    });
            } 
        },
        addComment() {
            if(this.commentVo.content==""||this.commentVo.content==null){
                return;
            }
            newsApi.addComment(this.commentVo).then((response) => {
                this.$message({
                    type: "success",
                    message: "评论成功!",
                });
                this.commentVo = {};
            });
        },
    },
};
</script>

<style scoped>
.text {
    background-color: #FAF5EB;
}

.ac>>>p {
    font-size: 14px;
}

.recom {
    font-size: 20px;
    color: #A48260;
    padding: 0 0 20px 0;
}

.recomList img {
    width: 400px;
    height: 240px;
}

.recomList {
    width: 400px;
    margin-bottom: 20px;
    background-color: #fff;
}

.recomList:hover {
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -webkit-transition: all 0.8s ease-out;
    transition: all 0.8s ease-out;
}

.til {
    font-size: 20px;
    color: rgba(0, 0, 0, 0.85);
}

.til:hover {
    color: #A48260;
}

.updateTime {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.85);
}

.contain {
    width: 1200px;
    margin: 50px auto;
}

.content-f {
    padding-left: 50px;
    width: 17%;
}

.content .el-row:nth-child(1) {
    margin-top: 0;
}

.infor {
    margin-top: 30px;
}

.title {
    font-size: 24px;
    color: rgba(0, 0, 0, 0.85);
    text-align: center;
}

.con {
    font-size: 14px;
    color: rgba(0, 0, 0, 0.65);
}

.aa {
    font-size: 14px;
    color: #555;
    line-height: 30px;
    text-indent: 2em;
}

.ac {
    color: #6c6c6c;
    letter-spacing: 0;
    text-align: left;
    line-height: 30px;
}
.ac >>>img {
    max-width: 100%;
}

.com {
    background: #ececec;
    border: 1px solid #ececec;
    border-radius: 25px;
    border-radius: 25px;
    height: 50px;
    line-height: 50px;
    font-size: 14px;
    color: #555555;
}

/deep/ .inputCom {
    width: 88%;
    border: none;
    margin-left: 20px;
    background: #ececec;
}

.btn {
    border: none;
    font-size: 14px;
    color: #274da1;
    background: #ececec;
}

.head {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: pink;
}

.head img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
}

.mark {
    font-size: 14px;
    color: #555;
    height: 20px;
    line-height: 20px;
}
</style>
