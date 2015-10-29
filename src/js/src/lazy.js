/**
    2015-10-25
    lazing V 0.21
    wuguzix@foxmail.com
*/
$.fn.lazing = function(options, lazy, repe) {
    var DOM = this,
        stor = 'lazing_register',
        lazing = {
        lets: {
            time: 1000,//执行时间
            delay: 0,//延迟时间
            offset: '20',//偏移量
            orien: 'left',//方向
            lazy: false,//是否支持赖加载
            action: false,//是否支持缓动
            startOpacity: 0,//默认起始隐藏
            endOpacity: 1,//默认结束隐藏
            repe: false,//是否支持重复
            view: false,//是否在视口
            ani: 0//没有进行动画  0-空闲，1-启动，2-进行中
        },
        config: [],//不支持懒加载
        lazyConfig: [],//支持懒加载
        setConfig: function(options) {//分配数据类型
            var tmpe = {},
                uuid = null,
                domIX;
//            uuid = $._random(4);//唯一标识码
//            tmpe.dom = DOM;//缓存对象
            if(lazy) {
                for(domIX = DOM.length; domIX--;) {//分离一个class对应多个DOM
                    uuid = $.skyFun.uuid(4);//唯一标识码
                    tmpe.dom = DOM.eq(domIX);//缓存对象
                    tmpe.css = DOM.eq(domIX).attr('style');
                    this.register[uuid] = {
                        view: false,//视口
                        repe: repe,//重复
                        ani: 0,//动画状态
                        dom: DOM.eq(domIX)//对象
                    }
                    
                    console.log(uuid);
                    
                    
                    
//                    console.log($._register[DOM.eq(domIX)] = uuid);
                }
            }
            
//            console.log(DOM);
//            
//            console.log($._register[uuid] = uuid);
            
            
            
//            for(o in this.lets) {//扫描属性
//                t[o] = options && options[o] || this.lets[o];
//            }
//            t.dom = Obj;
//            if(t.lazy) {
//                dom = Obj;
//                for(var di = 0, dl = dom.length; di < dl; di++) {//分离一个class对应多个DOM
//                    var temp = {};
//                    for(var s in t) {//复制t
//                        temp[s] = t[s];
//                    }
//                    tag = $._random(4);
//                    temp.tag = tag;
//                    temp.dom = dom.eq(di);
//                    arr.push(temp);
//                    this.lazyConfig.push(temp);
//                    this.register[tag] = {
//                        view: temp.view,
//                        repe: temp.repe,
//                        ani: temp.ani,
//                        dom: temp.dom
//                    };
//                }
//            }
//            else {
//                this.config.push(t);
//            }
//            t = {};
        },
        hide: function() {//初始化隐藏
            var arr = arguments[0] || this.config.concat(this.lazyConfig),
                l = arr.length,
                i = 0;
            for(; i < l; i++) {
//                    $(arr[i].name).css('opacity', arr[i].startOpacity);
                DOM.css('opacity', arr[i].startOpacity);
            }
        },
        factory: function() {//效果工厂       
            var parentThis = this,
                dom = null, //DOM对象
                to = null, //临时对象
                cl = arguments[0].length, //config长度
                i = 0,//下标
                s = null,//缓存初始style
                ts = null,//改变的style
                is = null,//初始的style
                tis = null;//真是的style
            for(; i < cl; i++) {
                to = arguments[0][i];
                s = {};
                ts = {};
                is = {};
                tis = {};
                dom = to.dom;
                s = dom.attr('style');
                //TODO 没有设置position的orien无效
                is.position = dom.css('position') === 'static' ? 'relative' : dom.css('position');
                is.opacity = to.endOpacity;
                is[to.orien] = dom.css(to.orien) === 'auto' ? '0' : dom.css(to.orien);                
                //TODO 根据DOM初始量进行改进
                ts = {
                    position: is.position
                };
                //设置你们位置
                ts[to.orien] = parseInt(to.offset, 10) + parseInt(is[to.orien], 10) + 'px';
                dom.css(ts);
                dom.show();
                dom.stop(true, false).animate(is, to.time, function() {
                    if(to.lazy) {
                        parentThis.register[to.tag].ani = 0;
                    }
                })
            }
        },
        unlazy: function() {//不需要懒加载
            this.factory(this.config);
        },
        lazy: function() {//需要懒加载
            var parentThis = this,
                c = parentThis.lazyConfig,
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

            for(; i < l ; i++ ) {
                t = c[i];
                clienH = t.dom.height();
                clienW = t.dom.width();
                clienT = t.dom.scrollTop() || t.dom[0].offsetTop;
                clienL = t.dom.scrollLeft() || t.dom[0].offsetLeft;
                if(parentThis.register[t.tag].view) {//已经进入视口
                    if( !( (viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0 ) ) {//不在视口中
                        if(parentThis.register[t.tag].repe) {
                            parentThis.register[t.tag].view = false;
                            parentThis.hide([t]);
                        }
                    }
                    else {
                        parentThis.register[t.tag].view = true;
                    }
                }
                else {//移出视口
                    if( (viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0 ) { //在视口中
                        parentThis.register[t.tag].view = true;

                        if(parentThis.register[t.tag].ani === 0) {
                            parentThis.register[t.tag].ani = 1;
                            parentThis.factory([t]);
                        }
                    }
                }
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
        init: function(options) {//初始化        
            this.setConfig(options);
            this.hide();
            this.unlazy();
            this.srcoll();
            
//            console.log(options, lazy, repe);
            
        }
    };
    lazing.init(options);
};

$.extend({
    skyFun: {},
    skyData: {},
});

$.extend($.skyFun, {
    uuid: function(n) {
        var chars = '_ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz',
            l = chars.length,
            i = 0,
            s = '',
            str = '',
            gt = new Date().getTime() + '';
        for(; i < n; i++) {
            s += chars.charAt( Math.floor(Math.random()*l) );
        }
        s += gt.substring(gt.length - n);
        for(i = 0; i < n; i++) {
            str += s.charAt(Math.floor(Math.random()*(2*n)))
        }
        return str;
    }
});
