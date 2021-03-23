import request from "@/utils/request";

export default {
    getVenueInfo(separate) {
        return request({
            url: `/web/venueInfo/getVenueInfo/${separate}`,
            method: "get",
        });
    },
};