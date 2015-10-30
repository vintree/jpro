function tool() {}
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
    
tool.factory = function(dom, options) {  
    var ease = '',
        transition = '',
        transform = '',
        origin = '',
        str;
    if(!!options) {
        ease = this.initEase(options.ease);
        transition = this.transition(ease, options.time, options.delay);
        transform = this.transform(options.css);
        delete options.css.translate;
        delete options.css.rotate;
        delete options.css.skew;
        delete options.css.scale;
        delete options.css.origin;
        str = transition + dom.attr('style') + ';';
        if(!$.sdIsBlock(dom)) {
            str += 'display: inline-block;';
        }
        
        dom.attr('style', str);//设置transition     
        setTimeout(function() {//设置基本css属性
            dom.css(options.css);
        }, 60/1000);
        setTimeout(function() {//设置transform属性
            dom.attr('style', dom.attr('style') + transform);
        }, 60/1000);
    }
}

$.fn.extend({
    sdAnimation: function(options) {
        if(typeof options === 'object') {
            tool.factory(this, options);
        }
    }
});

$.extend({
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
    }
});











