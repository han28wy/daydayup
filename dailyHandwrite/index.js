// https://mp.weixin.qq.com/s/GBE4xygOYcn9FA8EkY5FVg

// 1手写Object.create
// 2 instanceof
// 3 new
// 4 Promise Promise.all Promise.race
// 5 防抖和节流
// 6 call apply bind
// 7 函数柯里化
// AJAX请求
// 9 用promise封装ajax
// 10 深拷贝和浅拷贝
// 11 数组扁平化； flat push filter map add
// 12 promise实现图片的异步加载
// 13 发布和订阅

// 把传入的对象作为原型
function create(obj) {
    function F() {}
    F.prototype = obj
    return new F()
}

function newInstanceOf(left, right) {

}

// 问题就是 new和object.create有什么不一样的 ？
// create():创建一个新对象，带有指定的原型对象和属性
// new() 创建一个用户定义的对象类型的实例或具有构造函数的内置对象的实例
function myNew(fn, ...args) {
    if (typeof fn !== "function") {
        return console.error('sdfasds')
    }
    const obj = Objec.create(fn.prototype) // 创建对象，把对象原型绑定到函数原型上；
    const value = fn.apply(obj, args) // 调用构造函数，绑定this到obj上
    return value.instanceOf(Object) ? value : obj
}

// 手写promise相关的很多
// 一个正常的promise的用法是：
// const pro = new Promise((resolve)=>{
//     if('满足条件'){
//         resolve(fn)
//     }
// }).then(()=>{}).catch(()=>{})
class myPromise {
    constructor(fn) {
        this.callbacks = []
        const resolve = (value) => {
            this.data = value
            while (this.callbacks.length) {
                let cb = this.callbacks.shift()
                cb(value)
            }
        }
        fn(resolve)
    }
    then(onResolvedCallback) {
        return new myPromise((resolve) => {
            this.callbacks.push(() => {
                const res = onResolvedCallback(this.data)
                if (res.instanceOf(myPromise)) {
                    res.then(resolve)
                } else {
                    resolve(res)
                }
            })
        })
    }
}

myPromise.all = function (promiseList) {
    return new myPromise((resolve, reject) => {
        if (!Array.isArray(promiseList)) {
            return reject(new Error('非数组，错误'))
        }
        if (!promiseList.length) {
            return resolve([])
        }
        let arr = [],
            count = 0
        for (let i = 0; i < promiseList.length; i++) {
            Promise.resolve(promise[i]).then(result => {
                count++;
                arr[i] = result
                if (count === promiseList.length) {
                    resolve(arr)
                }
            }).catch(err => {
                reject(err)
            })
        }

    })
}

// 第二个手写promise.all
// 只有p1、p2、p3的状态都变成fulfilled，p的状态才会变成fulfilled，此时p1、p2、p3的返回值组成一个数组，传递给p的回调函数。
// 只要p1、p2、p3之中有一个被rejected，p的状态就变成rejected，此时第一个被reject的实例的返回值，会传递给p的回调函数。
function promiseAll(promises) {
    return new Promise(
        function (resolve, reject) {
            if (!Array.isArray(promises)) {
                throw new TypeError("需要传入array");
            }
            var resolveResult = [];
            let count = 0;
            for (let i = 0; i < promises.length; i++) {
                Promise.resolve(promises[i]).then((value) => {
                    count++;
                    resolveResult[i] = value; // 需要参数的顺序把结果放到数组里
                    // if (i === promises.length - 1) { //  到最后一个了,这里用i的判断方法是错误的，因为运行到这里，i的数值和顺序无关
                    //   return resolve(resolveResult);
                    // }
                    if (count === promises.length) {
                        return resolve(resolveResult);
                    }
                });
            }
        },
        (error) => {
            return reject(error);
        }
    );
}

//   手写promise.race
myPromise.race = function (promiseList) {
    return new Promise((resolve, reject) => {
        for (const promise of promiseList) {
            promise.then(resolve, reject)
        }
    })
}
// 手写promise.race
function promiseRace(promises) {
    return new Promise(
        function (resolve, reject) {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then((result) => {
                    return resolve(result);
                });
            }
        },
        (error) => {
            return reject(error);
        }
    );
}

// 防抖：事件触发完成后，间隔一段事件再执行回调函数；如果间隔期间再次触发则要重新计时

// 我自己写的，就是不确定是否完美！！！！！！
function debounce(fn, delay) {
    let flag = false
    const timer = setTimeout(() => {
        fn()
        flag = true
    }, delay)
    if (!flag) {
        clearTimeout(timer)
    }
}
function debounce2(fn,data){
    let timer
    return function(...arg){
        timer && clearTimeout(timer)
        timer = setTimeout(()=>{
            fn.apply(this, arg)
        }, date)
    }
}

// 节流：一段时间多次点击只触发一次

// 我自己理解写出来的，也不知道是不是没有bug !!!!
function throtte(fn, delay) {
    let flag = false
    if (flag) {
        const timer = setTimeout(() => {
            fn()
            flag = true
        }, delay)
    }
}

function throtte1(fn, data){
    let timer = new Date()
    return function(...arg){  // 这个args是获取参数的
        let newTimer = new Date()  // 这个还是获取触发时候的事件
        if(newTimer-timer >=data){
            fn.apply(this, arg)
            timer = new Date() // 这是再重置初始事件
        }
    }
}

// 后面来到了手写call apply bind
// 那么来说一下这三个的意思，都是修改this指向的作用，第一个参数代表要指向的对象了
// apply第二个参数传的是数组，call和bind可以依次对应传参
// bind返回值是函数

// 11 关于数组的方法
// 实现flat
function myFlat(arr, depth){

}

// 实现push
// 实际上不明白为什么最后都是再操作length的 ？？？？？
Array.prototype.myPush = null // 给数组原型重新定义一个新属性
function push(){ // 定义这个push的方法
    if(!this.length){
        this.length = 0
    }
    if(isNaN(Number(this.length))){
        this.length = 0
    }
    // arguments的用法!就是模拟函数实参，我觉得这个里面，默认把原型对象的参数，用arg表示
    for(let i=0;i<arguments.length;i++){
        this[this.length]=arguments[i]
    }
    return this.length
}
Array.prototype.myPush = push // 将push方法赋值给原型的新属性



// promise异步加载图片这个，没什么难度，学到了Image对象
// 建立图像对象：图像对象名称=new Image([宽度],[高度])
// 图像对象的属性： border complete height hspace lowsrc name src vspace width
// 图像对象的事件：onabort onerror onkeydown onkeypress onkeyup onload
let imageAsync = (url)=>{
    return new Promise((resolve,reject)=>{
        let img = new Image()
        img.src = url
        img.onload=()=>{
            console.log('已经加载成功了')
            resolve(img)
        }
        img.onerror=(err)=>{
            reject(err)
        }
    })
}

