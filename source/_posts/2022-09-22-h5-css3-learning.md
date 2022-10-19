---
title: HTML / CSS 杂项知识记录
date: 2022-09-22 10:14:25
tags: [HTML, 语法, CSS]
categories: 学习
---
# 字体图标
矢量绘制的小图标，以字体的形式引入方便运用于需要调整颜色/改变大小的地方(可以像文字一样调整大小和颜色)。例如以下几个图标：
<div class='iconfont' style='font-size:30px;color:red;cursor: default;        
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;'>&#xe606;&#xe607;&#xe608;&#xe609;&#xe60a;</div>
同时，为了避免复制这些字体图标粘贴到其它未设置该字体的地方导致乱码，我们可以将这里的鼠标样式设置为默认 / css禁止选择该段文本。

# css三角形绘制

- 等腰三角形
  <div style='width:0px; height:0px; border: 20px solid transparent; border-top: 20px solid red;'></div>
  如上所示，将div盒子的大小设置为0，边框border指定大小，solid，并且设定四个边其中之一为非透明即可得到此等腰三角形。
- 直角三角形
  <div style='width:0px; height:0px; border-right: 20px solid transparent; border-bottom: 40px solid red;'></div>
  对相邻两边的border属性进行设置，其余两边留空。

<strong>自己试一试：</strong>
<div>
<div class='left' style='border: 1px dotted grey; position: relative; height: 180px;'>
<div style='width:0; height:0; border-top: 20px solid red;border-right:20px solid brown;border-bottom:20px solid green; border-left:20px solid lightblue; position:absolute; left:50%; top: 60px;margin-left:-20px' id='test'></div>
</div>

<div class='right' style='border: 1px dotted grey; position: relative; height: 180px;'>
<div class="slidecontainer">
  border-left: <input type="range" min="0" max="40" value="20" id="left" style="vertical-align: middle;" oninput='left_display.value=this.value'><output id='left_display' for='left'>20</output><br>
  border-right: <input type="range" min="0" max="40" value="20" id="right" style="vertical-align: middle;" oninput='right_display.value=this.value'><output id='right_display' for='right'>20</output><br>
  border-bottom: <input type="range" min="0" max="40" value="20" id="bottom" style="vertical-align: middle;" oninput='bottom_display.value=this.value'><output id='bottom_display' for='bottom'>20</output><br>
  border-top: <input type="range" min="0" max="40" value="20" id="top" style="vertical-align: middle;" oninput='top_display.value=this.value'><output id='top_display' for='top'>20</output><br>
  <button style='position:absolute; left:50%; margin-left: -40px;width:80px' onclick='changeCSS(left_display.value, right_display.value, bottom_display.value, top_display.value)'>Apply</button>
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



