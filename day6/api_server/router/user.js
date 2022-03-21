const express = require("express");

const expressJoi = require("@escook/express-joi");

// 引用express中 Router 中间件
const router = express.Router();

// 导入用户处理函数
const user_handle = require("../router_handle/user")

const { req_user_schema } = require("../schema/user")

// 用户注册
// expressJoi 使用表单验证规则
router.post('/reguser', expressJoi(req_user_schema), user_handle.reguser)

// 用户登录
router.post('/login', expressJoi(req_user_schema), user_handle.login)

module.exports = router