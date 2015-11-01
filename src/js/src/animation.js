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

tool.transform = function(css) {
    var transform = '',
        origin = '';
    if(!!css.translate) {//位置
        transform += this.translate(css.translate);
    }
    if(!!css.rotate) {//旋转
        transform += this.rotate(css.rotate);
    }
    if(!!css.skew) {//缩放
        transform += this.skew(css.skew);
    }
    if(!!css.scale) {//比例
        transform += this.scale(css.scale);
    }
    if(!!css.origin) {
        origin += this.origin(css.origin);
    }
    transform += ';';
    transform = $.sdPrivateProperty('transform', transform) + origin;
    return transform;
}

tool.translate = function(data) {
    var translate = '',
        x, y, z;
    x = $.sdIsPX(data[0] || '0px');
    y = $.sdIsPX(data[1] || '0px');
    z = $.sdIsPX(data[2] || '0px');
    translate += 'translate3d(' + x + ', ' + y + ', ' + z + ') ';
    return translate;
}

tool.rotate = function(data) {
    var rotate = '',
        x, y, z, a;
    x = data[0];
    y = data[1];
    z = data[2];
    a = $.sdIsDEG(data[3] || '0deg');
    rotate += 'rotate3d(' + x + ', ' + y + ', ' + z + ', ' + a + ') ';
    return rotate;
}

tool.skew = function(data) {
    var skew = '',
        x, y;
    x = $.sdIsDEG(data[0] || '0px');
    y = $.sdIsDEG(data[1] || '0px');
    skew += 'skew(' + x + ', ' + y + ') ';
    return skew;  
}

tool.scale = function(data) {
    var scale = '',
        x, y;
    x = data[0];
    y = data[1];
    scale += 'scale(' + x + ', ' + y + ') ';
    return scale;
},
    
tool.origin = function(data) {
    var origin = '',
        x, y;
    x = data[0];
    y = data[1];
    origin = $.sdIsPX(x) + ' ' + $.sdIsPX(y) + ';';
    origin = $.sdPrivateProperty('transform-origin', origin);
    return origin;
}
    
tool.animation = function(dom, options) {//底层动画接口
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

lazy.scroll = function() {//监控
    lazy.lazy();
    $(window).on('scroll', function() {
        tool.detection();
        lazy.lazy();
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
    var viewH = $(window).height(),
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

tool.detection = function() {
    var data = $.sdData.lazyOn,
        length = data.length,
        obj,
        doms;
    for(;length--;) {//监控对象
        obj = $.sdData.lazyOn[length];
        doms = obj.doms;
        var newThisObjLength = $(obj.bindDom).find(obj.query).length;
        for(;newThisObjLength--;) {
            
            if(obj.thisDom[newThisObjLength] === $(obj.bindDom).find(obj.query)[newThisObjLength]) {
                console.log('一样');
                console.log(obj.doms.length);
            }
            else {
                doms[obj.doms.length] = {
                    dom: $(obj.bindDom).find(obj.query)[newThisObjLength],
                    repe: false,
                    css: $(obj.bindDom).find(obj.query).eq(newThisObjLength).attr('style'),
                    view: false,
                }
                doms.length++;
                obj.thisDom = $(obj.bindDom).find(obj.query);
            }
        }
    }
    
}

tool.on = function(elem, query, options) {//底层绑定接口
    var length = $.sdData.lazyOn.length || 0,
        thisDom = elem.find(query),
        findLength = thisDom.length,//子元素长度
        obj = {},//子元素集
        data = $.sdData.lazyOn;
    
    obj.length = findLength;
    for(;findLength--;) {
        obj[findLength] = {
            dom: thisDom.eq(findLength),
            repe: false,
            css: thisDom.eq(findLength).attr('style'),
            view: false,
        }
    }
    
        data[length] = {
            bindDom: elem,
            thisDom: elem.find(query),
            query: query,
            ouid: options,
            doms: obj
        };
        data.length = length + 1;
    $.sdData.lazyOn = data;
    console.log($.sdData.lazyOn);
}

tool.onConfig = function() {
    
}

$.fn.extend({
    sdAnimation: function(group) {
        var length = arguments.length;
        if(length === 1) {
            //options = group;
            group = typeof group === 'object' ? group : $.sdData.lazyOptions[group];
            lazy.animation(this, group);//(elem, options)
        }
    },
    
    sdOn: function(group, query) {
//        console.log($(document).scrollTop(), $(document).scrollLeft());
        
        var length = arguments.length;
        if(!!length) {
            group = typeof group === 'object' ?  $.sdGroup(group) : group;
            tool.on(this, query, group);//(elem, query, group)
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
    sdIsDEG: function(data) {//检测deg单位
        if(!isNaN(data)) {
            return Number(data) + 'deg';
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
    sdCleanGroup: function(group) {
        delete $.sdData.lazyOptions[group];
    },
//    sdGetOption: function(group) {
//        if(typeof group === 'string') {//group
//            group = $.sdData.lazyOptions[group];
//        }
//        return group;
//    },
    sdGetGroup: function(group) {
        if(typeof group === 'object') {
//            group = 
        }
    }
});