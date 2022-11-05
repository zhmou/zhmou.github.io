---
title: 配置SOLOV2_ncnn相关环境并运行Demo
date: 2021-10-09 20:31:39
tags: [编程, 机器学习, SOLOv2]
categories: 学习
typora-root-url: ..
---

&emsp;&emsp;今天最开心的事情是终于在Windows环境下运行起来Github上[这个项目](https://github.com/DayBreak-u/SOLOV2_ncnn)的Demo，对于我一个电脑小白而言那背后的可都是泪呀TAT，因此有必要记录一下整个流程以方便其他人的需要~

&emsp;&emsp;简述一下相关背景：[ncnn](https://github.com/Tencent/ncnn)是一个前向神经网络框架，由纯C++实现所实现。而[SOLOV2](https://arxiv.org/abs/2003.10152
)是一个快速的实例分割算法，关于什么是实例分割，可参考图像处理的相关文章。此外，笔者的相关环境配置一并列举于此处，方便读者参考：

|        环境        |                             版本                             |
| :----------------: | :----------------------------------------------------------: |
|      Windows       |                        10 专业版 20H2                        |
| Visual Studio 2019 |             Community Edition<br>16.11.31702.278             |
|       OpenCV       |                            3.4.5                             |
|       CMake        |                            3.21.3                            |
|        ncnn        | [Release 2c4ae09604](https://github.com/Tencent/ncnn/tree/2c4ae096044c816d7195476d652eb8d5aefb8379)<br>即目前的lateset release(20210720) |

<!--more-->

## 01 ncnn编译

&emsp;&emsp;理论上来讲，根据自身的需求直接使用release下官方的预编译静/动态库应该不会出现错误，然而笔者在实际配置项目时，添加了ncnn.lib这一附加依赖项后，在运行中依旧会产生Vulkan相关报错，如图所示：

![vulkan报错](/img/Configure-a-NCNN-Project/1.png)

&emsp;&emsp;推测可能为官方打包的库中默认调用了VulkanSDK与glslang这一submoudle，因此我们需要自己来对ncnn打包了。

&emsp;&emsp;在使用VS 2019命令行编译ncnn的过程中，也同样遇到了这样或那样的问题，不过所幸被Github上这条[issue](https://github.com/Tencent/ncnn/issues/2498)解决了，大体上只要按照issue作者提示的操作就不会出现问题。

&emsp;&emsp;首先在开始菜单下找到Visual Studio 2019的文件夹，打开x64 Native Tools Command Prompt这个VS 2019的命令行工具。

![操作步骤](/img/Configure-a-NCNN-Project/2.png)

&emsp;&emsp;下载 protobuf 3.4.0 的[源码](https://github.com/google/protobuf/archive/v3.4.0.zip)（不知道其它版本是否可行），解压，编译ncnn前需要编译protobuf。

```bash Command Prompt
// 进入protobuf-3.4.0文件夹
cd protobuf-3.4.0

// 新建build-vs2019文件夹并跳转进入
mkdir build-vs2019
cd build-vs2019

// cmake -DCMAKE_BUILD_TYPE参数也可设为debug，但总之要前后一致
cmake -G"NMake Makefiles" -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=%cd%/install ^
    -Dprotobuf_BUILD_TESTS=OFF ^
    -Dprotobuf_MSVC_STATIC_RUNTIME=OFF ../cmake
    
nmake
nmake install

// 返回上级文件夹，即protobuf-3.4.0文件夹之外
cd ..
cd ..
```

&emsp;&emsp;通过git克隆ncnn的源码并编译ncnn：

{% note warning %}
提示：请务必注意路径问题！
{% endnote %}

```bash Command Prompt
// 克隆远端仓库代码，放在ncnn文件夹下
git clone https://github.com/Tencent/ncnn.git

// 进入ncnn文件夹
cd ncnn

// 拉取submodule
git submodule update --init

// 新建build-vs2019文件夹并跳转进入
mkdir build-vs2019
cd build-vs2019

// 同上，-DCMAKE_BUILD_TYPE参数也可设为debug
cmake -G"NMake Makefiles" -DCMAKE_BUILD_TYPE=Release -DCMAKE_INSTALL_PREFIX=%cd%/install ^

// 更改为自己电脑上Protobuf对应文件夹所在的路径，注意：请务必改为绝对路径而不是相对路径！
    -DProtobuf_INCLUDE_DIR=E:/Project/protobuf-3.4.0/build-vs2019/install/include ^
    -DProtobuf_LIBRARIES=E:/Project/protobuf-3.4.0/build-vs2019/install/lib/libprotobuf.lib ^
    -DProtobuf_PROTOC_EXECUTABLE=E:/Project/protobuf-3.4.0/build-vs2019/install/bin/protoc.exe ^
// 更改为自己电脑上OpenCV3.4.5对应文件夹所在的路径，依然是注意绝对路径的问题
	-DOpenCV_DIR=E:/opencv/build/x64/vc15/lib ..
	
nmake
nmake install

// 返回上级文件夹，即ncnn文件夹之外
cd ..
cd ..
```

&emsp;&emsp;至此，运行此项目demo的环境构建工作就做好了，接下来就可以准备开始调试SOLOv2 ncnn的项目。

## 02 项目调试

&emsp;&emsp;与上一步相同，首先需要使用获得一份源码：

``` bash Command Prompt
git clone https://github.com/DayBreak-u/SOLOV2_ncnn.git
```

&emsp;&emsp;根据[项目主页](https://github.com/DayBreak-u/SOLOV2_ncnn)的README.md，执行前三行代码：
``` bash Command Prompt
cd ncnn

mkdir build
cd build 
cmake ..
```
&emsp;&emsp;如果存在报错信息如<code>CMake Error at CMakeLists.txt:xx (find_package):Could not find module FindOpenCV.cmake or a configuration file for package OpenCV.</code>则是没有寻找到OpenCV的CMake文件，可在文件中添加一行<code>set(OpenCV_DIR E:/opencv/build/x64/vc15/lib)</code> （请替换为自己OpenCV的路径）或者是配置OpenCV_DIR这一环境变量即可。提示<code>-- Configuring done</code>、<code>-- Generating done</code>时即意味着项目解决方案的成功生成。

&emsp;&emsp;下载模型权重：

> 链接: https://pan.baidu.com/s/1W1AiKdI4JJq2LW50uGOVng 密码: phh8

&emsp;&emsp;在Windows环境下，由于没有Linux下的GNU Make，所以我们直接用VS来编译代码：

### VS配置ncnn和opencv环境

&emsp;&emsp;点击<code>项目</code>-><code>属性</code>-><code>VC++目录</code>，在Release配置、x64平台下，根据自己目录的实际情况添加以下路径至<code>包含目录</code>：

{% note warning %}
注意：如果前文中您将protobuf、ncnn的源码编译为debug版本，则此处也要将其改为debug配置。
{% endnote %}

&emsp;&emsp;<code>E:\opencv\build\include</code>
&emsp;&emsp;<code>E:\opencv\build\include\opencv</code>
&emsp;&emsp;<code>E:\opencv\build\include\opencv2</code>
&emsp;&emsp;<code>E:\Project\ncnn\build-vs2019\install\include</code>
&emsp;&emsp;<code>E:\Project\ncnn\build-vs2019\install\include\ncnn</code>

&emsp;&emsp;同样，在<code>库目录</code> 中根据自身情况添加以下路径：

&emsp;&emsp;<code>E:\opencv\build\x64\vc15\lib</code>
&emsp;&emsp;<code>E:\Project\ncnn\build-vs2019\install\lib</code>

&emsp;&emsp;在<code>链接器</code>-><code>输入</code>中加入<code>ncnn.lib</code>、<code>opencv_world345.lib</code>这两个<code>附加依赖项</code>就可以进行下一步操作了。

### 修改代码

&emsp;&emsp;为方便运行demo查看效果，我对其进行了一定修改，以solov2.cpp为例（<del>才不是我没有测试过solov2_fast.cpp的原因呢</del>，哼o(~ヘ~o#)）：

&emsp;&emsp;根据前文下载的模型权重存储路径修改权重读取位置：

![修改代码](/img/Configure-a-NCNN-Project/3.png)

&emsp;&emsp;注释并重写main函数：
```c++ solov2.cpp
int main() {

    const char* imagepath = "E:/Project/SOLOV2_ncnn/imgs/horses.jpg";

    cv::Mat m = cv::imread(imagepath, 1);
    if (m.empty()) {
        fprintf(stderr, "cv::imread %s failed\n", imagepath);
        return -1;
    }

    std::vector <Object> objects;
    detect_solov2(m, objects);

    draw_objects(m, objects);

    return 0;
}
```
&emsp;&emsp;程序生成的结果result.png默认放在项目build文件夹下，如果您想要直观地看见程序运行的效果，可以将main函数上方原作者注释掉的两行代码取消注释：
&emsp;&emsp;<code>//    cv::imshow("image", image);</code>
&emsp;&emsp;<code>//    cv::waitKey(0);</code>

### 运行代码

&emsp;&emsp;做完上述操作后，在<code>解决方案资源管理器</code>中右键我们修改代码后的<code>solov2</code>并设为启动项目：

![修改代码](/img/Configure-a-NCNN-Project/4.png)

&emsp;&emsp;然后点击<code>本地Windows调试器</code>编译并运行程序。一般情况下，我们的<code>solov2.exe</code>就成功生成了。如果控制台打开提示找不到 <code>opencv_world345.dll</code>，就在<code>../opencv/build/x64/vc15/bin</code>文件夹下拷贝一份放在<code>../SOLOv2_ncnn/build/Release</code>下，该文件夹也是<code>solov2.exe</code>所在的地方。

&emsp;&emsp;运行窗口如图：

![运行窗口](/img/Configure-a-NCNN-Project/5.png)

&emsp;&emsp;运行效果如图：

![运行效果1](/img/Configure-a-NCNN-Project/horses.jpg "读取到的图片")

![运行效果2](/img/Configure-a-NCNN-Project/result.png "实例分割的结果")

