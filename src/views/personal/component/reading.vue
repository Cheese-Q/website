<template>
<div>
   <div v-if="bind">
       <div class="login">
           <el-form :model="reader" status-icon :rules="rules" ref="reader" label-width="100px">
            <el-form-item label="读者证:" prop="readerCode">
                <el-input maxlength="20"  placeholder="请输入读者证号"  v-model="reader.readerCode"></el-input>
            </el-form-item>
            <el-form-item label="手机号:" prop="tel">
                <el-input maxlength="20" placeholder="请输入手机号" v-model="reader.tel"></el-input>
            </el-form-item>
            <el-form-item>
                <el-button @click="bindReaderCode('reader')" type="primary" class="btn">绑 定</el-button>
            </el-form-item>
        </el-form>
       </div>
   </div>
   <div v-else>
    <el-row>
        <el-col class="personalInfo">
            <span> 阅读记录 </span>
        </el-col>
    </el-row>
    <el-divider></el-divider>
    <el-row>
        <el-col :span="14">
            <el-row>
                <el-col :span="24">
                    <div class="new">
                        <el-row>
                            <el-col :span="24">
                                <div class="title">
                                    新书推荐
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="8" v-if="newBooks.length>0">
                                <div class="nbl">
                                    <el-row>
                                        <el-col :span="24">
                                            <div v-if="newBooks.cover" class="img">
                                                <img :src="newBooks[0].cover" alt="">
                                            </div>
                                            <div v-else class="img">
                                                <img src="https://intelligence-city.oss-cn-beijing.aliyuncs.com/123.png" alt="">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <div class="bookName">《{{newBooks[0].bookName}}》</div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="newBooks.length>1">
                                <div class="nbl">
                                    <el-row>
                                        <el-col :span="24">
                                            <div v-if="newBooks.cover" class="img">
                                                <img :src="newBooks[1].cover" alt="">
                                            </div>
                                            <div v-else class="img">
                                                <img src="https://intelligence-city.oss-cn-beijing.aliyuncs.com/123.png" alt="">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <div class="bookName">《{{newBooks[1].bookName}}》</div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                            <el-col :span="8" v-if="newBooks.length>2">
                                <div class="nbl">
                                    <el-row>
                                        <el-col :span="24">
                                            <div v-if="newBooks.cover" class="img">
                                                <img :src="newBooks[2].cover" alt="">
                                            </div>
                                            <div v-else class="img">
                                                <img src="https://intelligence-city.oss-cn-beijing.aliyuncs.com/123.png" alt="">
                                            </div>
                                        </el-col>
                                    </el-row>
                                    <el-row>
                                        <el-col :span="24">
                                            <div class="bookName">《{{newBooks[2].bookName}}》</div>
                                        </el-col>
                                    </el-row>
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24">
                    <div class="about">
                        <el-row>
                            <el-col :span="24">
                                <div class="title">
                                    相关推荐
                                </div>
                            </el-col>
                        </el-row>
                        <el-row :gutter="10" v-if="recommendBooks.length>0">
                            <el-col :span="3" :offset="1">
                                <div v-if="recommendBooks.cover" class="img">
                                    <img :src="recommendBooks[0].cover" alt="">
                                </div>
                                <div v-else class="img">
                                    <img src="https://intelligence-city.oss-cn-beijing.aliyuncs.com/123.png" alt="">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div  class="bookName">《{{recommendBooks[0].bookName}}》</div>
                                <div style="margin-top:6px" class="author">作者：{{recommendBooks[0].author}}</div>
                            </el-col>
                            <el-col :span="3" :offset="1">
                                <div v-if="recommendBooks.cover" class="img">
                                    <img :src="recommendBooks[1].cover" alt="">
                                </div>
                                <div v-else class="img">
                                    <img src="https://intelligence-city.oss-cn-beijing.aliyuncs.com/123.png" alt="">
                                </div>
                            </el-col>
                            <el-col :span="8">
                                <div  class="bookName">《{{recommendBooks[1].bookName}}》</div>
                                <div style="margin-top:6px" class="author">作者：{{recommendBooks[1].author}}</div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-col>
        <el-col :span="10">
            <el-row>
                <el-col :span="24">
                    <div class="bookClass">
                        <el-row>
                            <el-col :span="24">
                                <div class="title">
                                    书籍类型
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div id="category" style="width: 100%;min-height:300px">
                                </div>
                            </el-col>
                        </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-col>
    </el-row>
    <el-row>
                <el-col :span="24">
                     <div class="history">
                        <el-row>
                            <el-col :span="24">
                                <div class="title">
                                    借阅记录
                                </div>
                            </el-col>
                        </el-row>
                        <el-row>
                            <el-col :span="24">
                                <div class="historyList">
                                    <el-table :data="borrowList" stripe style="width: 100%" max-height="200px">
                                        <el-table-column prop="bookName" label="书名" min-width="25%" align="center">
                                        </el-table-column>
                                        <el-table-column prop="author" label="作者" min-width="20%" align="center">
                                        </el-table-column>
                                        <el-table-column prop="category" label="分类" min-width="15%" align="center">
                                        </el-table-column>
                                        <el-table-column prop="regTime" label="日期" min-width="20%" align="center">
                                        </el-table-column>
                                        <el-table-column prop="borrowType" label="类型" min-width="20%" align="center">
                                        </el-table-column>
                                    </el-table>
                                </div>
                            </el-col>
                        </el-row>
                 </div>
                </el-col>
            </el-row>
</div>
</div>
</template>

<script>
import Footer from "@/components/footer";
import Header from "@/components/header";
import cookie from "js-cookie";
import perApi from "@/api/personal";

export default {
    components: {
        Header,
        Footer,
    },
    data() {
        return {
            categoryList:[],
            names:[],
            borrowList:[],
            recommendBooks:[],
            newBooks:[],
            id:"",
            readerCode:"",
            reader:{},
            bind:false,
            input2:"",
            rules: {
                readerCode: [{
                    required: true,
                    message: "* 请输入读者证号",
                    trigger: "blur",
                }, ],
                tel: [{
                    required: true,
                    message: "* 请输入手机号",
                    trigger: "blur",
                }, ],
            }

        };
    },
    created() {
        this.initView();
    },
    mounted() {
    },
    methods: {
        bindReaderCode(reader){
            perApi.bindReaderCode(this.id,this.reader).then(response=>{
                var member = response.data.data.member;
                cookie.set("lc_ucenter", member, {expires: 7});
                if(response.data.code==200){
                    this.$message({
                        message: "绑定成功",
                        type: "success",
                    });
                    this.bind = false;
                    this.readerCode = JSON.parse(cookie.get("lc_ucenter")).readerCode;
                    this.getNewBooks();
                    this.getBorrowBooks();
                    this.getBorrowCategory();
                }
            })
        },
        getNewBooks(){
            perApi.getNewBooks().then(response=>{
                this.newBooks = response.data.data.newBooks;
            })
        },     
        getRecommendBooks(){
            perApi.getRecommendBooks(this.categoryList).then(response=>{
                this.recommendBooks = response.data.data.recommendList;
            })
        },
        getBorrowBooks(){
            perApi.getBorrowBooks(this.readerCode).then(response=>{
                this.borrowList = response.data.data.borrowList;
            })
        },
        getBorrowCategory(){
            perApi.getBorrowCategory(this.readerCode).then(response=>{
                this.categoryList = response.data.data.categoryList;
                this.names = response.data.data.names;
                setTimeout(() =>{
                    this.drawCharts();
                },1000);
                this.getRecommendBooks();
            })
        },
        initView(){
            var v = cookie.get("lc_ucenter");
            if (v != undefined) {
                v = JSON.parse(v);
            }
            this.id = v.id;
            if(!v.readerCode){
                this.bind = true;
            }else{
                
                this.readerCode = v.readerCode
                 this.getNewBooks();
                 this.getBorrowBooks();
                 this.getBorrowCategory();    
            }
        },
        drawCharts(){
               let satisfyPie = this.$echarts.init(document.getElementById("category"),"light");
              console.log(this.categoryList)
              var i = 0;
               satisfyPie.setOption({   
                tooltip: {
                    trigger: "item",
                    formatter: "{b}: {c} ({d}%)",
                },
                legend: {
                    orient: "horizontal",
                    icon: "circle",
                    textStyle: {
                        fontSize: 10,
                    },
                    itemHeight: 10,
                    bottom: '0',
                    data:this.names,
                    x: "center",
                    y: "bottom",
                },
                series: [{
                    type: "pie",
                    radius: ["50%", "65%"],
                    center: ["50%", "50%"],
                    avoidLabelOverlap: false,
                    label: {
                        show: false,
                        position: 'center',
                        normal: {
                            padding: [10, 10, 10, 10],
                            backgroundColor: '#fff',
                            show: true,
                            position: 'center',
                            formatter: [
                                '{value|({d}%)}',
                                '{name|{b}}'
                            ].join('\n'),
                            rich: {
                                value: {
                                    color: '#303133',
                                    fontSize: 20,
                                    fontWeight: 'bold',
                                    lineHeight: 20,
                                },
                                name: {
                                    color: '#909399',
                                    fontSize: 10,
                                    lineHeight: 10
                                },
                            },
                        }
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: "10",
                            fontWeight: "bold",
                        },
                    },
                    labelLine: {
                        show: false,
                    },
                    data:this.categoryList,
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: "rgba(0, 0, 0, 0.5)",
                        },
                    },
                }, ],
            });
        }
          },     
    };
</script>

<style scoped>
.author {
    font-size: 10px;
    color: #F7C739;
    text-align: center;
}
.about_author {
    font-size: 10px;
    color: #F7C739;
}

.bookName {
    font-size: 12px;
    color: #555;
    text-align: center;
    margin-top: 20px;
    font-weight:bold
}

.bookC {
    font-size: 10px;
    color: #A3A3A3;
    text-align: center;

}

.nbl {
    width: 100px;
    height: 176px;
    margin: 0 54px;

}
.nb2{
    width: 150px;
    height: 176px;
    margin: 0 54px;

}

.img {
    width: 67px;
    height: 114px;
    margin: 0 auto;
}

.img img {
    width: 67px;
    height: 114px;

}

.personalInfo span {
    font-size: 22px;
    line-height: 22px;
    float: left;
    color: #000;
    margin: 32px 0 0 32px;
}

.historyList {
    width: 90%;
    height: 200px;
    margin: 10px auto;
}

.search {
    width: 80%;
    margin: 0 auto;
}

.bookClass,
.readingTime {
    width: 340px;
    height: 436px;
    box-shadow: 2px 5px 20px 0 rgba(163, 163, 163, 0.50);
    margin-left: 30px;
    margin-bottom: 20px;

}

.appoint {
    width: 340px;
    height: 100px;
    box-shadow: 2px 5px 20px 0 rgba(163, 163, 163, 0.50);
    margin-left: 30px;
}

.title {
    font-size: 18px;
    color: #555;
    line-height: 25px;
    border-left: 3px solid #F7C739;
    padding-left: 10px;
    margin: 10px 20px;
}

.new{
    width: 570px;
    height: 250px;
    box-shadow: 2px 5px 20px 0 rgba(163, 163, 163, 0.50);
    margin-left: 20px;
}

.history {
    width: 940px;
    height: 260px;
    margin: 10px auto;
    box-shadow: 2px 5px 20px 0 rgba(163, 163, 163, 0.50);
}

.about {
    width: 570px;
    height: 166px;
    box-shadow: 2px 5px 20px 0 rgba(163, 163, 163, 0.50);
    margin: 20px 20px;

}

.login {
    width: 300px;
     height: 100px;
     position: absolute;
     left: 50%;
     top: 50%;
     margin: -50px 0 0 -50px;
}
</style>
