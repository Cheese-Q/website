import request from "@/utils/request";

export default {
    register(signUp) {
        let Base64 = require('js-base64').Base64
        signUp.password = Base64.encode(signUp.password);
        signUp.passwordAgain = Base64.encode(signUp.passwordAgain);

        return request({
            url: `/web/member/register`,
            method: "post",
            data: signUp,
        });
    },
    send(phone) {
        return request({
            url: `/web/msm/send/${phone}`,
            method: "get",
        });
    },
    phoneExist(mobile) {
        return request({
            url: `/web/member/phoneExist/${mobile}`,
            method: "get",
        });
    },
    loginCode(member) {
        return request({
            url: `/web/member/loginCode`,
            method: "post",
            data: member,
        });
    },
    loginPassword(member) {
        let Base64 = require('js-base64').Base64
        member.password = Base64.encode(member.password);
        return request({
            url: `/web/member/loginPassword`,
            method: "post",
            data: member,
        });
    },
    getLoginUserInfo() {
        return request({
            url: `/web/member/getMemberInfo`,
            method: "get",
        });
    },
    updatePassword(member) {
        let Base64 = require('js-base64').Base64
        member.password = Base64.encode(member.password);
        member.passwordAgain = Base64.encode(member.passwordAgain);
        return request({
            url: `/web/member/updatePassword`,
            method: "post",
            data: member,
        });
    },
    passwordCode(member) {
        return request({
            url: `/web/member/passwordCode`,
            method: "post",
            data: member,
        });
    },
};