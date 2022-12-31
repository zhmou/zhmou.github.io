---
title: 移动端开发学习
date: 2022-12-30 16:06:20
tags: [HTML, CSS, 前端, 移动端]
categories: 学习
---
# 视口
- 视口就是浏览器显示页面内容的屏幕区域
- 视口分为布局视口、视觉视口和理想视口
- 我们移动端布局想要的是理想视口就是手机屏幕有多宽，我们的布局视口就有多宽
- 想要理想视口，我们需要给我们的移动端页面添加meta视口标签

## meta视口标签
<code>&lt;meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"&gt;</code>
| 属性          | 解释                                       |
| ------------- | ------------------------------------------ |
| width         | viewport宽度，可以设置device-width等特殊值 |
| initial-scale | 初始缩放比                                 |
| maximum-scale | 最大缩放比                                 |
| minimum-scale | 最小缩放比                                 |
| user-scalable | 用户是否可缩放，yes no                     |