// 方式1: child_process.fork
const http = require('http');
const fork = require('child_process').fork;

const server = http.createServer((req, res) => {
  if (req.url === '/') {
    console.info('主进程 id', process.pid);
    // 开启子进程
    const childProcess = fork('./child.js');
    childProcess.send('发送消息给子进程，开始计算');

    // 主进程接收子进程的消息
    childProcess.on('message', (data) => {
      console.info('主进程收到消息', data);
      res.end('sum is: ' + data);
    });

    childProcess.on('close', (err) => {
      console.error('子进程因报错而退出', err);
      childProcess.kill();
      res.end('error');
    });
  }
});

server.listen(3000, () => {
  console.info('server running at http://localhost:3000');
});
