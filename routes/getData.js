var express = require('express');
var router = express.Router();

router.post('/', function (req, res) {
    //console.log("getData key:%s, field:%s", req.session.user.uid, req.body.datakey);
    //console.log("getData key:%s, field:%s", req.body.uid, req.body.datakey);
    if (req.session.user) {
        redisClient.hget(req.session.user.uid, req.body.datakey, function (err,reply) {
            if (err) {
                res.send("获取数据失败:");
            } else {
                res.send("获取数据成功：" + reply);
            }
        })
    } else {
        res.send("请先登录！");
    }
});

module.exports = router;