import request from "@/utils/request";

export default {
    getArticlePage(current, limit, articleVo) {
        return request({
            url: `/web/article/getArticlePage/${current}/${limit}`,
            method: "post",
            data: articleVo,
        });
    },
    getArticleInfo(id) {
        return request({
            url: `/web/article/getArticleInfo/${id}`,
            method: "get",
        });
    },
    addComment(commentVo) {
        return request({
            url: `/web/comment/addComment`,
            method: "post",
            data: commentVo,
        });
    },
    getComment(articleId) {
        return request({
            url: `/web/comment/getComment/${articleId}`,
            method: "get",
        });
    },
    getInfoActivity(categoryId) {
        return request({
            url: `/web/article/getInfoActivity/${categoryId}`,
            method: "get",
        });
    },
    subscribe(memberId, venueId, categoryId) {
        return request({
            url: `/web/member/subscribe/${memberId}/${venueId}/${categoryId}`,
            method: "get",
        });
    },
    offSubscribe(id) {
        return request({
            url: `/web/member/offSubscribe/${id}`,
            method: "delete",
        });
    },
    isSubscribe(memberId, venueId, categoryId) {
        return request({
            url: `/web/member/isSubscribe/${memberId}/${venueId}/${categoryId}`,
            method: "get",
        });
    },
};