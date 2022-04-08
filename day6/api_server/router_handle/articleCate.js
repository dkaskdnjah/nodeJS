const db = require("../db");

// 获取文章分类处理函数
exports.getArticleCates = (req, res) => {
    const userInfo = req.body
    // 定义查询分类列表语句
    const cateListSql = 'select * from ev_article_cates where is_delete=0 order by id asc'

    db.query(cateListSql, (err, result) => {
        if (err) return res.cc(err);

        res.send({
            code: 0,
            message: 'success',
            data: result,
        });
    })
    
    // res.send("reguser OK")
}

// 新增文章分类处理函数
exports.addArticleCates = (req, res) => {
    const userInfo = req.body
    // 定义查询分类列表语句
    const sql = 'select * from ev_article_cates where name=? or alias=?'

    // 使用db.query() 执行语句
    db.query(sql, [req.body.name, req.body.alias], (err, result) => {

        // 失败
        if (err) return res.cc(err);

        if (result.length === 2) return res.cc('分类名称和分类别名重复，请重新提交后重试');
        if (result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) 
            return res.cc('分类名称和分类别名重复，请重新提交后重试');
        if (result.length === 1 && req.body.name === result[0].name) return res.cc('分类名称重复，请重新提交后重试');
        if (result.length === 1 && req.body.alias === result[0].alias) return res.cc('分类别名重复，请重新提交后重试');


        // 定义新增分类列表语句
        const addCateSql = 'insert into ev_article_cates set?'

        // 使用db.query() 执行语句
        db.query(addCateSql, req.body, (err, result) => {

            // 失败
            if (err) return res.cc(err);

            // 影响行数不为1
            if (result.affectedRows!==1) return res.cc('新增分类失败');

            // 成功
            res.cc('新增分类成功');
        })
    })
    
    // res.send("reguser OK")
}

// 删除文章分类处理函数
exports.deleteArticleCates = (req, res) => {
    // 定义查询分类列表语句
    const sql = 'update ev_article_cates set is_delete=1 where id=?'

    // 使用db.query() 执行语句
    db.query(sql, req.params.id, (err, result) => {
        // 失败
        if (err) return res.cc(err);

        // 影响行数不为1
        if (result.affectedRows!==1) return res.cc('删除文章分类失败');

        // 成功
        res.cc('删除文章分类成功');
    })
    
    // res.send("reguser OK")
}

// 根据文章id获取分类处理函数
exports.getArticleCatesById = (req, res) => {
    // 定义查询分类列表语句
    const sql = 'select * from ev_article_cates where id=?'

    // 使用db.query() 执行语句
    
    db.query(sql, req.params.id, (err, result) => {
        // 失败
        if (err) return res.cc(err);

        // 获取数据条数为0
        if (result.length!==1) return res.cc('获取文章分类失败');

        // 成功
        res.send({
            code: 0,
            message: 'success',
            data: result[0]
        });
    })
    
    // res.send("reguser OK")
}

// 根据文章id更新分类处理函数
exports.updateArticleCatesById = (req, res) => {
    // 定义查询分类列表语句
    const sql = 'select * from ev_article_cates where id<>? and (name=? or alias=?)'
    // 使用db.query() 执行语句
    db.query(sql, [req.body.id, req.body.name, req.body.alias], (err, result) => {

        // 失败
        if (err) return res.cc(err);

        if (result.length === 2) return res.cc('分类名称和分类别名重复，请重新提交后重试');
        if (result.length === 1 && req.body.name === result[0].name && req.body.alias === result[0].alias) 
            return res.cc('分类名称和分类别名重复，请重新提交后重试');
        if (result.length === 1 && req.body.name === result[0].name) return res.cc('分类名称重复，请重新提交后重试');
        if (result.length === 1 && req.body.alias === result[0].alias) return res.cc('分类别名重复，请重新提交后重试');


        // 定义更新分类列表语句
        const updateCateSql = 'update ev_article_cates set? where id=?'

        // 使用db.query() 执行语句
        db.query(updateCateSql, [req.body, req.body.id], (err, result) => {

            // 失败
            if (err) return res.cc(err);

            // 影响行数不为1
            if (result.affectedRows!==1) return res.cc('更新分类成功');

            // 成功
            res.cc('更新分类成功');
        })
    })
}
