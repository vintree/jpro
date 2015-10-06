#Lazing

Lazing灵感来自lazyload、苹果官网效果，

能够快速搭建出Apple官网的图片文字效果

> **可自定义支持**
> 
> - DOM对象定义(eq: .lazy || #lazy || body > .lazy || .. 等)
> - 执行时间（ms）
> - 延迟时间（未支持）
> - 偏移量（只支持px）
> - 方向（上下左右）
> - 是否开启懒加载(在视口时加载和初始化时)
> - 是否开启重复模式（再次移入视口时再次加载）


使用方法
====

| arguments   | 作用  | 默认值 | 类型   | 
| :------- | ----: | :---: |
| name  |  支持jQueryDOM查询命名规则  | .lazy |  string    |
| time   | 执行时间 | 1000   |  num  |
| delay   | 延迟加载时间 | 未支持   |  ...  |
| offset  |  偏移量(仅支持px)  |  200  |  num |
| orien  |  偏移方向(上下左右)  |  left  |  string |
| lazy  |  是否开启懒加载模式  |  false  |  boo |
| repe  |  是否开启重复模式  |  false  |  boo |

```
//首先在</body>之前引入一下组件，lazing依赖jquery，简单效果在index.html中
	<script src="jquery.min.js"></script>
	<script src="lazing.min.js"></script>
	<script>
		lazy.init([
        {
            name: '.lazy1',//作用对象
            time: 1000,//执行时间
            offset: '200',//偏移量
            orien: 'top',//方向
            lazy: true,//是否支持赖加载
            repe: true,//是否支持重复
        },
        {
            name: '.lazy2',//作用对象

        },
        {
            name: '.lazy'
        },
        {
            name: '#div',
            lazy: true,
            repe: true
        }
    ]);  
	
	</script>

```

更新
======


2015年10月05日 v0.1

新的开始

------------

[![](http://www.ad-cn.net/photo/85211406170613.jpg =100x100 '搜狐视频')](http://tv.sohu.com/)

------------

wuguzix@foxmail.com

五谷子

