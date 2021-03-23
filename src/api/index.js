import request from "@/utils/request";

export default {
    getArticle(articleVo) {
        return request({
            url: `/web/article/getArticle`,
            method: "post",
            data: articleVo,
        });
    },
    getVenueIndex() {
        return request({
            url: `/web/index/getVenueReserveIndex`,
            method: "get",
        });
    },
    getActivityIndex() {
        return request({
            url: `/activeReserve/web/getActivityIndex`,
            method: "get",
        });
    },
    getCommonActivity(activityVo, limit, current) {
        return request({
            url: `/web/activity/getCommonActivity/${current}/${limit}`,
            method: "post",
            data: activityVo,
        });
    },
    getBanner(venueId) {
        return request({
            url: `/web/index/getBanner/${venueId}`,
            method: "get",
        });
    },
    getTodayStream() {
        return request({
            url: `/web/index/getTodayStream`,
            method: "get",
        });
    },
    getIndexView() {
        return request({
            url: `/web/index/getIndexView`,
            method: "get",
        });
    },
    webView() {
        return request({
            url: `/web/index/webView`,
            method: "get",
        });
    },
};