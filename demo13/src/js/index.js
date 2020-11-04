import '../css/index.css';
function add (a, b) {
    return a + b;
}

// eslint-disable-next-line
console.log(add(1,2));

// 通过js代码，让某个文件被单独打包成一个chunk
// 懒加载： 当文件需要使用时才加载
// 预加载： prefetch: 会在使用之前，提前加载js文件
import(/* webpackChunkName: 'print', webpackPrefetch: true */'./print.js')
    .then(print => {
        // 文件加载成功
        print();
    })
    .catch(() => {
        // eslint-disable-next-line
        console.log('文件加载失败')
    });