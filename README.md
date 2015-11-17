#Jpro「原lazing项目」

####  「新」jpro bate1.1 (2015年11月17日) ####
说明：

*	压缩文件：dist/js/src/jpro.min.js
*	源文件：dist/js/src/jpro.js
*	使用前先加载jQeury
*	「demo」src/html/demo1.html

[点击进入「对象API」wiki](https://github.com/wuguzi/jpro/wiki/API)
#####	「日志」 	#####
*	优化底层引擎复用性
*	更改内核策略
*	更改内存回收策略
*	修复部分bug

#####	「API」 	#####
「对象API」

*	_on()	
*	_animation()
*	_unormal()
*	_normal()

「方法API」

*	sdPrivateProperty()
*	sdKernel()
*	sdIsPX()
*	sdIsDEG()
*	sdIsBlock()
*	sdUuid()
*	sdGroup()
*	sdCleanGroup()
*	sdGetOption()	

#####	「注意」 	#####
*	测试版请勿使用到项目中，现阶段仅供学习参考，得到充分测试后发布正式版
*	原版API对比参考Lazing V2版

---------------------------------------------------------------------------------

####  「新」jpro bate1.0 (2015年11月9日) ####
jpro 由 amazing 和 lazing项目合并而来.

目前发布在lazing项目中,后续将移至jpro项目中

####   「新增」monkey内核   ####
lazing是在jQuery的animation上进行了一层封装,同时进行了几次升级,在V2版效果达到预期,但在与amazing合并时遇到了性能和当初设计的扩展性等问题,所以放弃了animation作为jpro的底层动画引擎,重新写了一套动画引擎叫:monkey.

####   「补充」文档   ####
*	后续补充api
*	使用技巧
*	运用实例


---------------------------------------------------------------------------------

####   「预告」2015年10月29日   ####
*   api重新设计，更加贴近jQuery，Zepto语法
*   提供更多api
*   放弃使用animation「jQuery」方法（jQuery3.X考虑使用animation，其余jq版本不再使用），使用性能更好的解决方案
*   将amazing项目合并进来，以高性能效果为主，懒加载为辅策略，这样更加符合需求
*   「放弃」config配置调用方法
*   「放弃」部分配置属性

####   「目的」解决效果难题，把更多的精力放到业务上   ####
*   让有技术支持的团队，更加快速搭建起「搜狐快站，易企秀」等第三方服务的效果，提供更底层支持
*   追求效果更好的网站

####   「希望」欢迎大神的加入   ####
*   能css3制作出icon效果的css大神
*   对requestAnimationframe有所研究
*   对repaint、reflow机制和main thred、compositor thread性能关系有所研究
*   对浏览器引擎机制、渲染机制、线程机制有所研究

####   「注意」请斟酌使用该组件   ####
*   现在版本（V2）与将来版本有很大改变，如果现在版本能符合需要请斟酌使用
*   现在版本不再维护


Lazing迎来了第二个版本重大更新，核心算法重新设计，提高算法强度，对多种可能进行预判，代码更加简介。


####	能做什么？ ####
*	页面初始化时，文字，图片由隐藏渐变到显示，同时位置进行移动，简单配置即可
*	当DOM未在视口中，DOM效果被注册（不影响浏览器性能），移入视口进行加载
*	移出视口再次移入视口，再次触发效果
*	不想配置？绑定DOM名字即可

> **可自定义支持**
> 
> - DOM对象定义(eq: .lazy || #lazy || body > .lazy || .. 等)
> - 执行时间（ms）
> - 延迟时间（未支持）
> - 偏移量（只支持px）
> - 方向（上下左右）
> - 是否开启懒加载(在视口时加载和初始化时)
> - 是否开启重复模式（再次移入视口时再次加载）
> - 初始隐藏度*
> - 最后隐藏度*

使用方法
====

| arguments   | 作用  | 默认值 | 类型   | 
| ------- | :----: | :---: | ---: |
| name  |  支持jQueryDOM查询命名规则  | .lazy |  string    |
| time   | 执行时间 | 1000   |  num  |
| delay   | 延迟加载时间 | 未支持   |  ...  |
| offset  |  偏移量(仅支持px)  |  200  |  num |
| orien  |  偏移方向(上下左右)  |  left  |  string |
| lazy  |  是否开启懒加载模式  |  false  |  boo |
| repe  |  是否开启重复模式  |  false  |  boo |
| startOpacity* | 初始隐藏度 | 0 | num |
| endOpacity* | 最后隐藏度 | 1 | num |

```
//首先在</body>之前引入一下组件，lazing依赖jquery，简单效果在demo1.html中
	<script src="jquery.min.js"></script>
	<script src="lazing.min.js"></script>
	<script>
		lazy.init([
        {
            name: '.index-nav-li',
            time: 1000,//执行时间
            delay: 0,//延迟时间
            offset: '100',//偏移量
            orien: 'left',//方向
            lazy: true,//是否支持赖加载
            repe: false,//是否支持重复
            startOpacity: 0.3,//起始隐藏
            endOpacity: 0.8//结束隐藏
        }
    ]);  
	</script>

```

更新
======
2015年10月16日 v0.2

*	「新增」一个demo实例，可体现组件的强大！
*	「更新」可设置初始化隐藏度和最后隐藏度（startOpacity，endOpacity）
*	「更新」将DOM名称注册改为真实DOM对象注册
*	
* 「bug 」修复多层容器加载时orien累加问题
* 「bug 」修复例如一个class对应多个DOM，无法独立监控问题 


2015年10月05日 v0.1

新的开始


[![](http://image.jobcn.com/images/hr/2014/6/210048_4.jpg '搜狐视频')](http://tv.sohu.com/)


wuguzix@foxmail.com

五谷子

