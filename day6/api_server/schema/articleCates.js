const joi = require('joi')

// 定义用户名 密码 验证规则
const name = joi.string().required()
const alias = joi.string().alphanum().required()

// 定义id 验证规则
const id = joi.number().integer().min(1).required()

// 验证规则对象-新增分类
exports.add_cate_schema = {
    body: {
        name,
        alias,
    }
}

// 验证规则对象-删除分类
exports.del_cate_schema = {
    params: {
        id,
    }
}

// 验证规则对象-根据id获取分类
exports.get_cate_schema = {
    params: {
        id,
    }
}

// 验证规则对象-更新分类
exports.update_cate_schema = {
    body: {
        id,
        name,
        alias,
    }
}