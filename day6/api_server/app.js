// 导入express模块
const express = require("express")

// 创建服务器web实例
const app = express()

// 处理跨域请求
const cors = require("cors")

const expressJWT = require("express-jwt")

const config = require("../config")

// 注册cors
app.use(cors())

// 处理表单验证方式
app.use(express.urlencoded({ extended: false }))

// 统一结果处理中间件
app.use(function(req, res, next) {
    res.cc = function (err, code = 1) {
        // 判断是错误对象 还是字符串
       return res.send({ message: err instanceof Error ? err.message: err })
    }
    next()
})

// 解析token验证 //排除 以/api开头的不需要认证
app.use(expressJWT({secret: config.jwtSecretKey}).unless({ path: [/^\/api/]}))

// 导入用户路由模块
const router = require("./router/user")

// 导入表单验证
const joi = require('joi')

// 注册路由模块
app.use("/api", router)

// 统计处理报错
app.use(function(err, req, res, next){
    // 处理表单验证错误
    if (err instanceof joi.ValidationError) return res.cc(err)

    // 处理token认证错误
    if (err.name === 'UnauthorizedError') return res.cc('身份验证失败')

    // 未知错误
    res.cc(err)
    next()
})

app.listen(80,()=> {
    console.log("server is running at http://12.7.0.0.1")
})