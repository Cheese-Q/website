import request from "@/utils/request";

export default {
    getArticleList(current, limit, categoryId, venueId) {
        return request({
            url: `/web/article/getArticleList/${current}/${limit}/${categoryId}/${venueId}`,
            method: "get",
        });
    },
};