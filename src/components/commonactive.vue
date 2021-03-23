<template>
<div class="w">
    <el-main v-if="activityIndex.length>0" class="mt20">
        <div id="act">
            <div class="activeContent fl">
                <div  class="fz activeImg">
                    <img v-lazy="activityIndex[0].activeCover" alt />
                </div>
                <div class="active-co fr" @click="getDetail(activityIndex[0].id)">
                    <el-row>
                        <el-col :span="24">
                            <div class="active-title">
                                {{ activityIndex[0].activeTitle }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="active-content">
                                {{ activityIndex[0].activeSimple }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="listFont">
                            <span>活动时间:</span>
                        </el-col>
                        <el-col :span="20" class="listFont">
                            <div>{{ activityIndex[0].timePart }}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="listFont">
                            <span>所属场馆:</span>
                        </el-col>
                        <el-col :span="20" class="listFont">
                            <div>{{ activityIndex[0].venue }}</div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </el-main>
    <el-main v-if="activityIndex.length>1">
        <div id="act">
            <div class="activeContent fr" @click="getDetail(activityIndex[1].id)">
                <div class="activeimg">
                    <img v-lazy="activityIndex[1].activeCover" alt />
                </div>
                <div  class="active-co fl active-2">
                    <el-row>
                        <el-col :span="24">
                            <div class="active-title">
                                {{ activityIndex[1].activeTitle }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="active-content">
                                {{ activityIndex[1].activeSimple }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="listFont">
                            <span>活动时间:</span>
                        </el-col>
                        <el-col :span="20" class="listFont">
                            <div>{{ activityIndex[1].timePart }}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="listFont">
                            <span>所属场馆:</span>
                        </el-col>
                        <el-col :span="20" class="listFont">
                            <div>{{ activityIndex[1].venue }}</div>
                        </el-col>
                    </el-row>
                </div>
            </div>
        </div>
    </el-main>
    <el-main v-if="activityIndex.length>2">
        <div id="act">
            <div class="activeContent fl" @click="getDetail(activityIndex[2].id)">
                <div class="fz activeImg">
                    <img v-lazy="activityIndex[2].activeCover" alt />
                </div>
                <div class="active-co fr">
                    <el-row>
                        <el-col :span="24">
                            <div class="active-title">
                                {{ activityIndex[2].activeTitle }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <div class="active-content">
                                {{ activityIndex[2].activeSimple }}
                            </div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="listFont">
                            <span>活动时间:</span>
                        </el-col>
                        <el-col :span="20" class="listFont">
                            <div>{{ activityIndex[2].timePart }}</div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="4" class="listFont">
                            <span>所属场馆:</span>
                        </el-col>
                        <el-col :span="20" class="listFont">
                            <div>{{ activityIndex[2].venue }}</div>
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
    name: "Activity",
    data() {
        return {
            
        }
    },
    props: {
        activityIndex: Array,
    },
    methods: {
        getDetail(id) {
            this.$router.push({
                path: "/activity/detail/" + id,
            });
        },
    },
};
</script>

<style scoped>
.activeimg img,
.activeImg img {
    width: 400px;
    height: 240px;
}

.listFont {
    font-size: 14px;
}

.active-title {
    font-size: 26px;
    color: #A48260;
    border-left: 2px solid #A48260;
    padding-left: 16px;
}


.active-title:hover {
    text-decoration: underline;
}

.active-content {
    /* text-align: left;
    color: #555;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    padding-right: 30px; */
    font-size: 14px;
    color: #555555;
    line-height: 30px;
    /* margin-top: 70px; */
    /* width: 450px;
    height: 120px; */
    text-align: left;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3;
    -webkit-box-orient: vertical;
    text-indent: 2em;
}

.activeContent:hover {
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    /*考虑浏览器兼容性*/
    -moz-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    -webkit-transition: all 0.8s ease-out;
    transition: all 0.8s ease-out;
    cursor: pointer;
}

.act {
    /*position: relative;*/
    height: 340px;
}

.activeContent {
    height: 230px;
    width: 970px;
    display: inline-block;
    text-align: left;
    position: relative;
    background: url('../assets/index/dw.png') no-repeat;
    padding-top: 10px;
    border: 3px solid #C1A98E;

}

.activeImg {
    position: absolute;
    width: 400px;
    height: 240px;
    top: -30px;
}

.activeimg {
    position: absolute;
    width: 400px;
    height: 240px;
    top: -30px;
    right: -20px;
}

.active-co {
    width: 580px;
    height: 240px;
    margin-left: 30px;
    /* margin-right: 30px; */
}
.active-2 {
    padding: 30px;
    box-sizing: border-box;
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
