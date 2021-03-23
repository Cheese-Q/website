<template>
<div class="w">
    <el-main v-if="newsIndex.length>0">
        <div>
            <div class="newsInformation" @click="getDetails(newsIndex[0].id)">
                <img v-lazy="newsIndex[0].articleCover" alt="" />
            </div>
            <div class="newsInformation newsfl" @click="getDetails(newsIndex[0].id)">
                <el-row>
                    <el-col :span="24">
                        <div class="news-title">
                            {{ newsIndex[0].articleTitle }}
                        </div>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <div class="news-content">
                            {{ newsIndex[0].articleAbstract }}
                        </div>
                    </el-col>
                </el-row>
            </div>
        </div>
    </el-main>
    <el-main>
        <div  class="newsList" @mouseenter="on_top_enter" @mouseleave="on_top_leave">
            <swiper ref="mySwiper" v-if="newsIndex.length > 1"   :options="swiperOption">
                <swiper-slide v-for="item in this.newsIndex" :key="item.id">
                    <div class="recommends-content-item" @click="getDetails(item.id)">
                        <img :src="item.articleCover" alt="item.articleCover" />
                        <div class="recommends-content-item__info">
                            <div class="ar arti">{{ item.articleTitle }}</div>
                            <div class="ar abs">{{ item.articleAbstract }}</div>
                        </div>
                    </div>
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
                <div class="swiper-button-prev sbp" slot="button-prev"></div>
                <div class="swiper-button-next sbp" slot="button-next"></div>
            </swiper>
        </div>
    </el-main>
</div>
</template>

<script>
import {
    swiper,
    swiperSlide
} from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
export default {
    data() {
        return {
            swiperOption: {
                slidesPerView: 3,
                centeredSlides: true,
                spaceBetween: 30,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                navigation: {
                    nextEl: ".swiper-button-next",
                    prevEl: ".swiper-button-prev",
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                loop: true,
            },
        };
    },
    components: {
        swiper,
        swiperSlide,
    },
    name: "Information",
    props: {
        newsIndex: Array,
    },
    methods: {
        getDetails(id) {
            this.$router.push({
                path: "/news/detail/" + id,
            });
        },
            on_top_enter() {
                this.mySwiper.autoplay.stop()
            },
            on_top_leave() {
                this.mySwiper.autoplay.start()
            },
        getAbstract() {
            this.Opacity = 1;
        },
        appendSlide() {
            this.swiperSlides.push(this.swiperSlides.length + 1);
        },
        prependSlide() {
            this.swiperSlides.unshift(this.swiperSlides[0] - 1);
        },
        popSlide() {
            this.swiperSlides.pop();
        },
        shiftSlide() {
            this.swiperSlides.shift();
        },
    },
    computed: {
        mySwiper() {
            return this.$refs.mySwiper.swiper;
        },
    },
};
</script>

<style scoped>
.sbp {
    visibility: hidden;
}

.newsList:hover .sbp {
    visibility: visible;
    color: rgba(255, 255, 255, 0.3);
    cursor: pointer;
}

.ar {
    color: #fff;
    margin-top: 20px;
}

.arti {
    font-size: 16px;
    height: 40px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}

.abs {
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-indent: 2em;
}

.recommends-content-item {
    background: #eee;
    position: relative;
}

.recommends-content-item:hover .recommends-content-item__info {
    opacity: 1;
    transform: translateY(0);
    cursor: pointer;
}

.recommends-content-item__info {
    position: absolute;
    top: 0;
    color: rgba(255, 255, 255, 0.8);
    background: rgba(34, 34, 34, 0.35);
    overflow: hidden;
    width: 100%;
    box-sizing: border-box;
    transition: 0.6s;
    opacity: 0;
    transform: translateY(100%);
}

.recommends-content-item__info {
    width: 370px;
    height: 200px;
    padding: 20px;
}

.sbp {
    color: aliceblue;
}

.news-title {
    font-size: 26px;
    color: #A48260;
    padding-left: 20px;
    border-left: 2px solid #A48260;
}

.news-content {
    font-size: 14px;
    color: #555555;
    line-height: 30px;
    margin-top: 70px;
    width: 450px;
    height: 120px;
    text-align: left;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 4;
    -webkit-box-orient: vertical;
    text-indent: 2em;
}

.newsInformation:hover {
    /* box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    -moz-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    -webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.3);
    -webkit-transition: all 0.8s ease-out; */
    transition: all 0.8s ease-out;
    cursor: pointer;
}

.newsInformation img {
    box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -moz-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -webkit-box-shadow: 10px 10px 10px rgba(0, 0, 0, 0.1);
    -webkit-transition: all 0.8s ease-out;
    transition: all 0.8s ease-out;
    width: 550px;
    height: 300px;
    border-radius: 10px;
}

.news-title:hover {
    text-decoration: underline;
}

.recommends-content-item img {
    width: 370px;
    height: 200px;
    border-radius: 10px;
}
</style>
