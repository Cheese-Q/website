<template>
<div id="main-container">
    <Header></Header>
    <Bread></Bread>
    <div class="title">
        文化地图
    </div>
    <!-- <div class="map" v-bind:style="{minHeight: Height+'px'}" >
        <div class="dt"><img src="../../assets/map/dt.jpg" alt=""></div>
        <div class="ty ico" @click="getList(gym)" v-show="cg"><img src="../../assets/map/ty.png" alt=""></div>
        <div class="fzw ico" @click="getList(fwz)" v-show="cg"><img src="../../assets/map/fzw.png" alt=""></div>
        <div class="shy ico" @click="getList(shy)" v-show="cg"><img src="../../assets/map/shy.png" alt=""></div>
        <div class="lbz ico" @click="getList(lbz)" v-show="cg"><img src="../../assets/map/lbz.png" alt=""></div>
        <div class="wq ico" @click="getList(wq)" v-show="cg"><img src="../../assets/map/wq.png" alt=""></div>
        <div class="qc ico" @click="getList(qc)" v-show="cg"><img src="../../assets/map/qc.png" alt=""></div>
        <div class="xjgj ico" @click="getList(xjgj)" v-show="wb"><img src="../../assets/map/xjgj.png" alt=""></div>
        <div class="whg ico" @click="getList(whg)" v-show="cg"><img src="../../assets/map/whg.png" alt=""></div>
        <div class="tsg ico" @click="getList(tsg)" v-show="cg"><img src="../../assets/map/tsg.png" alt=""></div>
        <div class="ejsc ico" @click="getList(ejsc)" v-show="cg"><img src="../../assets/map/ejsc.png" alt=""></div>
        <div class="chz ico" @click="getList(chz)" v-show="wb"><img src="../../assets/map/chz.png" alt=""></div>
        <div class="yt ico" @click="getList(yt)" v-show="cg"><img src="../../assets/map/yt.png" alt=""></div>
        <div class="bwg ico" @click="getList(bwg)" v-show="cg"><img src="../../assets/map/bwg.png" alt=""></div>
        <div class="zx ico" @click="getList(zx)" v-show="cg"><img src="../../assets/map/zx.png" alt=""></div>
        <div class="syx ico" @click="getList(syx)" v-show="wb"><img src="../../assets/map/syx.png" alt=""></div>
        <div class="eysb ico" @click="getList(eysb)" v-show="cg"><img src="../../assets/map/eysb.png" alt=""></div>
        <div class="qczj ico" @click="getList(qczj)" v-show="cg"><img src="../../assets/map/qczj.png" alt=""></div>
        <div class="ys ico" @click="getList(ys)" v-show="cg"><img src="../../assets/map/ys.png" alt=""></div>
        <div class="ej ico" @click="getList(ej)" v-show="cg"><img src="../../assets/map/ej.png" alt=""></div>
        <div class="fhs ico" @click="getList(fhs)" v-show="cg"><img src="../../assets/map/fhs.png" alt=""></div>
        <div class="wcm ico" @click="getList(wcm)" v-show="wb"><img src="../../assets/map/wcm.png" alt=""></div>
        <div class="tl"><img src="../../assets/map/tl.png" alt=""></div>
        <div class="wb ico" @click="getWb()"><img src="../../assets/map/wb.png" alt=""></div>
        <div class="cg ico" @click="getCg()"><img src="../../assets/map/cg.png" alt=""></div>
    </div> -->
    <Footer></Footer>
    <el-dialog :visible.sync="dialogVisible" width="60%" >
        <div class="title">{{venueInfo.separate}}</div>
        <div class="content">
            <div class="cgImg"><img :src="venueInfo.cover" alt=""></div>
            <div class="tit">
                <span>场馆介绍</span>
            </div>
            <el-divider></el-divider>
            <div class="introduce">
                {{venueInfo.venueDescription}}
            </div>
            <div class="mt20">
                <el-row>
                    <el-col :span="4">详细地址: </el-col>
                    <el-col :span="20"> {{venueInfo.address }} <a :href="address" onclick="window.open(this.href);return false"> <i class="el-icon-location-outline add ml20"> 到这去</i> </a></el-col>
                </el-row>
            </div>
            <div class="mt20">
                <el-row>
                    <el-col :span="4">联系电话: </el-col>
                    <el-col :span="20">{{venueInfo.mobile}}</el-col>
                </el-row>
            </div>
        </div>
    </el-dialog>
</div>
</template>

<script>
import mapApi from "@/api/map";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Footer,
        Bread,
    },
    data() {
        return {
            Height:1080,
            address:"",
            cg: true,
            wb: true,
            venueInfo: {},
            dialogVisible: false,
            // gym: "体育馆",
            // fwz: "上虞区非物质文化遗产展示馆",
            // shy: "虞舜书画院",
            // lbz: "罗步臻艺术馆",
            // wq: "围棋与越剧大师工作室",
            // qc: "上虞越窑青瓷研究传习中心",
            // xjgj: "谢晋故居",
            // whg: "数字文化馆",
            // tsg: "图书馆",
            // ejsc: "娥江书场",
            // chz: "春晖中学",
            // yt: "雅图时空美术馆",
            // bwg: "博物馆",
            // zx: "中鑫建筑艺术博物馆",
            // syx: "上虞乡贤馆",
            // qczj: "“青春之家”城市阳台",
            // eysb: "e游书吧",
            // ys: "上虞文化艺术展示馆",
            // ej: "娥江影视厅",
            // fhs: "凤凰山考古遗址公园",
            // wcm: "王充墓",
            dialogVisible: false,
        }
    },
    created() {
    },
     mounted() {
    },
    methods: {
        getWb(){
            this.cg=!this.cg;
        },
          getCg(){
            this.wb=!this.wb;
        },
        getList(item) {
            mapApi
                .getVenueInfo(item)
                .then((response) => {
                    this.venueInfo = response.data.data.venueInfo;
                    this.address = "http://api.map.baidu.com/place/search?query="+this.venueInfo.address+"&radius=1000&region=浙江&output=html&src=webapp.baidu.openAPIdemo"
                    this.dialogVisible = true;

                });
        },
    },
};
</script>

<style scoped>
.add {
    color: #274DA1;
}

.introduce {
    font-size: 14px;
    color: #555;
    line-height: 30px;
    text-indent: 2em;
}

.content {
    width: 776px;
    margin: 0 auto;
}

.tit {
    font-size: 20px;
    color: #555;
    margin: 27px 0;
}

.cgImg img {
    width: 776px;
    height: 324px;
    margin: 0 auto;
}

.title {
    font-size: 24px;
    color: #555;
    text-align: center;
}

.ico img {
    position: absolute;
    cursor: pointer;
    transition: all 0.6s;
}

.ico img:hover {
    transform: scale(1.2);
}

.wcm img {
    width: 47px;
    height: 110px;
    top: 885px;
    left: 636px;
}

.wb img {
    width: 90px;
    height: 19px;
    top: 842px;
    left: 1284px;
}

.cg img {
    width: 71px;
    height: 18px;
    top: 865px;
    left: 1284px;
}

.tl img {
    position: absolute;
    width: 141px;
    height: 180px;
    top: 806px;
    left: 1259px;
}

.fhs img {
    width: 117px;
    height: 88px;
    top: 735px;
    left: 335px;
}

.ej img {
    width: 61px;
    height: 63px;
    top: 541px;
    left: 824px;
}

.ys img {
    width: 109px;
    height: 63px;
    top: 460px;
    left: 637px;
}

.qczj img {
    width: 57px;
    height: 82px;
    top: 353px;
    left: 489px;
}

.eysb img {
    width: 61px;
    height: 72px;
    top: 382px;
    left: 571px;
}

.syx img {
    width: 64px;
    height: 67px;
    top: 253px;
    left: 477px;
}

.bwg img {
    width: 64px;
    height: 81px;
    top: 444px;
    left: 1017px;
}

.zx img {
    width: 120px;
    height: 65px;
    top: 736px;
    left: 964px;
}

.yt img {
    width: 91px;
    height: 66px;
    top: 487px;
    left: 929px;
}

.chz img {
    width: 63px;
    height: 72px;
    top: 437px;
    left: 1189px;
}

.ejsc img {
    width: 66px;
    height: 69px;
    top: 426px;
    left: 793px;
}

.tsg img {
    width: 64px;
    height: 64px;
    top: 354px;
    left: 841px;
}

.whg img {
    width: 62px;
    height: 66px;
    top: 362px;
    left: 751px;
}

.xjgj img {
    width: 87px;
    height: 71px;
    top: 73px;
    left: 1010px;
}

.qc img {
    width: 82px;
    height: 71px;
    top: 259px;
    left: 891px;
}

.wq img {
    width: 85px;
    height: 78px;
    top: 271px;
    left: 776px;
}

.lbz img {
    width: 73px;
    height: 70px;
    top: 265px;
    left: 628px;
}

.shy img {
    width: 62px;
    height: 64px;
    top: 163px;
    left: 663px;
}

.ty img {
    width: 73px;
    height: 57px;
    top: 140px;
    left: 477px;
}

.fzw img {
    width: 85px;
    height: 80px;
    top: 161px;
    left: 560px;
}

.map {
    width: 1440px;
    position: relative;
    margin: 0 auto;
}

.clearfix:before,
.clearfix:after {
    content: "";
    display: table;
}

.clearfix:after {
    clear: both;
}

.clearfix {
    *zoom: 1;
}

.dt img {
    width: 100%;
    position: absolute;
}

.title {
    height: 20px;
    font-size: 20px;
    color: #555;
    margin: 20px;
}
</style>
