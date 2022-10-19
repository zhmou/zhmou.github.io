---
title: 信号与系统——傅里叶变换公式的推导
date: 2020-10-25 09:25:24
tags: 信号与系统
categories: 学习
mathjax: True
typora-root-url: ..
---
{% note info %}
**本文内嵌有大量的数学符号、公式，为确保排版格式正确，推荐您使用电脑端查看这篇文章。**
{% endnote %}

对于在时域上满足**一定条件**的信号f(t)，我们可以通过傅里叶变换的公式将其转化为频域上的信号F(jω)：
$$
F(j\omega)=\int_{-\infty}^{+\infty}f(t)e^{-j\omega t}dt
$$
同时也可以通过傅里叶反变换的公式将其还原为时域上的信号：
$$
f(t)=\frac1{2\pi}\int_{-\infty}^{+\infty}F(j\omega )e^{j\omega t}dt
$$
通过这个数学工具，我们建立起了两个不同的角度间描述同一个信号的桥梁。而笔者在复习《信号与系统》的过程中，深刻认识到了它的重要性，因此决定记录下它的推导过程以加深理解。
<!--more-->


## 时域？频域？

**时域**是描述一个数学函数或者物理信号对时间的关系。在中学物理中，我们就知道声音的本质是物体振动所产生的波，就如同正弦波$f(x)=Asin(x+\phi)$那样，不过这里的自变量变成了时间$t$。在给定任意一个时间$t$的情况下，你都可以用函数表达式计算得到它的幅度与相位信息，即$f(t)$。

![时域与频域](/img/2020-10-25-Signals-Systems-Fourier/01.jpg)

在时域波形中，我们很容易进行两种基础的操作：通过改变$A$的值以改变振幅——换一个说法，你改变了音量的大小；或者改变$x$前的系数以改变频率，这样就改变了音乐的播放速度。

然而，如果音频中出现了不需要的噪声、又或者一首歌曲中，我们想要加强低音部分的人声又该如何处理呢？仅仅依靠时域繁复的波形图难以解决这些问题——因此我们需要引入另一个视角：**频域**。

世间千变万化的物质，其分子的组成都能在一张元素周期表上找到；红黄蓝三种色彩，却能绘出五彩斑斓的世界；而一首优美动人的歌曲，在简谱上呈现出来的只是几个数字。这种记谱符号正是我们从频域看待音乐的角度，例如音阶A4（即中央C上的A，唱名“la”（啦））就是440Hz的标准音高。同时域类似，**频域**是描述一个信号在不同频率上的关系，它改变了我们看待问题的视角：



<img src="/img/2020-10-25-Signals-Systems-Fourier/02.jpg" alt="tvf" style="zoom:50%;" />

一个在时间轴上显得“混乱不堪”的信号，在频域里则清晰明了。而上文所述的一些操作在频域中也是随手拈来：滤除噪声？去掉噪声所在频率的分量，加强低音？提升音乐的低频分量就好了，不是吗？

## 正交又是啥玩意儿？

同样是中学时代，我们学会了将力这一矢量（向量）进行**正交**分解，分解到两个[^1]相互**正交**的方向上。在这个时候，正交就是（向量的）垂直。在三维空间中，正交依然意味着垂直的关系，但处在更高维度中，“垂直”的几何关系我们没有直接手段观测测量，我们又是如何理解的呢？

好在数学家们能够用数学手段去描述这种垂直——那就是内积（点积）。
$$
\begin{gathered}
\vec v_1 = \left[ \begin{matrix} x_1 \\\\ y_1 \end{matrix} \right]
\quad
\vec v_2 = \left[ \begin{matrix} x_2 \\\\ y_2 \end{matrix} \right]
\end{gathered}
$$
对于$\vec v_1$和$\vec v_2$这两个二维向量而言，内积的代数表达式为$\vec v_1\cdot\vec v_2 = x_1x_2 + y_1y_2$，而从几何的角度来看，内积的表达式为$\vec v_1\cdot\vec v_2 = \mid\vec v_1\mid\mid\vec v_2\mid\cos\theta$，这个运算可以理解为一个向量的模乘以另一个向量投影的模。当两向量垂直时，$cos\theta=cos90^\circ=0$，因此内积为0。啊哈，垂直就是两向量内积为0的特殊情况！

而正交就是对这种内积为0情形的抽象概括。一般的，对于任意两个n维实向量$\vec a$、$\vec b$，
$$
\begin{gathered}
\vec a = \left[ \begin{matrix} a_1 \\\\ a_2 \\\\ \vdots \\\\ a_n \end{matrix} \right]
\quad
\vec b = \left[ \begin{matrix} b_1 \\\\ b_2 \\\\ \vdots \\\\ b_n \end{matrix} \right]
\end{gathered}
$$
有$\vec a\cdot\vec b = a_1b_1 + a_2b_2 + \cdots + a_nb_n = \sum_{i=1}^{\infty}a_ib_i$，若其内积为0，则称这两个向量是正交的。

现在，我们再来对**内积**这个概念进行推广。对于两个在区间$[a,b]$上的实变函数$f(x)$和$g(x)$，假设将其分割成宽度为$\Delta x$的若干子区间。考虑存在这样两个向量：
$$
\begin{gathered}
\vec f = \left[ \begin{matrix} f(a) \\\\ f(\Delta x) \\\\ \vdots \\\\ f(a+k\Delta x) \end{matrix} \right]
\quad
\vec g = \left[ \begin{matrix} g(a) \\\\ g(\Delta x) \\\\ \vdots \\\\ g(a+k\Delta x) \end{matrix} \right]
\end{gathered}
$$
则其内积：

$\vec f\cdot\vec g = f(a)g(a)\Delta x + f(\Delta x)g(\Delta x)\Delta x + \cdots + f(a+k\Delta x)g(a+k\Delta x)\Delta x = \sum_{i=1}^{k}f(a+i\Delta x)g(a+i\Delta x)\Delta x$[^2]

当$\Delta x\rightarrow0$时，就得到了函数内积的表达式$f(x){\cdot}g(x) = \int_a^bf(x)g(x)dx$。类比向量的正交，当积分的结果为0时，我们可以说这两个函数**在区间$[a,b]$上正交**。

实际上，函数之所以能和向量进行类比是因为函数也具有向量的性质：

函数相加类比向量的加法：
$$
f+g=\left[ \begin{matrix} f(x_1) \\\\ f(x_2) \\\\ \vdots \\\\ f(x_n)  \end{matrix} \right]+
\left[ \begin{matrix} g(x_1) \\\\ g(x_2) \\\\ \vdots \\\\ g(x_n)  \end{matrix} \right] = \left[ \begin{matrix} f(x_1)+g(x_1) \\\\ f(x_2)+g(x_2) \\\\ \vdots \\\\ f(x_n)+g(x_n)  \end{matrix} \right]
$$
函数与实数相乘对应向量的数乘：
$$
af=a\left[ \begin{matrix} f(x_1) \\\\ f(x_2) \\\\ \vdots \\\\ f(x_n)  \end{matrix} \right] = \left[ \begin{matrix} af(x_1) \\\\ af(x_2) \\\\ \vdots \\\\ af(x_n)  \end{matrix} \right]
$$
因而从某种意义上说，函数也可以抽象为向量看待。在此，我推荐3Blue1Brown的[这个视频](https://www.bilibili.com/video/BV1ps41147Z5)来更直观地展现向量与函数的相似性以及对*向量是什么*这个问题的回答。

但是还没完呢！我们还能将**正交、内积**的概念继续向复平面里的向量与复函数推广，在复平面中，我们把内积[^3]定义为：
$$
<\vec x,\vec y>=\sum_{i=1}^n x_i{y_i}^*
$$
即前者向量中的各元素乘以后者向量中各元素的共轭（即虚部取反）[^4]

同样的，复向量的内积同样可以推广到复函数上：
$$
<f,g>=\int_a^bf(t)\overline{g(t)}dt
$$
而正交，同样是这些内积为0的特殊情况。至此，我们已经详细介绍了内积与正交的基础知识，它们很快就将应用到下一节的学习中。

[^1]: 中学物理一般只考察力在二维平面的分解
[^2]:$\Delta x$可看作子区间的**权重**，实际上$f(a)$与$g(a)$代表了$[a,a+\Delta x]$这段子区间上所有函数的值，因此在每一项后面乘以$\Delta x$
[^3]:此处指Hermitian inner product，厄米特内积。
[^4]:这样定义的一大目的是使得一个向量与自己的内积——几何意义上而言——向量模的平方是个正**实数**（满足正定性）。
[^5]:指泰勒公式展开，一定条件：带佩亚诺余项的n阶泰勒公式要求展开点处n阶可导。
[^6]:实际上，任意n个线性无关的n维向量都能张成n维空间，我们选取正交因为它具有更好的性质。

[^7]: 离散分立的频率用大写希腊字母$n\Omega$表示，连续的频率用小写希腊字母$\omega$表示，实际上含义是一致的。

## 三角傅里叶级数

### 引入

对于任意一个多项式函数，我们可以发现*堆砌组成*它的*原材料*是$\mathbb \\{1,x,x^2,...,x^n\\}$。譬如多项式$y=x^3+3x^2+2x$，它由1个$x^3$，3个$x^2$和2个$x$构成。
![多项式函数的组成](/img/2020-10-25-Signals-Systems-Fourier/03.jpg)
就如同厨师烧菜一样，在知道了配方中每一项*原材料*系数的情况下，就可以还原出一道美味来。甚至借助于这些幂函数，在满足一定条件的前提下，我们可以在某点邻域内无限逼近另一些非多项式函数。[^5]

向量中也有如出一辙的想法。选定两个正交[^6]的向量，通过线性组合可以构成整个平面（二维）空间中的任意一个向量。如图所示，选定x、y坐标轴方向上的彼此正交的两个单位向量$\vec u$、$\vec v$来表示$\vec w$：

![例子](/img/2020-10-25-Signals-Systems-Fourier/04.png)
$$
\vec w = 5\vec u + 3\vec v
$$
在上一节中，我们提到函数与向量的相似性。借着这样一个思路，我们不禁考虑：是否能找出一组在某个区间上彼此正交的函数，使得定义在该区间上的其他函数也能被正交函数的线性组合所表示呢？

答案是肯定的，如同二维平面空间中的任意一个向量可由两个正交向量表示，三维空间中的向量由三个两两正交的向量一样。类比为无穷多维向量的函数自然需要无穷个彼此正交的函数表示。这些构建起复杂函数的基石被我们称作**正交函数族（集）**。

不难证明，以下这些函数在区间$[-\pi,\pi]$上是彼此正交的：
$$
\mathbb \\{1,sin\ x,sin\ 2x,...,sin\ nx,..., cos\ x,cos\ 2x,...,cos\ nx\\}
$$
证明如下：

对于1与余弦或正弦函数之间的正交性：
$$
\begin{align*}
&\int_{-\pi}^{\pi}1\cdot{cos\ nxdx} = {sin\ nx\over n} =0\\\\
&\int_{-\pi}^{\pi}1\cdot{sin\ nxdx} = -{cos\ nx\over n} =0
\end{align*}
$$
三角函数之间的正交性：
$$
\begin{align*}
&\int_{-\pi}^{\pi}cos \ nx\cdot{sin\ mxdx} = {1\over2}\int_{-\pi}^{\pi}[sin \ (m+n)x+{sin\ (m-n)x]dx}=0 \\\\
&\int_{-\pi}^{\pi}cos \ nx\cdot{cos\ mxdx} = {1\over2}\int_{-\pi}^{\pi}[cos \ (n+m)x+{cos\ (n-m)x]dx}=0,m\not=n\\\\
&\int_{-\pi}^{\pi}sin \ nx\cdot{sin\ mxdx} = {1\over2}\int_{-\pi}^{\pi}[cos \ (n-m)x-{cos\ (n+m)x]dx}=0,m\not=n
\end{align*}
$$


经过压缩或者拉伸，上述函数在区间$[-{T\over2},{T\over2}]$同样是彼此正交的：
$$
\mathbb \\{1,sin\ \Omega x,sin\ 2\Omega x,...,sin\ n\Omega x,..., cos\ \Omega x,cos\ 2\Omega x,...,cos\ n\Omega x\\},\ 其中\Omega ={2\pi\over T}
$$
因此，对于同样定义在区间$[-{T\over2},{T\over2}]$上的函数$f(x)$，我们便可以考虑写作以上这些正交函数的线性组合。而这种展开形式的猜想，即**任何连续周期信号可以由一组适当的正弦曲线组合而成**，最早由法国科学家**傅里叶**提出，因此我们将这种展开式称作**三角傅里叶级数**。
$$
f(x)=B_0+\sum_{n=1}^\infty(a_ncos\ n\Omega x+b_nsin\ n\Omega x)
$$
我们突破了小小的一步，但是更为关键的问题是，如何计算这些系数呢？

### 计算

**几何思路**

兜兜转转，我们又回到了直观的几何上。仍以上面的$\vec u$、$\vec v$、$\vec w$为例，计算一个$\vec w$需要多少$\vec u$和$\vec v$就是计算投影在相应向量上的倍数：

![投影](/img/2020-10-25-Signals-Systems-Fourier/05.png)

如图所示，假设$\vec w$投影于$\vec u$上的向量$\vec w_1=\lambda\vec u$，则$\vec w-\lambda\vec u = \vec{DE}$，而这个向量垂直于$\vec u$。也就是说$<\vec u,\vec w-\lambda\vec u>=0$，对线性代数稍有了解的人就能计算出：
$$
\begin{align*}
&{\vec u}^T(\vec w-\lambda\vec u)=0\\\\
&\lambda={ {\vec u}^T\vec w\over\vec u^T\vec u}={<\vec u,\vec w>\over<\vec u,\vec u>}
\end{align*}
$$
就这样，正交向量的系数就以内积的形式表达出来。依此类推，函数内积的系数也可以被我们表达出来。

$B_0$是$f(t)$在1上的*投影*：
$$
B_0 = {\int_{-{T\over2} }^{T\over2}1\cdot f(t)dt\over\int_{-{T\over2} }^{T\over2}1\cdot 1dt}={1\over T}\int_{-{T\over2} }^{T\over2} f(t)dt
$$
$a_n$是$f(t)$在$cos\ n\Omega t$上的*投影*：
$$
a_n = {\int_{-{T\over2} }^{T\over2}cos\ n\Omega t\cdot f(t)dt\over\int_{-{T\over2} }^{T\over2}cos^2n\Omega tdt}={2\over T}\int_{-{T\over2} }^{T\over2} f(t)cos\ n\Omega tdt
$$
(分母的计算：$\int_{-{T\over2} }^{T\over2}cos^2n\Omega tdt = {1\over2}\int_{-{T\over2} }^{T\over2}(2cos^2n\Omega t-1)dt+{1\over2}\int_{-{T\over2} }^{T\over2}1\ dt={T\over2}$)

$b_n$是$f(t)$在$sin\ n\Omega t$上的*投影*:
$$
b_n = {\int_{-{T\over2} }^{T\over2}sin\ n\Omega t\cdot f(t)dt\over\int_{-{T\over2} }^{T\over2}sin^2n\Omega tdt}={2\over T}\int_{-{T\over2} }^{T\over2} f(t)sin\ n\Omega tdt\\\\
$$
分母的计算与上面相似，不再赘述。

**积分思路**

对于等式$f(t)=A_0+\sum_{n=1}^\infty(a_ncos\ n\Omega t+b_nsin\ n\Omega t)$，将其逐项对$[-{T\over2},{T\over2}]$进行积分，有

$$
\begin{align*}
\int_{-{T\over2} }^{T\over2} f(t)dt &= TB_0+\sum_{n=1}^\infty(a_n\int_{-{T\over2} }^{T\over2}cos\ n\Omega tdt+b_n\int_{-{T\over2} }^{T\over2}sin\ n\Omega tdt)\\\\
&由三角函数的正交性可知，后面积分项的值为0\\\\
&=TB_0\\\\
故B_0&={1\over T}\int_{-{T\over2} }^{T\over2} f(t)dt
\end{align*}
$$

若在等式两侧同时乘以$cos\ m\Omega t$再进行积分，则有

$$
\int_{-{T\over2} }^{T\over2} f(t)cos\ m\Omega tdt = B_0\int_{-{T\over2} }^{T\over2}cos\ m\Omega tdt+\sum_{n=1}^\infty(a_n\int_{-{T\over2} }^{T\over2}cos\ n\Omega t\cdot cos\ m\Omega tdt+b_n\int_{-{T\over2} }^{T\over2}sin\ n\Omega t\cdot cos\ m\Omega tdt)
$$

由三角函数的正交性，
$$
\begin{align*}
&\int_{-{T\over2} }^{T\over2}cos\ m\Omega tdt = 0\\\\
&\int_{-{T\over2} }^{T\over2}cos\ n\Omega t\cdot cos\ m\Omega tdt = 0(n\not=m)\\\\
&\int_{-{T\over2} }^{T\over2}sin\ n\Omega t\cdot cos\ m\Omega tdt=0
\end{align*}
$$

而n = m时，有

$$
\begin{align*}
&\int_{-{T\over2} }^{T\over2}cos^2n\Omega tdt = {T\over2}\\\\
故&\int_{-{T\over2} }^{T\over2} f(t)cos\ m\Omega tdt = a_n\cdot {T\over2}\\\\
&a_n={2\over T}\int_{-{T\over2} }^{T\over2} f(t)cos\ n\Omega tdt
\end{align*}
$$

同理，在等式两侧乘以$sin\ m\Omega t$再积分可得$b_n$，此处略去具体过程，直接给出结果。

$$
b_n = {2\over T}\int_{-{T\over2} }^{T\over2} f(t)sin\ n\Omega tdt
$$

**小结**

现在让我们再重复一次所得到的结果：
$$
\begin{align*}
&f(t)=B_0+\sum_{n=1}^\infty(a_ncos\ n\Omega x+b_nsin\ n\Omega x)\\\\
&其中:\\\\
&B_0 = {1\over T}\int_{-{T\over2} }^{T\over2} f(t)dt\\\\
&a_n ={2\over T}\int_{-{T\over2} }^{T\over2} f(t)cos\ n\Omega tdt\\\\
&b_n = {2\over T}\int_{-{T\over2} }^{T\over2} f(t)sin\ n\Omega tdt
\end{align*}
$$
考虑到$B_0 = 2a_0$，于是傅里叶级数可写作：
$$
f(t)={a_0\over2}+\sum_{n=1}^\infty(a_ncos\ n\Omega t+b_nsin\ n\Omega t)
$$


继续&合并同频率的三角函数，又可以得到：
$$
\begin{align*}
f(t)&={a_0\over2}+\sum_{n=1}^\infty\sqrt{ {a_n}^2+{b_n}^2}(cos\ n\Omega t\cdot {a_n\over\sqrt{ {a_n}^2+{b_n}^2}}-sin\ n\Omega t\cdot {-b_n\over\sqrt{ {a_n}^2+{b_n}^2}})\\\\
&={a_0\over2}+\sum_{n=1}^\infty A_ncos(n\Omega t + \phi_n)\\\\
其中A_n&=\sqrt{ {a_n}^2+{b_n}^2}\\\\
\phi_n&=-arctan({b_n\over a_n})\\\\
\end{align*}
$$
(根据$a_{-n} = a_n,b_{-n}=-b_n$，可以得知$A_{-n}=A_n,\phi_{-n}=-\phi_n$,这一结论将帮助我们推导下一小节的内容)

其中$a_n$、$b_n$被称作**傅里叶系数**现在，我们可以用不同频率、相位、强度的*原材料*——余弦函数的叠加来逼近定义在$[-{T\over2},{T\over2}]$区间上的一些函数啦！咦？余弦函数具有周期性，那么叠加出来的函数同样具有周期性呢！所以，我们得出了这样一个结论：

<div style="text-align:center;"><font color = red size = 5>周期函数可由一个序列的正弦（余弦）型函数叠加得到。</font></div>

来试试看吧！以下就是用一组正弦函数叠加得到的周期函数$y = x(-\pi<x<\pi)$，其傅里叶展开式为$2\sum_{n=1}^\infty{(-1)}^{n-1}{sin\ nx\over n}$

![叠加](/img/2020-10-25-Signals-Systems-Fourier/06.jpg)

我们可以看到，当n仅仅取到5时，所得到的结果就比较趋近于锯齿波了。看来，“我们的研究成果”还是挺有用的。

附：绘图用的Matlab代码

```matlab
t = -3*pi:0.01:3*pi;
y = pi*sawtooth(t-pi);
y1 = 2*(sin(t));
y2 = 2*(sin(t) - (sin(2*t))/2);
y3 = 2*(sin(t) - (sin(2*t))/2+(sin(3*t))/3);
y4 = 2*(sin(t) - (sin(2*t))/2+(sin(3*t))/3-(sin(4*t))/4);
y5 = 2*(sin(t) - (sin(2*t))/2+(sin(3*t))/3-(sin(4*t))/4+(sin(5*t))/5);
a = subplot(3,2,1);plot(a,t,y);title('y=x')
b = subplot(3,2,2);plot(b,t,y1);title('y=2sinx')
c = subplot(3,2,3);plot(c,t,y2);title('y=2(sinx-sin2x/2)')
d = subplot(3,2,4);plot(d,t,y3);title('y=2(sinx-sin2x/2+sin3x/3)')
e = subplot(3,2,5);plot(e,t,y4);title('y=2(sinx-sin2x/2+sin3x/3-sin4x/4)')
f = subplot(3,2,6);plot(f,t,y5);title('y=2(sinx-sin2x/2+sin3x/3-sin4x/4+sin5x/5)')
axis([a b c d e f],[-10 10 -4 4])
```



## 欧拉公式与指数傅里叶级数

借助于欧拉公式$e^{ix}=cosx+isinx$，我们可以得到$cosx={1\over2}(e^{ix}+e^{-ix})$。

将上一节中得到的$f(t)$进行变形——
$$
\begin{align*}
f(t)&={a_0\over2}+\sum_{n=1}^\infty A_ncos(n\Omega t + \phi_n)\\\\
&={a_0\over2}+{1\over2}\sum_{n=1}^\infty A_n[e^{j(n\Omega t + \phi_n)}+e^{-j(n\Omega t + \phi_n)}]\cdots 信息学中常用j表示虚数，避免与电流i混淆。\\\\
&={a_0\over2}+{1\over2}\sum_{n=1}^\infty A_ne^{j(n\Omega t + \phi_n)}+A_{-n}e^{ {j[(-n)\Omega t}+\phi_{-n}] }\cdots 利用上一节中给出的A_n与\phi_n的奇偶性。\\\\
&={a_0\over2}+{1\over2}[\sum_{n=1}^\infty A_ne^{j(n\Omega t + \phi_n)}+\sum_{n=-1}^{-\infty} A_ne^{j(n\Omega t + \phi_n)}]\\\\
&=\sum_{n=-\infty}^\infty {1\over2}A_ne^{j(n\Omega t + \phi_n)}\cdots A_0 = a_0, \phi_0 = 0
\end{align*}
$$
这样，我们又得到了一个以$\{1,e^{j\Omega t},e^{2j\Omega t},...e^{nj\Omega t},...\}$为正交函数集的傅里叶级数，我们把它叫做**指数傅里叶级数**。

它的**傅里叶系数**$\dot F_n$为复函数的形式，表达式为：
$$
\begin{align*}
\dot F_n &= {1\over2}A_n e^{j\phi_n}\\\\
&= {1\over2}(A_ncos\phi_n+jA_nsin\phi_n)={1\over2}(a_n-jb_n)\\\\
&= {1\over T}\int_{-{T\over2} }^{T\over2} f(t)(cos\ n\Omega t - jsin\ n\Omega t)dt\\\\
&= {1\over T}\int_{-{T\over2} }^{T\over2} f(t)e^{-jn\Omega t}dt
\end{align*}
$$
**注意**那个$e^{-jn\Omega t}$上的负号！从计算内积的方法来看，函数与$e^{jn\Omega t}$的内积恰好是后者取共轭，所以这和三角傅里叶展开的思路是一致的。

将$e^{j\phi_n}$用欧拉公式展开，这个复矢量的*活动轨迹*就是复平面上的单位圆，因此$\dot F_n$也可写作模与幅角的形式：$\dot F_n=|F_n|e^{j\phi_n}$。

## 从周期到非周期——T→∞

非周期的信号不能用傅里叶级数来表示，但是可以利用相同的思路进行一样的分析。当周期$T$无限增大时，周期信号就能转化成非周期的单脉冲信号。而展开的一组正弦（余弦）信号之间频率的差值$\Omega$就越小——直到离散的频率分量变得连续。对上一节中的$\dot F_n$进行分析，当$T\rightarrow\infty$时，傅里叶系数趋于0，然而将上式两边同乘以$T$，它就变成了$\omega$[^7]相关的一个函数——$F(j\omega)$，取极限可得到$\lim_{T\rightarrow\infty}\dot F_nT=\lim_{\Omega\rightarrow0}2\pi\dot {F_n\over \Omega}$，$\dot {F_n\over \Omega}$表示了某个单位频率带宽内信号的强度（频谱值），因此称之为频谱密度函数——简称频谱函数。现在，我们终于推得了开头写下的第一个式子：
$$
F(j\omega)=\lim_{T\rightarrow\infty}\dot F_nT=\int_{-\infty}^{+\infty}f(t)e^{-j\omega t}dt
$$
反过来，对于$f(t)$的指数傅里叶级数展开
$$
\begin{align*}
f(t)&=\sum_{n=-\infty}^\infty {1\over2}A_ne^{j(n\Omega t + \phi_n)}\\\\
&=\sum_{n=-\infty}^\infty \dot F_ne^{jn\Omega t}\\\\
&=\sum_{n=-\infty}^\infty \dot {F_n\over\Omega}e^{jn\Omega t}\Omega\\\\
\end{align*}
$$
当$T\rightarrow\infty$时，相邻频率的间隔由$\Omega变为d\omega$,而离散分立的频率$n\Omega$变为了$\omega$,无穷多项求和转化为了积分，于是有：
$$
f(t)=\int_{-\infty}^{+\infty}{F(j\omega )\over2\pi}e^{j\omega t}dt=\frac1{2\pi}\int_{-\infty}^{+\infty}F(j\omega )e^{j\omega t}dt
$$

以上，就是推出的第二个式子。基于这两个积分，我们可以做出$f(t)\leftrightarrow F(j\omega)$的相互转换，前者就是**傅里叶变换**，而后者我们称为**傅里叶反变换**，从而在时间域的视角与频率域的视角间相互转换，将一些复杂的操作简单化。

## 总结

在傅里叶变换与反变换的基础上，结合其在频域实际的物理意义，在连续时间系统上有着广泛的应用——从简化求解电路的微分方程，到通信基础技术：调制与解调，它是变换域分析法的基石。在下期之中——如果有的话——我们会探讨这一变换的性质，以及给出常见信号的傅里叶变换对，甚至我们还可以研究它的在生活中的实际应用。啊~不知你是否看见了我在第一句话里提到的**一定条件**呢？没错，它也是不是放之四海而皆准、对任意信号都能使用的方法，这为下一个变换域的诞生埋下了伏笔，我们会在更远的将来提到它。
