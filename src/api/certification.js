import request from "@/utils/request";

export default {
    identityVerify(identityVo) {
        return request({
            url: `/web/member/identityVerify`,
            method: "post",
            data: identityVo,
        });
    },
};