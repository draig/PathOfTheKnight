define([], function(){
    var AdMode = function() {
        this._isVisible = false;

        this.showAd = function() {};
        this.hideAd = function() {};

        document.addEventListener("deviceready", function() {
            if(admob) {
                admob.createBannerView({
                    publisherId: 'ca-app-pub-3753181130274985/7091690150',
                    autoShowBanner: false
                });

                this.showAd = function() {
                    if(!this._isVisible) {
                        admob.showBannerAd(true);
                        this._nextAd = setInterval(function(){
                            admob.showBannerAd(false);
                            admob.showBannerAd(true);
                        }, 25000);
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