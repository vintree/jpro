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
    return rotate;
}

tool.skew = function(data, type) {//切面
    var skew = '',
        x, y;
    x = $.sdIsDEG(data[0] || '0px', type);
    y = $.sdIsDEG(data[1] || '0px', type);
    skew += 'skew(' + x + ', ' + y + ') ';
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

//tool.onAnimation = function(dom, options) {//使用:tool.animation
//    var ease = '',
//        transition = '',
//        transform = '',
//        origin = '',
//        css = options.css,
//        str;
//    if(!!options) {
//        ease = this.initEase(options.ease);
//        transition = this.transition(ease, options.time, options.delay);
//        transform = this.transform(css);
//        str = transition + dom.attr('style') + ';';
//        if($.sdIsBlock(dom)) {
//            str += 'display: block;';
//        }
//        else {
//            str += 'display: inline-block;';
//        }
//        dom.attr('style', str);//设置transition
//        setTimeout(function() {//设置基本css属性
//            dom.css(css);
//        }, 60/1000);
//        setTimeout(function() {//设置transform属性
//            dom.attr('style', dom.attr('style') + transform);
//        }, 60/1000);
//    }
//}

// ----------------------------------------------------------------------

lazy.scrollDetection = function(dom) {//筛选将要进入视口的dom
    var viewH = window.innerHeight,
        viewT = $(window).scrollTop(),
        //clienH = dom.height(),
        //clienW = dom.width(),
        clienT = dom.scrollTop() || dom[0].offsetTop;
        //clienL = dom.scrollLeft() || dom[0].offsetLeft;
         //console.log(viewH, viewT, clienT);
//        console.log((viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0);
    if( (viewH + viewT - 100) - clienT > 0 && (viewH + viewT - 100) - clienT - viewH < 0 ) {//在视口中
        return true;
    }
    return false;
}

lazy.parentContainer = function() {//筛选父容器,又符合条件的,查找子DOM
    //容器配置
    var data = $.sdData.lazyOn,
        dtlength = data.length,
        options,
        qlength;
    for(var i = 0; i < dtlength; i++) {//遍历父容器
        var _data = data[i];
        var _dom = _data.bindDom;
        qlength = _data.query.length;
        for(;qlength--;) {//遍历个子dom
            options = $.sdData.lazyOptions[_data.ouid[qlength]];
            if(_dom.is($(document))) {//父容器为document
                //console.log('document容器');
                lazy.childrenContainer(_data.rgDom[qlength], options);
            } else {
                if(lazy.scrollDetection(_dom)) {//检测容器是否在视口
                    lazy.childrenContainer(_data.rgDom[qlength], options);
                }
            }
        }
    }
}

lazy.childrenContainer = function(rgDom, options) {//筛选子dom
    var i,
        length = rgDom.length;
    for(i = 0; i < length; i++) {
        if(rgDom[i]) {
            if(lazy.scrollDetection(rgDom[i].dom)) {
//                tool.onAnimation(rgDom[i].dom, options);
                tool.animation(rgDom[i].dom, options);
                if(!options.repe) {//没有重复
                    rgDom.splice(i, 1);
                    lazy.childrenContainer(rgDom, options);
                }
            }
        }
    }
}

lazy.pack = function() {
    lazy.lazy();
    tool.detection();
    lazy.parentContainer();
}

lazy.scroll = function() {//监控
    var data = $.sdData.lazyOn,
        timestamp;
        lazy.pack();
    $(window).on('scroll', function() {
        var data = $.sdData.lazyOn,//可能没有数据
            timestamp,
            viewT = $(window).scrollTop();
        timestamp = (new Date).getTime();
        if(viewT < 50) {
            $.sdData.lazyOn.timestamp = timestamp;
            lazy.pack();
        }
        else {
            if( timestamp - data.timestamp > 300 ) {
                $.sdData.lazyOn.timestamp = timestamp;
                lazy.pack();
             }
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
    viewH = window.innerHeight,
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
                //if(!obj.repe) {//没有重复
                //    delete $.sdData.lazy[uuid];
                //}
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

tool.detection = function() {//监控DOM,动态注册DOM
    var i,
        j,
        k,
        qlength,//子dom长度
        ouid,//
        query,//对象查询名称
        bindDom,
        saveDom,
        c_saveDom,//saveDom对象
        c_saveDomLength,//saveDom长度
        tag,
        options,
        data = $.sdData.lazyOn,
        length = data.length,
        h_length,
        dataunit,//容器对象指针
        rgDom,//rgDom对象指针
        c_saveDomList = {},//saveDom副本
        c_saveDomListLength,
        h_saveDom;


    for(k = 0; k < length; k++) {//监控父容器
        dataunit = $.sdData.lazyOn[k];
        //console.log(dataunit.query.length);
        qlength = dataunit.query.length;//子dom对象
        for(;qlength--;) {//组内查询
            query = dataunit.query[qlength];
            ouid = dataunit.ouid[qlength];
            saveDom = dataunit.saveDom[qlength];
            rgDom = dataunit.rgDom[qlength];
            bindDom = dataunit.bindDom;
            options = $.sdData.lazyOptions[ouid];

            //console.log(dataunit);

            c_saveDom = saveDom;//copy - >保存的dom
            //console.log(c_saveDom);
            c_saveDomLength = c_saveDom.length;//保存的dom长度

            h_saveDom = $(bindDom).find(query);//页面dom列表
            h_length = $(bindDom).find(query).length;


            for(j = 0; j <h_length; j++) {//html中DOM长度
                tag = 0;//0 - 找不到， 1 - 找到

                for(i = 0; i < c_saveDomLength; i++) {//存储长度
                    //var cdom = c_saveDomList[c_saveDomLength];//分组dom容器
                    if(c_saveDom[i]) {//确保有dom

                        //console.log($(c_saveDom[i]));
                        //console.log(h_saveDom.eq(j));
                        //console.log($(c_saveDom[i]).is(h_saveDom.eq(j)));

                        if($(c_saveDom[i]).is(h_saveDom.eq(j))) {//找到了dom
                            tag = 1;
                            //c_saveDom.splice(i, 1);
                            break;
                        }
                    }
                }
                //console.log('isfund: '+tag);
                //console.log(c_saveDom);
                if(tag === 0) {
                    console.log(options);
                    var rgDomUnit = tool.rgDom(h_saveDom.eq(j), options, []);//格式化数据
                    console.log(rgDomUnit);
                    rgDom.concat(rgDom);
                    saveDom.push(h_saveDom[j]);
                }
            }
            console.log($.sdData.lazyOn);
        }
        console.log($.sdData.lazyOn);
        //c_saveDomList = $.extend({}, obj.saveDom);//被保存的dom
        //c_saveDomListLength = c_saveDomList.length;//[copy]被保存的dom长度
        //h_saveDom = $(obj.bindDom).find(obj.query);//页面dom
        //rgDom = obj.rgDom;
        //options = $.sdData.lazyOptions[obj.ouid];
        //h_length = $(obj.bindDom).find(obj.query).length;
        //for(j = 0; j <h_length; j++) {//html中DOM长度
        //    tag = 0;//0 - 找不到， 1 - 找到
        //    for(i = 0; i < c_saveDomListLength; i++) {//存储长度
        //        if(c_saveDomList[i]) {//确保有dom
        //            if(c_saveDomList.eq(i).is(h_saveDom.eq(j))) {//找到了dom
        //                tag = 1;
        //                delete c_saveDomList[i];
        //                break;
        //            }
        //            else {//找不到dom
        //                tag = 0;
        //            }
        //        }
        //    }
        //    if(tag === 0) {
        //        rgDom = tool.rgDom(h_saveDom.eq(j), options, rgDom, rgDom.length);
        //    }
        //}

    }
}

tool.rgDom = function(elem, options, arr) {//初始化rgDom格式

    //console.log(elem);
    //console.log(options);
    //console.log(arr);

    arr[arr.length] = {
        dom: elem,
        css: elem.attr('style'),
        repe: options.repe,
        view: options.view
    }
    return arr;
}

tool.arrDom = function(doms) {//将jqDOM对象转化为数组
    var i = 0,
        l = doms.length,
        arr = [];
    for(;i < l; i++) {
        arr.push(doms[i]);
    }
    return arr;
}

tool.on = function(elem, query, ouid) {//底层绑定接口
    var length = $.sdData.lazyOn.length || 0,
        saveDom = elem.find(query),
        findLength = saveDom.length,//子元素长度
        arr = [],
        data = $.sdData.lazyOn,
        options = $.sdData.lazyOptions[ouid],
        i = 0,
        tag = 0;//0 - 没有找到, 1 - 找到
        //rgdom = {};

    for(;findLength--;) {//
        arr = tool.rgDom(saveDom.eq(findLength), options, arr);
    }

    if(!!length) {//已有父容器集
        for(i = 0; i < length; i++ ) {
            if(elem.is(data[i].bindDom)) {//父容器是否被注册过
                tag = 1;
                break;
            }
        }
        if(tag === 0) {//父容器未注册
            data[length] = {
                bindDom: elem,//作用: 从父容器为组,分离查找
                saveDom: [tool.arrDom(elem.find(query))],//作用: 绑定总dom
                query: [query],//作用: 用于查找dom
                ouid: [ouid],//作用: 用于查找options
                rgDom: [arr]//作用: 被注册dom
            };
            data.length = length + 1;
            data.timestamp = (new Date).getTime();
            data.tag = 1;
        } else {//父容器已注册
            //console.log(elem.find(query));
            var dquery = data[i].query;
            var dlength = dquery.length;
            var dtag = 0;
            //var find = elem.find(query)
            for(;dlength--;) {
                if(dquery[dlength] === query) {//重复绑定子dom->将被覆盖
                    data[i].saveDom[dlength] = tool.arrDom(elem.find(query));
                    data[i].rgDom[dlength] = arr;
                    data[i].ouid[dlength] = ouid;
                    dtag = 1;
                    break;
                }
            }
            console.log(dtag);
            if(dtag === 0) {//未重复绑定子dom
                data[i].saveDom.push(tool.arrDom(elem.find(query)));
                data[i].query.push(query);
                data[i].ouid.push(ouid);
                data[i].rgDom.push(arr);
            }
        }
    }
    else {//空父容器集
        //console.log(elem.find(query));
        data[length] = {
            bindDom: elem,//作用: 从父容器为组,分离查找
            saveDom: [tool.arrDom(elem.find(query))],//作用: 绑定总dom
            query: [query],//作用: 用于查找dom
            ouid: [ouid],//作用: 用于查找options
            rgDom: [arr]//作用: 被注册dom
        };
        data.length = length + 1;
        data.timestamp = (new Date).getTime();
        data.tag = 1;
    }
    console.log($.sdData.lazyOn);
    lazy.scroll();
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

    _on: function(group, query) {
        var length = arguments.length;
        if(!!length) {
            group = typeof group === 'object' ?  $.sdGroup(group) : group;
            //(elem, query, group)
            tool.on(this, query, group, true);
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
            else if(length === 2 && typeof group === 'string' && typeof options === 'object') {
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
