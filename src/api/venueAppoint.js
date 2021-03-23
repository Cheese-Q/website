import request from "@/utils/request";

export default {
    getVenueReserve(current, limit, query) {
        return request({
            url: `/web/venue/getVenueReserve/${current}/${limit}`,
            method: "post",
            data: query
        });
    },
    getVenueReserveInfo(id) {
        return request({
            url: `/web/venue/getVenueReserveInfo/${id}`,
            method: "get",
        });
    },
    getVenueReserveTime(id) {
        return request({
            url: `/web/venue/getVenueReserveTime/${id}`,
            method: "get",
        });
    },
    /**
     * @param {活动id} venueId 
     * @param {预约人身份信息} reserveUser
     */
    verifyReserve(venueId, reserveTime, reserveUser) {
        return request({
            url: `/web/venue/verifyReserve/${venueId}/${reserveTime}`,
            method: "post",
            data: reserveUser
        });
    },
    /**
     * @param {用户id} memberId 
     */
    getReserveCount(memberId, venueId, reserveTime) {
        return request({
            url: `/web/venue/getReserveCount/${memberId}/${venueId}/${reserveTime}`,
            method: "get",
        });
    },
    reserveVenue(reserveUser) {
        return request({
            url: `/web/venue/reserveVenue`,
            method: "post",
            data: reserveUser,
        });
    },
    getPeopleCount(id, reserveTime) {
        return request({
            url: `/web/venue/getPeopleCount/${id}/${reserveTime}`,
            method: "get",
        });
    },
    getFullDay(id) {
        return request({
            url: `/web/venue/getFullDay/${id}`,
            method: "get",
        });
    },
};