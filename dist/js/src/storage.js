$.extend({
    //缓存
    localStor: function(name, value) {
        if(('localStorage' in window) && window.localStorage !== null){
            if(arguments.length === 0) {
            //清除离线缓存
                localStorage.clear();
            }
            else if(arguments.length === 1) {
                if($.isPlainObject(name)){
                    //有且仅有一个有效参数，并且是Object对象，进行键值对添加
                    $.each(name, function(name, value){
                        localStorage.setItem(name, value);
                    });
                }
                else{
                    //有且仅有一个有效参数，并且是普通参数，找到对应的值 -->str
                    return localStorage.getItem(name);
                }
            }
            else if(arguments.length === 2) {
                if($.isFunction(value)){
                    //如果第二个参数是一个函数，运行函数再找到对应的值  -->obj
                    value();
                    return localStorage.getItem(name);
                }
                else if(value === null){
                    //去除一对键值对
                    localStorage.removeItem(name);
                }
                else{
                    //进行键值对添加
                    localStorage.setItem(name, value);
                }
            }
        }
        else {
            console.log('该浏览器不支持，永久性离线缓存支持');
        }
        return $;
    },

    sessionStor: function(name, value){
        if(('sessionStorage' in window) && window.sessionStorage !== null) {    
            if(arguments.length === 0){
                //清除离线缓存
                sessionStorage.clrear();
            }
            else if(arguments.length === 1){
                if($.isPlainObject(name)){
                    //有且仅有一个有效参数，并且是Object对象，进行键值对添加
                    $.each(name, function(name, value){
                        sessionStorage.setItem(name, value);
                    });
                }
                else{
                    //有且仅有一个有效参数，并且是普通参数，找到对应的值 -->str
                    return sessionStorage.getItem(name);
                }
            }
            else{
                if($.isFunction(value)){
                    //如果第二个参数是一个函数，运行函数再找到对应的值  -->str
                    value();
                    return sessionStorage.getItem(name);
                }
                else if(value === null){
                    //去除一对键值对
                    sessionStorage.removeItem(name);
                }
                else{
                    //进行键值对添加
                    sessionStorage.setItem(name, value);
                }
            }
        }
        else {
            console.log('该浏览器不支持，对话性离线缓存支持');
        }
        return $;
    },

    cookie: function(key, value, options){
        var pluses = /\+/g;

        function encode(s) {
            return config.raw ? s : encodeURIComponent(s);
        }

        function decode(s) {
            return config.raw ? s : decodeURIComponent(s);
        }

        function stringifyCookieValue(value) {
            return encode(config.json ? JSON.stringify(value) : String(value));
        }

        function parseCookieValue(s) {
            if (s.indexOf('"') === 0) {
                // This is a quoted cookie as according to RFC2068, unescape...
                s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
            }

            try {
                // Replace server-side written pluses with spaces.
                // If we can't decode the cookie, ignore it, it's unusable.
                // If we can't parse the cookie, ignore it, it's unusable.
                s = decodeURIComponent(s.replace(pluses, ' '));
                return config.json ? JSON.parse(s) : s;
            } catch(e) {}
        }

        function read(s, converter) {
            var value = config.raw ? s : parseCookieValue(s);
            return $.isFunction(converter) ? converter(value) : value;
        }

            var config = this;
            // Write
            if (arguments.length > 1 && !$.isFunction(value)) {
                options = $.extend({}, config.defaults, options);

                if (typeof options.expires === 'number') {
                    var days = options.expires, t = options.expires = new Date();
                    t.setMilliseconds(t.getMilliseconds() + days * 864e+5);
                }

                return (document.cookie = [
                    encode(key), '=', stringifyCookieValue(value),
                    options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                    options.path    ? '; path=' + options.path : '',
                    options.domain  ? '; domain=' + options.domain : '',
                    options.secure  ? '; secure' : ''
                ].join(''));
            }

            // Read

            var result = key ? undefined : {},
                // To prevent the for loop in the first place assign an empty array
                // in case there are no cookies at all. Also prevents odd result when
                // calling $.cookie().
                cookies = document.cookie ? document.cookie.split('; ') : [],
                i = 0,
                l = cookies.length;

            for (; i < l; i++) {
                var parts = cookies[i].split('='),
                    name = decode(parts.shift()),
                    cookie = parts.join('=');

                if (key === name) {
                    // If second argument (value) is a function it's a converter...
                    result = read(cookie, value);
                    break;
                }

                // Prevent storing a cookie that we couldn't decode.
                if (!key && (cookie = read(cookie)) !== undefined) {
                    result[name] = cookie;
                }
            }
            config.defaults = {};
            return result;
    },

    remvoeCookie: function(key, options){
        $.cookie(key, '', $.extend({}, options, { expires: -1 }));
        return !$.cookie(key);
    }     
});