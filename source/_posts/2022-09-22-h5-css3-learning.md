---
title: HTML / CSS 杂项知识记录
date: 2022-09-22 10:14:25
tags: [HTML, 语法, CSS]
categories: 学习
---
<style>
@font-face {
  font-family: "iconfont"; /* Project id 3664290 */
  src: url('/fonts/iconfont-example/iconfont.woff2') format('woff2'),
       url('/fonts/iconfont-example/iconfont.woff') format('woff'),
       url('/fonts/iconfont-example/iconfont.ttf') format('truetype');
}

.iconfont {
  font-family: "iconfont" !important;
  font-size: 16px;
  font-style: normal;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
# 字体图标
矢量绘制的小图标，以字体的形式引入方便运用于需要调整颜色/改变大小的地方(可以像文字一样调整大小和颜色)。例如以下几个图标：
<div class='iconfont' style='font-size:30px;color:red;cursor: default;        
        -webkit-user-select: none;
        -webkit-touch-callout: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;'>&#xe606;&#xe607;&#xe608;&#xe609;&#xe60a;</div>
同时，为了避免复制这些字体图标粘贴到其它未设置该字体的地方导致乱码，我们可以将这里的鼠标样式设置为默认 / css禁止选择该段文本。
