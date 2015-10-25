;(function($, g) {
    'use strict';
    $.fn.amazing = function(options) {
//        console.log(options);
        var Obj = this,
            amazing = {
            timing: {
                'linear': 'linear',
                'ease': 'ease',
                'ease-out': 'ease-out',
                'ease-in': 'ease-in',
                'ease-in-out': 'ease-in-out',
            },
            format: function(className) {//多浏览器扩展名
                var arr = [];
                this.extend.forEach(function(value, index) {
                    arr.push('-' + value + '-' + className);
                });
                arr.push(className);            
                return arr;
            },
            
            translate: function(data) {//位置移动
                var translate = '',
                    x, y, z;
                x = this.isPX(data[0] || '0px');
                y = this.isPX(data[1] || '0px');
                z = this.isPX(data[2] || '0px');
                translate += 'translate3d(' + x + ', ' + y + ', ' + z + ') ';     
                return translate;
            },
            rotate: function(data) {
                var rotate = '',
                    x, y, z, a;
                x = data[0];
                y = data[1];
                z = data[2];
                a = this.isDEG(data[3] || '0deg');
                rotate += 'rotate3d(' + x + ', ' + y + ', ' + z + ', ' + a + ') ';
                return rotate;
            },
            skew: function(data) {
                var skew = '',
                    x, y;
                x = this.isDEG(data[0] || '0px');
                y = this.isDEG(data[1] || '0px');
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
                origin += this.isPX(x) + ' ' + this.isPX(y) + ';';
                origin += this.extend('transform-origin', origin);
                return origin;
            },
            factory: function(data) {//工厂
                var timing = '',
                    kernel = this.kernel(),
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
                transition = this.extend('transition', transition);
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
                transform = this.extend('transform', transform) + origin;
                this.outPrint(data, transform, transition);
            },
            extend: function(name, data) {//浏览器扩展名
                var extend = this.kernel(),
                    str = ''+ name +': ' + data,
                    str_kernel = extend + ''+ name +': ' + data;
                return str_kernel + str;
            },
            outPrint: function(data, transform, transition) {//最终输出
                Obj.attr('style', transition);
                setTimeout(function() {
                    Obj.css(data.css);
                });
                setTimeout(function() {                
                    Obj.attr('style', Obj.attr('style') + transform);
                });
            },
            initArray: function(data) {//判断数组对象
                var objType = Object.prototype.toString.call(data),
                    arr = [];
                if(objType === '[object Object]') {
                    arr.push(data);
                } else if(objType === '[object Array]') {
                    arr = data;
                }
                else {
                    console.error('Parameter error');
                    return;
                }
                return arr;
            },
            isPX: function(data) {//检测px单位
                if(!isNaN(data)) {//纯数字
                    return data + 'px';
                }
                return data;
            },
            isDEG: function(data) {//检测deg单位
                if(!isNaN(data)) {
                    return Number(data) + 'deg';
                }
                return data;
            },
            kernel: function() {//检测浏览器内核
                var agent = navigator.userAgent.toLowerCase();
                if(agent.indexOf('webkit') >= 0) {
                    return '-webkit-';
                } else if(agent.indexOf('gecko') >= 0) {
                    return '-moz-'
                } else if(agent.indexOf('windows') >= 0) {
                    return '-ms-';
                } else if(agent.indexOf('opera') >= 0) {
                    return '-o-';
                }
            },
            init: function(options) {//初始化
                var arr = this.initArray(options);
                arr.forEach(function(value, index, arr) {
                    if(value.repe) {
                        this.animate(value)
                    }
                    else {
                        this.factory(value);
                    }
                }, amazing);          
            }
        }
        amazing.init(options);
    }
})(jQuery);

$('div').amazing({
    time: 2000,
    delay: 0,
    timing: [0.68, -0.55, 0.27, 1.55],//'ease-out',
    css: {
        width: '150',
        height: '150',
        'background-color': 'blue',
        opacity: 1,
        translate: ['200', 200],//上下、左右、前后 || 不带单位默认为px  || TODO 一个参数时，不在3D属性
        rotate: [.6, 1, .6, '80deg'],//
        skew: [-15, -15],
        scale: [2, 2],
        origin: ['30', '30']
    },
    repe: false,//重复动画
});