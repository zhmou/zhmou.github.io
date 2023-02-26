---
title: 矩阵论复习
date: 2023-01-24 09:40:00
tags: [学习, 数学]
categories: 学习
mathjax: True
---

# 内积
## 性质
- 交换律
  - $\left\langle\alpha,\beta\right\rangle = \left\langle\beta,\alpha\right\rangle$
- 非负性
  - $\left \langle \alpha,\alpha  \right \rangle \ge 0; \left \langle \alpha,\alpha  \right \rangle=0\Leftrightarrow \alpha =0$
- 齐次性
  - $\left \langle \alpha,k\beta  \right \rangle = \overline{k}\left \langle\alpha,\beta\right \rangle$
- 分配律
  - $\langle\alpha+\gamma,\beta\rangle = \langle\alpha,\beta\rangle + \langle\gamma,\beta\rangle$

# Jordan标准形
## 定义
- 形如下列形式的矩阵称之为n阶Jordan块
$$
J_i=\begin{bmatrix} \lambda_i & 1 &  &  & \\\\
 & \lambda_i & 1 & & \\\\
 & & \lambda_i & \ddots & \\\\
 & & & \ddots & 1 \\\\
 & & & & \lambda_i
\end{bmatrix}_{n_i \times n_i}
$$
- 形如下列形式的矩阵称之为n阶Jordan型矩阵
$$
J=\begin{bmatrix}
  J_1 & & & \\\\
  & J_2 & & \\\\
  & & \ddots & \\\\
  & & & J_t
\end{bmatrix}
$$

  - 其中$J_i$为$n_i$阶Jordan块，且$n_1+\cdots+n_t=n$

## 定理
- 每一个n阶复方阵𝑨都和一个Jordan型矩阵𝑱相似。即存在可逆阵𝑷, 使$P^{-1}AP = J$
  - 计算方法：$A \rightarrow A(\lambda)=\lambda E - A \rightarrow 行列式因子 \rightarrow 不变因子 \rightarrow 初级因子 \rightarrow Jordan块 \rightarrow J$
  - 示例：求矩阵$A=\begin{bmatrix}-1&-2&6\\\\-1&0&3\\\\-1&-1&4\end{bmatrix}$的Jordan标准型
    - step1: 特征矩阵$A(\lambda)=\lambda E-A=\begin{bmatrix}\lambda+1&2&-6\\\\1&\lambda&-3\\\\1&1&\lambda-4\end{bmatrix}$
    - step2: 求行列式因子，$A(\lambda)$中所有k阶子式首项系数是1的最大公因式称为k级<b>行列式因子</b>，记作$D_k(\lambda), k=1,\cdots,n.$
      - 上述$A(\lambda)$，一阶子式为各个元素，$D_1(\lambda)=1$；
      - 二阶子式中，取第一二行、一二列的$\begin{vmatrix}\lambda+1&2\\\\1&\lambda\end{vmatrix}=\lambda^2+\lambda-2=(\lambda+2)(\lambda-1)$；第一二行、二三列的$\begin{vmatrix}2&-6\\\\\lambda&-3\end{vmatrix}=-6+6\lambda=6(\lambda-1)$，依次计算，可得$D_2(\lambda)=\lambda-1$；
      - 三阶子式$D_3(\lambda)=(\lambda+1)\lambda(\lambda-4)-6-6+3(\lambda+1)-2(\lambda-4)+6\lambda={(\lambda-1)}^3$
    - step3: 求不变因子：即$d_1(\lambda)=D_1(\lambda),d_n(\lambda)=\frac{D_n(\lambda)}{D_{n-1}(\lambda)}$
      - $d_1=1,d_2=\lambda-1,d_3=(\lambda-1)^2$
    - step4: 将𝑨(𝝀)的所有的次数大于零的不变因子分解为互不相同的一次因式的方幂的乘积，这些一次因式方幂称为𝑨(𝝀)的初级因子。来自于不同的不变因子的一次因子的方幂不能合并
      - $d_1$次数为0，没有初级因子，$d_2$只有一个一次因式$\lambda-1$为其初等因子，$d_3$只有一个一次因式的二次方幂${\lambda-1}^2$为其初等因子
    - step5: 初级因子和Jordan块对应
      - $\lambda-1 \leftrightarrow [1], (\lambda-1)^2 \leftrightarrow \begin{bmatrix}1&1\\\\0&1\end{bmatrix}$
    - step6: Jordan块按对角线排列起来得到Jordan标准型J，<b>Jordan标准形与Jordan块的顺序无关</b>。
      - $J=\begin{bmatrix}1&0&0\\\\0&1&1\\\\0&0&1\end{bmatrix}$

# $\lambda$-矩阵
## 定义
- 位置元$a_{ij}(\lambda)$为多项式的矩阵
- 𝝀-矩阵的运算，行列式，子式，余子式，伴随矩阵等概念和数字矩阵一致
- 𝝀-矩阵𝑨(𝝀)的不恒为零多项式的子式的最高阶数称为𝑨(𝝀)的秩(rank), 记为rank𝑨(𝝀)
  - 设𝑨为n阶数字矩阵, 其特征矩阵𝑨(𝝀)=𝝀𝑬−𝑨为𝝀-矩阵，且$rankA(\lambda) = n$

# Smith标准型
## 定理
- $\lambda$-矩阵都可经若干次初等变换化为Smith标准形，即若$A(\lambda)$为秩为$r$的$m\times n$的$\lambda$-矩阵，则$A(\lambda)$与矩阵$J(\lambda)=\begin{bmatrix}d_1(\lambda)& & &0&\cdots&0\\\\
\ &\ddots & &\vdots & &\vdots\\\\
\ &\ &d_r(\lambda) &0 &\cdots &0 \\\\
0 &\cdots &0 &0 &\cdots &0 \\\\
\vdots & &\vdots &\vdots & &\vdots \\\\
0 &\cdots &0 &0 &\cdots &0
\end{bmatrix}$等价。矩阵$J(\lambda)$称之为$A(\lambda)$的Smith标准形.