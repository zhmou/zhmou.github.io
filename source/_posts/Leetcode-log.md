---
title: 力扣刷题小录
date: 2022-09-11 11:22:15
tags: [Javascript, 编程, 算法]
categories: 学习
---
# 基础
## [只出现一次的数字](https://leetcode.cn/problems/single-number/) / [丢失的数字](https://leetcode.cn/problems/missing-number/) / [0 ~ n-1中缺失的数字](https://leetcode.cn/problems/que-shi-de-shu-zi-lcof/)

<strong>简述：</strong>
&emsp;&emsp;①给定一个包含 [0, n] 中 n 个数的数组 nums，找出 [0, n] 这个范围内没有出现在数组中的那个数。(缺失的数字)
&emsp;&emsp;②给定一个非空整数数组，除了某个元素只出现一次以外，其余每个元素均出现两次。找出那个只出现了一次的元素。(只出现一次的数字)
<strong>思路：</strong>
&emsp;&emsp;一个数字与它自身异或的结果为0，譬如3(011) ^ 3(011) = 0(000)，而0与任何数字异或的结果均为其自身。对于②而言，遍历数组，所有数字按位异或即可得到只出现过一次的数字。
&emsp;&emsp;而对于①来说，考虑一个长度为 2n+1 的数组，其中包含了一个nums数组（长度为n），另一部分则是 [0, n] 这 n+1 个数。很显然该数组中只有nums数组缺失的那一个数只出现过一次，剩余数字均出现过两次，因此此题可以转化为 <i>只出现一次的数字</i> 的做法。
<!-- more -->
<strong>题解：</strong><br>
<div>
    <div class='left'>
```javascript ①缺失的数字
/**
 * @param {number[]} nums
 * @return {number}
 */
var missingNumber = function(nums) {
    var ans = 0;
    for (var i =0; i < nums.length ; i++){
        ans ^= i;
        ans ^= nums[i];
    }
    ans ^= nums.length;
    return ans;
};
```
    </div>
    <div class='right'>
```javascript ②只出现一次的数字
/**
 * @param {number[]} nums
 * @return {number}
 */
var singleNumber = function(nums) {
    var ret = 0;
    for (var i = 0; i < nums.length; i ++){
        ret ^= nums[i];
    }
    return ret;
};
```
    </div>
    <div class='clear'></div>
</div>


## [汉明重量](https://leetcode.cn/problems/number-of-1-bits/) / [汉明距离](https://leetcode.cn/problems/hamming-distance/)
<strong>简述：</strong>
&emsp;&emsp;①编写一个函数，输入是一个无符号整数（以二进制串的形式），返回其二进制表达式中数字位数为 '1' 的个数（也被称为汉明重量）。
&emsp;&emsp;②两个整数之间的 <i>汉明距离</i> 指的是这两个数字对应二进制位不同的位置的数目。给你两个整数 x 和 y，计算并返回它们之间的汉明距离。
<strong>思路：</strong>
&emsp;&emsp;①当单个bit和1进行与运算的时候，该bit为1时结果为1，为0时则结果为0。则例如 11010 和 10000、01000、00100、00010、00001 进行 &运算 时，结果为1时，计数变量 + 1，最后返回该计数变量即可。
&emsp;&emsp;②两个数字异或运算结果的汉明重量即为汉明距离。
<strong>题解：</strong>
<div>
    <div class='left'>
``` javascript 题解一
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    let ret = 0;
    for (let i = 0; i < 32; i++) {
        if ((n & (1 << i)) !== 0) {
            ret++;
        }
    }
    return ret;
};
```
    </div>
    <div class='right'>
``` javascript 题解二
/**
 * @param {number} n - a positive integer
 * @return {number}
 */
var hammingWeight = function(n) {
    var k = 0;
    while(n){
        if(n & 1){
            k++;
        }
        n >>>= 1;
    }
    return k;
};
```
    </div>
    <div class='clear'></div>
</div>
{% note warning %}
题解二中用到的 <code>>>></code> 是 <i>无符号右移运算符</i>，左边空出位将用0填充。
具体参见MDN：https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Guide/Expressions_and_Operators
否则在范例中，32位有符号数的最高位为1时，循环不会终止。
{% endnote %}


## 进制转换 / [K进制表示下的各位数字总和](https://leetcode.cn/problems/sum-of-digits-in-base-k/) / [数字转换为16进制数](https://leetcode.cn/problems/convert-a-number-to-hexadecimal/)
<strong>简述：</strong>
&emsp;&emsp;①给你一个整数 n（10 进制）和一个基数 k ，请你将 n 从 10 进制表示转换为 k 进制表示，计算并返回转换后各位数字的 总和 。转换后，各位数字应当视作是 10 进制数字，且它们的总和也应当按 10 进制表示返回。（K进制表示下的各位数字总和）
&emsp;&emsp;②给定一个整数，编写一个算法将这个数转换为十六进制数。对于负整数，我们通常使用 <i>补码运算</i> 方法。
{% note info %}
注意:
十六进制中所有字母(a-f)都必须是小写。
十六进制字符串中不能包含多余的前导零。如果要转化的数为0，那么以单个字符'0'，来表示；对于其他情况，十六进制字符串中的第一个字符将不会是0字符。 
给定的数确保在32位有符号整数范围内。
不能使用任何由库提供的将数字直接转换或格式化为十六进制的方法。
{% endnote %}
<strong>思路：</strong>
&emsp;&emsp;10进制转 k 进制：10进制的数字 除以 k，得到的余数就是目标待转换的数字的最后一位，再拿刚刚所得到的商继续除以k，如此循环，直到所得的商为0。
&emsp;&emsp;对于题目②。特别地，对于32位有符号整数的表示，比如 -1 在32位有符号整数的表示，与无符号数下2<sup>32</sup>-1是一致的。
&emsp;&emsp;此外，由于16进制数中存在a~f，余数为10即对应a、11对应b……可利用这种方式将对应字符保存起来：<code>String.fromCharCode(余数-10 + &apos;a&apos;.charCodeAt() //即a对应的ascii码)</code>
<strong>题解：</strong>
<div>
<div class='center'>
``` javascript 进制转换       
var BaseChange = function (n, k) {
    if (n == 0) {
        return '0';
    }
    var ret = '';
    if(n < 0){
        ret += '-';
        n = -n;
    }
    var arr = [];
    while (n) {
        arr.push(n % k);
        n = parseInt(n / k);
    }
    while (arr.length) {
        ret += arr.pop();
    }
    return ret;
};

var n = 100;
var k = 6;

//返回true则说明该函数功能正确
console.log(n.toString(k) == BaseChange(n, k));
```

</div>
<div class='clear'></div>
<div class='center'>
``` javascript 十六进制转换 
/**
 * @param {number} num
 * @return {string}
 */
var toHex = function(num) {
    if(num < 0){
        num = Math.pow(2,32) + num;
    }
    return BaseChange(num);
};

var BaseChange = function (n) {
    if(n == 0){
        return '0';
    }
    var ret = '';
    var arr = [];
    while (n) {
        if(n % 16>= 10){
            arr.push(String.fromCharCode('a'.charCodeAt() + n % 16 - 10))
        }
        else {
            arr.push(n % 16);
        }
        n = parseInt(n / 16);
    }
    while (arr.length) {
        ret += arr.pop();
    }
    return ret;
};
```
</div>
<div class='clear'></div>
</div>


## [有效的完全平方数](https://leetcode.cn/problems/valid-perfect-square/) / [x的平方根](https://leetcode.cn/problems/sqrtx/)
<strong>简述：</strong>
&emsp;&emsp;①判断一个数是否是完全平方数
&emsp;&emsp;②返回非负整数x的算术平方根(取整)
<strong>思路：</strong>
&emsp;&emsp;两者皆可用双指针二分查找的方式进行。设左指针l指向0，右指针r指向输入的数字。判断有效的完全平方数就是看[0, nums]里是否有一个数target使得target<sup>2</sup>=nums; 计算平方根则是找到满足target<sup>2</sup><=nums的最大target。
<strong>题解：</strong>
<div>
<div class='left'> 
``` javascript 有效的完全平方数
/**
 * @param {number} num
 * @return {boolean}
 */
var isPerfectSquare = function(num) {
    var l = 0, r = num;
    var ans;
    var center;
    while(l <= r){
        center = parseInt((l+r)/2);
        if(center * center <= num){
            //每次满足条件的时候，ans都需要更新
            ans = center;
            l = center + 1;
        }
        else{
            r = center + 1;
        }
    }
    return ans * ans == num;
};
```
</div>
<div class='right'> 
``` javascript x的平方根
/**
 * @param {number} x
 * @return {number}
 */
var mySqrt = function(x) {
    var l = 0, r = x;
    var ans = 0
    while(l <= r){
        var center = parseInt((l+r)/2);
        if(center * center > x){
            r = center - 1;
        }
        else {
            ans = center;
            l = center + 1;
        }
    }
    return ans;
};
```
</div>
<div class='clear'></div> 
</div>

## 双指针 
### [排序数组中两个数字之和](https://leetcode.cn/problems/kLl5u1/)
<strong>简述：</strong>
&emsp;&emsp;给定一个已按照 **升序排列**  的整数数组 numbers ，请你从数组中找出两个数满足相加之和等于目标数 target 。
&emsp;&emsp;函数应该以长度为 2 的整数数组的形式返回这两个数的下标值。numbers 的下标 从 0 开始计数 ，所以答案数组应当满足 0 <= answer[0] < answer[1] < numbers.length。
&emsp;&emsp;假设数组中存在且只存在一对符合条件的数字，同时一个数字不能使用两次。
<strong>思路：</strong>
&emsp;&emsp;一开始我的想法是遍历第一个数，第二个数(target - 第一个数)则采用二分查找的方式在大于第一个数的位置寻找。后来看题解才发现双指针的巧妙方式：定义左指针指向第一个数，右指针指向最后一个数。求和，若结果小于target，则说明左指针的数小了，左指针++；反之，若结果大于target，则说明右指针的数大了，右指针--。
&emsp;&emsp;为什么这种方式不会漏掉解？因为最后返回的结果(numbers[i], numbers[j])中必然是 0 <= i <= j <= numbers.length - 1; 而在移动过程中，不会有任意一个指针移动到[i, j]的范围内。
<strong>题解：</strong>
<div>
<div class='center'>
``` javascript
/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(numbers, target) {
    var l = 0, r = numbers.length - 1;
    while( l<=r ) {
        if(numbers[l] + numbers[r] < target) {
            l++;
        }
        else if (numbers[l] + numbers[r] > target) { 
            r--;
        }
        else return [l, r]
    }
};
```
</div>
<div class='clear'></div>
</div>


## 动态规划 
### [路径的数目](https://leetcode.cn/problems/2AoeFn/)
<strong>简述：</strong>
&emsp;&emsp;一个机器人位于一个 m x n 网格的左上角 （起始点在下图中标记为 “Start” ）。机器人每次只能向下或者向右移动一步。机器人试图达到网格的右下角（在下图中标记为 “Finish” ）。问总共有多少条不同的路径？
<strong>思路：</strong>
&emsp;&emsp;建立一个二维数组记录从顶点到达当前位置的路径数，对于如题所述的二维网格来说，位于中间的某个格子只能从上方的相邻格子或者左边的相邻格子走过来。因此当前格子的路径数等于左边格子的路径数 + 上边格子的路径数。而对于第一行或者第一列的格子，只能由左边或者上边格子走过来，因此这些格子的路径数都是1。
&emsp;&emsp;而更简单的解法是利用组合数学（杨辉三角）：从(1,1)行进到(m,n)共要移动(m + n - 2)次，其中有(m-1)次是向右移动：所需次数为C(m+n-2, m-1) = (m+n-2)!/((n-1)!*(m-1)!)
<strong>题解：</strong>
<div>
<div class='center'>
``` javascript 路径数目
/**
 * @param {number} m
 * @param {number} n
 * @return {number}
 */
var uniquePaths = function(m, n) {
    var path = [];
    for (var i = 0; i < m; i++){
        path.push([]);
        for(var j = 0; j < n; j++){
            if(i == 0 && j == 0){
                path[i][j] = 1;
            } else if(i == 0){
                path[i][j] = path[i][j-1];
            } else if(j == 0){
                path[i][j] = path[i-1][j];
            } else {
                path[i][j] = path[i-1][j] + path[i][j-1];
            }
        }
    }
    return path[m-1][n-1];
};
```
</div>
<div class='clear'></div>
</div>

### [爬楼梯的最少成本](https://leetcode.cn/problems/GzCJIP/)
<strong>简述：</strong>
&emsp;&emsp;数组的每个下标作为一个阶梯，第 i 个阶梯对应着一个非负数的体力花费值 cost[i]（下标从 0 开始）。每当爬上一个阶梯都要花费对应的体力值，一旦支付了相应的体力值，就可以选择向上爬一个阶梯或者爬两个阶梯。请找出达到楼层顶部的最低花费。在开始时，你可以选择从下标为 0 或 1 的元素作为初始阶梯。
&emsp;&emsp;示例：
&emsp;&emsp;&emsp;&emsp;**输入**：cost = [10, 15, 20]
&emsp;&emsp;&emsp;&emsp;**输出**：15
&emsp;&emsp;&emsp;&emsp;**解释**：最低花费是从 cost[1] 开始，然后走两步即可到阶梯顶，一共花费 15 。
<strong>思路：</strong>
&emsp;&emsp;登到某级台阶所花费的总体力有两种可能，要么是从前一级一步登上来，要么是从前两级两步登上来。取两者中较小的体力耗费即可。
<strong>题解：</strong>
<div>
<div class='center'>
```
/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function(cost) {
    var costTotalArray = [];
    costTotalArray[0] = 0;
    costTotalArray[1] = 0;
    for (var i = 2; i <= cost.length; i++){
        costTotalArray.push(Math.min(cost[i-1] + costTotalArray[i-1], costTotalArray[i-2] + cost[i-2]))
    }
    return costTotalArray[cost.length]
};
```
</div>
<div class='clear'>
</div>

## [可被 5 整除的二进制前缀](https://leetcode.cn/problems/binary-prefix-divisible-by-5/)
<strong>简述：</strong>
&emsp;&emsp;给定一个二进制数组 nums ( 索引从0开始 )。我们将xi 定义为其二进制表示形式为子数组 nums[0..i] (从最高有效位到最低有效位)。
&emsp;&emsp;例如，如果 nums =[1,0,1] ，那么 x0 = 1, x1 = 2, 和 x2 = 5。返回布尔值列表 answer，只有当 xi 可以被 5 整除时，答案 answer[i] 为 true，否则为 false。
<strong>思路：</strong>
&emsp;&emsp;定义一个xi，每读一位数字二进制数字就是左移一位（相当于乘以2）+ 该位数字，然后除以五取余，最后**令xi等于该余数**（这是一个比较巧妙的思路，这样xi就不会溢出），若所得余数为0，可以向answer中压入true，反之则压入false。
<strong>题解：</strong>
<div>
<div class='center'>
```
/**
 * @param {number[]} nums
 * @return {boolean[]}
 */
var prefixesDivBy5 = function(nums) {
    var ret = []
    var number = 0;
    for (var i = 0; i < nums.length; i++){
        number = number * 2 + nums[i];
        number %= 5
        if (!number){
            ret.push(true);
        }
        else ret.push(false);
    }
    return ret;
};
```
</div>
<div class='clear'>
</div>