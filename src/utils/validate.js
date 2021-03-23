export function isvalidUsername(str) {
    const valid_map = ["admin", "editor"];
    return valid_map.indexOf(str.trim()) >= 0;
}

export function validateURL(textval) {
    const urlregex = /^(https?|ftp):\/\/([a-zA-Z0-9.-]+(:[a-zA-Z0-9.&%$-]+)*@)*((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9][0-9]?)(\.(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[1-9]?[0-9])){3}|([a-zA-Z0-9-]+\.)*[a-zA-Z0-9-]+\.(com|edu|gov|int|mil|net|org|biz|arpa|info|name|pro|aero|coop|museum|[a-zA-Z]{2}))(:[0-9]+)*(\/($|[a-zA-Z0-9.,?'\\+&%$#=~_-]+))*$/;
    return urlregex.test(textval);
}

export function validateLowerCase(str) {
    const reg = /^[a-z]+$/;
    return reg.test(str);
}

export function validateUpperCase(str) {
    const reg = /^[A-Z]+$/;
    return reg.test(str);
}

export function validatAlphabets(str) {
    const reg = /^[A-Za-z]+$/;
    return reg.test(str);
}

export function validatePhone(rule, value, callback) {
    const reg = /^((0\d{2,3}-\d{7,8})|(1[34578]\d{9}))$/;
    if (value == "" || value == undefined || value == null) {
        callback();
    } else {
        if (!reg.test(value) && value != "") {
            callback(new Error("请输入正确的电话号码"));
        } else {
            callback();
        }
    }
}

export function isInteger(rule, value, callback) {
    if (!value) {
        return callback(new Error("输入不可以为空"));
    }
    setTimeout(() => {
        if (!Number(value)) {
            callback(new Error("请输入正整数"));
        } else {
            const re = /^[0-9]*[1-9][0-9]*$/;
            const rsCheck = re.test(value);
            if (!rsCheck) {
                callback(new Error("请输入正整数"));
            } else {
                callback();
            }
        }
    }, 0);
}

export function validatePass(rule, value, callback) {
    var passwordreg = /(?=.*\d)(?=.*[a-zA-Z])(?=.*[^a-zA-Z0-9]).{8,16}/;
    if (!passwordreg.test(value)) {
        callback(new Error("请输入密码,长度为8-16位,必须包含数字、字母和字符"));
    } else {
        callback();
    }
}