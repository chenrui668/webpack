import '../css/index.css';
import print from './print.js';
function add (a, b) {
    return a + b;
}

print();

console.log(add(1,2));

if (module.hot) {
    // 一旦module.hot为true,说明开启了HMR功能
    module.hot.accept('./print.js', function() {
        // 方法会监听print.js文件的变化， 一旦发生变化，其他默认不会重新打包构建
        // 会执行后面的回调函数
        print();
    })
}