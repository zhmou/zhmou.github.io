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
# 归并排序
- 将数组递<strong>归</strong>不断拆分，最后合<strong>并</strong>两个有序数组为一个
``` Javascript
function Merge(arr1, arr2) {
    let arr = [];
    while(arr1.length || arr2.length) {
        if (arr1[0] < arr2[0]) {
            arr.push(arr1.shift());
        } else {
            arr.push(arr2.shift());
        }
    }
    return arr;
}

function mergeSort(arr) {
    if (arr.length == 1) {
        return arr
    }
    return Merge(mergeSort(arr.slice(0, Math.floor(arr.length / 2))), mergeSort(arr.slice(Math.floor(arr.length / 2), arr.length)));
}
```

# 桶排序
将数组放到n个桶中，确保后面的桶中的元素比前面大，进行排序，然后合并
``` Javascript
function bucketSort(arr) {
    let buckets = [[], [], []];
    perBucket = Math.floor((Math.max(...arr) - Math.min(...arr) + buckets.length) / buckets.length);
    arr.forEach(num => {
        let idx = Math.floor((num - Math.min(...arr)) / perBucket);
        buckets[idx].push(num);
    });
    buckets.forEach(bucket => selectionSort(bucket));
    arr.length = 0;
    arr.push(...buckets.flat());
}
```

# 计数排序
创建一个从小到大的数组，然后遍历原数组，在对应位置计数+1
``` Javascript
function countSort(arr) {
    let max = Math.max(...arr);
    let min = Math.min(...arr);
    let tmp = new Array(max - min + 1).fill(0);
    arr.forEach(num => tmp[num - min] += 1);
    arr.length = 0;
    tmp.forEach((count, index) => {
        arr.push(...new Array(count).fill(index + min));
    })
}
```

# 基数排序
变种桶排序
``` Javascript
function radixSort(arr) {
    let base = 1;
    let max = Math.max(...arr);
    while(base <= max) {
        let buckets = [];
        for (let i = 0; i < 10; i++) {
            buckets.push([]);
        }
        arr.forEach(num => {
            let idx = Math.floor(num / base) % 10;
            buckets[idx].push(num);
        })
        arr.length = 0;
        buckets.forEach(bucket => {
            arr.push(...bucket);
        })
        base = base * 10;
    }
}
```
# 快速排序
``` Javascript
function quickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let left = [], right = [];
    let pivot = arr.splice(0, 1);
    arr.forEach(num => num > pivot ? right.push(num) : left.push(num));
    return quickSort(left).concat(pivot, quickSort(right));
}

```

# 随机快速排序

``` Javascript
function randQuickSort(arr) {
    if (arr.length <= 1) {
        return arr;
    }
    let left = [], right = [];
    let pivot = arr.splice(parseInt(Math.random() * arr.length), 1);
    arr.forEach(num => num > pivot ? right.push(num) : left.push(num));
    return randQuickSort(left).concat(pivot, randQuickSort(right));
}
```

# 希尔排序

``` Javascript
function shellSort(arr) {
  const n = arr.length;
  let gap = Math.floor(n / 2); 
  while (gap > 0) {
    // 插入排序，与普通的插入排序的区别就在于步长为 gap
    for (let i = gap; i < n; i++) {
      // 从 i 开始向前遍历，间隔为 gap
      for (let j = i; j >= gap && arr[j - gap] > arr[j]; j -= gap) {
        [arr[j - gap], arr[j]] = [arr[j], arr[j - gap]];
      }
    }
    gap = Math.floor(gap / 2);
  }
  return arr;
}
```