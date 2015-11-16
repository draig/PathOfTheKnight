define(['jquery'], function(){
    var AdMode = function() {
        this._isVisible = false;

        this.showAd = function() {};
        this.hideAd = function() {};

        this.bannerHeight = function() {
            var height = $(document).height();
            if(height <= 400){
                return 32;
            } else if (height <= 720) {
                return 50
            }
            return 90;
        };

        document.addEventListener("deviceready", function() {
            if(window.admob) {
                admob.createBannerView({
                    publisherId: 'ca-app-pub-3753181130274985/7091690150',
                    autoShowBanner: false,
                    overlap: true
                });

                this.showAd = function() {
                    if(!this._isVisible) {
                        admob.showBannerAd(true);
                        this._nextAd = setInterval(function(){
                            try {
                                admob.createBannerView({
                                    publisherId: 'ca-app-pub-3753181130274985/7091690150',
                                    autoShowBanner: true
                                });
                            } catch (e){
                                alert(e);
                            }

                        }, 10000);
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