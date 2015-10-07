/**
    2015-10-06
    lazing V 0.1
    wuguzix@foxmail.com
    
    TODO1 脱离jQuery
    TODO2 滚动慢偏移
*/
;(function($, g) {
    'use strict';
    var lazy = {
        lets: {
            name: '.lazy',//作用对象
            time: 1000,//执行时间
            delay: 0,//延迟时间
            offset: '20',//偏移量
            orien: 'left',//方向
            lazy: false,//是否支持赖加载
            repe: false,//是否支持重复
            view: false,//是否在视口
            action: false,//是否支持缓动
            easing: 'swing'
        },
        config: [],//不支持懒加载
        lazyconfig: [],//支持懒加载
        setConfig: function() {//分配数据类型
            var i = 0,
                l = arguments[0].length,
                o = null,
                t = {};
            for(; i < l; i++) {
                for(o in this.lets) {
                    if(arguments[0][i].hasOwnProperty(o)) {
                        t[o] = arguments[0][i][o] || this.lets[o];
                    }
                    else {
                        t[o] = this.lets[o];
                    }
                }
                if(t.lazy) {
                    this.lazyconfig.push(t);
                    this.register[t.name] = {
                        view: t.view,
                        repe: t.repe
                    };
                }
                else {
                    this.config.push(t);
                }
                t = {};
            }
        },
        hide: function() {//初始化隐藏
            var l = arguments[0].length,
                i = 0;
            for(; i < l; i++) {
                $(arguments[0][i].name).css('opacity', 0);
            }
        },
        working: function() {//效果工厂       
            var dom = null, //DOM对象
                to = null, //临时对象
                cl = arguments[0].length, //config长度
                i = 0,//下标
                s = null,//缓存初始style
                ts = null,//改变的style
                is = null,//初始的style
                tis = null;//真是的style
            for(; i < cl; i++) {
                s = {};
                ts = {};
                is = {};
                tis = {};
                to = arguments[0][i];
                dom = $(to.name);
                s = dom.attr('style');
                //TODO 没有设置position的orien无效
                is['position'] = dom.css('position') === 'static' ? 'relative' : dom.css('position');
//                is['opacity'] = dom.css('opacity');
                is['opacity'] = 1;
                is[to.orien] = dom.css(to.orien) === 'auto' ? '0' : dom.css(to.orien);                
                //TODO 根据DOM初始量进行改进
                ts = {
                    position: is['position'],
                };
                //设置你们位置
                ts[to.orien] = parseInt(to.offset, 10) + parseInt(is[to.orien], 10) + "px";
                dom.css(ts);
                dom.show();
                dom.animate(is, to.time, to.easing, function() {
//                    s === undefined ? dom.removeAttr('style') : dom.attr('style', s); 
                });
            }
            this.lazy();
        },
        
        unlazy: function() {//不需要懒加载
            this.working(this.config);
        },
        
        lazy: function() {//需要懒加载            
            var parentThis = this,
                c = parentThis.lazyconfig,
                l = c.length,
                i = 0,
                t = null,           
                viewH = $(window).height(),//窗口高度
//                viewW = $(window).width(),//窗口宽度
                viewT = $(window).scrollTop(),
//                viewL = $(window).scrollLeft(),
                clienH = null,
                clienW = null,
                clienT = null,
                clienL = null;
//                console.log("window: ", viewH, viewW, viewT, viewL);
                for(; i < l ; i++ ) {
                    t = c[i];
                    clienH = $(t.name).height();
                    clienW = $(t.name).width();
                    clienT = $(t.name).scrollTop() || $(t.name)[0].offsetTop;
                    clienL = $(t.name).scrollLeft() || $(t.name)[0].offsetLeft;
//                    console.log(viewH + viewT > clienT);                    
                    if(parentThis.register[t.name].view) {
                        if( !( (viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0 ) ) {
                            if(parentThis.register[t.name].repe) {
                                parentThis.hide([t]);
                                parentThis.register[t.name].view = false;
                            }
                        }
                    }
                    else {
                        if( (viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0 ) { //在视口中
                            parentThis.register[t.name].view = true;
                            parentThis.working([t]);
                        }
                    }
//                    console.log("clien: ", clienH, clienW, clienT, clienL);
                }                
        },
        srcoll: function() {//滚动监控
            var parentThis = this;
            parentThis.lazy();
            $(window).on('scroll', function() {
                parentThis.lazy();
            });
        },
        register: {//懒加载注册
        },
        init: function() {//初始化
            this.setConfig(arguments[0]);
            this.hide(arguments[0]);
            this.unlazy();
            this.srcoll();
        }
    }
    window.lazy = lazy;    
})(jQuery, window);