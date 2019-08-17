const redis = require('redis');

const redisClient = redis.createClient(6379, "127.0.0.1");

redisClient.on('ready', res=>{
    console.log('redis启动成功');
});

redisClient.on('error', err=>{
    console.log('redis启动失败', err);
    process.exit(1);    // redis启动失败，关掉服务器进程
})

module.exports = {
    redisClient
}