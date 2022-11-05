---
title: HTML / CSS 杂项知识记录
date: 2022-09-22 10:14:25
tags: [HTML, 语法, CSS]
categories: 学习
---
{% note info %}
这篇文章仍处在更新当中。
{% endnote %}

# HTML
## HTML5新增
- 语义化标签
  - <b>&lt;header&gt;</b> 头部标签
  - <b>&lt;nav&gt;</b> 导航标签
  - <b>&lt;article&gt;</b> 内容标签
  - <b>&lt;section&gt;</b> 定义文档某个区域
  - <b>&lt;aside&gt;</b> 侧边栏
  - <b>&lt;footer&gt;</b> 尾部标签
- 音频 视频标签
  - <b>&lt;audio&gt;</b> [音频标签](https://www.runoob.com/tags/tag-audio.html)
  - <b>&lt;video&gt;</b> [视频标签](https://www.runoob.com/tags/tag-video.html) mp4 / webm / ogg 格式，其中mp4兼容性最好
- input表单类型（见下面）

<div>
<style>
  form {
    position: relative;
    border: 1px dotted grey;
    width: 60%;
    margin: auto auto;
  }
  form li {
    list-style: none;
  }
  form li .input {
    width: 50%;
  }
  form li span {
    width: 30%;
    display: inline-block;
    text-align: right;
  }
  input::placeholder {
    color: hotpink;
  }
</style>
  <div style='text-align:center'>新增input表单类型 / 属性</div>
  <form action=''>
    <li><span>邮箱：</span><input type='email' class='input' required='required' placeholder='请输入邮箱'/></li>
    <li><span>网址：</span><input type='url' class='input' required='required' placeholder='占位文本测试'/></li>
    <li><span>时间：</span><input type='time' class='input' required='required'/></li>
    <li><span>日期：</span><input type='date' class='input' required='required'/></li>
    <li><span>数量：</span><input type='number' class='input' required='required'/></li>
    <li><span>手机号码：</span><input type='tel' class='input' required='required'/></li>
    <li><span>搜索：</span><input type='search' class='input' required='required'/></li>
    <li><span>颜色：</span><input type='color' class='input' required='required'/></li>
    <li><span>多选文件：</span><input type='file' class='input' required='required' multiple='multiple'/></li>
    <li style='position: relative; left:50%; margin-left: -25px; width: 50px'><input type='submit' value='提交'/></li>
  </form>
</div>

- 表单属性（见上面）
  - <b>required</b> 不能为空
  - <b>placeholder</b> 占位提示文本 默认灰色，使用伪类选择器<code>input::placeholder</code>选择 值：对应文本 
  - <b>autofocus</b> 自动获得焦点
  - <b>autocomplete</b> 自动补全 值: on / off
  - <b>multiple</b> 多选文件提交

<!-- more -->

# CSS
## CSS3新增内容
### 属性选择器

|    选择符     |                简介                 |
| :-----------: | :---------------------------------: |
|    E[att]     |       选择具有att属性的E元素        |
| E[att='val']  |   选择具有att属性且值为val的E元素   |
| E[att^='val'] | 选择具有att属性且值以val开头的E元素 |
| E[att$='val'] | 选择具有att属性且值以val结尾的E元素 |
| E[att*='val'] | 选择具有att属性且值中含有val的E元素 |

{% tabs attr-selector-test %}
<!-- tab HTML-->
``` HTML
<div class='attr-selector-test'>
  <input type='text' id='has-id-att'/>
  <input type='text' value='hello'/>
  <input type='text' value='start-test'/>
  <input type='text' value='test-end'/>
  <input type='text' value='te-middle-st'/>
</div>
```
<!-- endtab -->
<!-- tab CSS-->
``` CSS
<style>
.attr-selector-test input[id] {
  background-color: coral;
}

.attr-selector-test input[value='hello'] {
  background-color: skyblue;
}

.attr-selector-test input[value^='start'] {
  background-color: lightgreen;
}

.attr-selector-test input[value$='end'] {
  background-color: yellow;
}

.attr-selector-test input[value$='middle'] {
  background-color: hotpink;
}
</style>
```
<!-- endtab -->
{% endtabs %}

**效果：**
<style>
.attr-selector-test input[id] {
  background-color: coral;
}

.attr-selector-test input[value='hello'] {
  background-color: skyblue;
}

.attr-selector-test input[value^='start'] {
  background-color: lightgreen;
}

.attr-selector-test input[value$='end'] {
  background-color: yellow;
}

.attr-selector-test input[value*='middle'] {
  background-color: hotpink;
}
</style>

<div class='attr-selector-test'>
  <input type='text' id='has-id-att'/>
  <input type='text' value='hello'/>
  <input type='text' value='start-test'/>
  <input type='text' value='test-end'/>
  <input type='text' value='te-middle-st'/>
</div>


### 结构伪类选择器

|      选择符      |                            简介                             |
| :--------------: | :---------------------------------------------------------: |
|  E:first-child   |                匹配父元素中的第一个E(子)元素                |
|   E:last-child   |               匹配父元素中的最后一个E(子)元素               |
|  E:nth-child(n)  | 匹配父元素中的第n个E(子)元素 **n还可以为odd even / 表达式** |
| E:first-of-type  |                匹配父元素中E(子)元素的第一个                |
|  E:last-of-type  |               匹配父元素中E(子)元素的最后一个               |
| E:nth-of-type(n) | 匹配父元素中E(子)元素的第n个 **n还可以为odd even / 表达式** |

E:nth-child(n)，n的常见公式与取值对应：
|  公式  |        取值        |
| :----: | :----------------: |
|   2n   |        偶数        |
| 2n + 1 |        奇数        |
|   5n   |    5、10、15...    |
| n + 5  | 从第五个开始到最后 |
| -n + 5 |    第一至第五个    |

{% tabs structural-pseudo-classes-selector-test %}
<!-- tab HTML-->
``` HTML
<ul class='structural-pseudo-classes-selector-test'>
  外圈为父级div元素
  <li>first-child</li>
  <li>second-child</li>
  <li>third-child</li>
  <li>forth-child</li>
  <li>last-child</li>
</ul>
```
<!-- endtab -->
<!-- tab CSS-->
``` CSS
<style>
.structural-pseudo-classes-selector-test {
  width: 20%;
  border: 1px dotted grey;
  padding: 5%;
}

.structural-pseudo-classes-selector-test li:first-child {
  background-color: red;
}

.structural-pseudo-classes-selector-test li:last-child {
  background-color: blue;
}

.structural-pseudo-classes-selector-test li:nth-child(3) {
  background-color: green;
}

.structural-pseudo-classes-selector-test li:nth-child(2n) {
  background-color: orange;
}
</style>
```
<!-- endtab -->
{% endtabs %}


**效果：**
<style>
.structural-pseudo-classes-selector-test {
  width: 20%;
  border: 1px dotted grey;
  padding: 0 5% 0 5%;
}

.structural-pseudo-classes-selector-test li:first-child {
  background-color: red;
}

.structural-pseudo-classes-selector-test li:last-child {
  background-color: blue;
}

.structural-pseudo-classes-selector-test li:nth-child(3) {
  background-color: green;
}

.structural-pseudo-classes-selector-test li:nth-child(2n) {
  background-color: orange;
}
</style>
<ul class='structural-pseudo-classes-selector-test'>
  外圈为父级div元素
  <li>first-child</li>
  <li>second-child</li>
  <li>third-child</li>
  <li>forth-child</li>
  <li>last-child</li>
</ul>

**<code>nth-child</code>与<code>nth-type-of</code>的区别：**
<div>
<div class='center'>
``` HTML
<div.diff>
  <p></p>
  <div></div>
</div>
```
</div>
<div class='clear'></div>
</div>

&emsp;&emsp;在如上所示的代码中，<code>.diff div:first-child</code>将不会选择任何一个元素，因为该选择器选择了first-child，判断为p元素，与前面限定的div冲突。  
&emsp;&emsp;而<code>.diff div:first-of-type</code>先选中所有满足类型要求&lt;div&gt;的子标签，再从中选出第一个，因此会选中子&lt;div&gt;标签。

### 伪元素选择器
&emsp;&emsp;伪元素选择器帮助我们利用CSS创建新标签元素，从而避免HTML标签的使用，简化HTML的结构

|  选择符  |          简介          |
| :------: | :--------------------: |
| ::before | 在子元素的前面插入内容 |
| ::after  | 在子元素的后面插入内容 |

&emsp;&emsp;伪元素选择器创建的元素属于行内元素，要有大小需要转化为块级元素或者行内块元素
{% tabs pseudo-element-selector-test %}
<!-- tab HTML-->
``` HTML
<div class='pseudo-element-selector-test'>
  Hello, world!
</div>
```
<!-- endtab -->
<!-- tab CSS-->
``` CSS
<style>
  .pseudo-element-selector-test {
    width: 10%;
    height: 10%;
    background-color: pink;
  }

  .pseudo-element-selector-test::before {
    content: 'before';
  }

  .pseudo-element-selector-test::after {
    content: 'after';
  }
</style>
```
<!-- endtab -->
{% endtabs %}
**效果：**
<style>
  .pseudo-element-selector-test {
    width: 30%;
    background-color: pink;
  }

  .pseudo-element-selector-test::before {
    content: 'before';
  }

  .pseudo-element-selector-test::after {
    content: 'after';
  }
</style>
  <div class='pseudo-element-selector-test'>
    Hello, world!
  </div>
<br>

**使用场景：**

- **按钮样式（结合字体图标）**
{% tabs button %}
<!-- tab HTML-->
``` HTML
<div class='situation1'>
</div>
```
<!-- endtab -->
<!-- tab CSS-->
``` CSS
<style>
  .situation1 {
    border: 1px solid grey; width: 30%; height: 30px;
    position: relative;
  }

  .situation1::after {
    font-family: 'iconfont';
    font-size: 20px;
    line-height: 20px;
    content: '\e60a';
    position: absolute;
    top: 6px;
    right: 5px;
  }
</style>
```
<!-- endtab -->
{% endtabs%}
<style>
  .situation1 {
    margin: 10px auto;
    border: 1px solid grey; width: 30%; height: 30px;
    position: relative;
  }

  .situation1::after {
    font-family: 'iconfont';
    font-size: 20px;
    line-height: 20px;
    content: '\e60a';
    position: absolute;
    top: 6px;
    right: 5px;
  }
</style>
**效果：**
<div class='situation1'></div>
&emsp;&emsp;（在写的过程中发现绝对定位的计算位置是包括padding的）

- **视频网站遮罩效果**
{% tabs tudou %}
<!-- tab HTML-->
``` HTML
<div class='tudou'>
</div>
```
<!-- endtab -->
<!-- tab CSS-->
``` CSS
<style>
  .tudou {
    margin: 10px auto;
    width: 50%;
    height: 240px;
    background-color: #AD1453;
    position: relative;
  }

  .tudou:hover::after {
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }
</style>
```
<!-- endtab-->
{% endtabs %}
  
<style>
  .tudou {
    margin: 10px auto;
    width: 50%;
    height: 240px;
    background-color: #AD1453;
    position: relative;
  }

  .tudou:hover::after {
    position: absolute;
    top: 0;
    right: 0;
    display: block;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    content: '';
  }
</style>

<div class='tudou'></div>

- **伪元素清除浮动法**
  浮动元素脱离标准流，导致子元素无法“撑起”父级元素的高度。

**效果：**
<div style='border: 1px solid grey; margin: 10px auto; width: 50%;'>父级元素<div style="width: 20%; height: 100px; background-color: red; float: right;"></div></div>

**解决方法：**
&emsp;&emsp;在浮动元素之后插入清除浮动效果的标签。

{% tabs clearfix %}
<!-- tab HTML-->
``` HTML
<div class='clearfix box'>
  父级元素
  <div class='floatElement'></div>
</div>
```
<!-- endtab -->
<!-- tab CSS-->
``` CSS
<style>
  .clearfix:after {
    content:'';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .box {
    border: 1px solid grey; margin: 10px auto; width: 50%;
  }

  .floatElement {
    width: 20%; height: 100px; background-color: red; float: right;
  }
</style>
```
<!-- endtab -->
{% endtabs %}
**效果：**
<style>
  .clearfix:after {
    content:'';
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
  }

  .box {
    border: 1px solid grey; margin: 10px auto; width: 50%;
  }

  .floatElement {
    width: 20%; height: 100px; background-color: red; float: right;
  }
</style>
<div class='clearfix box'>
  父级元素
  <div class='floatElement'></div>
</div>

### CSS3盒子模型
&emsp;&emsp;以往，一个200px大小的div盒子，加上15px边框，15px内边距后，整体大小变为270px;
&emsp;&emsp;CSS3中新增属性<code>box-sizing</code>，默认值<code>content-box</code>表现和原来一样；设置为<code>border-box</code>后，盒子显示的大小不变（内部变小）

### 过滤器属性filter
&emsp;&emsp;具体函数可参见[MDN文档](https://developer.mozilla.org/zh-CN/docs/Web/CSS/filter)
**blur效果：**
<img src='/img/general/avatar.jpg' width='10%' style='filter:blur(5px);'/>

### calc()函数计算宽度
&emsp;&emsp;calc() 此 CSS 函数允许在声明 CSS 属性值时执行一些计算。

### transition动画效果
- 写法：transition: **变化属性** **时间（单位为s）** 动画效果（函数） 延时触发时间（s）
- 谁触发动画给谁加
{% tabs progressbar %}
<!-- tab HTML -->
``` HTML
<div class=pgbar>
  <div class='pgbar-in'></div>
</div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
<style>
  .pgbar {
    margin: 0px auto;
    width: 20%;
    height: 20px;
    border-radius: 10px;
    border: 1px solid red;
    padding: 2px;
    box-sizing: border-box;
  }

  .pgbar-in {
    width: 50%;
    height: 100%;
    background-color: red;
    border-radius: 8px;
    transition: all 0.7s
  }

  .pgbar:hover .pgbar-in {
    background-color: hotpink;
    width: 100%;
  }
</style>
```
<!-- endtab -->
{% endtabs %}
<style>
  .pgbar {
    margin: 0px auto;
    width: 20%;
    height: 20px;
    border-radius: 10px;
    border: 1px solid red;
    padding: 2px;
    box-sizing: border-box;
  }

  .pgbar-in {
    width: 50%;
    height: 100%;
    background-color: red;
    border-radius: 8px;
    transition: all 0.7s
  }

  .pgbar:hover .pgbar-in {
    background-color: hotpink;
    width: 100%;
  }
</style>
**效果**：
<div class=pgbar><div class='pgbar-in'></div></div>

### 2D转换(transform)
- translate(x, y) 坐标位移
  - 沿着x和y轴移动元素
  - **不会影响其他元素的位置**（绝对定位：脱离标准流）
  - 取值为百分比时是相对自身元素的大小
  - 对行内元素无效果
- rotate(θdeg) 旋转
  - 单位**deg**
  - 正值顺时针，负值逆时针
  - 默认旋转中心点是元素的中心点
    - transform-origin:x y; 可设定旋转中心点（百分比 方位名词 像素）
- scale(x, y) 缩放
  - 不加单位：缩放倍数
  - 对比width, height的缩放，scale不会影响其它盒子，且scale是以中心点为基准，向四周缩放。
- 连写时注意要把位移变换放在最前面，否则旋转后坐标轴发生变动，可能达不到预期效果。

&emsp;&emsp;利用旋转做出下拉三角的效果
{% tabs Rotate %}
<!-- tab HTML -->
``` HTML
<div class='wrapper'>
  <input type='text' class='rotate_box'/>
</div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
<style>
  .wrapper {
    position: relative;
    margin: 10px auto;
    width: 200px;
    height: 20px;
  }

  .rotate_box {
    width: 200px;
    height: 20px;
    outline: medium;
  }

  .wrapper::after {
    content: "";
    position: absolute;
    top: 13px;
    right: 0;
    width: 8px;
    height: 8px;
    border-top: 2px solid #666;
    border-right: 2px solid #666;
    transform: rotate(45deg);
    transition: transform 0.5s;
  }

  .wrapper:hover::after {
    transform: rotate(135deg);
  }
</style>
```
<!-- endtab -->
{% endtabs %}
<style>
  .wrapper {
    position: relative;
    margin: 10px auto;
    width: 200px;
    height: 20px;
  }

  .rotate_box {
    width: 200px;
    height: 20px;
    outline: medium;
  }

  .wrapper::after {
    content: "";
    position: absolute;
    top: 13px;
    right: 0;
    width: 8px;
    height: 8px;
    border-top: 2px solid #666;
    border-right: 2px solid #666;
    transform: rotate(45deg);
    transition: all 0.5s;
  }

  .wrapper:hover::after {
    top: 11px;
    transform: rotate(135deg);
  }
</style>
**效果**：
(由于CSS没有父元素的同级元素选择器……所以纯CSS似乎没办法选出input:active状态下wrapper元素下的after伪元素)
<div class='wrapper'><input type='text' class='rotate_box'/></div>

### 动画(animation)
- 定义动画
<div class='center'>
  ``` CSS
    @keyframes 动画名称 {
      <!-- 定义关键帧 -->
      0% {
        balabala;
      }
      10% {
        balabala;
      }
      ……
      100% {
        balabala;
      }
    }
  ```
</div>
<div class='clear'></div>

- 调用动画
<div class='center'>
  ``` CSS
    选择器 {
      animation-name: 动画名称;
      animation-duration: 动画时间;
    }
  ```

</div>
<div class='clear'></div>

- 简写
  - animation: 动画名称 持续时间 运动曲线 何时开始 播放次数 是否反方向 起始或结束的状态

**波纹动画**
{% tabs animation %}
<!-- tab HTML -->
``` HTML
<div class='animation'>
  <div class='dot'></div>
  <div class='pulse1'></div>
  <div class='pulse2'></div>
  <div class='pulse3'></div>
</div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
<style>
  .animation {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border: 1px solid #666
  }

  .animation .dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #09f;
    border-radius: 50%
  }

  .animation div[class^='pulse'] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    box-shadow: 0 0 12px #09f;
    border-radius: 50%;
    animation: p 1.5s linear infinite;
  }

  .animation .pulse2 {
    animation-delay: 0.5s !important
  }

  .animation .pulse3 {
    animation-delay: 1.0s !important
  }

  @keyframes p {
    0% {
  
    }

    70% {
      width: 40px;
      height: 40px;
      opacity: 1;
    }

    100% {
      width: 60px;
      height: 60px;
      opacity: 0;
    }
  }
</style>
```
<!-- endtab -->
{% endtabs %}

<style>
  .animation {
    position: relative;
    margin: 0 auto;
    width: 100px;
    height: 100px;
    border: 1px solid #666
  }

  .animation .dot {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    background-color: #09f;
    border-radius: 50%
  }

  .animation div[class^='pulse'] {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 10px;
    height: 10px;
    box-shadow: 0 0 12px #09f;
    border-radius: 50%;
    animation: p 1.5s linear infinite;
  }

  .animation .pulse2 {
    animation-delay: 0.5s !important
  }

  .animation .pulse3 {
    animation-delay: 1.0s !important
  }

  @keyframes p {
    0% {
  
    }

    70% {
      width: 40px;
      height: 40px;
      opacity: 1;
    }

    100% {
      width: 60px;
      height: 60px;
      opacity: 0;
    }
  }
</style>

<div class='animation'>
  <div class='dot'></div>
  <div class='pulse1'></div>
  <div class='pulse2'></div>
  <div class='pulse3'></div>
</div>

**奔跑的北极熊**
{% tabs animation2 %}
<!-- tab HTML -->
``` HTML
<div class='bg'>
  <div class='display'></div>
</div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
<style>
  .bg {
    position: relative;
    width: 100%;
    height: 336px;
    background: url(/img/h5-css3-learning/bg1.png);
    opacity: 1;
    animation: bg_move 10s linear infinite
  }
  .display {
    position: absolute;
    left: 0;
    bottom: 10%; 
    width: 200px;
    height: 100px;
    background:url(/img/h5-css3-learning/bear.png) no-repeat;
    animation: play 0.8s steps(8) infinite, move 2s linear 1 forwards;
  }

  @keyframes play {
    0% {
    }

    100% {
      background-position: -1600px 0;
    }
  }
  @keyframes move {
    0% {
    }
    100% {
      left: 50%;
      transform: translateX(-50%); 
    }
  }

  @keyframes bg_move {
    0%{}
    100%{
      background-position: -3840px 0;
    }
  }

</style>
```
<!-- endtab -->
{% endtabs %}
<style>
  .bg {
    position: relative;
    width: 100%;
    height: 336px;
    background: url(/img/h5-css3-learning/bg1.png);
    opacity: 1;
    animation: bg_move 10s linear infinite
  }
  .display {
    position: absolute;
    left: 0;
    bottom: 10%; 
    width: 200px;
    height: 100px;
    background:url(/img/h5-css3-learning/bear.png) no-repeat;
    animation: play 0.8s steps(8) infinite, move 2s linear 1 forwards;
  }

  @keyframes play {
    0% {
    }

    100% {
      background-position: -1600px 0;
    }
  }
  @keyframes move {
    0% {
    }
    100% {
      left: 50%;
      transform: translateX(-50%); 
    }
  }

  @keyframes bg_move {
    0%{}
    100%{
      background-position: -3840px 0;
    }
  }

</style>
<div class='bg'>
<div class='display'>

</div>
</div>

### 3D转换
- translate3d(x, y, z)
  - 在z轴上移动可在直接用translateZ()
  - z轴移动尽量用px单位
  - z轴正方向朝向屏幕外
- perspective
  - 视距，即视点离屏幕的距离，px单位
- rotateX | rotateY | rotateZ
  - 分别绕X Y Z轴转动
- transform-style: 呈现形式

**示例**
{% tabs 3d1 %}
<!-- tab HTML -->
``` HTML
<div class='wrapper3d1'>
  <div class='boxes'>
    <div></div>
    <div></div>
  </div>
</div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
<style>
  .wrapper3d1 {
    margin: 0 auto;
    perspective: 600px;
    width: 300px;
    height: 300px;
  }
  .boxes {
    position: relative;
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border: 1px solid #666;
    transform-style: preserve-3d;
    transition: all 1s;
  }

  .wrapper3d1:hover .boxes {
    transform: rotateY(-60deg);
  }

  .boxes div:first-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotateX(60deg);
    width: 200px;
    height: 200px;
    background-color: pink;
  }

  .boxes div:last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
</style>
```
<!-- endtab -->
{% endtabs %}
<style>
  .wrapper3d1 {
    margin: 0 auto;
    perspective: 600px;
    width: 300px;
    height: 300px;
  }
  .boxes {
    position: relative;
    margin: 0 auto;
    width: 300px;
    height: 300px;
    border: 1px solid #666;
    transform-style: preserve-3d;
    transition: all 1s;
  }

  .wrapper3d1:hover .boxes {
    transform: rotateY(-60deg);
  }

  .boxes div:first-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotateX(60deg);
    width: 200px;
    height: 200px;
    background-color: pink;
  }

  .boxes div:last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 200px;
    height: 200px;
    background-color: skyblue;
  }
</style>

**效果：**
<div class='wrapper3d1'>
  <div class='boxes'>
    <div></div>
    <div></div>
  </div>
</div>

**两面翻转盒子**
{% tabs 3d2 %}
<!-- tab HTML -->
``` HTML
<div class='wrapper3d2'>
  <div class='flipboxes'>
    <div>Hello</div>
    <div>World</div>
  </div>
</div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
<style>
  .wrapper3d2 {
    perspective: 500px;
    margin: 0 auto;
    width: 200px;
    height: 200px;
  }

  .flipboxes {
    position: relative;
    margin: 0 auto;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transition: all 1.5s;
  }

  .flipboxes>div:first-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 200px;
    border-radius: 50%;
    background-color: pink;
    z-index: 1;
  }

  .flipboxes>div:last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotateY(180deg);
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 200px;
    border-radius: 50%;
    background-color: skyblue;
  }

  .wrapper3d2:hover .flipboxes {
    transform: rotateY(180deg);
  }

  .wrapper3d2:hover>.flipboxes>div:last-child {
    z-index: 1;
  }
</style>
```
<!-- endtab -->
{% endtabs %}
<style>
  .wrapper3d2 {
    perspective: 500px;
    margin: 0 auto;
    width: 200px;
    height: 200px;
  }

  .flipboxes {
    position: relative;
    margin: 0 auto;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transition: all 1.5s;
  }

  .flipboxes>div:first-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 200px;
    border-radius: 50%;
    background-color: pink;
    z-index: 1;
  }

  .flipboxes>div:last-child {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%) rotateY(180deg);
    width: 100%;
    height: 100%;
    text-align: center;
    line-height: 200px;
    border-radius: 50%;
    background-color: skyblue;
  }

  .wrapper3d2:hover .flipboxes {
    transform: rotateY(180deg);
  }

  .wrapper3d2:hover>.flipboxes>div:last-child {
    z-index: 1;
  }
</style>

**效果：**
<div class='wrapper3d2'>
  <div class='flipboxes'>
    <div>Hello</div>
    <div>World</div>
  </div>
</div>

**3D翻转导航烂**
{% tabs 3d3 %}
<!-- tab HTML -->
``` HTML
<div class='demowrapper'>
  <div class='navdemo'>
    <div class='front'>1234</div>
    <div class='bottom'>5678</div> 
  </div>
</div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
<style>
  .demowrapper {
    perspective: 200px;
  }

  .navdemo {
    position: relative;
    margin: 0 auto;
    width: 200px;
    height: 200px;
    transform-style: preserve-3d;
    transition: all 1s;
  }

  .navdemo .front, .navdemo .bottom {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .navdemo .front {
    background-color:skyblue;
    transform: translate(-50%, -50%) translateZ(20px);
    z-index: 1;
  }

  .navdemo .bottom {
    background-color:pink;
    transform: translate(-50%, -50%) translateY(50%) rotateX(-90deg);
  }

  .navdemo:hover {
    transform: rotateX(90deg);
  }
</style>
```
<!-- endtab -->
{% endtabs %}

<style>
  .demowrapper {
    perspective: 600px;
  }

  .navdemo {
    position: relative;
    margin: 0 auto;
    width: 200px;
    height: 80px;
    transform-style: preserve-3d;
    transition: all 1s;
  }

  .navdemo .front, .navdemo .bottom {
    position: absolute;
    left: 50%;
    top: 50%;
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
  }

  .navdemo .front {
    background-color:skyblue;
    transform: translate(-50%, -50%) translateZ(20px);
    z-index: 1;
  }

  .navdemo .bottom {
    background-color:pink;
    transform: translate(-50%, -50%) translateY(50%) rotateX(-90deg);
  }

  .navdemo:hover {
    transform: rotateX(90deg);
  }
</style>
**效果：(引入wrapper的perspective属性)**
<div class='demowrapper'>
  <div class='navdemo'>
    <div class='front'>1234</div>
    <div class='bottom'>5678</div> 
  </div>
</div>

**效果：(没有perspective属性)**
<div class='navdemo'>
  <div class='front'>1234</div>
  <div class='bottom'>5678</div> 
</div>

**旋转木马**
{% tabs 3d4 %}
<!-- tab HTML -->
``` HTML
<div class=wrapperCarousel>
  <section>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </section>
</div>
```
<!-- endtab -->
<!-- tab CSS -->
``` CSS
<style>
  .wrapperCarousel {
    perspective: 1000px;
    height: 300px;
    width: 100%;
    margin-top: 50px;
  }

  .wrapperCarousel section:hover {
    animation-play-state: paused
  }

  .wrapperCarousel>section {
    position: relative;
    width: 200px;
    height: 200px;
    margin: auto;
    transform-style: preserve-3d;
    animation: rotate 10s linear infinite
  }

  .wrapperCarousel>section>div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .wrapperCarousel>section>div:nth-child(1){
    background-image: url(/img/h5-css3-learning/amazon-logo.png);
    transform: translateZ(150px);
  }
  .wrapperCarousel>section>div:nth-child(2){
    background-image: url(/img/h5-css3-learning/apple-logo.png);
    transform: rotateY(90deg) translateZ(180px);
  }
  .wrapperCarousel>section>div:nth-child(3){
    background-image: url(/img/h5-css3-learning/google-logo.png);
    transform: rotateY(180deg) translateZ(180px);
  }
  .wrapperCarousel>section>div:nth-child(4){
    background-image: url(/img/h5-css3-learning/microsoft-logo.png);
    transform: rotateY(270deg) translateZ(180px);
  }

  @keyframes rotate {
    0%{}
    100%{
      transform: rotateY(360deg)
    }
  }
</style>
```
<!-- endtab -->
{% endtabs %}
<style>
  .wrapperCarousel {
    perspective: 1000px;
    height: 300px;
    width: 100%;
    margin-top: 50px;
  }

  .wrapperCarousel section:hover {
    animation-play-state: paused
  }

  .wrapperCarousel>section {
    position: relative;
    width: 200px;
    height: 200px;
    margin: auto;
    transform-style: preserve-3d;
    animation: rotate 10s linear infinite
  }

  .wrapperCarousel>section>div {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-size: contain;
    background-repeat: no-repeat;
  }

  .wrapperCarousel>section>div:nth-child(1){
    background-image: url(/img/h5-css3-learning/amazon-logo.png);
    transform: translateZ(150px);
  }
  .wrapperCarousel>section>div:nth-child(2){
    background-image: url(/img/h5-css3-learning/apple-logo.png);
    transform: rotateY(90deg) translateZ(180px);
  }
  .wrapperCarousel>section>div:nth-child(3){
    background-image: url(/img/h5-css3-learning/google-logo.png);
    transform: rotateY(180deg) translateZ(180px);
  }
  .wrapperCarousel>section>div:nth-child(4){
    background-image: url(/img/h5-css3-learning/microsoft-logo.png);
    transform: rotateY(270deg) translateZ(180px);
  }

  @keyframes rotate {
    0%{}
    100%{
      transform: rotateY(360deg)
    }
  }
</style>

**效果：**
<div class=wrapperCarousel>
  <section>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </section>
</div>

## 字体图标
&emsp;&emsp;矢量绘制的小图标，以字体的形式引入方便运用于需要调整颜色/改变大小的地方(可以像文字一样调整大小和颜色)。例如以下几个图标：
<div class='iconfont' style='font-size:30px;color:red;cursor: default;        
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;'>&#xe606;&#xe607;&#xe608;&#xe609;&#xe60a;</div>
&emsp;&emsp;同时，为了避免复制这些字体图标粘贴到其它未设置该字体的地方导致乱码，我们可以将这里的鼠标样式设置为默认 / css禁止选择该段文本。

## CSS三角形绘制

- 等腰三角形
  <div style='width:0px; height:0px; border: 20px solid transparent; border-top: 20px solid red;'></div>

&emsp;&emsp;如上所示，将div盒子的大小设置为0，边框border指定大小，solid，并且设定四个边其中之一为非透明即可得到此等腰三角形。
- 直角三角形
  <div style='width:0px; height:0px; border-right: 20px solid transparent; border-bottom: 40px solid red;'></div>

&emsp;&emsp;对相邻两边的border属性进行设置，其余两边留空。

<strong>自己试一试：</strong>
<div>
<div class='left' style='border: 1px dotted grey; position: relative; height: 180px'>
<div style='width:0; height:0; border-top: 20px solid red;border-right:20px solid brown;border-bottom:20px solid green; border-left:20px solid lightblue; position: relative; left: 50%; margin-left: -20px; top: 60px' id='test'></div>
</div>

<div class='right' style='border: 1px dotted grey;'>
<div style='position:relative; min-height: 180px'>
  border-left: <input type="range" min="0" max="40" value="20" id="left" style="vertical-align: middle; width: 40%;" oninput='left_display.value=this.value'><output id='left_display' for='left'>20</output><br>
  border-right: <input type="range" min="0" max="40" value="20" id="right" style="vertical-align: middle; width: 40%" oninput='right_display.value=this.value'><output id='right_display' for='right'>20</output><br>
  border-bottom: <input type="range" min="0" max="40" value="20" id="bottom" style="vertical-align: middle; width: 40%" oninput='bottom_display.value=this.value'><output id='bottom_display' for='bottom'>20</output><br>
  border-top: <input type="range" min="0" max="40" value="20" id="top" style="vertical-align: middle; width: 40%" oninput='top_display.value=this.value'><output id='top_display' for='top'>20</output><br>
  <button style='position:relative; left:50%; margin-left: -40px;width:80px' onclick='changeCSS(left_display.value, right_display.value, bottom_display.value, top_display.value)'>Apply</button>
  <div class='clear'></div>
  <script>
    function changeCSS(a, b, c, d){
      var divbox = document.getElementById("test"); 
      divbox.style.borderTopWidth = d + 'px';
      divbox.style.borderBottomWidth = c + 'px';
      divbox.style.borderLeftWidth = a + 'px';
      divbox.style.borderRightWidth = b + 'px';
    }
  </script>
</div>
</div>
<div class='clear'></div>
</div>

## CSS初始化
为确保网页在不同浏览器下的兼容性与显示的一致性，CSS需要初始化 / 重设。
```CSS 京东CSS初始化
/* 所有标签的内外边距清零 */
* {
  margin:0;
  padding:0
} 

/* 斜体文字不倾斜 */
em,i {
  font-style:normal
}

/* 去掉li的小圆点 */
li {
  list-style:none
}

/* border:0 照顾低版本浏览器图片加链接会产生边框的问题 */
/* vertical-align: 文字和图片中线对齐（默认是基线） */
img {
  border:0;
  vertical-align:middle
}

/* 鼠标经过按钮控件变小手 */
button {
  cursor:pointer
}

/* 指定链接颜色，取消下划线 */
a {
  color:#666;
  text-decoration:none
}

/* 鼠标经过变成红色 */
a:hover {
  color:#c81623
}

button,input {
  font-family:Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif
}

body {
  /* 文字放大抗锯齿 */
  -webkit-font-smoothing:antialiased;
  background-color:#fff;
  /* "\5B8B\4F53"是宋体的Unicode编码，防止出现乱码 */
  font:12px/1.5 Microsoft YaHei,Heiti SC,tahoma,arial,Hiragino Sans GB,"\5B8B\4F53",sans-serif;
  color:#666
}
  
/* 隐藏 */
.hide,.none {
  display:none
}

/* 伪元素方法清除浮动 */
.clearfix:after {
  visibility:hidden;
  clear:both;
  display:block;
  content:".";
  height:0
}

.clearfix {
  *zoom:1
}
```



