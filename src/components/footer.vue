<template>
<div>
    <footer id="footer">
        <div class="w">
           <el-row>
               <el-col :span="20">
                    <!-- <el-row>
                        <el-col :span="6">版权所有：123</el-col>
                         <el-col :span="6">IPC备案：</el-col>
                      </el-row>
                    <el-row class="list">
                          <el-col :span="6">地址：234</el-col>
                           <el-col :span="6">电话：0575-435</el-col>
                          <el-col :span="6">访问量：{{indexView}}</el-col>
                   </el-row>  -->
               </el-col>
               
           </el-row>
        </div>  
    </footer>
</div>
</template>

<script>
import indexApi from "@/api/index";
export default {
    name: "Footer",
    data() {
        return {
            indexView:0,
        };
    },
    created(){
        this.getIndexView();
        this.webView();
    },
    methods:{
        getIndexView(){
            indexApi.getIndexView().then(response=>{
                this.indexView = response.data.data.indexView;
            })
        },
        webView(){
            indexApi.webView().then(response=>{
            })
        }
    }
};

</script>

<style scoped>
#footer {
    width: 100%;
    height: 200px;
    background: url('../assets/index/dibu.png');
    font-size: 14px;
    color: #fff;
    padding-top: 80px;
    box-sizing: border-box;
    text-align: left;
    margin-top: 30px;
}

.list {
    margin-top: 30px;
}

.img img {
    width: 100px;
    float: right;
}
</style>
