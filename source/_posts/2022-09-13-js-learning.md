---
title: JS杂项知识记录
date: 2022-09-13 14:42:29
tags: [Javascript, 编程, 语法]
categories: 学习
---
<style type='text/css'>
    .left {
        width: 49.5%;
        float: left;
    }

    .right {
        width: 49.5%;
        float: right;
    }

    .center {
        float: left;
        width: 60%;
        margin-left: 20%;
    }

    .clear {
        clear: both;
    }
</style>
# 类型
- 基础数据类型
  **最新的 ECMAScript 标准定义了 8 种数据类型,分别是**
  - `string`
  - `number`
  - `bigint`
  - `boolean`
  - `null` (<code>typeof null</code>返回结果为object)
  - `undefined`
  - `symbol` (ECMAScript 2016新增)
> 所有基本类型的值都是不可改变的。但需要注意的是，基本类型本身和一个赋值为基本类型的变量的区别。变量会被赋予一个新值，而原值不能像数组、对象以及函数那样被改变。
- 引用类型
  - `Object`（包含普通对象-Object，数组对象-Array，正则对象-RegExp，日期对象-Date，数学函数-Math，函数对象-Function）

基本数据类型会放在<b>栈</b>上，引用类型放在<b>堆</b>上

# 函数的参数传递
- 基本数据类型的参数传递
<div>
<div class='center'>
``` javascript
function fn(a) {
    a++;
    console.log(a);
}
var x = 10;
fn(x)
console.log(x);
```
可以看到传入函数<code>fn</code>的，是变量x的一个复制（值拷贝）。因此尽管函数体内部该变量发生变化，原变量x不发生改变。
</div>
<div class='clear'></div>
</div>

- 引用类型的参数传递
<div>
<div class='center'>
``` javascript

function fn(a) {
    a[0] = 'a';
    console.log(a);
}
var x = new Array(1, 2, 3);
fn(x)
console.log(x);
```
这里传入函数的变量a是引用类型（数组对象），实际上传入参数指向了堆中相同的地址，此时函数体内部改变了堆上对象的属性，在函数外也发生改变。
</div>
<div class='clear'></div>
</div>

# 变量的作用域
## 局部和全局变量
<div>
<div class='center'>
``` javascript
    var p = 0;
    function fn() {
        var p = 1;
        p = 2;
        console.log('局部作用域的局部变量p:' + p);
        //局部作用域的全局变量
        num = 100;
    }
    console.log('全局作用域的全局变量p:' + p);
    fn();
    console.log('未声明在函数内部赋值的变量属于全局变量:' + num)
```

</div>
<div class='clear'></div>
</div>

- 局部变量只在函数内部生效  
- 当局部变量与全局变量重名时，对变量的修改只对局部变量生效  
- 未声明在函数内部赋值的变量属于全局变量（即函数外可调用）
- 函数的形参也是局部变量

## 作用域链
<div>
<div class='center'>
``` javascript
var num = 1;
function fn() {
    var num = 2;
    fn2();
    function fn2() {
        console.log(num);
    }
}
fn();
```
</div>
<div class='clear'></div>
</div>
&emsp;&emsp;·内部函数访问外部变量，根据链式查找方式决定。

# JS的预解析
<div>
<div class='center'>
``` javascript
// 1.先向控制台打印变量，后声明该变量并赋值
console.log(num);
var num = 10;
// 控制台输出undefined

// 2.先调用函数，后通过函数声明的方式创建函数
fn();
function fn() {
    console.log('fn');
}
// 控制台输出'fn'

// 3.以函数表达式创建函数（匿名函数）
fn2();
var fn2() = function() {
    console.log('fn2')
}
// 控制台报错 Uncaught TypeError: fn2 is not a function
```
</div>
<div class='clear'></div>
</div>

&emsp;&emsp;·js解释器在执行js脚本时，会先进行预解析，然后进行代码执行。  
&emsp;&emsp;&emsp;&emsp;(1)预解析将所有**var声明**的变量以及function提升至当前作用域的最前面。  
&emsp;&emsp;&emsp;&emsp;(2)按照预解析后的顺序依次执行。  
&emsp;&emsp;预解析分为变量预解析和函数预解析。
&emsp;&emsp;&emsp;&emsp;(1)变量预解析将变量的声明放在最前方。**不涉及函数赋值**  
&emsp;&emsp;&emsp;&emsp;(2)函数预解析将函数声明所创建的函数放在最前方。**不涉及函数表达式创建的函数**  

&emsp;&emsp;因此，上面的代码实际执行顺序如下：  
<div>
<div class='center'>
``` javascript
var num;
var fn2();
function fn() {
    console.log('fn');
}
// 此时num未赋值，因此输出undefined
console.log(num);
num = 10;
// fn()已经声明，可以正常调用
fn();
// fn2 只是一个变量，还不是函数，因此fn2()语句会出错。
fn2();
fn2 = function() {
    console.log('fn2')
}
```
</div>
<div class='clear'></div>
</div>