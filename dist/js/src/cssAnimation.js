jQuery.fn.cssAnimation = function(options) {
    var 
    Obj = this,
    cssAnimation = {
        timing: {
            'linear': 'linear',
            'ease': 'ease',
            'ease-out': 'ease-out',
            'ease-in': 'ease-in',
            'ease-in-out': 'ease-in-out'
        },
        translate: function(data) {//位置移动
            var translate = '',
                x, y, z;
            x = $._isPX(data[0] || '0px');
            y = $._isPX(data[1] || '0px');
            z = $._isPX(data[2] || '0px');
            translate += 'translate3d(' + x + ', ' + y + ', ' + z + ') ';
            return translate;
        },
        rotate: function(data) {
            var rotate = '',
                x, y, z, a;
            x = data[0];
            y = data[1];
            z = data[2];
            a = $._isDEG(data[3] || '0deg');
            rotate += 'rotate3d(' + x + ', ' + y + ', ' + z + ', ' + a + ') ';
            return rotate;
        },
        skew: function(data) {
            var skew = '',
                x, y;
            x = $._isDEG(data[0] || '0px');
            y = $._isDEG(data[1] || '0px');
            skew += 'skew(' + x + ', ' + y + ') ';
            return skew;    
        },
        scale: function(data) {
            var scale = '',
                x, y;
            x = data[0];
            y = data[1];
            scale += 'scale(' + x + ', ' + y + ') ';
            return scale;
        },
        origin: function(data) {
            var origin = '',
                x, y;
            x = data[0];
            y = data[1];
            origin += $._isPX(x) + ' ' + $._isPX(y) + ';';
            origin += $._privateProperty('transform-origin', origin);
            return origin;
        },
        factory: function(data) {//工厂
            var timing = '',
                transition = '',
                transform = '',
                origin = '';
            if(this.timing[data.timing]) {
                timing = data.timing;
            }
            else {
                if(data.timing instanceof Array) {
                    timing += 'cubic-bezier(';
                    timing += data.timing.join(',');
                    timing += ')';
                } else {
                    console.error('「timing」不是数组或合法的参数 || timing is not Array or legal parameters');
                    return;
                }
            }
            transition = 'all ' + (data.time/1000 || 1000) + 's ' + timing + ' ' + (data.delay/1000 || 0) + 's;';
            transition = $._privateProperty('transition', transition);
            if(!!data.css.translate) {//位置
                transform += this.translate(data.css.translate);
            }
            if(!!data.css.rotate) {//旋转
                transform += this.rotate(data.css.rotate);
            }
            if(!!data.css.skew) {//缩放
                transform += this.skew(data.css.skew);
            }
            if(!!data.css.scale) {//比例
                transform += this.scale(data.css.scale);
            }
            if(!!data.css.origin) {
                origin += this.origin(data.css.origin);
            }
            transform += ';';
            transform = $._privateProperty('transform', transform) + origin;
            this.outPrint(data, transform, transition);
        },
        
        outPrint: function(data, transform, transition) {//最终输出
            var str = transition + Obj.attr('style') + ';';
            if(!$._isBlock(Obj)) {
                str += 'display: inline-block;';
            }
            Obj.attr('style', str);
            Obj.css(data.css);
//            setTimeout(function() {
//                Obj.css(data.css);
//            });
            setTimeout(function() {
                Obj.attr('style', Obj.attr('style') + transform);
            });
            
        },
        init: function(options) {//初始化
            var arr = $._initArray(options);
            arr.forEach(function(value, index, arr) {
                if(value.repe) {
                    this.animate(value);
                }
                else {
                    this.factory(value);
                }
            }, cssAnimation);          
        }
    };
    cssAnimation.init(options);
    
};

$.extend({
    _privateProperty: function(name, data) {//浏览器扩展名
        var extend = $._kernel(),
            str = ''+ name +': ' + data,
            strKernel = extend + ''+ name +': ' + data;
        return strKernel + str;
    },
    _kernel: function() {//检测浏览器内核
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
    _initArray: function(data) {//判断数组对象
        var objType = Object.prototype.toString.call(data),
            arr = [];
        if(objType === '[object Object]') {
            arr.push(data);
        } else if(objType === '[object Array]') {
            arr = data;
        }
//        else {
//            console.error('Parameter error');
//            return;
//        }
        return arr;
    },
    _isPX: function(data) {//检测px单位
        if(!isNaN(data)) {//纯数字
            return data + 'px';
        }
        return data;
    },
    _isDEG: function(data) {//检测deg单位
        if(!isNaN(data)) {
            return Number(data) + 'deg';
        }
        return data;
    },
    _isBlock: function(obj) {
        var block = ['address', 'blockquote', 'center' ,'dir', 'div', 'dl', 'fieldset', 'form', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'hr', 'isindex', 'menu', 'noframes', 'ol', 'p', 'pre', 'table', 'ul'];
        block = block.join(",");
        if(block.indexOf(obj[0].tagName.toLowerCase()) >= 0) {
            return true;
        }
        return false;
    }
});