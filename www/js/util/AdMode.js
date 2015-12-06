define(['jquery'], function(){
    var AdMode = function() {

        this._isVisible = false;
        this._active = false;

        this._bannerInterval = 20000;

        this.active = function (param) {
            if(param !== undefined) {
                this._active = !!param;
            } else {
                return this._active;
            }
        };

        this.showAd = function() {};
        this.hideAd = function() {};

        this.bannerHeight = function() {
            if(!this.active()) {
                return 0;
            }
            if(this._bannerHeight) {
                return this._bannerHeight
            } else {
                var height = $(document).height();
                if(height <= 400){
                    return this._bannerHeight = 32;
                } else if (height <= 720) {
                    return this._bannerHeight = 50
                }
                return this._bannerHeight = 90;
            }
        };

        document.addEventListener("deviceready", function() {
            if(window.admob) {
                var onSuccess = function () {
                    AdMode.active(true);
                };
                var onError = function () {
                    AdMode.active(false);
                };
                admob.createBannerView({
                    publisherId: 'ca-app-pub-3753181130274985/7091690150',
                    autoShowBanner: false,
                    overlap: true
                }, onSuccess, onError);

                this.showAd = function() {
                    if(!this._isVisible && this.active()) {
                        admob.showBannerAd(true);
                        this._nextAd = setInterval(function(){
                            try {
                                admob.createBannerView({
                                    publisherId: 'ca-app-pub-3753181130274985/7091690150',
                                    autoShowBanner: true
                                }, onSuccess, onError);
                            } catch (e){
                                alert(e);
                            }

                        }, this._bannerInterval);
                        this._isVisible = true;
                    }

                };

                this.hideAd = function() {
                    if(this._isVisible) {
                        admob.showBannerAd(false);
                        clearInterval(this._nextAd);
                        this._isVisible = false;
                    }
                };
            }
        }.bind(this), false);
    };

    return AdMode;
});