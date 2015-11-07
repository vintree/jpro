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


function style(data) {
    var html = '<style id="style" type="text/css">' + data + '</style>';
    $('body').append(html);
}


style(
    '@-webkit-keyframes mymove'+
	'{	0 {transform: scale3d(1,1,1);}'+
        '50% {transform: scale3d(2,4,7)}'+
		'100% {transform: scale3d(1,1,1);}'+
	'}'
);



;(function($, g) {
    'use strict';
    var amazing = {
            config: function(name, arr) {
                console.log(name, arr);
            },
            
        };
    
    
    window.amazing = amazing;
})(jQuery, window);




amazing.config('scale', [1]);

