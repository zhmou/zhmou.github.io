---
title: 一个实现注册、激活的软件Demo
date: 2021-10-31 15:08:38
tags: [Python, 编程, RSA算法, 软件注册]
categories: 学习
typora-root-url: ..
---
{% note warning %}
2022 / 10 / 19 说明：本文仍为未完成状态，且后续很长一段时间内将不会进一步完善此文。请谨慎阅读这篇文章。
{% endnote %}

&emsp;&emsp;一般而言，我的需求大多来自实验室，这次也不例外。由于实验室经常承接某些外包的横向项目，因此实验室需要一个能对项目软件进行加密注册的功能以期实现售卖激活码的方式收费盈利。实验室里之前本来就有这玩意儿，但其由C++实现得即为复杂，加之多年来删改维护，让我第一次直观体会到了“屎山”的威力。于是我觉得还不如自己写个Python的Demo玩玩，所谓“功在当代，利在千秋”是也。

&emsp;&emsp;GitHub项目地址：[https://github.com/zhmou/RegisterDemo](https://github.com/zhmou/RegisterDemo)

<!--more-->

## 构建模型

&emsp;&emsp;<del>稍有常识的人就能看出</del>……反正对于有经验的网友而言，尽管软件注册有着本地注册、网络激活、激活码等等不同的形式，但本质上大多都万变不离其宗：软件读取一段指定的加密信息用于激活（授权），并确保该信息不能（或者几乎不能）被伪造（用于重复激活多台设备或者是伪装激活）。序列号+激活码就是这样一种常见的模式：

图片待补，反正是一张描述软件注册流程的图片。

&emsp;&emsp;由图可知，我们要实现的需求有以下几条：
&emsp;&emsp;**客户端Client**
&emsp;&emsp;①读取机器信息：生成唯一的机器设备标识（序列号）
&emsp;&emsp;②判断注册状态：对于未注册的软件，则不允许使用该软件；判断注册信息是否异常
&emsp;&emsp;③注册：结合上一步，对于未注册的软件，输入激活码注册，比对激活码是否与该设备的序列号匹配：匹配则生成对应注册信息，不匹配则提示错误。对于已注册的软件，防止重复注册。
&emsp;&emsp;④时间信息读写：启动程序时，判断注册状态，注册则读取激活剩余时间，每隔相应的时间对注册信息进行修改，直到剩余时间为0则删除注册信息（或者写入已过期的提示信息）

&emsp;&emsp;**服务器端Client**
&emsp;&emsp;输入序列号，自动生成对应的激活码

&emsp;&emsp;总之，这些东西的难度并不是很大，接下来将每一个提到的需求分别在客户端和服务端实现就好。

## 唯一设备标识码UUID

&emsp;&emsp;目前，本项目采取的方式是调用命令行显示主板统一规范的smBIOS信息：

&emsp;&emsp;<code>CURRENT_MACHINE_ID = subprocess.check_output('wmic csproduct get uuid').decode().split('\n')[1].strip().replace('-', '')</code>

&emsp;&emsp;直接调用命令行显示结果如下：
![命令行](/img/A-Register-Toy-Demo/01.png)

&emsp;&emsp;在后面进行了一系列操作如<code>.spilt('\n')[1]</code>（取出以换行符为分割的元素），<code>.strip()</code>（去掉首尾的空格），<code>.replace('-', '')</code>（把连字符-去掉）等，最终生成了一个32位十六进制的字符串作为软件注册时机器的识别编码。

### 其他方式获取标识码

&emsp;&emsp;上述方法的好处是调用简单，但是也留下了我曾忽视的隐患（当然是我自己的锅= =）：激活码在客户端只会与UUID进行匹配，激活码可能重复激活。之前的屎山代码里不仅根据机器特征，同时会根据时间生成一个序列号，因此避免了同一个激活码重复激活的可能。
&emsp;&emsp;根据我的检索，Python中<code>uuid.getnodes()</code>或许可以满足我的要求，当然效果具体如何得等到我的实验验证啦。

## 核心：RSA加密算法

&emsp;&emsp;如何针对序列号生成一段加密序列，使得软件能还原出激活信息？我最初的想法很简单：服务端对序列号进行加密，客户端进行相同的加密方式，两者匹配上即视为注册成功。但是这样存在一个问题：倘若具备一定反编译能力的人找到了客户端里隐藏的加密算法，那就等同于掌握了注册机——他能算出任意序列号对应的激活码，而这就对我们极为不利了。

&emsp;&emsp;好在数学的发展让我们有了非对称加密的概念：

{% blockquote Wikipedia https://zh.wikipedia.org/wiki/%E5%85%AC%E5%BC%80%E5%AF%86%E9%92%A5%E5%8A%A0%E5%AF%86 公开密钥加密 %}
公开密钥密码学（英语：Public-key cryptography）也称非对称式密码学（英语：Asymmetric cryptography）是密码学的一种算法，它需要两个密钥，一个是公开密钥，另一个是私有密钥；公钥用作加密，私钥则用作解密。
{% endblockquote %}
<br>
&emsp;&emsp;除了加解密之外，非对称加密还具有数字签名的作用：采用私钥进行签名，公钥验证签名。于是我们可以用考虑在服务端用私钥来生成我们的激活码，而在客户端用公钥进行验证，这样两个密钥分离的形式就能免除上述说法提到的风险。

&emsp;&emsp;RSA算法就是一种知名的非对称加密算法，它基于大数因式分解的困难程度保证了安全性，以及拓展欧几里得算法快速求解不定方程的便捷使其具有可实现性。尽管我不甚理解算法的原理，但是根据步骤使用Python则很容易，RSA公钥、密钥生成步骤按照网上的说明如下：

{% blockquote %}
①随机选择两个不相等的质数p和q。
②计算n = p\*q（一般地，n(base 2)的长度被建议达到2048bit以达到要求的安全性）
③计算n的欧拉函数φ(n)=(p-1)(q-1)
④选择整数e满足1<e<φ(n)，且e与φ(n)互质(通常选择65536)
（之前想了很久还在想万一65536与φ(n)不互质咋办……现在想想，直接重选呗！判断互质直接用辗转相除法就行啦）
⑤计算e对于φ(n)的模反元素d，即ed / φ(n) 的余数 是 1
⑥将n和e封装成公钥对，n和d封装成私钥对，并销毁p、q
{% endblockquote %}

&emsp;&emsp;本项目用到的签名与验签的步骤则要用到大数幂取模的快速算法：签名信息 = 待签名信息 ^ d % n；原信息 = 签名信息 ^ e % n

{% note warning %}
提示：待加密信息长度不能超过n的长度。
{% endnote %}

&emsp;&emsp;整个核心部分密钥生成的代码参见此处：https://github.com/zhmou/RegisterDemo/blob/main/src/keygen.py

### 模反元素d的计算——扩展欧几里得算法

&emsp;&emsp;欧几里得算法即辗转相除法：给定两个数a、b，计算 a ÷ b 的余数 a % b，并以此作为新的除数计算 b ÷ a % b，直到能够整除没有余数为止。这时候最后一项除法式子的被除数就是原来给定两数a、b的最大公约数（公因数，greatest common divisor）。Python实现如下：

```python gcd(a,b)
def gcd(a, b):
    if b == 0:
        return a
    else:
        return gcd(b, a % b)
```

&emsp;&emsp;而扩展欧几里得算法则是用来求ax + by = gcd(a,b)的整数解x、y，而模反元素d是求ed + kφ(n) = 1的整数解d（考虑到e与φ(n)互质, gcd(e,φ(n))=1），所以d可以通过扩展欧几里得算法来计算，原理及Python实现如下：

&emsp;&emsp;原理:设a>b
&emsp;&emsp;当b=0时,gcd(a,0)=a,对于a=ax+0y,容易得到其正整数解x=1,y=0
&emsp;&emsp;当b!=0时,设:
&emsp;&emsp;&emsp;&emsp;ax1 + by1 = gcd(a,b)
&emsp;&emsp;&emsp;&emsp;bx2 + (a%b)\*y2 = gcd(b,a%b)
&emsp;&emsp;根据辗转相除法的原理有 gcd(a,b) = gcd(b,a%b);两式联立得:
&emsp;&emsp;&emsp;&emsp;ax1 + by1 = bx2 + (a%b)\*y2
&emsp;&emsp;而a%b可写作 a - (a//b) \* b (其中"//"为整除),则有:
&emsp;&emsp;&emsp;&emsp;ax1 + by1 = bx2 + ay2 - (a//b)\*by2
&emsp;&emsp;比对系数可得:
&emsp;&emsp;&emsp;&emsp;x1 = y2
&emsp;&emsp;&emsp;&emsp;y1 = x2 - (a//b)\*y2

&emsp;&emsp;由此可知，方程gcd(a, b) = ax1 + by1的解可用gcd(b, a%b) = bx2 + (a%b)y2表示，
&emsp;&emsp;构成了类似欧几里得算法的递归，下述函数即通过递归的方式实现了拓展欧几里得算法。

```python extend_gcd()
def extend_gcd(a, b):
    if b == 0:
        x1 = 1
        y1 = 0
        x = x1
        y = y1
        return x, y
    else:
        x1, y1 = extend_gcd(b, a % b)
        x = y1
        y = x1 - a // b * y1
        return x, y
```

### 快速幂取模算法

&emsp;&emsp;**施工中**

## 其它tricks

### 进制转换：压缩激活码长度

&emsp;&emsp;在RSA加密算法中，我们实际上是对十进制数字进行签名处理。尽管UUID是十六进制字符串，但Python内自带的函数就能将其转换为十进制数字进行签名或者验签。然而只要你尝试过签名函数，结果会发现它生成的十进制数字签名长得难以想象，因此我进行了折中处理：一方面缩短n的长度来牺牲其安全性以换取长度的缩短。另一方面对于其十进制签名，我们可以将其转换为62进制（用0-9、a-z以及A-Z来表示）来压缩其长度，这部分代码就需要自身实现了，其思路是以十进制为桥梁，先将自身进制转换为十进制，再转换到目标进制。

&emsp;&emsp;进制转换的代码参见此处：https://github.com/zhmou/RegisterDemo/blob/main/src/baseconvert.py

### 添加时间信息

&emsp;&emsp;思路没啥特别的，就是对待签名信息的指定位置上添加激活时长，我的方法是激活时长（天数）格式化为四位：如 30天 -> 0030，字符串拼接在待签名信息的后面，这样激活的时候读取到该字符串就能正确初始化注册信息文件里的时间了。

### PyQt5的可视化与多线程处理

&emsp;&emsp;**施工中**
