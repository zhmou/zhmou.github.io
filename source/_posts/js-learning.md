---
title: JS杂项知识记录
date: 2022-09-13 14:42:29
tags: [Javascript, 编程, 语法]
categories: 学习
---
{% note info %}
这篇文章仍处在更新当中。
{% endnote %}

# JS基础
## 类型
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
<!-- more -->
## 函数的参数传递
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

## 变量的作用域
### 局部和全局变量
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

### 作用域链
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

## JS的预解析
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

&emsp;&emsp;JS解释器在执行js脚本时，会先进行预解析，然后进行代码执行。  
&emsp;&emsp;&emsp;&emsp;(1)预解析将所有**var声明**的变量以及function提升至当前作用域的最前面。  
&emsp;&emsp;&emsp;&emsp;(2)按照预解析后的顺序依次执行。  
&emsp;&emsp;预解析分为变量预解析和函数预解析。
&emsp;&emsp;&emsp;&emsp;(1)变量预解析将变量的声明放在最前方。**不涉及变量赋值**  
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

# DOM：文档对象模型
## 基础概念
- 文档
    - 一个页面就是一个文档，DOM中用document表示
- 元素
    - 页面中所有标签都是元素，DOM中用element表示
- 节点
    - 网页中的所有内容都是节点（标签 属性 文本 注释等），DOM中用node表示  

**DOM把以上内容都看做是对象**


## 获取元素
- <code>document.***getElementById***</code>
    - 参数:id字符串
    - 返回文档中拥有特定ID的元素，不存在则返回Null
    - 返回值为*一个* **Element** 对象
- <code>document.***getElementsByTagName***</code>
    - 参数:标签类名字符串
    - 返回某类标签 **集合** ，以伪数组形式存储，不存在则返回空的伪数组
    - 指定父元素：***element***.getElementsByTagName('Tag name')
- <code>document.***getElementsByClassName***</code>
    - 根据类名返回元素对象 **集合**
- <code>document.***querySelector***</code>
    - 根据指定选择器返回**第一个**元素对象
    - 选择器需要加符号 . #
- <code>document.***querySelectorAll***</code>
    - 根据指定选择器返回所有元素对象集合
    - 选择器需要加符号 . #
- <code>document.***body***</code>
    - 获取body元素
- <code>document.***documentElement***</code>
    - 获取html元素

## 事件基础
&emsp;&emsp;事件：可以被JavaScript侦测到的行为。
- 事件三要素
    - 事件源 事件被触发的对象
    - 事件类型 如何触发（什么事件）
    - 事件处理程序

<button id='event_btn'>测试按钮</button>
<script>
    var btn = document.getElementById('event_btn');
    btn.onclick = function(){
        alert("在此示例中：\n    按钮是事件源。\n    onclick是事件类型。\n    弹出当前窗口用到的alert函数就是事件处理程序。");
    }
</script>

&emsp;&emsp;**常见鼠标事件**
<div class='center'>

| 鼠标事件                 | 触发条件     |
| ------------------------ | ------------ |
| <code>onclick</code>     | 点击左键     |
| <code>onmouseover</code> | 鼠标经过     |
| <code>onmouseout</code>  | 鼠标离开     |
| <code>onfocus</code>     | 获得鼠标焦点 |
| <code>onblur</code>      | 失去鼠标焦点 |
| <code>onmousemove</code> | 鼠标移动     |
| <code>onmouseup</code>   | 鼠标弹起     |
| <code>onmousedown</code> | 鼠标按下     |

</div>
<div class='clear'></div>

## 操作元素
### 改变元素内容
- <code>element.***innerText***</code>
- <code>element.***innerHTML***</code>
- 两者都能对元素内的文本内容进行读写操作，但是前者会忽略掉元素内的所有HTML标签以及源代码中的换行与空格。

**示例：分时问候**
{% tabs changeElement %}
<!-- tab HTML -->
``` HTML
    <div id='changeContent'></div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
    #changeContent {
        text-align: center;
    }
```
<!-- endtab -->
<!-- tab Javascript -->
``` Javascript
    var div = document.querySelector('#changeContent');
    div.innerHTML = getTimeNow();
    function getTimeNow() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if(minutes < 10)
            minutes = '0' + minutes;
        var welcomeString;
        if (hours >= 5 && hours < 7){
            welcomeString = '清晨好';
        } 
        else if (hours >= 7 && hours < 11){
            welcomeString = '早上好';
        } 
        else if (hours >= 11 && hours < 13){
            welcomeString = '中午好';
        } 
        else if (hours >= 13 && hours < 17){
            welcomeString = '下午好';
        } 
        else if (hours >= 17 && hours < 19){
            welcomeString = '傍晚好';
        } 
        else if (hours >= 19 && hours < 23){
            welcomeString = '晚上好';
        } 
        else {
            welcomeString = '夜深了';
        }
        return welcomeString + '，现在是' + hours + '点' + minutes + '分。'
    }
```
<!-- endtab -->
{% endtabs %}

<style>
    #changeContent {
        text-align: center;
    }
</style>
**效果：**
<div id='changeContent'></div>
<script>
    var div = document.querySelector('#changeContent');
    div.innerHTML = getTimeNow();
    function getTimeNow() {
        var date = new Date();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        if(minutes < 10)
            minutes = '0' + minutes;
        var welcomeString;
        if (hours >= 5 && hours < 7){
            welcomeString = '清晨好';
        } 
        else if (hours >= 7 && hours < 11){
            welcomeString = '早上好';
        } 
        else if (hours >= 11 && hours < 13){
            welcomeString = '中午好';
        } 
        else if (hours >= 13 && hours < 17){
            welcomeString = '下午好';
        } 
        else if (hours >= 17 && hours < 19){
            welcomeString = '傍晚好';
        } 
        else if (hours >= 19 && hours < 23){
            welcomeString = '晚上好';
        } 
        else {
            welcomeString = '夜深了';
        }
        return welcomeString + '，现在是' + hours + '点' + minutes + '分。'
    }
</script>

### 改变元素属性
- <code>element.***属性名***</code>（内置属性 id、src等，可读写）
- <code>element.***getAttribute('属性名')***</code>（自定义属性）
- <code>element.***setAttribute('属性名', 值)***</code> （主要是自定义属性）
- <code>element.***removeAttribute('属性名')***</code>（移除某个属性）

### 改变表单属性
&emsp;&emsp;利用DOM可以操作如下表单元素的属性:
{% blockquote %}
type、value、checked、selected、disabled
{% endblockquote %}
**示例：显示密码**
{% tabs changeInput %}
<!-- tab HTML -->
``` HTML
    <input type='password' id='pwd_demo_input'/><button id='pwd_demo_btn'>显示密码</button>
```
<!-- endtab -->
<!-- tab Javascript -->
``` Javascript
    var input = document.getElementById('pwd_demo_input');
    var btn = document.getElementById('pwd_demo_btn');
    btn.onclick = function(){
        var type = input.type;
        if (type == 'text') {
            input.type = 'password';
            this.innerHTML = '显示密码';
        }
        else if (type == 'password') {
            input.type = 'text';
            this.innerHTML = '隐藏密码';
        }
    }
```
<!-- endtab -->
{% endtabs %}
**效果：**
<input type='password' id='pwd_demo_input'/><button id='pwd_demo_btn'>显示密码</button>
<script>
    var input = document.getElementById('pwd_demo_input');
    var btn = document.getElementById('pwd_demo_btn');
    btn.onclick = function(){
        var type = input.type;
        if (type == 'text') {
            input.type = 'password';
            this.innerHTML = '显示密码';
        }
        else if (type == 'password') {
            input.type = 'text';
            this.innerHTML = '隐藏密码';
        }
    }
</script>

### 改变样式属性
&emsp;&emsp;我们可以通过JS修改元素的大小、颜色、位置等样式
- <code>element.***style***</code>
    - 行内样式操作
- <code>element.***className***</code>
    - 类名样式操作，适用于样式较多或者功能复杂的情况

{% note warning %}
JS中的样式采取驼峰命名法
JS修改style样式操作，产生的是行内样式
{% endnote %}
**示例：修改文本框内容**
{% tabs changeInputdemo %}
<!-- tab HTML -->
``` HTML
<input type='text' value='默认' id='inputdemo'/>
```
<!-- endtab -->
<!-- tab Javascript -->
``` Javascript
    var demo = document.getElementById('inputdemo');
    var defaultString = demo.value;
    demo.style.color = '#666';
    demo.onfocus = function(){
        if (demo.value === defaultString) {
            demo.value = '';
            demo.style.color = 'red';
        }
    }
    demo.onblur = function(){
        if (demo.value === '') {
            demo.value = defaultString;
            demo.style.color = '#666';
        }
    }
```
<!-- endtab -->
{% endtabs %}
**效果：**
<input type='text' value='默认' id='inputdemo'/>
<script>
    var demo = document.getElementById('inputdemo');
    var defaultString = demo.value;
    demo.style.color = '#666';
    demo.onfocus = function(){
        if (demo.value === defaultString) {
            demo.value = '';
            demo.style.color = 'red';
        }
    }
    demo.onblur = function(){
        if (demo.value === '') {
            demo.value = defaultString;
            demo.style.color = '#666';
        }
    }
</script>

### 节点操作
&emsp;&emsp;DOM树中，一切都是节点。

- 一般地，节点至少拥有nodeType nodeName nodeValue这三个基本属性
    - 元素节点 nodeType为1
    - 属性节点 nodeType为2
    - 文本节点 nodeType为3
<br>
- <code>node.***parentNode***</code>  获取离元素最近的父节点
- <code>node.***childNodes***</code>  子节点，包含元素节点 文本节点（因此一般不提倡使用）
- <code>node.***children***</code>  子元素节点
- <code>node.***firstChild / lastChild***</code>  第一 / 最后一个 子节点
- <code>node.***firstElementChild / lastElementChild***</code> （兼容性问题）第一 / 最后一个 子元素节点
    - 实际写法：<code>node.***children[0/node.children.length-1]***</code> 
- <code>node.***nextSibling / previousSibling***</code>  下一个兄弟节点
- <code>node.***nextElementSibling / previousElementSibling***</code>  下一个兄弟元素节点
- <code>document.***creatElement('tagName')***</code>  创建元素节点
- <code>node.***appendChild(child)***</code>  添加节点至node节点结尾
- <code>node.***insertBefore(child, 位置)***</code>  添加节点至node节点指定位置之前
- <code>node.***removeChild(child)***</code>  删除节点
- <code>node.***cloneNode()***</code>  复制节点，默认空参数 或者 false 是浅拷贝，不复制里面的内容，为true是深拷贝
