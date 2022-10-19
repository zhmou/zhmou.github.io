---
title: HTML / CSS 杂项知识记录
date: 2022-09-22 10:14:25
tags: [HTML, 语法, CSS]
categories: 学习
---
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
    width: 400px;
    margin: auto auto;
  }
  form li {
    list-style: none;
  }
  form li .input {
    width: 200px
  }
  form li span {
    width: 100px;
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

# CSS
# CSS3新增内容


## 字体图标
矢量绘制的小图标，以字体的形式引入方便运用于需要调整颜色/改变大小的地方(可以像文字一样调整大小和颜色)。例如以下几个图标：
<div class='iconfont' style='font-size:30px;color:red;cursor: default;        
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;'>&#xe606;&#xe607;&#xe608;&#xe609;&#xe60a;</div>
同时，为了避免复制这些字体图标粘贴到其它未设置该字体的地方导致乱码，我们可以将这里的鼠标样式设置为默认 / css禁止选择该段文本。

## CSS三角形绘制

- 等腰三角形
  <div style='width:0px; height:0px; border: 20px solid transparent; border-top: 20px solid red;'></div>
  如上所示，将div盒子的大小设置为0，边框border指定大小，solid，并且设定四个边其中之一为非透明即可得到此等腰三角形。
- 直角三角形
  <div style='width:0px; height:0px; border-right: 20px solid transparent; border-bottom: 40px solid red;'></div>
  对相邻两边的border属性进行设置，其余两边留空。

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



