<template>
<div class="w">
    <el-container>
        <el-main>
            <el-row>
                <el-col :span="6" v-for="(item, index) in venueIndex" :key="item.id+index">
                    <div class="img">
                        <el-row>
                        <img v-lazy="item.cover" alt=""  @click="getDetail(item.id)">
                         </el-row>
                    </div>                
                    <div class="card" @click="getDetail(item.id)">
                    <el-row>
                        <el-col :span="24"> <div class="venue">{{ item.venue }}</div></el-col>
                     </el-row>
                     <el-row class="address">
                            <el-col :span="6">
                                <div>
                                      <span>地点名称:</span>
                                 </div>
                             </el-col>
                             <el-col :span="18">
                                 <div>{{ item.venueSpace }}</div>
                             </el-col>
                     </el-row>
                     <el-row class="ti">
                       <el-col :span="6">
                            <div>开放时间:</div>
                       </el-col>
                       <el-col :span="18">
                           <div>{{ item.reservePart }}</div>
                       </el-col>
                     </el-row>
                    </div>
                </el-col>
            </el-row>
        </el-main>
    </el-container>
</div>
</template>

<script>
import venueApi from "@/api/venueAppoint";
import indexApi from "@/api/index";
export default {
    name: "Venue",
    props: {
        venueIndex: Array,
    },
    methods: {
        getList() {
            this.$router.push({
                path: "/venueAppoint",
            });
        },
        getDetail(id) {
            this.$router.push({
                path: "/venueAppoint/detail/" + id,
            });
        },
    },
};
</script>

<style scoped>
.img,.card {
    cursor: pointer;
}

.ti {
    font-size: 14px;  
}
.address {
    font-size: 14px;
    color: #A58260;
    height: 40px;
    line-height: 40px;
}
.img {
     width: 284px;
    height: 200px;
    overflow: hidden;
     border-radius: 10px 10px 0 0;
}
.img img {
    width: 284px;
    height: 200px;
    transition: all 0.6s;
}
.img img:hover {
      transform: scale(1.1);
}
.card {
    background: url('../assets/index/bj.png') no-repeat;
    height: 150px;
    padding: 0 10px;
    box-sizing: border-box;
}

.venue {
    font-size: 16px;
    color: #134A5B;
    height: 50px;
    line-height: 50px;
    text-align: center;
}

</style>
