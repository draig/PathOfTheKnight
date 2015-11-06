define([
    'jquery',
    'underscore',
    'backbone',
    'util/Adaptive',
    'storage/LocalStorage'
], function($, _, Backbone, Adaptive, LocalStorage){
    var App = {
        initialize: function() {
            // Pass in our Router module and call it's initialize function
            this.router.initialize();
            Adaptive.addClass(App.config.width);
        },

        bottomAdd: function(show) {
            
        },
        
        fullAdd: function(show) {
            
        }
    };

    document.addEventListener("deviceready", function() {
        /*if(admob) {
            admob.setOptions({
                publisherId:          "ca-app-pub-3753181130274985/7091690150"*//*,  // Required
                interstitialAdId:     "ca-app-pub-3753181130274985/IIIIIIIIII",  // Optional
                tappxIdiOs:           "/XXXXXXXXX/Pub-XXXX-iOS-IIII",            // Optional
                tappxIdAndroid:       "/XXXXXXXXX/Pub-XXXX-Android-AAAA",        // Optional
                tappxShare:           0.5                                    *//*    // Optional
            });
            App.bottomAdd = function(show) {
                if(show){
                    admob.createBannerView();
                } else {
                    admob.destroyBannerView();
                }
            };
            App.fullAdd = function(show) {
                if(show) {
                    admob.requestInterstitial();
                } else {
                    admob.destroyBannerView();
                }

            };
        }*/

        if(window.plugins && window.plugins.gaPlugin) {
            var emptyFunc = function() {};
            App.googleAnalytics = window.plugins.gaPlugin;
            App.googleAnalytics.init(emptyFunc, emptyFunc, 'UA-69686656-1', 10);

        }
    }, false);


    // Global event aggregator
    App.eventAggregator = _.extend({}, Backbone.Events);

    document.addEventListener("deviceready", function() {
        try {
            App.audio = new Media('/android_asset/www/audio/way_back_home.mp3', function() {});
            App.audio.play();
        } catch (e) {
            alert(e);
        }


    }, false);

    App.localStorage = new LocalStorage();

    App.config = {
        width: $('.app').width(),
        height: $('.app').height(),
        orientation: $('.app').width() > $('.app').height() ? 'horizontal' : 'vertical'
    };

    // View.close() event for garbage collection
    Backbone.View.prototype.close = function() {
        this.remove();
        this.unbind();
        if (this.onClose) {
            this.onClose();
        }
    };

    return App;
});