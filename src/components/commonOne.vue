<template>
<div class="w">
    <el-main v-if="articleIndex.length>0">
        <div id="act">
            <div class="activeContent fl" @click="getDetails(articleIndex[0].id)">
                <div class="fz activeImg">
                    <img v-lazy="articleIndex[0].articleCover" alt />
                </div>
                <div class="active-co fr">
                    <el-row>
                        <el-col :span="24">
                            <div class="active-title">
                                {{ articleIndex[0].articleTitle }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div v-html="articleIndex[0].articleAbstract" class="active-content"></div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </el-main>

    <el-main v-if="articleIndex.length>1">
        <div id="act">
            <div class="activeContent fr" @click="getDetails(articleIndex[1].id)">
                <div class="activeimg">
                    <img v-lazy="articleIndex[1].articleCover" alt />
                </div>
                <div class="active-co fl">
                    <el-row>
                        <el-col :span="24">
                            <div class="active-title">
                                {{ articleIndex[1].articleTitle }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div v-html="articleIndex[1].articleAbstract" class="active-content"></div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </el-main>
    <el-main v-if="articleIndex.length>2">
        <div id="act">
            <div class="activeContent fl" @click="getDetails(articleIndex[2].id)">
                <div class="fz activeImg">
                    <img v-lazy="articleIndex[2].articleCover" alt />
                </div>
                <div class="active-co fr">
                    <el-row>
                        <el-col :span="24">
                            <div class="active-title">
                                {{ articleIndex[2].articleTitle }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div v-html="articleIndex[2].articleAbstract" class="active-content"></div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </el-main>
</div>
</template>

<script>
import activityApi from "@/api/activity";
export default {
    name: "Film",
    props: {
        articleIndex: Array,
    },
    methods: {
        getDetails(id) {
            this.$router.push({
                path: "/news/detail/" + id,
            });
        },
    },
};
</script>

<style scoped>
.active-title {
    font-size: 26px;
    color: #C1A98E;
    border-left: 2px solid #C1A98E;
    padding-left: 16px;
}

.active-title:hover {
    text-decoration: underline;
    cursor: pointer;
}

.active-content {
    font-size: 14px;
    text-align: left;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 5;
    -webkit-box-orient: vertical;
    padding-right: 30px;
    text-indent: 2em;
}

.activeContent:hover {
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -webkit-transition: all 0.8s ease-out;
    transition: all 0.8s ease-out;
    cursor: pointer;
}

.act {
    height: 300px;
}

.activeContent {
    height: 240px;
    width: 1000px;
    display: inline-block;
    text-align: left;
    position: relative;
    background: url('../assets/index/dw.png') no-repeat;
    padding-top: 10px;
    border: 3px solid #C1A98E;
}

.activeImg,
.activeimg {
    position: absolute;
    width: 400px;
    height: 240px;
    top: -30px;
}

.activeimg {
    right: -20px;
}

.activeImg img,
.activeimg img {
    width: 400px;
    height: 240px;
}

.active-co {
    width: 580px;
    height: 240px;
    margin-left: 30px;
}

.el-row {
    margin-top: 20px;
}

.el-row:nth-child(1) {
    margin-top: 0;
}

.el-row:nth-child(4) {
    margin-top: 0;
}
</style>
