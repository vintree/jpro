var transform_scale = ['scale', 'scaleX', 'scaleY', 'scaleZ', 'scale3d'],
    transform_rotate = ['rotate', 'rotateX', 'rotateY', 'rotateZ', 'rotate3D'],
    transform_skew = ['skew', 'skewX', 'skewY', 'skewZ', 'skew3D'],
    transform_matrix = ['matrix', 'matrix3D'];

var transform = {
    scale: 'scale',
    scaleX: 'scaleX',
    scaleY: 'scaleY',
    scaleZ: 'scaleZ',
    scale3D: 'scale3D',
    rotate: 'rotate',
    rotateX: 'roateX',
    rotateY: 'rotateY',
    rotateZ: 'rotateZ',
    rotate3D: 'rotate3D',
    skew: 'skew',
    skewX: 'skewX',
    skewY: 'skewY',
    skewZ: 'skewZ',
    skew3D: 'skew3D',
    matrix: 'matrix',
    matrix3D: 'matrix3D'
}

//style(
//    '@-webkit-keyframes mymove'+
//	'{	0 {transform: scale3d(1,1,1);}'+
//        '50% {transform: scale3d(2,4,7)}'+
//		'100% {transform: scale3d(1,1,1);}'+
//	'}'
//);

;(function($, g) {
    'use strict';
    $.fn.amazing = function(options) {
//        console.log(options);
        var Obj = this,
            amazing = {
            let: {
                scale: 'scale',
                scaleX: 'scaleX',
                scaleY: 'scaleY',
                scaleZ: 'scaleZ',
                scale3D: 'scale3D',
                rotate: 'rotate',
                rotateX: 'roateX',
                rotateY: 'rotateY',
                rotateZ: 'rotateZ',
                rotate3D: 'rotate3D',
                skew: 'skew',
                skewX: 'skewX',
                skewY: 'skewY',
                skewZ: 'skewZ',
                skew3D: 'skew3D',
                matrix: 'matrix',
                matrix3D: 'matrix3D'
            },
            timing: {
                'linear': 'linear',
                'ease': 'ease',
                'ease-out': 'ease-out',
                'ease-in': 'ease-in',
                'ease-in-out': 'ease-in-out',
            },
            extend: ['o', 'ms', 'webkit', 'moz'],
            config: {},
            core: function() {//核心处理

            },
            format: function(className) {//多浏览器扩展名
                var arr = [];
                this.extend.forEach(function(value, index) {
                    arr.push('-' + value + '-' + className);
                });
                arr.push(className);            
    //            console.log(arr);
                return arr;
            },
            transition: function(data) {//不循环动画
                var str = '',
                    timing = '',
                    transform = '-webkit-transform: ';
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
//                this.extend.forEach(function(v) {
//                    str += '-' + v + '-transition: all ' + (data.time/1000 || 1000) + 's ' + timing + ' ' + (data.delay/1000 || 0) + 's;';
//                }, amazing)
                str += 'transition: all ' + (data.time/1000 || 1000) + 's ' + timing + ' ' + (data.delay/1000 || 0) + 's;';
//                str += '-webkit-transform: translate3d(0, 0, 0) rotate(0, 0, 0, 0deg)';
                if(!!data.css.translate) {//位置
                    transform += this.translate(data.css.translate);
                }
                if(!!data.css.rotate) {//旋转
                    transform += this.rotate(data.css.rotate);
                }
                if(!!data.css.skew) {//缩放
                    transform += this.skew(data.css.skew);
                }
                if(!!data.css.scale) {
                    
                    console.log(transform);
                    
                    transform += this.scale(data.css.scale);
                    console.log(transform);
                }
//                if(!!data.css.matrix) {//矩阵
//                    transform += this.matrix(data.css.matrix);
//                }
                transform += ';';
                
                console.log(transform);
                
                this.outPrint(data, transform, str);
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
                x = data[0] || '0';
                y = data[1] || '0';
                z = data[2] || '0';
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
            animate: function(data) {//循环动画
//                var arr = this.format(data.cssName);
            },
            keyframs: function() {//动画函数
    //            @keyframes mymove {
    //              from {top:0px;}
    //              to {top:200px;}
    //            }
                var s = '';
            },
            outPrint: function(data, transform, str) {//最终输出
                Obj.attr('style', str);
                setTimeout(function() {
                    Obj.css(data.css);
                });
                setTimeout(function() {                
                    Obj.attr('style', Obj.attr('style') + transform);
                });
            },
            initArray: function(data) {//判断是否是数组对象
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
            isPX: function(data) {//检测单位是否为px
                if(!isNaN(data)) {//是纯数字
                    return data + 'px';
                }
                return data;
            },
            isDEG: function(data) {
                if(!isNaN(data)) {
                    return Number(data) + 'deg';
                }
                return data;
            },
            kernel: {//检测浏览器内核
                
            },
            init: function(options) {//初始化
                var arr = this.initArray(options);
                arr.forEach(function(value, index, arr) {
                    if(value.repe) {
                        this.animate(value)
                    }
                    else {
                        this.transition(value);
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
        width: '200px',
        height: '200px',
        'background-color': 'yellow',
        opacity: 1,
        translate: ['200', 200],//上下、左右、前后 || 不带单位默认为px  || TODO 一个参数时，不在3D属性
        rotate: [.6, 1, .6, '80deg'],//
        skew: [-15, -15],
        scale: [2, 2],
    },
    repe: false,//重复动画
});

//amazing.init([
//    {
//        domName: 'div',//对象对象
//        cssName: 'transition',//样式名
//        timing: [0.68, -0.55, 0.27, 1.55],//'ease-out',
//        time: 1000,
//        css: {
//            width: '200px',
//            height: '200px',
//            'background-color': 'yellow',
//            opacity: 1,
//            top: '100px',
//            left: '100px'
//        },
//        params: [1],//参数
//        repe: false,//重复动画
//        
//    },
//]);


//transition: all 1s cubic-bezier(0.68, -0.55, 0.27, 1.55)
//transition: all 5s cubic-bezier(0.68, -0.55, 0.27, 1.55);

//amazing.init(function(){});