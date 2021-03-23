import request from "@/utils/request";

export default {
    getReserveActivity(current, limit, memberId) {
        return request({
            url: `/web/activity/getReserveActivity/${current}/${limit}/${memberId}`,
            method: "get",
        });
    },
    getReserveVenue(current, limit, memberId) {
        return request({
            url: `/web/venue/getReserveVenue/${current}/${limit}/${memberId}`,
            method: "get",
        });
    },
    offReserveActivity(id) {
        return request({
            url: `/web/activity/offReserveActivity/${id}`,
            method: "get",
        });
    },
    offReserveVenue(id) {
        return request({
            url: `/web/venue/offReserveVenue/${id}`,
            method: "get",
        });
    },
    /**
     * @param memberId
     */
    getVenueCategory(memberId) {
        return request({
            url: `/web/member/getVenueCategory/${memberId}`,
            method: "get",
        });
    },
    getMemberArticle(memberId, venueId, categoryId) {
        return request({
            url: `/web/member/getMemberArticle/${memberId}/${venueId}/${categoryId}`,
            method: "get",
        });
    },
    getSubscribeArticle(current, limit, memberArticle) {
        return request({
            url: `/web/member/getSubscribeArticle/${current}/${limit}`,
            method: "post",
            data: memberArticle
        });
    },
    /**
     * @param {文章id} articleId 
     */
    readArticle(articleId, memberId) {
        return request({
            url: `/web/member/readArticle/${articleId}/${memberId}`,
            method: "delete",
        });
    },
    bindReaderCode(id, reader) {
        return request({
            url: `/web/member/bindReaderCode/${id}`,
            method: "post",
            data: reader
        });
    },
    getNewBooks() {
        return request({
            url: `/web/member/getNewBooks`,
            method: "get",
        });
    },
    getRecommendBooks(categoryList) {
        return request({
            url: `/web/member/getRecommendBooks`,
            method: "post",
            data: categoryList
        });
    },
    getBorrowBooks(readerCode) {
        return request({
            url: `/web/member/getBorrowBooks/${readerCode}`,
            method: "get",
        });
    },
    getBorrowCategory(readerCode) {
        return request({
            url: `/web/member/getBorrowCategory/${readerCode}`,
            method: "get",
        });
    },


};