define([], function(){

    var Util = {
        isMobile: function() {
            if( navigator.userAgent.match(/Android/i)
                || navigator.userAgent.match(/iPhone/i)
                || navigator.userAgent.match(/Windows Phone/i)
                || navigator.userAgent.match(/iPad/i)
                || navigator.userAgent.match(/iPod/i)
                || navigator.userAgent.match(/webOS/i)
                || navigator.userAgent.match(/BlackBerry/i)
                ){
                return this._isMobile = true;
            }
            return this._isMobile = false;
        }
    };

    return Util;
});