---
title: 品优购项目：踩坑细节记录
date: 2022-10-19 23:29:15
tags: [HTML, CSS, Javascript, 编程]
categories: 项目
---
{% note info %}
这篇文章仍处在更新当中。
{% endnote %}

# SEO优化
&emsp;&emsp;对于一个营利性网站而言，提升其在搜索引擎中的排名至关重要。除去直接付费的竞价排名外，搜索引擎优化（Search Engine Optimization）也是不可或缺的一环。

## TDK三大标签

- <code>&lt;title&gt;</code>标签，网站标题：内页的第一个重要标签 
    - 建议：**网站名 - 网站的介绍（不超过30汉字）**
- <code>description</code> 网站说明
    - **简要说明网站是做什么的**
- <code>keywords</code> 关键字
    - **keywords是页面关键词，是搜索引擎的关注点之一**
    - **最好限制为6 ~ 8个关键词，且之间用英文逗号隔开**

``` HTML 品优购网站的三大标签
<title>品优购商城 - 网络购物最佳选择，物美价廉，免费配送，一站式服务为您提供优秀购物体验！</title>
    <meta name="description"
        content="品优购商城 - 专业的综合网上购物商城，销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品。便捷、诚信的服务，为您提供愉悦的网上购物体验！" />
    <meta name="keywords" content="前端, HTML, CSS, 电商, 品优购商城, 静态界面">
```

## Logo优化
- logo里面首先放一个<code>&lt;h1&gt;</code>标签（**用于提权**）
- <code>&lt;h1&gt;</code>标签中插入链接<code>&lt;a&gt;</code>标签，返回首页
- 链接里面放文字（网站名称），但是为了视觉效果，文字不能显示出来（<code>font-size: 0</code>）
- 链接给一个<code>title</code>属性，鼠标放在Logo上可显示文字
<!-- more -->

## 注册界面
&emsp;&emsp;按照说法，注册界面一般不需要SEO优化。

# 一行内多个列表元素<code>&lt;li&gt;</code>超宽的问题
&emsp;&emsp;在某个页面布局时，经常会遇到列表元素宽度难以确定的问题。譬如，在宽度为1200px的版心中布置5个&lt;li&gt;元素很容易确定单个元素的宽度可以是240px，但是又要使得这些元素间插入四个外边距值margin则需要一番计算：这需要使得一行内n个&lt;li&gt;元素减少的总宽度(n的倍数，假设单个表单元素减少的宽度以1px为单位)恰好是(n-1)的倍数。
&emsp;&emsp;或者也可以控制一行的最后一个&lt;li&gt;元素，减少其宽度。当然这也需要一定的计算。但是，在实践中，对于一些对宽度不是那么敏感的&lt;li&gt;元素，可以考虑**增大其父级元素&lt;ul&gt;的宽度，直到对应数量的&lt;li&gt;元素可以在一行显示。**，此外，还需要**在&lt;ul&gt;的父级元素上设置<code>overflow: hidden</code>来隐藏列表中超宽的部分。**

# 层叠上下文相关
&emsp;&emsp;z-index在定位元素上生效，需要指定position:xxx

# tab分页栏的制作
&emsp;&emsp;首先，创建分页选项卡和对应数量的分页栏内容，我用&lt;li&gt;标签中的&lt;a&gt;元素作为选项卡，tab_list_item作为对应的分栏内容。首先，由于默认第一个选项卡激活，显示为红色。因此一开始显示第一个分栏的内容，其它分栏应用样式<code>display: none</code>来进行隐藏，其它选项卡文字颜色为灰色，代表未激活状态。
&emsp;&emsp;对于各个tab内的选项卡，我利用JS将它们赋予两个属性<code>setAttribute('which_tab / which_page')</code>，这样为这些选项卡绑定onclick事件时可以读取这些属性判断究竟是哪个tab内的选项卡被选中，再利用循环清除所有选项卡的红色样式，将被点击的选项卡添加红色样式。同时，也用循环为所有分栏设置<code>display: none</code>，根据读取到的which_page属性决定哪一页正常显示。

