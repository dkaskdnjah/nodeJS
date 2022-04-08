const db = require("../db");
const bcrypt = require("bcryptjs");

// 获取用户处理函数
exports.getUserInfo = (req, res) => {
    // 查询用户信息语句
    const selectUserInfo = 'select id,userName,nickName,email,user_pic from ev_users  where id=?'

    // token解析成功就会自动挂载信息到 req.user
    // 执行用户信息查询 sql语句
    db.query(selectUserInfo, req.user.id, (err, result) => {
        // 查询失败报错信息
        if (err) return res.cc(err);

        // 用户不存在报错信息
        if (result.length !== 1) return res.cc("查询用户信息失败");
        
        // 查询成功返回用户信息
        res.send({
            code: 0,
            msg: 'success',
            data: result[0]
        });
    })
}

// 更新用户处理函数
exports.updateUserInfo = (req, res) => {
    // 更新用户信息语句
    const updateUserInfo = 'update ev_users set? where id=?'

    // token解析成功就会自动挂载信息到 req.user
    // 执行用户信息查询 sql语句
    db.query(updateUserInfo, [req.body, req.body.id], (err, result) => {
        // 查询失败报错信息
        if (err) return res.cc(err);

        // 执行sql语句成功，但是影响行数不为1
        if (result.affectedRows !== 1) return res.cc("更新用户信息失败");
        
        // 查询成功返回用户信息
        res.cc('更新用户信息成功', 0);
    })
}

// 更新用户密码处理函数
exports.updatePwd = (req, res) => {
    // 更新用户信息语句
    const updateUserPwd = 'select * from ev_users  where id=?'

    // token解析成功就会自动挂载信息到 req.user
    // 执行用户信息查询 sql语句
    db.query(updateUserPwd, req.user.id, (err, result) => {
        // 查询失败报错信息
        if (err) return res.cc(err);

        // 执行sql语句成功 但是数据为空
        if (result.length !== 1) return res.cc("用户不存在");
        
        // 判断旧密码是否正确
        const comparePwd = bcrypt.compareSync(req.body.oldPwd, result[0].password)

        if (!comparePwd) return res.cc('旧密码错误')

        // 对密码进行加密处理
        const newPwd = bcrypt.hashSync(req.body.newPwd, 10)

        // 定义更新密码sql语句
        const sql = 'update ev_users set password=? where id=?'

        // 调用db.query() 执行更新密码语句
        db.query(sql, [newPwd, req.user.id], (err, result) => {
            // 执行sql语句失败
            if (err) return res.cc(err);

            // 判断影响行数
            if (result.affectedRows !== 1) return res.cc("更新密码失败");

            res.cc('更新密码成功', 0);
        })
    })
}

// 更新用户密码处理函数
exports.userPic = (req, res) => {
    // 定义更新头像sql语句
    const sql = 'update ev_users set user_pic=? where id=?'

    // 调用db.query() 执行更新密码语句
    db.query(sql, [req.body.avatar, req.user.id], (err, result) => {
        // 执行sql语句失败
        if (err) return res.cc(err);

        // 判断影响行数
        if (result.affectedRows !== 1) return res.cc("更新头像失败");

        res.cc('更新头像成功', 0);
    })
}