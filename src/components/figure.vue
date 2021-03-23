<template>
<div>
    <div class="swiper-container qwe">
        <div class="swiper-wrapper">
            <swiper v-if="bannerList.length" :options="swiperOption" ref="mySwiper">
                <swiper-slide v-for="el in bannerList" :key="el.id">
                    <img  :src="el.cover"  alt="" />
                </swiper-slide>
                <div class="swiper-pagination" slot="pagination"></div>
            </swiper>
        </div>
        <div class="swiper-pagination paging"></div>
    </div>
</div>
</template>

<script>
import {
    swiper,
    swiperSlide,
    Navigation,
    Pagination,
    Autoplay,
} from "vue-awesome-swiper";
import "swiper/swiper-bundle.css";
import indexApi from "@/api/index";
export default {
    components: {
        swiper,
        swiperSlide,
        Navigation,
        Pagination,
        Autoplay,
    },
    name: "Figure",
    props: {
        venueId: String,
    },
    data() {
        return {
            swiperOption: {
                loop: true,
                slidesPerView: 1,
                centeredSlides: true,
                pagination: {
                    el: ".swiper-pagination",
                    clickable: true,
                },
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false,
                },
                autoHeight: true,
                grabCursor: true
            },
            height: "",
            bannerList: [],
        };
    },
    created() {
        this.getBanner();
    },
    methods: {
        getBanner() {
            indexApi.getBanner(this.venueId).then(response => {
                this.bannerList = response.data.data.bannerList;
                
            })
        },

    },
};
</script>

<style lang="scss" scoped>
.banner {
    width: 100%;
}

.swiper-slide img {
    width: 100%;
    object-fit: cover;
}
</style>
