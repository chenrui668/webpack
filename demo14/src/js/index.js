import '../css/index.css';

function add(a, b) {
  return a + b;
}
// eslint-disable-next-line
console.log(add(1,2));

/*
    1. eslint不认识window、navigator等全局变量
        解决：需要修改package.json中eslintConfig配置
         "env": {
             "browser": true
         }
    2. sw代码必须运行在服务器上
         --> nodejs
         -->
            npm i serve -g
            serve -s build 启动服务器，将build目录下所有资源作为静态资源暴露出去

*/
// 注册serviceWorker
// 处理兼容性问题

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(() => {
        // eslint-disable-next-line
        console.log('sw注册成功了');
      })
      .catch(() => {
        // eslint-disable-next-line
        console.log('sw注册失败了');
      });
  });
}
