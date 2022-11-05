---
title: 用VS 2019打包dll文件
date: 2021-09-29 08:59:39
tags: 编程
categories: 学习
typora-root-url: ..
---

&emsp;&emsp;最近在看学长接手的[形状匹配(shape based matching)C++工程](https://sao-kirito.top/2021/09/15/shape_based_matching/)，虽然看懂的不多，但是被要求将部分代码打包封装成dll，暴露简洁的接口供调用者使用。
&emsp;&emsp;在流程上，我参考了另一位师兄给的[链接](https://blog.csdn.net/weixin_42435145/article/details/104199125)里的步骤。现结合具体工程记述如下：<!--more-->

## 创建dll项目

&emsp;&emsp;打开Visual Studio 2019，在界面中选择<code>创建新项目(<u>N</u>)</code>。

![创建新项目](/img/How-to-Package-a-dll/01.png)

&emsp;&emsp;随后选择<code>动态链接库</code>项目，按照步骤依次将项目名称、位置以及解决方案名称设置好。创建完成后结构如图所示：

![创建完成](/img/How-to-Package-a-dll/02.png)

## 引入调用的文件、配置项目所需的OpenCV库文件

&emsp;&emsp;将原项目中所有<code>.h</code>的头文件复制到该解决方案所在的文件夹中，并右键单击解决方案的<code>头文件</code>-><code>添加</code>-><code>现有项</code>，将这些头文件添加进解决方案中，所有被调用到的<code>.cpp</code>也进行相同的操作。完成之后的结果如下：

![引入头文件与源文件](/img/How-to-Package-a-dll/03.png)

&emsp;&emsp;由于此项目涉及图像处理最常用的OpenCV库，打包dll也需要进行相应的环境配置。点击VS菜单栏的<code>视图(V)</code>-><code>属性管理器</code>，右键单击本项目，选择<code>添加新项目属性表</code>，添加后双击该属性表进行编辑。在<code>VC++目录</code>的包含目录中配置路径如下：

<div align = "center"><code>..\OpenCV\build\include</code>
</div>

<div align = "center"><code>..\OpenCV\build\include\opencv</code>
</div>

<div align = "center"><code>..\OpenCV\build\include\opencv2</code>
</div>

&emsp;&emsp;在库目录中配置路径为：<code>..\OpenCV\build\x64\vc15\lib </code>

&emsp;&emsp;在<code>链接器</code>-><code>输入</code>的附加依赖项中添加<code>opencv_world346d.lib</code>（在Release版本下则是<code>opencv_world346.lib</code>）。

&emsp;&emsp;这样，我们所有的先期准备工作就做好了。

## 编写dll函数

&emsp;&emsp;在<code>pch.h</code>文件中，需要写上准备调用的函数声明，由于这些函数也要调用各自的头文件，因此可以把它们集中放在这个文件里，而在源文件中只需要包含<code>pch.h</code>即可。

```c++ pch.h
#ifndef PCH_H
#define PCH_H

// 添加要在此处预编译的标头
#include "framework.h"
#include <string>
#include "line2Dup.h"
#include <memory>
#include <assert.h>
#include <chrono>

using namespace std;
using namespace cv;

struct point{
	float x;
	float y;
};

struct recognizedObjectLocation
{
	point topleft;
	point center;
	float angle;
	float scale;
};

extern "C" _declspec(dllexport) void train(
				string imgLocation, 
				string saveTemplateDIR, 
				int num_feature, Rect roi, int padding, 
				string class_id);
_declspec(dllexport) vector<recognizedObjectLocation> test(
				string testImgLocation, 
				string loadTemplateDir, int num_feature, 
				Rect train_roi, int train_padding, string class_id, 
				int score_thershold, int nms_thershold);
#endif //PCH_H
```

&emsp;&emsp;此处工作基本上是按部就班地参考网上教程而来的，在声明函数前，则需要添加上<code>extern "C" _declspec(dllexport)</code>这样的语句，而函数的返回值为C++类型时，譬如我这里自定义的recognizedObjectLocation类型的vector容器，就可以删去<code>extern "C"</code>的语句，否则会产生相应的报错，此处我也不甚了解，只是找到了网上给的解决方法而已。

&emsp;&emsp;在<code>pch.cpp</code>中，我们需要对自己编写的函数进行实现。需要注意的是：即使函数没有实现，在编译生成时，VS并不会报错而是正常生成对应的<code>.lib</code>与<code>.dll</code>文件，直到调用dll的代码进行编译时才会产生链接过程中的错误<code>LNK 2001 无法解析的外部符号...</code>。（小插曲：这段问题是我自己在编写dll过程中所遇到的问题，由于在函数声明和编写函数时，我所写的函数设置的参数数量不一样，被编译器视作不同的函数，所以链接时才找不到函数定义。）
{% note info no-icon 函数实现代码pch.cpp %}
```c++ pch.cpp
// pch.cpp: 与预编译标头对应的源文件

#include "pch.h"
namespace  cv_dnn {
	namespace
	{

		template <typename T>
		static inline bool SortScorePairDescend(const std::pair<float, T>& pair1,
			const std::pair<float, T>& pair2)
		{
			return pair1.first > pair2.first;
		}

	} // namespace

	inline void GetMaxScoreIndex(const std::vector<float>& scores, const float threshold, 
                                 const int top_k,std::vector<std::pair<float, int> >& score_index_vec)
	{
		for (size_t i = 0; i < scores.size(); ++i)
		{
			if (scores[i] > threshold)
			{
				score_index_vec.push_back(std::make_pair(scores[i], i));
			}
		}
		std::stable_sort(score_index_vec.begin(), score_index_vec.end(),
			SortScorePairDescend<int>);
		if (top_k > 0 && top_k < (int)score_index_vec.size())
		{
			score_index_vec.resize(top_k);
		}
	}

	template <typename BoxType>
	inline void NMSFast_(const std::vector<BoxType>& bboxes,
		const std::vector<float>& scores, const float score_threshold,
		const float nms_threshold, const float eta, const int top_k,
		std::vector<int>& indices, float (*computeOverlap)(const BoxType&, const BoxType&))
	{
		CV_Assert(bboxes.size() == scores.size());
		std::vector<std::pair<float, int> > score_index_vec;
		GetMaxScoreIndex(scores, score_threshold, top_k, score_index_vec);

		// Do nms.
		float adaptive_threshold = nms_threshold;
		indices.clear();
		for (size_t i = 0; i < score_index_vec.size(); ++i) {
			const int idx = score_index_vec[i].second;
			bool keep = true;
			for (int k = 0; k < (int)indices.size() && keep; ++k) {
				const int kept_idx = indices[k];
				float overlap = computeOverlap(bboxes[idx], bboxes[kept_idx]);
				keep = overlap <= adaptive_threshold;
			}
			if (keep)
				indices.push_back(idx);
			if (keep && eta < 1 && adaptive_threshold > 0.5) {
				adaptive_threshold *= eta;
			}
		}
	}


	// copied from opencv 3.4, not exist in 3.0
	template<typename _Tp> static inline
		double jaccardDistance__(const Rect_<_Tp>& a, const Rect_<_Tp>& b) {
		_Tp Aa = a.area();
		_Tp Ab = b.area();

		if ((Aa + Ab) <= std::numeric_limits<_Tp>::epsilon()) {
			// jaccard_index = 1 -> distance = 0
			return 0.0;
		}

		double Aab = (a & b).area();
		// distance = 1 - jaccard_index
		return 1.0 - Aab / (Aa + Ab - Aab);
	}

	template <typename T>
	static inline float rectOverlap(const T& a, const T& b)
	{
		return 1.f - static_cast<float>(jaccardDistance__(a, b));
	}

	void NMSBoxes(const std::vector<Rect>& bboxes, const std::vector<float>& scores,
		const float score_threshold, const float nms_threshold,
		std::vector<int>& indices, const float eta = 1, const int top_k = 0)
	{
		NMSFast_(bboxes, scores, score_threshold, nms_threshold, eta, top_k, indices, rectOverlap);
	}

}
// 当使用预编译的头时，需要使用此源文件，编译才能成功。
void train(string imgLocation, string saveTemplateDir, int num_feature, Rect roi, int padding, string class_id)
{
	line2Dup::Detector detector(num_feature, { 4, 8 });

	// read the img
	Mat img = imread(imgLocation);
	assert(!img.empty() && "check your img path");
	// cut the object out of img, location depends on "roi"
	img = img(roi).clone();

	Mat mask = Mat(img.size(), CV_8UC1, { 255 });

	// padding to avoid rotating out
	cv::Mat padded_img = cv::Mat(img.rows + 2 * padding, img.cols + 2 * padding, img.type(), cv::Scalar::all(0));
	img.copyTo(padded_img(Rect(padding, padding, img.cols, img.rows)));
	cv::Mat padded_mask = cv::Mat(mask.rows + 2 * padding, mask.cols + 2 * padding, mask.type(), cv::Scalar::all(0));
	mask.copyTo(padded_mask(Rect(padding, padding, img.cols, img.rows)));

	shape_based_matching::shapeInfo_producer shapes(padded_img, padded_mask);
	shapes.angle_range = { 0, 360 };    // 模板库角度范围
	shapes.angle_step = 1;  // 模板库角度步长
	//shapes.scale_range = { 0.9f, 1.1f };  // 模板库尺度范围
	//shapes.scale_step = 0.05f;     模板库尺度步长
	shapes.scale_range = { 1.0f };
	shapes.produce_infos();
	std::vector<shape_based_matching::shapeInfo_producer::Info> infos_have_templ;

	bool is_first = true;
	// for other scales you want to re-extract points: 
	// set shapes.scale_range then produce_infos; set is_first = false;
	int first_id = 0;
	float first_angle = 0;
	float first_scale = 0;

	for (auto& info : shapes.infos) {
		Mat to_show = shapes.src_of(info);
		int templ_id = detector.addTemplate(shapes.src_of(info), class_id, shapes.mask_of(info),
			int(num_feature * info.scale));

		if (templ_id != -1) {
			auto templ = detector.getTemplates(class_id, templ_id);
			for (int i = 0; i < templ[0].features.size(); i++) {
				auto feat = templ[0].features[i];
				cv::circle(to_show, { feat.x + templ[0].tl_x, feat.y + templ[0].tl_y }, 3, { 0, 0, 255 }, -1);
			}
			infos_have_templ.push_back(info);
		}

		if (fabs(info.scale - first_scale) > 0.002f)
		{
			is_first = true;
		}
		// .../class_id_templ.yaml
		detector.writeClasses(saveTemplateDir + class_id + "_templ.yaml");  // 模板库
		shapes.save_infos(infos_have_templ, saveTemplateDir + class_id + "_info.yaml");   // 模板信息
	}
}

vector<recognizedObjectLocation> test(string testImgLocation, string loadTemplateDir, int num_feature, 
                                      Rect train_roi, int train_padding, string class_id, 
                                      int score_thershold = 90, int nms_thershold = 0)
{
	vector<recognizedObjectLocation> ObjLocations;


	std::vector<std::string> ids;
	ids.push_back(class_id);
	line2Dup::Detector detector(num_feature, { 4, 8 });
	detector.readClasses(ids, loadTemplateDir + class_id + "_templ.yaml");
	auto infos = shape_based_matching::shapeInfo_producer::load_infos(loadTemplateDir + class_id + "_info.yaml");

	Mat test_img = imread(testImgLocation);
	assert(!test_img.empty() && "check your img path");
	// padding to avoid rotating out
	int padding = 0;
	cv::Mat padded_img = cv::Mat(test_img.rows + 2 * padding,
		test_img.cols + 2 * padding, test_img.type(), cv::Scalar::all(0));
	test_img.copyTo(padded_img(Rect(padding, padding, test_img.cols, test_img.rows)));
	int stride = 32;
	int n = padded_img.rows / stride;
	int m = padded_img.cols / stride;
	Rect roi(0, 0, stride * m, stride * n);
	Mat img = padded_img(roi).clone();
	assert(img.isContinuous());

	auto matches = detector.match(img, score_thershold, ids);

	vector<Rect> boxes;
	vector<float> scores;
	vector<int> idxs;

	for (auto match : matches) {
		Rect box;
		box.x = match.x;
		box.y = match.y;

		auto templ = detector.getTemplates(class_id, match.template_id);

		box.width = templ[0].width;
		box.height = templ[0].height;
		boxes.push_back(box);
		scores.push_back(match.similarity);
	}

	cv_dnn::NMSBoxes(boxes, scores, score_thershold, nms_thershold, idxs);

	for (auto idx : idxs)
	{
		auto match = matches[idx];
		auto templ = detector.getTemplates(class_id,  // 读取训练好的模板类
			match.template_id);

		recognizedObjectLocation obj;

		obj.topleft.x = match.x;
		obj.topleft.y = match.y;
// Update 21/10/5 今天才发现train_roi这里写错了，应该是train_roi.weight 和 train_roi.height
		float train_img_half_width = train_roi.x / 2.0f + train_padding;
		float train_img_half_height = train_roi.y / 2.0f + train_padding;
		obj.center.x = match.x - templ[0].tl_x + train_img_half_width;
		obj.center.y = match.y - templ[0].tl_y + train_img_half_height;

		obj.angle = 360 - infos[match.template_id].angle;
		obj.scale = infos[match.template_id].scale;

		ObjLocations.push_back(obj);
	}

	return ObjLocations;
}
```
{% endnote %}
&emsp;&emsp;另外，我把line2Dup.cpp中一些输出语句注释掉了，屏蔽掉控制台的输出。而TerryJoe学长解释了代码中各个坐标系下变换中公式的由来，现一并粘贴于此（无关信息已马赛克处理。）
![说明](/img/How-to-Package-a-dll/04.png)

## 生成dll文件

&emsp;&emsp;点击<code>本地Windows调试器</code>，若提示错误：<code>在查找预编译头时遇到意外的文件结尾。是否忘记了向源中添加“#include”pch.h”</code>，则点击菜单栏中的<code>项目</code>-><code>项目名属性</code>-><code>C/C++</code>-><code>预编译头</code>，将右侧的预编译头由<code>使用(/Yu)</code>调换到<code>不使用预编译头</code>，然后点击<code>应用</code>-><code>确定</code>。
&emsp;&emsp;再次运行时即能正确运行，若输出显示<code>========== 生成: 成功 1 个，失败 0 个，最新 0 个，跳过 0 个 ==========</code>即为成功，此时会弹出错误框，显示<code>无法启动dll，dll不是有效的Win32应用程序。</code>我们关闭即可，dll必须由其他程序调用。此时我们在项目目录中的Debug或Release目录下即找到生成的<code>.dll</code>文件。

## 调用dll文件
&emsp;&emsp;现在创建一个空的工程项目，创建主程序调用上述函数。

```C++ test.cpp
#include "pch.h"
#include <vector>
using namespace std;

int main()
{
	string imgLocation = "D:/Work/202109/shape_match_fusion/test/case3/train.jpg";
	string saveTemplateDir = "D:/Work/202109/shape_match_fusion/test/case3/temp/";
	int num_feature = 16;
	Rect roi(90, 35, 65, 35);
	int padding = 25;
	string class_id = "gongjian";

	train(imgLocation, saveTemplateDir, num_feature, roi, padding, class_id);
	cout << "已生成模板库文件" << endl;

	string testImgLocation = "D:/Work/202109/shape_match_fusion/test/case3/ori.jpg";
	vector<recognizedObjectLocation> ObjLocations;
	ObjLocations = test(testImgLocation, saveTemplateDir, num_feature, roi, padding, class_id);

	for (auto &i : ObjLocations)
	{
		cout << "物体左上角点横坐标：" << i.topleft.x << endl;
		cout << "物体左上角点纵坐标：" << i.topleft.y << endl;
		cout << "物体中心点横坐标：" << i.center.x << endl;
		cout << "物体中心点纵坐标：" << i.center.y << endl;
		cout << "物体顺时针旋转角度：" << i.angle << endl;
		cout << "物体尺度大小变化：" << i.scale << endl;
		cout << "-----------------------------" << endl;
	};
	return 0;
}
```

&emsp;&emsp;将dll项目中的各个头文件添加进测试项目之中。将第四步中生成的<code>.dll</code>、<code>.lib</code>文件粘贴于调用函数程序同一文件夹下，如图所示：

![项目结构](/img/How-to-Package-a-dll/05.png)

&emsp;&emsp;然后按照第二步里的方法，添加OpenCV库，并在<code>链接器</code>-><code>输入</code>的附加依赖项中额外添加之前生成的<code>.lib</code>文件。

&emsp;&emsp;最后运行程序即可：

![项目结构](/img/How-to-Package-a-dll/06.png)

