function tool() {}
function lazy() {}
tool.initEase = function(data) {
    var ease = {
            'linear': 'linear',
            'ease': 'ease',
            'ease-out': 'ease-out',
            'ease-in': 'ease-in',
            'ease-in-out': 'ease-in-out',
            'ease-back': 'cubic-bezier(0.68, -0.55, 0.27, 1.55) '
        };
    if(ease[data]) {
        return ease[data];
    }
    else {
        if(data instanceof Array) {
            ease = '';
            ease += 'cubic-bezier(';
            ease += data.join(',');
            ease += ')';
            return ease;
        }
    }
}

tool.transition = function(ease, time, delay) {
    var transition = 'all ' + (time/1000 || 1000) + 's ' + ease + ' ' + (delay/1000 || 0) + 's;';    
    transition = $.sdPrivateProperty('transition', transition);
    return transition;
}

tool.transform = function(css, type) {
    var transform = '',
        origin = '';
    if(!!css.translate) {//位置
        transform += this.translate(css.translate, type);
    }
    if(!!css.rotate) {//旋转
        transform += this.rotate(css.rotate, type);
    }
    if(!!css.skew) {//缩放
        transform += this.skew(css.skew, type);
    }
    if(!!css.scale) {//比例
        transform += this.scale(css.scale, type);
    }
    if(!!css.origin) {
        origin += this.origin(css.origin, type);
    }
    transform += ';';
    transform = $.sdPrivateProperty('transform', transform) + origin;
    return transform;
}

tool.translate = function(data, type) {//data-数据，type-normal模式
    var translate = '',
        x, y, z;
    x = data[0];
    y = data[1];
    z = data[2];
    if(!type) {
        x = (-1) * x;
        y = (-1) * y;
        z = (-1) * z;
    }
    x = $.sdIsPX(x || '0px');
    y = $.sdIsPX(y || '0px');
    z = $.sdIsPX(z || '0px');
    translate += 'translate3d(' + x + ', ' + y + ', ' + z + ') ';
//    if(type) {
//        translate += 'translate3d(' + x + ', ' + y + ', ' + z + ') ';
//    } else {
//        translate += 'translate3d(' + (-1) * x + ', ' + (-1) * y + ', ' + (-1) * z + ') ';
//    }
    console.log(translate);
    return translate;
}

tool.rotate = function(data, type) {//旋转
    var rotate = '',
        x, y, z, a;
    x = data[0];
    y = data[1];
    z = data[2];
    if(!type) {
        x = (-1) * Number(x);
        y = (-1) * Number(y);
        z = (-1) * Number(z);
    }
    a = $.sdIsDEG(data[3] || '0deg');
    rotate += 'rotate3d(' + x + ', ' + y + ', ' + z + ', ' + a + ') ';
//    if(type) {
//        rotate += 'rotate3d(' + x + ', ' + y + ', ' + z + ', ' + a + ') ';
//    } else {
//        rotate += 'rotate3d(' + (-1) * x + ', ' + (-1) * y + ', ' + (-1) * z + ', ' + (-1) * a + ') ';
//    }
    return rotate;
}

tool.skew = function(data, type) {//切面
    var skew = '',
        x, y;  
    
    x = $.sdIsDEG(data[0] || '0px', type);
    y = $.sdIsDEG(data[1] || '0px', type);
    skew += 'skew(' + x + ', ' + y + ') ';
    
//    if(type) {
//        x = $.sdIsDEG(data[0] || '0px', type);
//        y = $.sdIsDEG(data[1] || '0px', type);
//        skew += 'skew(' + x + ', ' + y + ') ';
//    } else {
//        x = $.sdIsDEG(data[0] || '0px', type);
//        y = $.sdIsDEG(data[1] || '0px', type);
//        skew += 'skew(' + x + ', ' + y + ') ';
//    }
    return skew;  
}

tool.scale = function(data, type) {//比例
    var scale = '',
        x, y;
    
    x = data[0];
    y = data[1];
    if(!type) {
        x = (-1) * Number(x);
        y = (-1) * Number(y);
    }
    scale += 'scale(' + x + ', ' + y + ') ';
    
    
//    x = data[0];
//    y = data[1];
//    
//    if(type) {
//        scale += 'scale(' + x + ', ' + y + ') ';
//    } else {
//        scale += 'scale(' + (-1) * x + ', ' + (-1) * y + ') ';
//    }
    return scale;
},
    
tool.origin = function(data) {//支点
    var origin = '',
        x, y;
    x = data[0];
    y = data[1];
    origin = $.sdIsPX(x) + ' ' + $.sdIsPX(y) + ';';
    origin = $.sdPrivateProperty('transform-origin', origin);
    return origin;
}
    
tool.animation = function(dom, options) {//*底层动画接口
    var ease = '',
        transition = '',
        transform = '',
        origin = '',
        css = options.css,
        initCss = dom.attr('style'),
        str;
    if(!!options) {
        if(!!options.normal) {
            ease = this.initEase(options.ease);
            transition = this.transition(ease, options.time, options.delay);
            transform = this.transform(css, !!options.normal);
            str = transition + initCss + ';';
            if($.sdIsBlock(dom)) {
                str += 'display: block;';
            } else {
                str += 'display: inline-block;';
            }
            dom.attr('style', str);//设置transition
            
            setTimeout(function() {//设置基本css属性
                dom.css(css);
            }, 60/1000);
            setTimeout(function() {//设置transform属性
                dom.attr('style',  dom.attr('style') + transform);
            }, 60/1000);
        }
        else {
            ease = this.initEase(options.ease);
            transition = this.transition(ease, options.time, options.delay);
            transform = this.transform(css, !!options.normal);
            str = transform + initCss + ';';
            dom.attr('style', str);//设置transform
            setTimeout(function() {//设置基本css属性
                dom.css(css);
            }, 60/1000);
            if($.sdIsBlock(dom)) {
                str = 'display: block;';
            } else {
                str = 'display: inline-block;';
            }
            setTimeout(function() {//设置transform属性
                str += transition;
                dom.attr('style', str + initCss);
                dom.css(css);
            }, 60/1000);
        }
    }
}

tool.onAnimation = function(dom, options) {
    var ease = '',
        transition = '',
        transform = '',
        origin = '',
        css = options.css,
        str;
    if(!!options) {
        ease = this.initEase(options.ease);
        transition = this.transition(ease, options.time, options.delay);
        transform = this.transform(css);
        str = transition + dom.attr('style') + ';';
        if($.sdIsBlock(dom)) {
            str += 'display: block;';
        }
        else {
            str += 'display: inline-block;';
        }
        dom.attr('style', str);//设置transition
        setTimeout(function() {//设置基本css属性
            dom.css(css);
        }, 60/1000);
        setTimeout(function() {//设置transform属性
            dom.attr('style', dom.attr('style') + transform);
        }, 60/1000);
    }
}

lazy.scrollDetection = function(dom) {//筛选dom
    var viewH = $(window).height(),
        viewT = $(window).scrollTop(),
        clienH = dom.height(),
        clienW = dom.width(),
        clienT = dom.scrollTop() || dom[0].offsetTop,
        clienL = dom.scrollLeft() || dom[0].offsetLeft;
    if((viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0 ) {//在视口中
        return true;
    }
    return false;
}

lazy.domsContainer = function(doms, options) {//筛选子dom
    var i,
        length = doms.length;
    for(i = 0; i < length; i++) {
        if(doms[i]) {
            if(lazy.scrollDetection(doms[i].dom)) {
//                tool.onAnimation(doms[i].dom, options);
                tool.animation(doms[i].dom, options);
                if(!options.repe) {//没有重复
                    doms.splice(i, 1);
                    lazy.domsContainer(doms, options);
                }
            }
        }
    }
}

lazy.container = function() {//筛选容器
    //容器配置
    var data = $.sdData.lazyOn,
        options;
    for(var i = 0; i < data.length; i++) {
        var _data = data[i];
        var _dom = _data.bindDom;
        if(lazy.scrollDetection(_dom)) {
            options = $.sdData.lazyOptions[_data.ouid];
            lazy.domsContainer(_data.doms, options);
        }
    }
}

lazy.pack = function() {
    lazy.lazy();
    tool.detection();
    lazy.container();
}

lazy.scroll = function() {//监控
    var data = $.sdData.lazyOn,
        timestamp;
    lazy.pack();
    $(window).on('scroll', function() {
        var data = $.sdData.lazyOn,
            timestamp;
        timestamp = (new Date).getTime();
        if( timestamp - data.timestamp > 300 ) {
            $.sdData.lazyOn.timestamp = timestamp;
            lazy.pack();
        }
    });
}

lazy.register = function(dom, ouid) {//注册：1.对象
    $.sdData.lazy[$.sdUuid(6)] = {
        dom: $(dom),
        repe: false,
        css: $(dom).attr('style'),
        view: false,
        ouid:  ouid
    }
}

lazy.lazy = function() {//懒加载
    var 
    viewH = $(window).height(),
    viewT = $(window).scrollTop(),
    lazy,
    clienH,
    clienW,
    clienT,
    clienL,
    obj,
    dom,
    options;    
    for(uuid in $.sdData.lazy) {
        obj = $.sdData.lazy[uuid];
        dom = obj.dom;
        clienH = dom.height();
        clienW = dom.width();
        clienT = dom.scrollTop() || dom[0].offsetTop;
        clienL = dom.scrollLeft() || dom[0].offsetLeft;
        if(obj.view) {//在视口中
            if(( (viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0 )) {//在视口中
                obj.view = true;
            } else {//不在视口
                obj.view = false;        
            }
        } else {//不在视口中
            if( (viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0 ) {
                obj.view = true;
                options = $.sdData.lazyOptions[obj.ouid];
                tool.animation(dom, options);
                if(!obj.repe) {//没有重复
                    delete $.sdData.lazy[uuid];
                }
            }
        }
    }
}

lazy.config = function(dom, options, ouid) {//配置dom，options
    var length = dom.length,
        ouid;
    if(ouid) {
        for(;length--;) {
            lazy.register(dom[length], ouid);
        }
    }
    else {
        for(;length--;) {
            ouid = $.sdGroup(options);//注册options
            lazy.register(dom[length], ouid);//注册dom
        }
    }
}

lazy.animation = function(dom, options, ouid) {//过滤lazy
    if(!!options) {
        if(options && options.lazy) {
            lazy.config(dom, options, ouid);//配置dom，options
            lazy.scroll();
        }
        else {
            tool.animation(dom, options);//最底层动画
        }
    }
}

tool.detection = function() {//监控
    var i,
        j,
        k,
        tag,
        options,
        data = $.sdData.lazyOn,
        length = data.length,
        h_length,
        obj,//容器对象指针
        doms,//doms对象指针
        c_thisDom = {},//thisDom副本
        c_thisDomLength,
        h_thisDom;
    for(k = 0; k < length; k++) {//监控对象
        obj = $.sdData.lazyOn[k];
        c_thisDom = $.extend({}, obj.thisDom);
        c_thisDomLength = c_thisDom.length;        
        h_thisDom = $(obj.bindDom).find(obj.query);
        doms = obj.doms;
        options = $.sdData.lazyOptions[obj.ouid];
        console.log(options);
        h_length = $(obj.bindDom).find(obj.query).length;
        for(j = 0; j <h_length; j++) {//html中DOM长度
            tag = 0;//0 - 找不到， 1 - 找到
            for(i = 0; i < c_thisDomLength; i++) {//存储长度
                if(c_thisDom[i]) {
                    if(c_thisDom.eq(i).is(h_thisDom.eq(j))) {//找到了dom
                        tag = 1;
                        delete c_thisDom[i];
                        break;
                    }
                    else {//找不到dom
                        tag = 0;
                    }
                }
            }
            if(tag === 0) {
                doms = tool.doms(h_thisDom.eq(j), options, doms, doms.length);
            }
        }
        obj.thisDom = h_thisDom;        
        console.log($.sdData.lazyOn);
    }
}

tool.doms = function(elem, options, arr, num) {//初始化doms格式
    arr[arr.length] = {
        dom: elem,
        css: elem.attr('style'),
        repe: options.repe,
        view: options.view
    }
    return arr;
}

tool.on = function(elem, query, ouid) {//底层绑定接口
    var length = $.sdData.lazyOn.length || 0,
        thisDom = elem.find(query),
        findLength = thisDom.length,//子元素长度
        arr = [],
        data = $.sdData.lazyOn,
        options = $.sdData.lazyOptions[ouid];
    
    if(!!length) {//防止重复绑定
        for(var i = 0; i < length; i++ ) {
            if(elem.is(data[i].bindDom)) {
                return;
            }
        }
    }
    
    for(;findLength--;) {
        arr = tool.doms(thisDom.eq(findLength), options, arr);
    }
    data[length] = {
        bindDom: elem,
        thisDom: elem.find(query),
        query: query,
        ouid: ouid,
        doms: arr
    };
    data.length = length + 1;
    data.timestamp = (new Date).getTime();
    data.tag = 1;
    $.sdData.lazyOn = data;
    console.log($.sdData.lazyOn);
}

$.fn.extend({
    _animation: function(group) {
        var length = arguments.length;
        if(length === 1) {
            //options = group;
            group = typeof group === 'object' ? group : $.sdData.lazyOptions[group];
            lazy.animation(this, group);//(elem, options)
        }
    },
        
    _unormal: function(options) {
        var horizontal = options.right || options.left * (-1),
            vertical = options.bottom || options.top * (-1);
        options = {
            time: 1000,
            delay: 0,
            ease: 'ease-out',
            css: {
                translate: [horizontal, vertical, 0],
                opacity: 1
            },
            lazy: false,
            repe: false,
            normal: false
        };
        this._animation(options);
    },
    
    _normal: function(options) {
        var horizontal = options.right || options.left * (-1),
            vertical = options.bottom || options.top * (-1);
        options = {
            time: 1000,
            delay: 0,
            ease: 'ease-out',
            css: {
                translate: [horizontal, vertical, 0],
                opacity: 1
            },
            lazy: false,
            repe: false,
            normal: true
        };
        this._animation(options);
    },
    
    _on: function(group, query) {
        var length = arguments.length;
        if(!!length) {
            group = typeof group === 'object' ?  $.sdGroup(group) : group;
            //(elem, query, group)
            tool.on(this, query, group, true);
        }
    }
});

$.extend({
    sdData: {
        lazy: {},
        lazyOptions: {},
        lazyOn: {}
    },
    sdPrivateProperty: function(name, data) {//浏览器扩展名
        var extend = $.sdKernel(),
            str = ''+ name +': ' + data,
            strKernel = extend + ''+ name +': ' + data;
        return strKernel + str;
    },
    sdKernel: function() {//检测浏览器内核
        var agent = navigator.userAgent.toLowerCase();
        if(agent.indexOf('webkit') >= 0) {
            return '-webkit-';
        } else if(agent.indexOf('gecko') >= 0) {
            return '-moz-';
        } else if(agent.indexOf('windows') >= 0) {
            return '-ms-';
        } else if(agent.indexOf('opera') >= 0) {
            return '-o-';
        }
    },
    sdIsPX: function(data) {//检测px单位
        if(!isNaN(data)) {//纯数字
            return data + 'px';
        }
        return data;
    },
    sdIsDEG: function(data, type) {//检测deg单位
        if(!isNaN(data)) {
            if(type) {
                return Number(data) + 'deg';
            }
            else {
                return (Number(data) + 180) + 'deg';   
            }
        }
        return data;
    },
    sdIsBlock: function(obj) {
        var block = ['address', 'blockquote', 'center' ,'dir', 'div', 'dl', 'fieldset', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'isindex', 'menu', 'noframes', 'ol', 'p', 'pre', 'table', 'ul'];
        block = block.join(',');
        if(block.indexOf(obj[0].tagName.toLowerCase()) >= 0) {
            return true;
        }
        return false;
    },
    sdUuid: function(n) {
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
    },
    sdGroup: function(group, options) {
        var length = arguments.length,
            ouid;
        if(!!length) {
            if(length === 1 && typeof group === 'object') {
                options = group;
                ouid = $.sdUuid(6);
                $.sdData.lazyOptions[ouid] = options;
                return ouid;
            }
            else if(length === 2 && typeof group === 'string' && typeof options === 'object'){
                $.sdData.lazyOptions[group] = options;
                return group;
            }
        }
    },
//    sdCleanGroup: function(group) {
//        delete $.sdData.lazyOptions[group];
//    },
//    sdGetOption: function(group) {
//        if(typeof group === 'string') {//group
//            group = $.sdData.lazyOptions[group];
//        }
//        return group;
//    },
    sdDetection: function() {
        tool.detection();
    },
//    sdScroll: function() {
//        var data = $.sdData.lazyOn,
//            timestamp;
//        timestamp = (new Date).getTime();
//        if(data.tag === 1) {
//            if( timestamp - data.timestamp > 1500 ) {
//                tool.detection();
//                lazy.lazy();
//                $.sdData.lazyOn.timestamp = timestamp;
//                $.sdData.lazyOn.tag = 2;
//            }
//        }
//        else {
//            console.log((new Date).getTime() - data.timestamp);
//            if( (new Date).getTime() - data.timestamp > 750 ) {
//                console.log('fsaf');
//                tool.detection();
//                lazy.lazy();
//                console.log(data);
//                $.sdData.lazyOn.timestamp = timestamp;
//                $.sdData.lazyOn.tag = 1;
//            }
//        }
//    }
});