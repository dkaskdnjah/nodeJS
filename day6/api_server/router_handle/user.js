const db = require("../db");

const bcrypt = require("bcryptjs");

const jwt = require("jsonwebtoken");

// 引入全局配置文件
const config = require("../../config");

// 用户注册
exports.reguser = (req, res) => {
    const userInfo = req.body
    // 查询用户语句
    const selectUserName = 'select * from ev_users  where userName=?'

    db.query(selectUserName, userInfo.userName, (err, result) => {
        if (err) return res.cc(err);

        // 判断用户是否存在
        if (result.length) return res.cc("用户名已存在");
        
        // 对密码进行加密
        userInfo.password = bcrypt.hashSync(userInfo.password, 10)

        const insertUser = 'insert into ev_users set ?'

        db.query(insertUser, {userName: userInfo.userName , password: userInfo.password}, (err, result) => {
            if (err) return res.cc(err);
    
            if (result.affectedRows !== 1) return res.cc("注册用户失败，请稍后再试!");
            
            res.cc("注册成功", 0);
        })
    })
    
    // res.send("reguser OK")
}

// 用户登录
exports.login = (req, res) => {
    const userInfo = req.body
    const sql = "select * from ev_users where userName=?"
    // 从数据库查询账号是否存在
    db.query(sql, userInfo.userName, (err, result) => {
        if (err) return res.cc(err.message)
        
        // 获取的数据条数不为1
        if (result.length !== 1) return res.cc('登陆失败')

        // 对密码经行解密和数据库匹配
        const comparePassword = bcrypt.compareSync(userInfo.password, result[0].password)

        if(!comparePassword) return res.cc('登陆失败')

        // 生成token 使用对象结构 新值覆盖旧值 敏感信息清空
        const token = jwt.sign({ ...result[0], password: '', user_pic: '' }, config.jwtSecretKey, { expiresIn: config.expiresIn} )

        // 返回给客户端

        res.send({
            code: 0,
            message: '登录成功',
            token: 'Bearer ' + token,
        })
    })
}