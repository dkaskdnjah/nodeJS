const joi = require('joi')

// 定义用户名 密码 验证规则
const userName = joi.string().alphanum().min(1).max(10).required()
const password = joi.string().pattern(/^[\S]{6,12}$/).required()

// id nickName email 验证规则
const id = joi.number().integer().min(1).required()
const nickName = joi.string().required()
const email = joi.string().email().required()

// 定义验证更新头像验证规则
const avatar = joi.string().dataUri().required()

// 验证用户注册接口数据
exports.req_user_schema = {
    body: {
        userName,
        password,
    }
}

// 验证更新用户接口数据
exports.update_userInfo_schema = {
    body: {
        id,
        nickName,
        email,
    }
}

// 验证更新用户密码接口数据
exports.update_password_schema = {
    body: {
        // password 沿用已经定义的密码规则
        oldPwd: password,
        // ref 获取参数的值   not 判断两个值不相等
        newPwd: joi.not(joi.ref('oldPwd')).concat(password),
    }
}

// 验证规则对象-更新头像
exports.update_userPic_schema = {
    body: {
        avatar,
    }
}