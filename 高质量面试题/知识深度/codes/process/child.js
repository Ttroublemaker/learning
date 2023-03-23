// 子进程，用于计算
function getSum() {
  let sum = 0;
  for (let i = 0; i < 1000; i++) {
    sum += i;
  }
  return sum;
}

// 子进程接收消息
process.on('message', (data) => {
  console.info('子进程 id', process.pid);
  console.info('子进程收到消息', data);
  const sum = getSum();
  // 发送消息给主进程
  process.send(sum);
});
