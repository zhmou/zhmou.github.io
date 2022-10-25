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
- <code><title></code>标签，网站标题：内页的第一个重要标签 
    - 建议：**网站名 - 网站的介绍（不超过30汉字）**
- <code>description</code> 网站说明
    - **简要说明网站是做什么的**
- <code>keywords</code> 关键字
    - **keywords是页面关键词，是搜索引擎的关注点之一**
    - **最好限制为6 ~ 8个关键词，且之间用英文逗号隔开**

``` HTML 品优购网站的三大标签
<title>品优购商城 - 网络购物最佳选择，物美价廉，免费配送，一站式服务为您提供优秀购物体验！</title>
    <meta name="description"
        content="品优购商城 - 专业的综合网上购物商城，销售家电、数码通讯、电脑、家居百货、服装服饰、母婴、图书、食品等数万个品牌优质商品.便捷、诚信的服务，为您提供愉悦的网上购物体验！" />
    <meta name="keywords" content="前端, HTML, CSS, 电商, 品优购商城, 静态界面">
```
