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

# 像素
- 物理像素：屏幕的最小单位。屏幕上用于显示颜色的“点”
- 逻辑像素：计算机系统中用到的坐标，CSS中的px。逻辑像素的标准控制了在不同设备上的1px有相似的长度。譬如WPF中1px等于1/96英寸，而安卓端1px等于1/160英寸。
- DPR：设备像素比，CSS中的1px最终会渲染成多少屏幕上的物理像素。

## 两倍图
&emsp;&emsp;在电脑端1px等于1物理像素，即dpr=1；在手机端通常为了更细腻的显示效果，1px会渲染成多个物理像素。对于一张指定px大小的图片，在手机端会按照DPR放大造成模糊。因此，我们需要在移动端设备上使用二倍图。

### CSS属性：background-size
可选参数：
- cover：拉伸至完全覆盖区域
- contain：高度宽度等比例拉伸，当宽度、高度等于盒子的宽度、高度时不再拉伸了
- 百分比，以父盒子的百分比来缩放
- 只填入一个值一定是宽度，高度值省略，按照等比例缩放。

# 移动端开发选择
- 单独制作移动端页面
  - 通过判断设备，如果是移动端设备打开，就跳转到移动端界面
- 响应式兼容PC移动端
  - 通过判断页面宽度去决定布局
  - 缺点：兼容性问题

# 移动端技术解决方案
- CSS初始化 <code>normalize.css</code>
- 特殊样式
  - <code>-webkit-tap-highlight-color: transparent</code> 去除点击高亮
  - <code>-webkit-apperance: none</code> 按钮和输入框的自定义样式
  - <code>-webkit-touch-callout: none</code>禁用长按页面时的弹出菜单

# 流式布局（百分比布局）
- 通过盒子的宽度设置成百分比来根据屏幕的宽度伸缩，不受固定像素的限制，内容向两侧填充
- 是移动端web开发比较常见的布局方式
- 用max/min-width/hight确保盒子伸缩在合理范围内。

# flex布局
&emsp;&emsp;flex是flexible box的缩写，意为弹性布局，用来为盒装模型最大的灵活性，任何一个容易都可以指定为flex布局。<code>display: flex</code>
- 当我们为父盒子设置为flex布局以后，子元素的float、clear和vertical-align属性将失效
- 采用flex布局的元素，称为Flex容器(flex container)简称为容器，他得所有子容器成员，称为flex项目(flex item)，简称为“项目”

## 常见父项属性
- <code>flex-direction</code> 
  - 设置主轴方向，默认的主轴方向就是x轴方向，默认侧轴方向就是y轴方向
  - 属性值：row(默认)、row-reverse(从右到左)、column(从上到下)、column-reverse(从下到上)
- <code>justify-content</code>
  - 定义了项目在**主轴**上的对齐方式
  - 属性值：flex-start(从头开始)、flex-end(从尾部开始)、center(在主轴居中对齐)、space-around(平分剩余空间)、space-between(先两边贴边，再平分剩余空间)
- <code>flex-wrap</code>
  - 默认情况下，flex布局不换行
  - 属性值：no-warp(不换行)、wrap(换行)
- <code>align-content(换行)</code>
  - 控制子项在**侧轴**上的对齐方式，**单行下没有效果**
  - 属性值：参见justify-content
- <code>align-items(单行)</code>
  - 控制子项在**侧轴**上的对齐方式
  - 属性值：参见justify-content
- <code>flex-flow</code>
  - flex-direction和flex-wrap的复合写法

## 常见子项属性
- <code>flex</code>
  - 分配子项目的**剩余空间**，表示子项占多少份数
  - 属性值：数字(默认为0) 
- <code>align-self</code>
  - 单独控制某个项目沿侧轴上的对齐方式
- <code>order</code>
  - 定义项目的排列顺序
  - 属性值：数字(默认为0)，越小越靠前