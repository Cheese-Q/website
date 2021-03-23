import request from "@/utils/request";

export default {
    getActivity(current, limit, query) {
        return request({
            url: `/web/activity/getActivity/${current}/${limit}`,
            method: "post",
            data: query
        });
    },
    getActivityInfo(id) {
        return request({
            url: `/web/activity/getActivityInfo/${id}`,
            method: "get",
        });
    },
    reserveActivity(reserveUser) {
        return request({
            url: `/web/activity/reserveActivity`,
            method: "post",
            data: reserveUser,
        });
    },
    /**
     * @param {} appointTable 
     */
    verifyIdentity(appointTable) {
        return request({
            url: `/web/member/identity`,
            method: "post",
            data: appointTable,
        });
    },

    /**
     * @param {用户id} memberId 
     */
    getReserveCount(memberId, activityId, reserveTime) {
        return request({
            url: `/web/activity/getReserveCount/${memberId}/${activityId}/${reserveTime}`,
            method: "get",
        });
    },

    /**
     * @param {活动id} activityId 
     * @param {预约人身份信息} reserveUser
     */
    verifyReserve(activityId, reserveTime, reserveUser) {
        return request({
            url: `/web/activity/verifyReserve/${activityId}/${reserveTime}`,
            method: "post",
            data: reserveUser
        });
    },

    getPeopleCount(id, reserveTime) {
        return request({
            url: `/web/activity/getPeopleCount/${id}/${reserveTime}`,
            method: "get",
        });
    },

    getFullDay(id) {
        return request({
            url: `/web/activity/getFullDay/${id}`,
            method: "get",
        });
    },



};