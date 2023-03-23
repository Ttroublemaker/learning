// 方案2: cluster.fork;
const http = require('http');
const cpuCoreLength = require('os').cpus().length; // 获取cpu核数
const cluster = require('cluster');
if (cluster.isMaster) {
  // 如果是主进程
  for (let i = 0; i < cpuCoreLength; i++) {
    cluster.fork(); // 开启子进程
  }
  cluster.on('exit', (worker) => {
    console.log('子进程退出');
    cluster.fork(); // 进程守护，工作中通常使用 PM2 进行进程守护
  });
} else {
  // 如果是子进程
  // 多个子进程会共享一个TCP连接，提供一份网络服务
  const server = http.createServer((req, res) => {
    console.error(process.pid);
    res.writeHead(200);
    res.end('done');
  });
  server.listen(3000, () => {
    console.info('server running at http://localhost:3000');
  });
}
