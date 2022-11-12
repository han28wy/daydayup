// Object.defineProperties
// Proxy数据劫持
// 路由
// setTimeout三剑客互相实现
// 手写jsonp
// 提取url的参数并且转成对象
// 数组去重的很多种方法

// vue2响应式原理：通过遍历data里的所有属性，用defineProperty分别添加setters方法，挂载到vue实例中，会触发对应setter函数，然后watcher
// 里面的订阅者会收到通知
// vue3响应式原理：proxy进行数据劫持，就是把data加上getters和setters方法



// 手写路由，  他手写的和核心功能究竟是什么的 ？？？
class Route{
    constructor(){
        this.routes = [] // 路由表
        this.currentHash = ''
        // 不能改变this指向，绑定
        this.freshRoute = this.freshRoute.bind(this)
        window.addEventListener('load', this.freshRoute, false)
        window.addEventListener('hashchange', this.freshRoute, false)
    }
    // 存储
    storeRoute(path, cb){
        this.route[path] = cb || function(){}
    }
    // 更新。。。。但是不知道，实际写这个的意义是社么 ？？？ ！！！
    freshRoute(){
        this.currentHash = location.hash.slice(1) || '/'
        this.routes[this.currentHash]()
    }
}




// 手写jsonp 叫这个名字其实有点奇怪，这是什么作用的
function myJP(src){
    const script = document.createElement('script')
    script.src = src
    script.type = "text/javascript"
    document.body.appendChild(script)
}
myJP("随便写一个src了")
function handleCallback(res){
    console.log('res')
}
// 接口返回的数据格式
handleRes({a: 1, b: 2});
