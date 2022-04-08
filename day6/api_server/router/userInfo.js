const express = require("express");

const expressJoi = require("@escook/express-joi");

// 引用express中 Router 中间件
const router = express.Router();

// 导入获取用户信息处理函数
const userInfo_handle = require("../router_handle/userInfo")

// 导入验证规则
const { update_userInfo_schema, update_password_schema, update_userPic_schema } = require("../schema/user")

// 获取用户信息路由
router.get('/userInfo', userInfo_handle.getUserInfo)

// 更新用户信息路由
router.post('/userInfo', expressJoi(update_userInfo_schema) ,userInfo_handle.updateUserInfo)

// 更新用户密码路由
router.post('/updatePwd', expressJoi(update_password_schema) ,userInfo_handle.updatePwd)

// 更新用户密码路由
router.post('/updatePic', expressJoi(update_userPic_schema) ,userInfo_handle.userPic)

module.exports = router