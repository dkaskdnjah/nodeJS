const express = require("express");

// 导入验证数据中间件
const expressJoi = require("@escook/express-joi");

// 引用express中 Router 中间件
const router = express.Router();

// 导入获取用户信息处理函数
const userInfo_handle = require("../router_handle/articleCate")

// 导入验证规则模块
const { add_cate_schema, del_cate_schema, get_cate_schema, update_cate_schema } = require("../schema/articleCates")

// 获取文章分类列表数据路由
router.get('/cates', userInfo_handle.getArticleCates)

// 新增文章分类列表数据路由
router.post('/addCates', expressJoi(add_cate_schema), userInfo_handle.addArticleCates)

// 删除文章分类列表数据路由
router.get('/deleteCates/:id', expressJoi(del_cate_schema), userInfo_handle.deleteArticleCates)

// 根据文章分类id获取列表数据路由
router.get('/cates/:id', expressJoi(get_cate_schema), userInfo_handle.getArticleCatesById)

// 更新文章分类id数据路由
router.post('/updateCates', expressJoi(update_cate_schema), userInfo_handle.updateArticleCatesById)

module.exports = router