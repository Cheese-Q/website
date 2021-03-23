import request from "@/utils/request";

export default {
    getVenueReserve(current, limit) {
        return request({
            url: `/web/venue/getVenueReserve/${current}/${limit}`,
            method: "post",
        });
    },
};