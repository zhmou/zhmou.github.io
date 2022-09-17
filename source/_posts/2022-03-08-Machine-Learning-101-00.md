---
title: 机器学习基础#00：Intro
date: 2022-03-08 13:22:21
tags: [机器学习, 编程]
categories: 学习
typora-root-url: ..
mathjax: True
---
<style>
table
{
    margin: auto;
}
</style>
&emsp;&emsp;决定对近期学习到的机器学习相关知识进行一次整理。

<!--more-->

&emsp;&emsp;免责声明：本人对机器学习领域所知甚少，所写博文为对前期所学知识的回顾，不确保其内容的真实性与准确性，不建议以此为基础进行学习。如有差错纰漏，欢迎指正。

## 什么是机器学习？

&emsp;&emsp;学习，就是从已有的经验（不论是亲自动手实践获得的，还是从书本上阅读得到的或者依赖老师教育所得到的）中获取知识的过程。机器学习也是类似的。如果让我下一个粗浅直接的定义，那就是：

{% blockquote Zh某 https://zhmou.github.io/2022/03/08/Machine-Learning-101-00/#more %}

从已有的样本（数据）中发现规律，并能够将其泛化应用于未知的（或者说：新的）样本上。

{% endblockquote %}

<br>

&emsp;&emsp;譬如，从数千张形态各异的标注好数字标签的手写数字图片中发现规律，并最终能够实现识别输入数字的功能。

![MNIST数据集图片识别](/img/2022-3-9-Machine-Learning-101/Figure_1.png)

<div align='center' style="font-size: 14px; color: grey">一个多分类全连接神经网络在MNIST数据集上的测试表现</div>

<br>

## 一个简单的例子

&emsp;&emsp;现在，我们有一组$x$与$y$如表所示：

|  x | y |
|:-: |:-:|
| 2  | 4 |
| 3  | 6 |
| 4  | ? |


&emsp;&emsp;对于这两者已知的数据，我们需要从中发现$y$与$x$的规律，并预测在$x$=4时$y$的预测值$\hat{y}$。

&emsp;&emsp;基于此，我们建立一个简单的线性模型：
![线性模型](/img/2022-3-9-Machine-Learning-101/Figure_2.png)

&emsp;&emsp;此外，我们还需要一个“打分”的函数来评估模型在当前样本（所谓样本，结合这个例子来说就是上述列表里的某一行）上的“优劣”，称作：Loss function（损失函数）。在全体样本上（或者一个mini-batch中的所有样本，关于mini-batch，后面会详细解释），又可称作cost function（代价函数）这里，我们选择用均方误差（Mean Squared Error，MSE）来作为代价函数：即loss为模型预测值与真实值差值的平方。

$$
loss={(\hat{y}-y)}^2
$$

&emsp;&emsp;大多数情况下，我们的目标是令代价函数的值尽可能的变小，即预测值接近真实值。

&emsp;&emsp;现在，我们随机地初始化一组$w$和$b$($w=1,b=1$)来计算损失函数loss的值：
&emsp;&emsp;$x=2$时，$\hat{y}=3$，则$\left.loss\right|\_{x=2}={(\hat{y}-y)}^2={(3-4)}^2=1$
&emsp;&emsp;$x=3$时，$\hat{y}=4$，则$\left.loss\right|\_{x=3}={(\hat{y}-y)}^2={(4-6)}^2=4$
&emsp;&emsp;在全体样本上的均方误差$cost = 5\div2=2.5$

&emsp;&emsp;我们把这个步骤称作“**前向运算**”/“**前馈运算**”，cost的值较大，表明随机初始化找到的参数并不能准确找到需要的规律。
&emsp;&emsp;在高中学习里，我们就已经知道，在一个连续光滑的函数上，当自变量沿着该点导数值的负方向移动一小段距离时，函数值会变小（如下图所示）。

<img src="/img/2022-3-9-Machine-Learning-101/Figure_3.png" alt="导数" style="float:center"/>

&emsp;&emsp;将其应用于我们的例子中：当我们将两个参数$w、b$沿着loss函数对其各自的偏导的负方向移动一小段距离后，loss函数的值会变小，进而在整体样本上cost函数的值也会变小。

&emsp;&emsp;根据链式求导法则：
$$
\frac{\partial{loss}}{\partial{w}}=\frac{\partial{loss}}{\partial{\hat{y}}}\cdot\frac{\partial{\hat{y}}}{\partial{w}}=2(\hat{y}-y)\cdot{x}
$$
&emsp;&emsp;(对b的偏导同理)

&emsp;&emsp;将前向运算中计算得到的$\hat{y}$和当前样本已知的$x、y$带入上述式子可得：
&emsp;&emsp;在$x=2$时，$\left.{\frac{\partial{loss}}{\partial{w}}}\right|\_{x=2}=−4$，$\left.{\frac{\partial{loss}}{\partial{b}}}\right|\_{x=2}=−2$
&emsp;&emsp;在$x=3$时，$\left.\frac{\partial{loss}}{\partial{w}}\right|\_{x=3}=-12$，$\left.\frac{\partial{loss}}{\partial{b}}\right|\_{x=3}=−4$

&emsp;&emsp;接下来，更新权重w与b的值，为了避免自变量变化得过大导致得不到我们想要得结果（如下图所示），我们需要控制自变量变化的步幅，即学习率（learning rate），此处设为lr = 0.04。

<img src="/img/2022-3-9-Machine-Learning-101/Figure_4.png" alt="导数" style="float:center"/>

$$
\begin{align*}
w'&=w-lr\cdot\frac{\partial{loss}}{\partial{w}}(avg.\ on\ all\ samples)\\\\
&=w- lr\cdot(\left.\frac{\partial{loss}}{\partial{w}}\right|\_{x=2}+\left.\frac{\partial{loss}}{\partial{w}}\right|\_{x=3})\div2\\\\
&=1-0.04\times(-4-12)\div2\\\\
&=1.32 
\end{align*}
$$

&emsp;&emsp;同理，$b$的值计算结果为：
$$
\begin{align*}
b'&=b-lr\cdot\frac{\partial{loss}}{\partial{b}}(avg.\ on\ all\ samples)\\\\
&=b-lr\cdot(\left.\frac{\partial{loss}}{\partial{b}}\right|\_{x=2}+\left.\frac{\partial{loss}}{\partial{b}}\right|\_{x=3})\div2\\\\
&=1-0.04\times(-2-4)\div2\\\\
&=1.12
\end{align*}
$$

&emsp;&emsp;如上述的这个过程，被称为“反向传播”。这样，我们便走完了神经网络训练的一个轮次（Epoch）。此时，重新计算预测值、loss与cost，更新权重后的结果为：

&emsp;&emsp;$x=2$时，$\hat{y}=3.76$，则$\left.loss\right|\_{x=2}={(\hat{y}-y)}^2={(3.76-4)}^2=0.0576$
&emsp;&emsp;$x=3$时，$\hat{y}=5.08$，则$\left.loss\right|\_{x=3}={(\hat{y}-y)}^2={(5.08-6)}^2=0.8464$
&emsp;&emsp;在全体样本上的均方误差$cost' = 0.452$

&emsp;&emsp;显然，更新后的模型比其更新前能够更好地把握样本数据间的内在规律。在这一轮次的基础上，我们还可以继续重复训练的过程，在经过第二次训练后，得到$w'=1.644$，$b'=1.236$

&emsp;&emsp;现在，对于例子开头提出来的问题，在经过两轮训练后，神经网络给出的$x=4$时的预测结果为:
$$
ŷ = 1.644\times4+1.236 = 7.812
$$

&emsp;&emsp;当反复训练后，cost的值趋近于零，在某个区间内呈现波动的时候，我们称这个网络**收敛**，而当cost值不再变小而且和0相去较远时，则可能陷入了局部最优解，或者是学习率过大导致无法收敛于全局最优解。

>**小结**
神经元：网络中负责某种基础运算的单元。例如本例中建模采用的$y=kx+b$就是一个基础的神经元。
神经网络训练的步骤：正向运算求Loss，反向计算求Loss对各个参数的偏导，依赖偏导对参数进行微小的调整。在本例中，反复以样本训练较好地逼近了结果。
**问题**：
多个线性神经元简单叠加，如两个神经元：$y = w_1(w_2x+b_2)+b_1 = w_1w_2x+w_1b_2+b_1$ ，仍与单个神经元效果相同，需要引入*非线性变换*才能较好的拟合非线性函数。

## 更复杂的例子

&emsp;&emsp;下方是某商品的评价及其人工标注的情感标签，试建立模型分析其中关系。
|  评价 | 情感标签 |
|  :-:  |   :-:   |
| “好看”|   正面  |
| “不好”|   负面  |
| “好”  |   正面  |
|“不好看”| 负面   |
|  ……   |   ……   |

&emsp;&emsp;由于神经网络只能接受数字化的输入并产生相对应的数字化输出，因此需要将这些样本转化成数据：

&emsp;&emsp;首先提取基本语素，在这个简单的任务中，共有三个字：{好，不，看}
&emsp;&emsp;对这三个字进行“**独热编码**”：
&emsp;&emsp;**好 = [1, 0, 0] 不 = [0, 1, 0] 看 = [0, 0, 1]**
&emsp;&emsp;输入样本的向量即为各个字符编码的相加，例如：
&emsp;&emsp;**好看 = [1, 0, 1] 不好 = [1, 1, 0] ……**
&emsp;&emsp;对于输出，由于只存在两种标签，因此编码为：
&emsp;&emsp;**正面 = [1, 0] 负面 = [0, 1]**
&emsp;&emsp;依照上述步骤，我们构造出了一个$4×3$(样本数×input size/基本语素单位)的输入矩阵$x$与$4×2$(样本数×标注类别)的标注矩阵$y$：
$$
x=\begin{bmatrix} 1 & 0 & 1 \\\\ 1 & 1 & 0 \\\\ 1 & 0 & 0 \\\\ 1 & 1 & 1\end{bmatrix} y=\begin{bmatrix} 1 & 0 \\\\ 0 & 1 \\\\ 1 & 0 \\\\ 0 & 1\end{bmatrix}
$$

&emsp;&emsp;类似于第二部分中给出的例子，我们设计出一个相较于前者更为复杂的网络：
<img src="/img/2022-3-9-Machine-Learning-101/Figure_5.png" alt="网络" style="float:center" width="800px"/>

&emsp;&emsp;在两个隐藏层向各个下一层神经元传输相应数字时(箭头所示位置)，需要引入非线性变换的激活函数(Activation function)，这里选用的是Sigmoid函数：$𝑆(𝑥)=\frac{1}{(1+𝑒^{−𝑥})}$，它将实数域R的数字映射至(0, 1)内。网络最后一层的Softmax函数也是一种非线性变换，它将该层所有结果都映射到(0, 1)内，不改变大小的相对位置。对于该层的各个元素$x_i$，经变换后的值计算如下：
$$
softmax\ value = \frac{e^{x_i}}{\sum_{j}e^{x_j}{}}
$$


&emsp;&emsp;图中实线连接的部分就是我们在反向算法过程中需要更新的权重，为简化计算，在这个例子中我们忽略bias项即偏置的影响(也就是说每一条线代表的基础运算单元仅仅是$y=kx$)，只考虑权重w构成的三个矩阵：
&emsp;&emsp;$𝑤_1$为三行两列矩阵，$𝐻_1=𝑥𝑤_1$，$𝑤_2$ 、$𝑤_3$ 为两行两列的矩阵： $𝐻_2=𝑠𝑖𝑔𝑚𝑜𝑖𝑑(𝐻_1 ) 𝑤_2$，$𝑂𝑢𝑡𝑝𝑢𝑡=𝑠𝑖𝑔𝑚𝑜𝑖𝑑(𝐻_2)𝑤_3$

&emsp;&emsp;**正向运算：**
&emsp;&emsp;首先初始化三个矩阵$𝑤_1$ 、$𝑤_2$ 、$𝑤_3$，这里我调用了matlab的rand()函数来随机生成这三个矩阵：
<img src="/img/2022-3-9-Machine-Learning-101/Figure_6.png" alt="初始化及正向运算" style="float:center"/>

&emsp;&emsp;**计算Loss：**
&emsp;&emsp;在二分类或者多分类问题上，我们常选用NLL loss(Negative log-likelihood loss，负对数似然损失)函数作为损失函数，该损失函数的具体计算过程如下：
<img src="/img/2022-3-9-Machine-Learning-101/Figure_7.png" alt="Loss计算" style="float:center"/>

&emsp;&emsp;**反向传播：**
&emsp;&emsp;这一部分公式太多，懒得用$\LaTeX$再整理一遍，直接借用之前自己做的PPT里面的推导过程（不过说起来这里面的矩阵转置当时弄得我有些晕，其实你需要弄清楚对应元素的位置就比较清楚了。）：
<img src="/img/2022-3-9-Machine-Learning-101/Figure_8.png" alt="反向传播" style="float:center" width="800px"/>

&emsp;&emsp;**更新权重：**
<img src="/img/2022-3-9-Machine-Learning-101/Figure_9.png" alt="反向传播" style="float:center" width="800px"/>

>**小结与反思**
同单层模型一样，多层模型仍采用反向传播算法来进行权重的更新。
引入sigmoid、softmax等非线性变换来构筑更复杂的模型。
损失计算采用了负对数似然损失(能否采用MSE，为什么？)
对于文本序列而言，其出现的顺序对于理解其含义是至关重要的，简单向量相加丢失了字符出现顺序的信息。(改进：RNN)
层数越深，由链式法则相乘得到的梯度越来越小，可能出现梯度消失的问题(改进：ResNet)
文本的编码方式——独热编码的缺点在于①维数太高，考虑一个大型的语料库，出现的常用汉字数千，这种编码方式需要数千维的向量来表示一个句子（而且其中的大部分元素都是0）。②（基于前者）大部分句子的向量都分布在坐标轴附近。③（基于前者）难以衡量两个句子之间的相似度。

## 随机梯度下降：引入Mini-Batch
&emsp;&emsp;对于梯度下降，有几种不同的方法对其进行实现：
&emsp;&emsp;批量梯度下降：计算所有样本的loss后，再更新权重w与偏置b。
&emsp;&emsp;随机梯度下降：从全体样本中随机抽取一个样本，计算loss后更新权重w与偏置b，直到抽取完所有样本后跑完一个轮次。
&emsp;&emsp;小批量(随机)梯度下降：将全体样本划分为若干个mini-batch，每个batch中存在若干样本，随机抽出一个mini-batch，计算该批次样本中的loss后更新权重w与偏置b，直到跑完所有mini-batch后，记作训练一个轮次。在训练完一个轮次后。对样本进行shuffle处理，即重新划分mini-batch，再次进行训练，形象化的比喻可以称作“洗牌”，这也是为什么英文叫做"shuffle"。

<img src="/img/2022-3-9-Machine-Learning-101/Figure_10.png" alt="三种方法" style="float:center" width="800px"/>

&emsp;&emsp;三种不同方式的对比：  
&emsp;&emsp;一般来说，小批量梯度下降通过选取部分样本引入了更大噪声，使得它在解空间的“鞍点”位置更容易受噪声扰动，在一些情况下性能表现比批量梯度下降更好。而随机梯度下降更新权重只关注当前样本的梯度，所以尽管每一步使得当前样本得到最优的表现，但从整体样本考虑则不一定最优，且每一个样本前向计算时都需要依赖上一个样本反向传播后更新的权重，并行化程度不如其它两者高。
&emsp;&emsp;形象化的三种方式如上图所示，红点位置即为所求的最优解，图中带箭头的线则显示了这三种方法在寻找最优解的过程。

<hr>
&emsp;&emsp;这篇文章，笔者简要回顾了机器学习的最基础内容，虽然听起来或者推导起来比较复杂。但作为感性的认知来看，了解机器学习的工作原理并不困难，甚至完全可以只用高中的知识理解。本期的内容还未涉及到代码部分，这些工作将在下期进行介绍。

