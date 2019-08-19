var express = require('express');
var router = express.Router();

const ALLUSERSID = "AllUsersID";

/* GET users listing. */
router.get('/', function (req, res, next) {
    res.send('respond with a resource');
});

router.post('/login', function (req, res, next) {
    
    console.log("login uid: " + req.body.uid + " psw:" + req.body.password);

    if (redisClient.hexists(ALLUSERSID, req.body.uid, function (error, number) {
        if (error) {
            res.send("登录失败");
        }else{
            if (number === 0) { // 用户不存在，直接注册
                var userJson = {
                    "uid": req.body.uid,
                    "password": req.body.password
                };
                userJson = JSON.stringify(userJson); // 转为字符串
                redisClient.hset(ALLUSERSID, req.body.uid, userJson, function (error, number) {
                    if (error) {
                        res.send("注册失败");
                    } else {
                        req.session.user = userJson; // 用session标记用户状态
                        res.send("注册成功");
                    }
                })
            } else { // 用户存在，判断密码
                redisClient.hget(ALLUSERSID, req.body.uid, function (error, result) {
                    if (error) {
                        res.send("登录失败");
                    } else {
                        var user = JSON.parse(result);
                        if (user.password === req.body.password) {
                            req.session.user = user;
                            res.send("登录成功");
                        } else {
                            res.send("登录失败");
                        }
                    }
                })
            }
        }
    }));
});

router.post('/logout', function (req, res) {
    console.log("logout uid:" + req.body.uid);
    if(req.session.user){
        req.session.destroy(function (err) {
            if (err) {
                res.send('退出登录失败');
            } else {
                res.send('退出成功');
            }
        })
    }else{
        res.json('请先登录');
    }
});

module.exports = router;