<template>
<div id="main-container">
    <Header></Header>
    <Figure  :venueId="venueId"> </Figure>
    <div class="mt60">    
        <el-container>
            <div class="w">
                <div @click="getSuggestion()" class="suggest" >
                <i class="el-icon-edit-outline"></i>
            </div>
             <el-header>        
                <span><img src="../assets/index/zh.png" alt="" style="float:left"></span>       
            </el-header>
            <el-container>
                <div class="smartV">
                    <ul>
                        <li @click="getDetail(tsg)"><img src="../assets/index/ts.png" alt=""></li>
                        <li @click="getDetail(bwg)"><img src="../assets/index/bw.png" alt=""> </li>
                        <li @click="getDetail(tyg)"><img src="../assets/index/ty.png" alt=""></li>
                        <li @click="getDetail(szwh)"><img src="../assets/index/sz.png" alt=""></li>
                        <li @click="getDetail(wgs)"><img src="../assets/index/wgs.png" alt=""></li>
                    </ul>
                </div>
            </el-container>
            <el-container  class="mt20">
                    <el-row>
                        <el-col :span="14">
                              <div class="content">
                                 <div class="venue_con">
                                      <el-row>
                                        <el-col :span="24">
                                          <div class="title">{{venueInfo.separate}}</div>
                                          </el-col>
                                      </el-row>
                                    <el-row>
                                       <el-col :span="24">
                                          <div class="conte">{{venueInfo.venueDescription}}</div>
                                       </el-col>
                                       </el-row>
                                 </div>
                                 <div class="k_img">
                                     <img src="../assets/index/k.png" alt="">
                                       </div>
                                   <div class="k_btn">
                                      <img src="../assets/index/gw.png" alt=""  @click="toWebPage()">
                                    </div>                      
                                 </div>
                            </el-col>
                        <el-col :span="10">
                            <div class="venue_img"><img v-lazy="venueInfo.cover" alt=""></div>
                        </el-col>
                    </el-row> 
            </el-container>
            </div>
        </el-container>
    </div>
    <el-container>
        <div class="w mt60">
        <el-header>        
                <span><img src="../assets/index/wh.png" alt="" style="float:left"></span> 
                <span><img src="../assets/index/lo.png" alt="" style="float:right" @click="toList()" class="mt30"></span>      
        </el-header>
        <IndexNews :newsIndex="newsIndex"></IndexNews>
        </div>
    </el-container>
    <el-container class="mt60 bgd">
       <div class="w">
             <el-header>        
                <span><img src="../assets/index/hd.png" alt="" style="float:left"></span> 
                <span><img src="../assets/index/lo.png" alt="" style="float:right"  @click="toDetailList()" class="mt30"></span>      
        </el-header>    
        <Activity :activityIndex="activityIndex"></Activity>
       </div>
    </el-container>
    <el-container>
        <div class="w mt60">
        <el-header>        
                <span><img src="../assets/index/cg.png" alt="" style="float:left"></span> 
                <span><img src="../assets/index/lo.png" alt="" style="float:right" class="mt30" @click="toVenueList()"></span>      
        </el-header>
        <Venue :venueIndex="venueIndex"></Venue>
          </div>
    </el-container>
     <el-container>
        <div class="w mt60">
        <el-header>        
                <span><img src="../assets/index/ssrl.png" alt="" style="float:left"></span> 
        </el-header>
        <el-main>
            <el-row class="people_list">
                <el-col :span="5">
                    <el-row class="people_num">
                        <el-col :span="24">{{libraryStream}}</el-col>
                    </el-row>
                     <el-row class="people_venue">
                        <el-col :span="24">图书馆</el-col>
                    </el-row>
                </el-col>
                <el-col :span="5" :offset="1">
                     <el-row class="people_num">
                        <el-col :span="24">{{museStream}}</el-col>
                    </el-row>
                     <el-row  class="people_venue">
                        <el-col :span="24">博物馆</el-col>
                    </el-row>
                </el-col>
                <el-col :span="5" :offset="1">
                     <el-row class="people_num">
                        <el-col :span="24">{{gymStream}}</el-col>
                    </el-row>
                     <el-row class="people_venue">
                        <el-col :span="24">体育馆</el-col>
                    </el-row>
                </el-col>
                <el-col :span="5" :offset="1">
                     <el-row class="people_num">
                        <el-col :span="24">{{whktStream}}</el-col>
                    </el-row>
                     <el-row class="people_venue">
                        <el-col :span="24">文化客厅</el-col>
                    </el-row>
                </el-col>
            </el-row>

            <el-row class="people_list">
                <el-col :span="7">
                    <el-row class="people_num">
                        <el-col :span="24">{{cemStream}}</el-col>
                    </el-row>
                     <el-row class="people_venue">
                        <el-col :span="24">曹娥庙</el-col>
                    </el-row>
                </el-col>
                <el-col :span="7" :offset="1">
                     <el-row class="people_num">
                        <el-col :span="24">{{chzStream}}</el-col>
                    </el-row>
                     <el-row  class="people_venue">
                        <el-col :span="24">春晖中学</el-col>
                    </el-row>
                </el-col>
                <el-col :span="7" :offset="1">
                     <el-row class="people_num">
                        <el-col :span="24">{{xjgjStream}}</el-col>
                    </el-row>
                     <el-row class="people_venue">
                        <el-col :span="24">谢晋故居</el-col>
                    </el-row>
                </el-col>
            </el-row>
        </el-main>
          </div>
    </el-container>
    <el-container class="mt60">
        <div class="w">
        <el-header>        
                <span><img src="../assets/index/dt.png" alt="" style="float:left"></span> 
        </el-header>
        <!-- <div class="whdt">
            <div class="kk">
                <img src="../assets/index/xk.png" alt="">
                 <div id="map" style="width: 849px; height: 444px"></div>
            </div>
        </div> -->
       </div>     
    </el-container>
    <el-dialog title="用户建议" :visible.sync="dialogFormVisible" center>
          <el-form :model="suggest" ref="suggest" :rules="rules" label-width="80px" size="small" label-position="right">
            <el-form-item label="姓名:" label-width="100px" prop="name"  required>
              <el-input v-model="suggest.name" auto-complete="off" placeholder="请填写姓名..." maxlength="10" />
            </el-form-item>
            <el-form-item label="电话:" label-width="100px" prop="mobile" required>
              <el-input v-model="suggest.mobile" auto-complete="off" placeholder="请填写电话..." />
            </el-form-item>
            <el-form-item label="建议:" label-width="100px" prop="suggestion" required>
              <el-input type="textarea" :rows="4" v-model="suggest.suggestion" auto-complete="off" placeholder="请输入您的意见或建议..." maxlength="300" />
            </el-form-item>
            <el-form-item  label-width="100px" prop="score" required>
                <el-rate v-model="suggest.score"></el-rate>            
            </el-form-item>
          </el-form>
          <div slot="footer" class="dialog-footer">
            <el-button @click="dialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addSuggestion('suggest')">确 定</el-button>
          </div>
        </el-dialog>
        <Footer></Footer>
</div>
</template>

<script>
import mapApi from "@/api/map";
import indexApi from "@/api/index";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Activity from "@/components/commonactive";
import IndexNews from "@/components/indexNews";
import Venue from "@/components/commonvenue";
import Figure from "@/components/figure";
import suggestApi from "@/api/suggest";
import {validatePhone} from "@/utils/validate"
export default {
    name: "Index",
    components: {
        
        Header,
        IndexNews,
        Activity,
        Venue,
        Figure,
        Footer,
    },
    data() {
        return {
            museStream:0,
            cemStream:0,
            chzStream:0,
            xjgjStream:0,
            whktStream:0,
            libraryStream:0,
            gymStream:0,
            wgsStream:0,
            systemDate:"",
            Height:0,
            suggest:{},
            venueId:"14",
            venueInfo: {},
            tsg: "图书馆",
            bwg: "博物馆",
            tyg: "体育馆",
            wgs: "文物管理服务中心",
            szwh: "数字文化馆",
            blist: [],
            arrayList: [],
            bannerHeight: "",
            newsIndex: [],
            venueIndex: [],
            activityIndex: [],
            venueName: "",
            venueImg: "",
            venueDesc: "",
            rules:{
                 name: [{
                    required: true,
                    message: "* 请填写姓名",
                    trigger: "blur",
                }, ],
                mobile: [{
                    required: true,
                    trigger: "blur",
                    validator: validatePhone,
                }, ],
                suggestion: [
                    {
                    required: true,
                    message: "* 请填写您的意见或建议",
                    trigger: "blur",
                   }, 
                   {
                        min: 1,
                        max: 50,
                        message: "* 字数最多不能超过300字",
                        trigger: "blur",
                    },
                ],
                score:[{
                    required: true,
                    message: "* 请评分",
                    trigger: "blur",
                }, ],
            },
            dialogFormVisible:false,
            points:[
                 {
                    x: 120.874651,
                    y: 30.020996,
                    venue:"娥江影视厅",
                    address:"浙江省绍兴市上虞区江西路517号",
                },
                {
                    x: 120.850316,
                    y: 30.043952,
                    venue:"非物质文化遗产展示馆",
                    address:"江东北路12号",
                },
                {
                    x: 120.868775,
                    y: 30.031837,
                    venue:"地方文化艺术展示厅",
                    address:"江东路319号",
                },
                  {
                    x: 120.84206,
                    y:  30.04231,
                    venue:"上虞乡贤馆",
                    address:"浙江省绍兴市上虞区江西路",
                },
                 {
                    x: 120.865344,
                    y: 30.023994,
                    venue:"上虞越窑青瓷研究传习中心",
                    address:"浙江省绍兴市上虞区市民中心二路",
                },
                 {
                    x: 120.85262,
                    y: 30.04115,
                    venue:"罗步臻艺术馆",
                    address:"江东路百官广场西侧",
                },
                 {
                    x: 120.85260,
                    y: 30.04092,
                    venue:"虞舜书画院",
                    address:"",
                },
                 {
                    x: 120.85722,
                    y: 30.03865,
                    venue:"围棋与越剧大师工作室",
                    address:"江西岸11号楼内(百官广场对面)",
                },
                 {
                    x: 120.859613,
                    y: 30.038174,
                    venue:"娥江书场",
                    address:"浙江省绍兴市上虞区江东路",
                },
                 {
                    x: 120.851924,
                    y: 30.036314,
                    venue:"雅图时空美术馆",
                    address:"江东路119-1号(市建设局对面)",
                },
                 {
                    x: 120.827795,
                    y: 30.039112,
                    venue:"“青春之家”城市阳台",
                    address:"浙江省绍兴市上虞区曹娥街道光明居委会",
                },
                 {
                    x: 120.87669,
                    y: 30.00073,
                    venue:"中鑫建筑艺术博物馆 ",
                    address:"浙江省绍兴市上虞区舜耕大道518号",
                },
                 {
                    x: 120.862182 ,
                    y: 30.001696,
                    venue:"文化馆（总分馆）",
                    address:"上虞区百官街道市民中心二路1号",
                },
                 {
                    x: 120.84654,
                    y: 30.06108,
                    venue:"体育馆",
                    address:"绍兴市上虞区观山路",
                },
                 {
                    x: 120.847863,
                    y: 30.05007,
                    venue:"游泳馆",
                    address:"浙江省绍兴市上虞区百官街道观山路",
                },
                 {
                    x: 120.84591,
                    y: 30.05940,
                    venue:"体育场",
                    address:"浙江省绍兴市上虞区百官街道观山路",
                },
                 {
                    x: 120.88776,
                    y: 30.02372,
                    venue:"博物馆",
                    address:"绍兴市上虞区人民中路228号",
                },
                 {
                    x: 120.861661,
                    y: 30.040816,
                    venue:"图书馆",
                    address:"浙江省绍兴市上虞区市民中心一路2号",
                },
                 {
                    x: 120.93166,
                    y: 30.03071,
                    venue:"春晖中学（同兴里）",
                    address:"浙江省绍兴市上虞区春晖大道88号",
                },
                 {
                    x: 120.904906,
                    y: 30.030639,
                    venue:"谢晋故居",
                    address:"浙江省绍兴市上虞谢塘镇灵惠街96号",
                },
                 {
                    x: 120.888916,
                    y: 30.128582,
                    venue:"王充墓",
                    address:"上虞市章镇林岙村乌石上",
                },
                 {
                    x: 120.852696,
                    y: 29.971087,
                    venue:"凤凰山考古遗址公园",
                    address:"大善村水库北侧",
                },
                 {
                    x: 120.84321,
                    y: 30.04164,
                    venue:"e游书吧",
                    address:"浙江省绍兴市上虞区江西路近四环桥",
                },
            ]
        };
    },
    created() {   
        this.getTodayTime();
        this.getTodayStream();
        this.getArticle();
        this.getVenueIndex();
        this.getActivityIndex();
        this.getDetail(this.tsg);  
    },
    mounted() {
       this.baiduMap();
       setInterval(this.getTodayStream,1000*60);
    },
    methods: {
        getTodayStream(){
            indexApi.getTodayStream().then((response) => {
                this.whktStream = response.data.data.whktStream;
                this.libraryStream = response.data.data.libraryStream;
                this.gymStream = response.data.data.gymStream;
                this.cemStream = response.data.data.cemStream;
                this.chzStream = response.data.data.chzStream;
                this.xjgjStream = response.data.data.xjgjStream;
                this.museStream = response.data.data.museStream;
            });
        },
        getTodayTime() {
            var nowDate = new Date();
            var date = {
            year: nowDate.getFullYear(),
            month: nowDate.getMonth() + 1,
            day: nowDate.getDate(),
        }
        this.systemDate = date.year + '-'+ date.month + '-'+ date.day;
        },
        getSuggestion(){
            this.dialogFormVisible = true;
        },
        addSuggestion(suggest){
            this.$refs[suggest].validate((valid) => {
                if (valid) {
                    suggestApi.addSuggestion(this.suggest).then(response=>{
                this.$message({
                        message: "意见反馈成功！",
                        type: "success",
                    });
                    this.dialogFormVisible = false;
                    this.suggest = {};
            })
                } else {
                    this.fullscreenLoading = false;
                    return false;
                }
            });
        },
        toWebPage() {
            if (this.venueInfo.venueId == 1) {
                this.$router.push({
                    path: "/venue/gym",
                });
            } else if (this.venueInfo.venueId == 2) {
                this.$router.push({
                    path: "/venue/library",
                });
            } else if (this.venueInfo.venueId == 3) {
                this.$router.push({
                    path: "/venue/museum",
                });
            } else if (this.venueInfo.venueId == 4) {
                this.$router.push({
                    path: "/venue/bump",
                });
            } else {
                window.open('http://zhwt.shangyu.gov.cn:8001/');
            }
        },
        getDetail(item) {
            mapApi
                .getVenueInfo(item)
                .then((response) => {
                    this.venueInfo = response.data.data.venueInfo;
                    this.dialogVisible = true;
                });
        },
          toVenueList() {
            this.$router.push({
                path: "/venueAppoint",
            });
        },
        toDetailList() {
            this.$router.push({
                path: "/activity",
            });
        },
        toBump() {
            this.$router.push({
                path: "/venue/bump",
            });
        },
        toList() {
            this.$router.push({
                path: "/news",
            });
        },
        getActivityIndex() {
            indexApi.getActivityIndex().then((response) => {
                this.activityIndex = response.data.data.activityIndex;
            });
        },
        getVenueIndex() {
            indexApi.getVenueIndex().then((response) => {
                this.venueIndex = response.data.data.venueIndex;
            });
        },
        getArticle() {
            let articleVo = {};
            articleVo.categoryName = "文化资讯";
            articleVo.num = 4;
            indexApi.getArticle(articleVo).then((response) => {
                this.newsIndex = response.data.data.articleList;
            });
        },
        changeIndex(index) {
            this.index = index;
            switch (index) {
                case 1:
                    this.getImgUrl(index);
                    break;
                case 2:
                    this.getImgUrl(index);
                    break;
                case 3:
                    this.getImgUrl(index);
                    break;
                case 4:
                    this.getImgUrl(index);
                    break;
                case 5:
                    this.getImgUrl(index);
                    break;
            }
        },
        getImgUrl(index) {
            for (var i = 0; i < this.venueImgList.length; i++) {
                if (this.venueImgList[i].id == index) {
                    this.venueImg = this.venueImgList[i].imgUrl;
                    this.venueDesc = this.venueImgList[i].desc;
                    this.venueName = this.venueImgList[i].name;
                    break;
                }
            }
        },
        baiduMap() {
            var map = new BMap.Map("map");
            var point = new BMap.Point(120.85260,30.04092);
            map.centerAndZoom(point,15);
                    var ctrlNav = new window.BMap.NavigationControl({  
                        anchor: BMAP_ANCHOR_TOP_LEFT,  
                        type: BMAP_NAVIGATION_CONTROL_LARGE  
                    });  
                    map.addControl(ctrlNav);  
                    var ctrlOve = new window.BMap.OverviewMapControl({  
                        anchor: BMAP_ANCHOR_BOTTOM_RIGHT,  
                        isOpen: 1  
                    });  
                    map.addControl(ctrlOve);  
                    var ctrlSca = new window.BMap.ScaleControl({  
                        anchor: BMAP_ANCHOR_BOTTOM_LEFT  
                    });  
                    map.addControl(ctrlSca);  
                    for(var i=0;i<this.points.length;++i){
                        let pointNumber = new BMap.Point(this.points[i].x,this.points[i].y)
                        let infoWindow = new BMap.InfoWindow(this.points[i].address, {
                           width: 150,        
                            height: 20,    
                           title: this.points[i].venue,   
                        });
                         var label = new BMap.Label(this.points[i].venue, {
                           offset: new BMap.Size(30, 8)
                        });
                        let markers = new BMap.Marker(pointNumber);
                        map.addOverlay(markers);  
                        markers.setLabel(label); 
                         markers.addEventListener("click", function (event) {
                        map.openInfoWindow(infoWindow, pointNumber);
                        });
                    }
        },
    },
};
</script>

<style scoped>
.people_num {
    font-size: 40px;
    height: 50px;
    line-height: 50px;
    color: #A48260;
    text-shadow: #A48260 0.1em 0.1em 0.2em;
}
/* 
@keyframes myfirst
{
	0%   {color:#FAAD14;}
	25%  {color:#D48806;}
	50%  {color:#AD6800;}
	100% {color:#874D00;}
}

@-moz-keyframes myfirst  Firefox 
{
	0%   {color:#FAAD14;}
	25%  {color:#D48806;}
	50%  {color:#AD6800;}
	100% {color:#874D00;}
}

@-webkit-keyframes myfirst  Safari and Chrome 
{
	0%   {color:#FAAD14;}
	25%  {color:#D48806;}
	50%  {color:#AD6800;}
	100% {color:#874D00;}
}

@-o-keyframes myfirst  Opera 
{
	0%   {color:#FAAD14;}
	25%  {color:#D48806;}
	50%  {color:#AD6800;}
	100% {color:#874D00;}
} */

.people_venue {
    font-size: 20px;
    color: #666;
     height: 50px;
    line-height: 50px;
}

.people_list {
    margin-top: 30px;
    text-align: center;
}

.bg {
    background: url(../assets/index/bj1.png) no-repeat;
}
.bgd {
    background: url(../assets/index/bj2.png) no-repeat;
}
.kk {
    width: 990px;
    height: 530px;
    margin: 0 auto;
    position: relative;
}
#map {
    position: absolute;
    top: 23px;
    left: 70px;
}
.kk img{
    width: 990px;
    height: 530px;
}
.k_img{
    width: 450px;
    height: 240px;
    position: absolute;
    left: 100px;
    top: 30px;
}

.venue_con {
      width: 450px;
      height: 240px;
      padding: 20px;
      box-sizing: border-box;
      margin: 0 100px;
}

.k_img img{
    width: 450px;
    height: 240px;
}
.content {
    position: relative;
    width: 600px;
}

.k_btn {
    position: absolute;
    top: 240px;
    left: 360px;
}

.smartV img {
    width: 200px;
    height: 140px;
}
.smartV li {
    float: left;
    width: 240px;
}
.smartV li img {
    transition: all 0.6s;
}
.smartV li img:hover {
    cursor: pointer;
    transform: scale(1.1);
}
.title {
  font-size: 30px;
  color: #AD8764;
}

.conte {
    font-size: 14px;
    color: #555;
    line-height: 30px;
    margin-top: 30px;
    text-indent: 2em;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    overflow: hidden;
}

.venue_img img {
    width: 460px;
    height: 280px;
    border-radius: 10px;
}

.img img {
    width: 600px;
    height: 374px;
}

.icon,
.ico {
    width: 130px;
    height: 130px;
    background-color: rgba(39, 77, 161, 0.05);
    box-shadow: 0 12px 19px 0 #D0D0D0;
    border-radius: 3px;
    display: inline-block;
    font-size: 50px;
    line-height: 130px;
    text-align: center;
}

.icon {
    margin-left: 60px;
}

.icon:hover,
.ico:hover {
    background: rgba(255, 255, 255, 0.35);
    box-shadow: 0 12px 19px 0 #D0D0D0;
    border-radius: 3px;
    border-bottom: 3px solid #274DA1;
    cursor: pointer;
    box-sizing: border-box;
}

.ic {
    font-size: 36px;

}

.ico {
    margin-left: 140px;
    font-size: 60px;
}

#map {
    margin-top: 30px;
}

.ih-item img {
    height: 380px;
    width: 580px;
}

.info {
    height: 380px;
    width: 580px;
}

.info .vunueText {
    color: #fff;
    width: 350px;
    margin: 20px 50px;
    font-size: 14px;
}

.vunueText {
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
}

.grid-content {
    height: 120px;
}

.grid-content i {
    font-size: 70px;
}

.grid-content .el-col {
    text-align: center;
}

.el-aside {
    margin-top: 40px;
}

.grid-content .icon {
    font-size: 60px;
}

.animated {
    width: 600px;
}
.suggest{
  border-radius:4px;
  cursor:pointer; 
  z-index: 9999;   
  justify-content: space-around; 
  align-items: center; 
  font-size:50px;
  width: 50px;
  height: 64px;
  position: fixed;   
  right:2%;
  top:80%;
  color: rgb(164, 130, 96);  
  text-align: center;
 }

 Header{
   flex: 0 0 auto;
}

 .w {
     height: 100%;
 }
.main-container{
   display: flex;flex-direction: column;min-height: 100%;
}
 
Footer{
   flex: 0 0 auto;
}
</style>
