import request from "@/utils/request";

export default {
    addSuggestion(suggest) {
        return request({
            url: `/web/suggest/addSuggest`,
            method: "post",
            data: suggest
        });
    },
}