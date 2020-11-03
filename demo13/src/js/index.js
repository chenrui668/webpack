import '../css/index.css';
function add (a, b) {
    return a + b;
}

// eslint-disable-next-line
console.log(add(1,2));

// 通过js代码，让某个文件被单独打包成一个chunk

import(/* webpackChunkName: 'print' */'./print.js')
    .then(print => {
        // 文件加载成功
        print();
    })
    .catch(() => {
        // eslint-disable-next-line
        console.log('文件加载失败')
    });