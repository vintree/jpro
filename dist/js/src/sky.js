function identify() {
    
}


$.fn.extend({
    
    sky: function(group, options, lazy, repe, fn) {
//        console.log('d sda');
        /*
            1: (option)
            2: (group, option) || (option, lazy) || (option, fn)
            3: (group, option, lazy) || (group, option, fn) || (option, lazy, repe) || (option, lazy, fn)
            4: (grop, )
        */
        
        
        var length = arguments.lengt;
        if(!!length) {

            if(l === 1) {//(option)
                if(typeof arguments[0] === 'object') {
                    $.skyIdentify(undefined, arguments[0], false, false, undefined);
                }
            }
            else if(l === 2) {//(group, option) || (option, lazy) || (option, fn)
                if(arguments[0] === 'string') {//(group, option)
                    if(typeof arguments === 'object') {
                        $.skyIdentify(arguments[0], arguments[1], false, false, undefined);
                    }
                }
                else if(arguments[0] === 'object'){//(option, lazy) || (option, fn)
                    if(arguments[1] === 'boolean') {//(option, lazy)
                        $.skyIdentify(undefined, arguments[0], arguments[1], false, undefined);
                    }
                    else if(arguments[1] === 'function') {//(option, fn)
                        $.skyIdentify(undefined, arguments[0], false, false, arguments[1]);
                    }
                }
            }
            else if(l === 3) {//

            }


        }
        return sky;
    }
    
});


$.extend({
    sky: function() {
        console.log('dasdad');
    }
})

//function(group, options, lazy, repe, fn) {
//    var _group, _options, _lazy, _repe, _fn;
//    /*
//        1: (option)
//        2: (group, option) || (option, lazy) || (option, fn)
//        3: (group, option, lazy) || (group, option, fn) || (option, lazy, repe) || (option, lazy, fn)
//        4: (grop, )
//    */
//    
//    //(group, option, lazy, repe, fn)
//    //(option, lazy, lazy, repe, fn)----自动配置group
//    //(group, option, lazy, fn)//没有重复
//    //(group, option, fn)//没有懒加载，重复
//    //(option)
//    //(group, option)
//    
//    console.log(typeof group);
//    console.log(typeof options);
//    console.log(typeof lazy);
//    console.log(typeof repe);
//    console.log(typeof fn);
//    
//    console.log(arguments.length);
//    
//    
//    console.log(window);
//    
//    var length = arguments.lengt;
//    if(!!length) {
//        
//        if(l === 1) {//(option)
//            if(typeof arguments[0] === 'object') {
//                $.skyIdentify(undefined, arguments[0], false, false, undefined);
//            }
//        }
//        else if(l === 2) {//(group, option) || (option, lazy) || (option, fn)
//            if(arguments[0] === 'string') {//(group, option)
//                if(typeof arguments === 'object') {
//                    $.skyIdentify(arguments[0], arguments[1], false, false, undefined);
//                }
//            }
//            else if(arguments[0] === 'object'){//(option, lazy) || (option, fn)
//                if(arguments[1] === 'boolean') {//(option, lazy)
//                    $.skyIdentify(undefined, arguments[0], arguments[1], false, undefined);
//                }
//                else if(arguments[1] === 'function') {//(option, fn)
//                    $.skyIdentify(undefined, arguments[0], false, false, arguments[1]);
//                }
//            }
//        }
//        else if(l === 3) {//
//            
//        }
//        
//        
//    }
//    
//}
//
//function skyFactory = function() {};
//
//$.skyFactory = skyFactory;
//
//skyFactory.identify = function () {
//    
//}


$.extend({
//    sky.skyIdentify: function() {//甄别参数
        //(group, option, lazy, repe, fn)
        //(option, lazy, lazy, repe, fn)----自动配置group
        //(group, option, lazy, fn)//没有重复
        //(group, option, fn)//没有懒加载，重复
        
        
        
        
//    }
})