---
title: 使用Python读写XML文件
date: 2021-10-12 09:53:17
tags: [Python, 编程]
categories: 学习 
typora-root-url: ..
---

&emsp;&emsp;因学长所用的[某个针对yolov5的修改版训练网络](https://sao-kirito.top/2021/10/09/yolov5-dota-obb/)针对**宽高不等的图片无法作为数据正常送入网络进行训练**，而先期使用labelimg2标注工具所截取的图片往往都不是正方形，所以我要对之前处理的图片进行padding处理使之成为正方形。同时padding操作改变了图片的坐标系位置以及图片宽高属性，因此要对标签(XML文件)进行更新操作，而这涉及到对XML文件的读写，在网上查询相关资料后，我成功实现了预期目标。

<!--more-->

## 01 XML文件的结构

&emsp;&emsp;XML文件作为一种被设计为传输、存储结构化数据信息的文件结构，其语法简洁清晰，没有其它的预定义标签，以一个简单的XML文档为例：

``` xml testfile.xml
<?xml version="1.0" encoding="UTF-8"?>
<addressbook>
    <person gender = "male">
    	<name>Jack</name>
    	<id>01</id>
        <tel>10000</tel>
        <address>
            <province>Jiangsu</province>
            <city>Nanking</city>
        </address>
    </person>
    <person gender = "female">
    	<name>Maria</name>
    	<id>02</id>
        <tel>10001</tel>
        <address>
            <province>Anhui</province>
            <city>Hefei</city>
        </address>
    </person>
</addressbook>
```

&emsp;&emsp;其中第一行**必须**是**XML声明**，在文件的前面不能有其它元素或者注释，它定义 XML 的版本和所使用的编码方式，第二行开始是一个**根元素**，在这个例子中，根元素是<code>\<addressbook></code>...<code>\</addressbook></code>。接下来的<code>\<person></code>标签是根元素的**子元素**，而对应的，根元素为所有子元素的父元素。所有元素都有对应的子元素，都可以拥有文本内容和**属性**，例如<code>\<person></code>标签的属性名<code>gender</code>，其对应的属性值由双引号<code>"</code>括起来。

&emsp;&emsp;其它需要注意的内容诸如标签名大小写敏感、注释格式等可以参考其它网络文章：
&emsp;&emsp;[XML 树结构 (w3school.com.cn)](https://www.w3school.com.cn/xml/xml_tree.asp)
&emsp;&emsp;[XML文件结构和基本语法 - konglingbin - 博客园 (cnblogs.com)](https://www.cnblogs.com/klb561/p/9196515.html)
&emsp;&emsp;[XML - 廖雪峰的官方网站 (liaoxuefeng.com)](https://www.liaoxuefeng.com/wiki/1016959663602400/1017784095418144)

## 02 DOM解析XML文件

> 　　文件对象模型（Document Object Model，简称DOM），是W3C组织推荐的处理可扩展置标语言的标准编程接口。一个 DOM 的解析器在解析一个XML文档时，一次性读取整个文档，把文档中所有元素保存在内存中的一个树结构里，之后你可以利用DOM 提供的不同的函数来读取或修改文档的内容和结构，也可以把修改过的内容写入xml文件。python中用xml.dom.minidom来解析xml文件。

&emsp;&emsp;参考了几篇网络教程，废话不多说，直接上手开干！

### 读取
<div class="wrap">
	<div class="left">
```python Python代码
import xml.dom.minidom as minidom
import os

filepath = os.path.abspath("testfile.xml")
print("读取文件路径:", filepath)

# 建立DOM对象
objectTree = minidom.parse(filepath)

# 获取根元素(addressbook)
rootElement = objectTree.documentElement
print("变量类型:", type(rootElement))
print("根元素名:", rootElement.nodeName)

# 以名字获得子元素(person)
persons = rootElement.getElementsByTagName("person")

# 获取到的子元素以节点列表方式存储
print("变量类型:", type(persons))

# 利用索引号，可获取指定的某一个元素
Jack = persons[0]
print("节点列表中某一个元素的类型:", type(Jack))

# 元素属性的读取
print("Jack性别:", Jack.getAttribute("gender"))
# 通过节点获取属性
print("Jack性别:", Jack.getAttributeNode("gender").nodeValue)
# 文本内容的读取
tel = Jack.getElementsByTagName("tel")
print("tel:", tel[0].childNodes[0].data)

# 按照索引号获取元素
# childNodes[0]存储的内容为当前元素的文本节点
# 文本节点也被DOM视作某个元素的子元素
print(type(Jack.childNodes[0]))
print(type(Jack.childNodes[1]))
print(Jack.childNodes[1])

# 只有Text类型才具有.data方法，获得文本内容
print(type(Jack.childNodes[1].childNodes[0]))
print(Jack.childNodes[1].childNodes[0].data)
# 或者通过.nodeValue方法获得元素的文本，两者应该等价
print(Jack.childNodes[1].childNodes[0].nodeValue)

# 也可以通过for来遍历节点列表中的各个元素
print("\n遍历各个元素:")
for person in persons:
    name = person.getElementsByTagName("name")[0].childNodes[0].data
    gender = person.getAttribute("gender")
    id_number = person.getElementsByTagName("id")[0].childNodes[0].nodeValue
    tel = person.getElementsByTagName("tel")[0].childNodes[0].nodeValue
    address = person.getElementsByTagName("address")[0]
    province = address.childNodes[1].childNodes[0].data
    city = address.getElementsByTagName("city")[0].childNodes[0].data
    print("姓名: %s\t性别: %s\tid: %s\t电话: %s\t地址: %s省%s市"
          % (name, gender, id_number, tel, province, city))
```
	</div>
	<div class="middle"></div>

<div class="right">
``` bash 控制台输出




读取文件路径: C:\Users\*****\Desktop\xmltest\testfile.xml






变量类型: <class 'xml.dom.minidom.Element'>
根元素名: addressbook





变量类型: <class 'xml.dom.minicompat.NodeList'>



节点列表中某一个元素的类型: <class 'xml.dom.minidom.Element'>


Jack性别: male

Jack性别: male


tel: 10000




<class 'xml.dom.minidom.Text'>
<class 'xml.dom.minidom.Element'>
<DOM Element: name at 0x21cca71a700>


<class 'xml.dom.minidom.Text'>
Jack

Jack


遍历各个元素:








姓名: Jack	性别: male	id: 01	电话: 10000	地址: Jiangsu省Nanking市
姓名: Maria	性别: female	id: 02	电话: 10001	地址: Anhui省Hefei市
```
	</div>
</div>

<style type="text/css">
    .wrap {display: flex; justify-content: space-between;}
    .left {width: 59%;}
    .right {width: 39%;}
    .middle {background: #0; width: 2%; margin: 0 0;}
</style>

{% note warning %}
警告：在笔者所用的环境下，<code>.childNodes</code>方法会将子元素与子元素之间生成的空格与换行当作空白文本节点并入节点列表，以至于得不到预期的获取元素的效果。个人认为还是最好用<code>.getElementsByTagName</code>获取元素节点列表再通过索引获得元素。
{% endnote %}

### 写入/更新(追加、删除)

&emsp;&emsp;对于第一种情况，你需要调用<code>xml.dom.minidom.Document()</code>新建一个DOM对象。而在其他情况下，你只需要建立、删除或者更新元素节点或者文本内容节点的值，并挂在到对应的父元素上即可，代码如下：

```python
import xml.dom.minidom as minidom
import os

filepath = os.path.abspath("testfile.xml")
objectTree = minidom.parse(filepath)

# 获取根元素(addressbook)
rootElement = objectTree.documentElement

# 新建person元素并赋属性
person = objectTree.createElement("person")
person.setAttribute("gender", "male")

# 新建各个元素并设置文本内容
# 创建元素
name = objectTree.createElement("name")
# 创建文本节点
name_text = objectTree.createTextNode("Xiaoming")
# 将文本挂载在其元素之下
name.appendChild(name_text)

id_number = objectTree.createElement("id")
id_text = objectTree.createTextNode("03")
id_number.appendChild(id_text)

tel = objectTree.createElement("tel")
tel_text = objectTree.createTextNode("10002")
tel.appendChild(tel_text)

address = objectTree.createElement("address")
province = objectTree.createElement("province")
province_text = objectTree.createTextNode("Hubei")
city = objectTree.createElement("city")
city_text = objectTree.createTextNode("Wuhan")
address.appendChild(province)
address.appendChild(city)
province.appendChild(province_text)
city.appendChild(city_text)

person.appendChild(name)
person.appendChild(id_number)
person.appendChild(tel)
person.appendChild(address)

rootElement.appendChild(person)

persons = rootElement.getElementsByTagName("person")
print("\n遍历各个元素:")
for p in persons:
    name = p.getElementsByTagName("name")[0].childNodes[0].data
    gender = p.getAttribute("gender")
    id_number = p.getElementsByTagName("id")[0].childNodes[0].nodeValue
    tel = p.getElementsByTagName("tel")[0].childNodes[0].nodeValue
    address = p.getElementsByTagName("address")[0]
    province = address.getElementsByTagName("province")[0].childNodes[0].data
    city = address.getElementsByTagName("city")[0].childNodes[0].data
    print("姓名: %s\t性别: %s\tid: %s\t电话: %s\t地址: %s省%s市"
          % (name, gender, id_number, tel, province, city))

with open('modified.xml', 'w') as f:
    # 参数列表：文件 - 子元素缩进 - 编码 - 同级子元素之间插入的元素
    objectTree.writexml(f, addindent='  ', encoding='utf-8', newl=’\n’)
```

&emsp;&emsp;根据笔者测试，其能生成对应的元素，逻辑结构虽然没有发生错误：

``` bash 控制台输出
遍历各个元素:
姓名: Jack	性别: male	id: 01	电话: 10000	地址: Jiangsu省Nanking市
姓名: Maria	性别: female	id: 02	电话: 10001	地址: Anhui省Hefei市
姓名: Xiaoming	性别: male	id: 03	电话: 10002	地址: Hubei省Wuhan市
```
&emsp;&emsp;但仍存在其问题，由于读取XML文件时，元素之间的换行符与空格被当作文本内容(在DOM下同样被视作元素)，从而<code>.writexml</code>参数中的换行、缩进同样对其生效，导致新加的元素格式正常，而原来排版工整的元素出现了格式问题：

![换行](/img/2021-10-12-Use-Python-to-Read-and-Write-XML-files/01.png "换行问题")
<div align="center">换行问题</div>
<br>

![正常](/img/2021-10-12-Use-Python-to-Read-and-Write-XML-files/02.png "正常效果")
<div align="center">正常效果</div>

## 03 SAX解析XML文件

&emsp;&emsp;SAX，全称为Simple API for XML，它并非W3C官方所指定的一种标准，但是凭着其独特的事件处理模型，支持它的XML解析器也不在少数。与DOM相比，它的优势在于边解析边进行操作，不用像DOM一样将XML文件的整个对象树映射进内存中，占用资源较少。但缺陷在于需要用户自己动手重写回调函数（handler）以实现指定的操作，且根据我自己搜索到的资料，似乎SAX对于修改文件的数据——特别是指定位置的数据比较困难，中文资料可供参考的不多，而且大多是给的例子一模一样……

&emsp;&emsp;SAX包括readers、handlers以及input sources三个部分。readers负责读取sources里的内容，并在遇到标签开始/结束/内容时向handler发送对应的事件。而handler负责处理对应的事件，相关代码可以在<code>.\Python\Python[版本号]\Lib\xml\sax\handler.py</code>中看到。

&emsp;&emsp;SAX定义了四种handler，即content handler、DTD handler、error handler以及entity handler。笔者所学尚浅，只需要对xml文件中的内容进行处理即可。因此我们只需要重写content handler的类方法以执行我们需要的操作。

```python 重写回调函数
# 重写Handler类，继承自xml.sax.ContentHandler
class XmlHandler(xml.sax.ContentHandler):
    def __init__(self):
        self.currentData = ""
        self.gender = ""
        self.name = ""
        self.id = ""
        self.province = ""
        self.city = ""
        
    # 遇到元素的开始标签<...>时调用，tag是标签名字，attribute是属性值字典    
    def startElement(self, tag, attribute):
        self.currentData = tag
        if tag == "person":
            print("******")
            self.gender = attribute["gender"]
            if self.gender == "male":
                print("男性:")
            else:
                print("女性:")
        else:
            pass
        
	# 遇到元素的结束标签</...>时调用
    def endElement(self, tag):
        if tag == "name":
            print("姓名:", self.name)
        elif tag == "id":
            print("id:", self.id)
        elif tag == "province":
            print("省份:", self.province)
        elif tag == "city":
            print("市区:", self.city)
        else:
            pass

        self.currentData = ""

    # 遇到元素的内容时调用
    def characters(self, content):
        if self.currentData == "name":
            self.name = content
        elif self.currentData == "id":
            self.id = content
        elif self.currentData == "province":
            self.province = content
        elif self.currentData == "city":
            self.city = content
        else:
            pass

```
&emsp;&emsp;然后我们来实战验证一下我们的代码：

```python
import xml.sax


class XmlHandler(xml.sax.ContentHandler):
    ...
    ...
    ...
    
# 创建并返回一个解析器对象(SAX XMLReader)
parser = xml.sax.make_parser()

# 关闭namespaces模式，即取消对xml文件中命名空间的处理
parser.setFeature(xml.sax.handler.feature_namespaces, 0)

# 设置当前的ContentHandler为自己重写的Handler
handler = XmlHandler()
parser.setContentHandler(handler)

# 开始解析xml文件
parser.parse("testfile.xml")
```

效果展示：
```bash 控制台输出
******
男性:
姓名: Jack
id: 01
省份: Jiangsu
市区: Nanking
******
女性:
姓名: Maria
id: 02
省份: Anhui
市区: Hefei
```







## 04 ElementTree解析XML文件

### 施工中。。。