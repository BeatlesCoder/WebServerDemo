var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    console.log("setData key:%s, field:%s", req.session.user.uid, req.body.datakey);

    //console.log("setData key:%s, field:%s, value:%s", req.body.uid, req.body.datakey, req.body.data);
    // 判断用户是否登录
    if (req.session.user) {
        // 用户已登录，把数据存到数据库
        redisClient.hset(req.session.user.uid, req.body.datakey, req.body.data, function (error, number) {
            if (error) {
                res.send("保存数据失败");
            } else {
                res.send("保存数据成功")
            }
        });
    } else {
        res.send("请先登录！")
    }
});

module.exports = router;