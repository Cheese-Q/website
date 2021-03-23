<template>
<div id="main-container">
    <Header></Header>
    <Bread></Bread>
    <div class="w" v-bind:style="{minHeight: Height+'px'}" >
        <el-card class="box-card">
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
            <div class="btn">
                <el-button :disabled="btnFlag" type="primary" @click="addSuggestion('suggest')">确 定</el-button>
                <el-button @click="dialogFormVisible = false">取 消</el-button>
            </div>
          </el-form>
          </el-card>
    </div>
    <Footer></Footer>
</div>
</template>

<script>
import suggestApi from "@/api/suggest";
import Footer from "@/components/footer";
import Header from "@/components/header";
import Bread from "@/components/bread";
import {validatePhone} from "@/utils/validate"
export default {
    components: {
        Header,
        Footer,
        Bread,
    },
    data() {
        return {
            Height:0,
            btnFlag:false,
           suggest:{},
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
        }
    },
    mounted() {
       this.Height = document.documentElement.clientHeight - 310;  
       window.onresize = ()=> {this.Height = document.documentElement.clientHeight -310}
    },
    methods: {
        addSuggestion(suggest){
            this.$refs[suggest].validate((valid) => {
                if (valid) {
                    suggestApi.addSuggestion(this.suggest).then(response=>{
                this.btnFlag = true;
                this.$message({
                        message: "意见反馈成功！",
                        type: "success",
                    });
                    this.$router.go(0);
                    this.suggest = {};
            })
                } else {
                    return false;
                }
            });
        },
    },
};
</script>

<style scoped>
.box-card {
    width: 800px;
    margin: 30px auto;
}

.btn{
    width: 100%;
    height: 40px;
    text-align:center;
}
</style>
