import request from "@/utils/request";

export default {
    getCommonVenue() {
        return request({
            url: `/web/index/getCommonVenue`,
            method: "get",
        });
    },
};