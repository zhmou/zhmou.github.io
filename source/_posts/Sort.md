---
title: 来排个序吧
date: 2023-05-06 13:13:00
tags: [Javascript, 编程]
categories: 学习
---
{% note info %}
这篇文章仍处在更新当中。
{% endnote %}

本文中所有排序算法均使用<code>Javascript</code>实现，且均为升序排序

# 选择排序
- 遍历数组元素（忽略已经排序过的），找到最小的放到最前面
``` Javascript
function selectionSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        let min = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[j] < arr[min]) {
                min = j;
            }
        }
        [arr[i], arr[min]] = [arr[min], arr[i]];
    }
}
```

# 冒泡排序
- 遍历数组元素，比较相邻元素，大的“冒泡”到后面
``` Javascript
function bubbleSort(arr) {
    for (let i = 0; i < arr.length - 1; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
}
```
# 插入排序
- 将第n个数插入前n-1个有序的数组中
``` Javascript
function insertionSort(arr) {
    for (let i = 1; i < arr.length; i++) {
        for (let j = i; (arr[j] < arr[j - 1]) && (j >= 0); j--) {
            [arr[j - 1], arr[j]] = [arr[j], arr[j-1]];
        }
    }
}
```