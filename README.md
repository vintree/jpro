#Lazing


Lazing迎来了第二个版本重大更新，核心算法重新设计，提高算法强度，对多种可能进行预判，代码更加简介。

它是一个非常轻的组件，但他很强大！

####	能做什么？ ####
*	页面初始化时，文字，图片由隐藏渐变到显示，同事位置进行移动，简单配置即可
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

------------

[![](http://image.jobcn.com/images/hr/2014/6/210048_4.jpg '搜狐视频')](http://tv.sohu.com/)

------------

wuguzix@foxmail.com

五谷子

