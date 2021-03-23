<template>
<div id="main-container">
    <Header></Header>
    <Bread></Bread>
    <div>
        <Info></Info>
    </div>
    <Footer>
    </Footer>
</div>
</template>

<script>
import newsApi from "@/api/news";
import Footer from "@/components/footer";
import Info from "@/components/info";
import Header from "@/components/header";
import vueCanvasNest from 'vue-canvas-nest';
import Bread from '@/components/bread.vue';
export default {
    components: {
        Header,
        Info,
        Footer,
        vueCanvasNest,
        Bread
    },
    data() {
        return {
            current: 1,
            limit: 9,
            total: 0,
            newsList: [],
            branchData: [],
        };
    },
    
    created() {
        this.$nextTick(()=> {
 })
    },
    mounted() {
    },
    methods: {
        getRow() {
            let arr = [];
            let row = Math.ceil(this.newsList.length / 3);
            for (let i = 0; i < row; i++) {
                arr[i] = [];
                let modLast =
                    this.newsList.length % 3 === 0 ? 3 : this.newsList.length % 3;
                let lastRow = i === row - 1 ? modLast : 3;
                for (let j = 0; j < lastRow; j++) {
                    arr[i][j] = this.newsList[3 * i + j];
                }
            }
            this.branchData = arr;
        },
    },
};
</script>
