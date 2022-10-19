---
title: 2021CVPR论文：Coordinate Attention
date: 2022-05-04 09:30:58
tags: [机器学习, 编程, 论文研读]
categories: 学习
mathjax: True
---
&emsp;&emsp;论文标题：[Coordinate Attention for Efficient Mobile Network Design](https://openaccess.thecvf.com/content/CVPR2021/papers/Hou_Coordinate_Attention_for_Efficient_Mobile_Network_Design_CVPR_2021_paper.pdf)

&emsp;&emsp;[Github链接](https://github.com/Andrew-Qibin/CoordAttention)

## 摘要（翻译）
&emsp;&emsp;近年来对轻量级网络(mobile network)设计的研究表明，通道注意力机制(例如：Squeeze-and-Excitation attention, 压缩-激发注意力机制，出自[SENet, CVPR2018](https://arxiv.org/abs/1709.01507))对于模型性能的提升具有显著效果，但它们通常忽略掉了位置信息——这对于生成空间选择性注意力图(spatially selective attention maps)非常重要。在这篇文章中，我们针对轻量级网络提出了一种新的注意力机制，该机制将位置信息嵌入到通道注意力中。我们称其为 **坐标注意力(Coordinate Attention)** 机制。
&emsp;&emsp;不同于通道注意力将一个特征张量通过二维全局池化转换为单个特征向量，坐标注意力将通道注意力拆解为两个一维特征提取的过程，分别沿着两个空间方向(译注：宽，高)提取特征。通过这种方法可以提取一个空间方向上的远距离依赖关系，同时又可以在另一个空间方向上保持精确的位置信息。结果产生的特征图然后分别编码为一对方向感知(direction-aware)与位置敏感(position-sensitive)的注意力图，可以增补应用于输入的特征图来增强对感兴趣对象的表示。
&emsp;&emsp;我们的坐标注意力机制简单，可以灵活插入于经典的轻量级网络，如*MobileNetV2*, *MobileNeXt*和*EfficientNet*并且几乎没有额外的计算开销。大量实验表明，我们的坐标注意力机制在ImageNet分类上存在性能提升，更有趣的是，它在下游任务中表现更好，如目标检测和语义分割。

<!--more-->

## 回顾几种注意力机制

### SENet

<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_1.png" alt="SENet" title="SENet" style="float:center"/>
<div class="comment">SENet的基础结构——压缩激励块</div>
<div class="comment">A Squeeze-and-Excitation block</div>
&emsp;&emsp;SENet所提出的注意力机制基本架构如上图所示：$F_{tr}$是可将输入$X$映射为特征图$U$的变换，其中$U\in\mathbb{R}^{H{\times}W{\times}C}$。例如，$F_{tr}$可以是常见的卷积操作。对于任意一个$F_{tr}$变换，都可以构造一个对应的SE块来进行特征重校准(feature recalibration, 即将特征图的各个通道赋以不同的权重)。

&emsp;&emsp;特征图$U$首先通过$F_{sq}$压缩(squeeze)为$1\times1{\times}C$的向量，将一个通道内所有的空间特征编码为该通道上的全局特征。在论文中，这一步操作是通过全局均值池化(Global Avarage Pooling, GAP)来实现的，即特征图各个通道上权值之和除以特征图的尺寸(宽×高)：
<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/equation.svg" alt="GAP" title="GAP" style="float:center"/>
<div class="comment">全局均值池化</div>
&emsp;&emsp;然后这个向量再通过两个全连接层，得到各通道真正的权重。这个步骤被作者称作激励(excitation)。两个全连接层都拥有可训练参数，目的是通过所有样本的训练来学习到GAP产生的特征向量到各通道权重之间的关系。这两个全连接层的结构类似瓶颈结构(bottle beck): 第一个全连接层将向量压缩为$1\times1{\times}{C/r}$，随后经ReLU这一非线性变换后送入第二个全连接层，恢复为$1\times1{\times}{C}$，再送入Sigmoid激活函数——由于特征之间并不一定彼此互斥，因此这里没有采用Softmax。最后得到的权重和各个通道相乘得到特征重校准后的$\widetilde{X}$.

&emsp;&emsp;在激励这一环节中，瓶颈结构能有效降低参数量并提升泛化能力，$r$是一个超参数，称作降维系数(redution ratio)，$r$值的大小决定了SE块的容量(capacity)与计算开销。在论文中，作者采用SE-ResNet-50对$r$值大小进行了实验，在平衡性能与计算开销上，设置$r=16$能在两者之间产生平衡。在实践中，由于不同层承担不同的角色，因此整个网络的$r$值可根据需要调整以达到更好的性能。
&emsp;&emsp;SE模块的方便之处在于可以直接加入现有的骨干网络之上，例如将SE Block插入ResNet和Inception这两种骨干网络中：
<div>
<div class="left"><img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_2.png" alt="SENet" title="SENet" style="float:center"/></div>
<div class="right"><img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_3.png" alt="SENet" title="SENet" style="float:center"/></div>
<div class="clear"></div>
</div>
<div class="comment">左图：SE-Inception 右图：SE-ResNet</div>
&emsp;&emsp;卷积训练出来的结果也带有通道的权值，但是实际上，由于卷积核感受野的限制，特征图中各个通道上每一个$H\times{W}$的权重参数，不仅仅有通道上的相关性，还受空间邻域相关性的影响。因此在SE结构中，作者先是采用全局均值池化消去了卷积捕捉到的空间依赖，在排除掉了空间依赖的影响后剩下了通道的影响。因此可以通过全连接来训练获取各个通道的权重。

### [CBAM: Convolutional Block Attention Module (ECCV 2018)](https://openaccess.thecvf.com/content_ECCV_2018/papers/Sanghyun_Woo_Convolutional_Block_Attention_ECCV_2018_paper.pdf)

&emsp;&emsp;在SENet中，作者只考虑了通道维度上的权重。而卷积操作本身是通过跨通道信息和空间信息混合在一起来提取信息特征的。因此，在CBAM的模块中；作者考虑在空间和通道两个维度上分别应用注意力机制，来使模型学习到在通道维度上“注意什么”和空间维度上“注意哪里”。
<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_4.png" alt="CBAM Overview" title="CBAM Overview" style="float:center" width="800px"/><div class="comment">CBAM总体结构</div>&emsp;&emsp;上图是CBAM的总体概览，该部分存在两个子模块：通道注意力模块和空间注意力模块。输入的特征图同SE模块类似，经通道注意力模块进行重校准后送入空间注意力模块。再次得到空间上的权重后同特征图相乘得到最终的结果。
&emsp;&emsp;CBAM对于两个模块的安排是经过实验验证的结果。在4.1节的消融实验中，作者发现：顺序（串行）安排两个子模块所生成的注意力图比并行安排两个子模块的注意力图更加精细；优先通过通道注意力模块的性能比优先通过空间注意力模块更好；此外同时使用两种注意力模块在任何情况下都比单独使用通道注意力机制的结果更好（因此证明该结构的设计是有效的）。
&emsp;&emsp;对于更具体的模块结构，如下图所示：
<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_5.png" alt="CBAM" title="CBAM" style="float:center" width="800px"/><div class="comment">CBAM具体结构</div>&emsp;&emsp;同SE模块类似，但SENet的通道注意力机制不仅采用GAP，而且采用了全局极值池化(Global Max Pooling, GMP)来得到两个$1\times1{\times}C$的向量。这两个向量通过**同一个**两个全连接层构成的(同样是瓶颈结构的)MLP(作者称之为"shared MLP")。在此之后两个向量通过逐元素求和得到单个向量，最后同样通过Sigmoid函数得到通道上的权重。算法公式如下：
<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_6.png" alt="channel attention" title="channel attention" style="float:center" width="500px"/><div class="comment">通道注意力</div>&emsp;&emsp;通过沿通道方向上做均值池化、极值池化，我们可以得到两个二维的特征图：$F_{avg}^s,\ F_{max}^s\in\mathbb{R}^{H\times{W}\times1}$。对这两个特征图，将其沿通道方向拼接得到${H\times{W}\times2}$的特征图，然后用$7\times7$大小的卷积核(周围一圈先进行padding操作以保持卷积后尺寸不变)卷积得到${H\times{W}\times1}$，最后经Sigmoid产生空间特征权重值。算法公式如下：
<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_7.png" alt="spatial attention" title="spatial attention" width="500px" style="float:center"/><div class="comment">空间注意力</div>&emsp;&emsp;在ResNet的基本结构：ResBlock中，应用CBAM机制如下：
<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_8.png" alt="CBAM in ResNet" title="CBAM in ResNet" style="float:center"/><div class="comment">CBAM integrated with a ResBlock in ResNet</div>

## CA注意力机制
&emsp;&emsp;由于轻量级网络的计算能力有限，任何带来巨大开销的注意力机制都是难以应用到现实的，因此目前最流行的轻量级网络的注意力机制仍然是SE。但是SE只考虑对通道信息计算权重，因此后来的注意力机制考虑通过压缩特征图的通道维度来利用位置信息，再通过卷积来计算空间注意力，然而卷积本身只捕获局部关系，不能对视觉任务必不可少的远程依赖关系(long-range dependencies)进行建模。
&emsp;&emsp;基于上述原因，作者一方面为了避免CBAM中首先进行通道注意力时采用GAP、GMP导致位置信息损失，同时考虑长距离依赖，提出了这种新颖的，将位置信息嵌入到通道注意力中的坐标注意力机制。其结构如下：<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_9.png" alt="CA Overview" title="CA Overview" style="float:center" width="500px"/><div class="comment">CA结构总览。注意，本文对特征图尺寸的描述是${H{\times}W{\times}C}$，与图片中把通道数放在第一位的表示略有不同。</div> &emsp;&emsp;在H(Y)和W(X)方向上，分别进行一次均值池化。对于和我一样缺乏直觉的朋友可以建立左手坐标系，想象一个${H{\times}W{\times}C}$的立方体，沿Y方向投影，得到的结果自然是${1{\times}W{\times}C}$的图；沿X方向投影，得到的结果是${H{\times}1{\times}C}$的图。在这两个图上，为了使其能够顺利地在一个平面上拼接，需要将其中一张变化到另一个平面上。以下是我用鼠标绘制的一张更直观的图：<img src="/img/2022-05-04-2021-CVPR-Coordinate-Attention/Figure_10.png" alt="CA Overview" title="CA Overview" style="float:center" width="600px"/><div class="comment">鼠标绘制</div>&emsp;&emsp;拼接得到的结果是$1\times{(H+W)}\times{C}$或者${(H+W)}\times1\times{C}$。这取决于把X Avg Pool横过来还是Y Avg Pool竖起来，但是**注意**：这里的通道数始终都是C，不要将这张图看作${(H+W)}\times{C}\times{1}$的情况，因此我在右侧的上方画了一只眼睛，代表从这个方向看。这对于下一步理解卷积的过程很有必要。
&emsp;&emsp;下一步是采用$1\times1$的卷积压缩通道数为$C/r$，接下来进行批归一化(Batch Normalization)，随后进行非线性变换——在这一步中，作者用的非线性变换似乎是自己改进的Swish激活函数：对于每个元素$x$，其经过激活值后的结果为$x\times{ReLU6(x+3)\ /\ 6}$，其中ReLU6是ReLU函数将最大值限制为6之后的结果：$ReLU6(x)=min(max(0,x),6)$。至于为什么用这个激活函数，作者在文章里面压根一点没提，只在3.2.2的公式(6)下方做了说明: δ is a non-linear activation function.
&emsp;&emsp;压缩完通道维度之后，作者又将拼接而来的两者进行Spilt分开了。在知乎上，我看到有人提到$x$和$y$两方向信息交互的问题，在进行思考之后，我个人认为上一步的拼接与卷积压缩维度的操作不能说是实现信息的融合，只能说是两者共用了同一组卷积核参数。行文至此，我觉得有必要动手试试，**如果整个过程中不进行拼接操作会有什么样的效果。**（不过最近有点懒也有些忙，或许有空了再试试。）
&emsp;&emsp;分开-恢复维度-Sigmoid激活函数，这样就得到了两组不同方向上的注意力权重。最后将这些权重与输入的特征图相乘（具体操作应该是这两个平面上的权重通过广播机制膨胀为三维矩阵，再进行点乘操作）就得到了经特征重校准后的特征图。
&emsp;&emsp;在消融实验中，作者在一些常见的轻量级网络上将原有的SE注意力机制替换为CA注意力机制，其结果都存在1%左右的提升。


