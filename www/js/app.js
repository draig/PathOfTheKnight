define([
    'jquery',
    'underscore',
    'backbone',
    'util/Adaptive',
    'storage/LocalStorage',
    'util/AdMode'
], function($, _, Backbone, Adaptive, LocalStorage, AdMode){
    var App = {
        initialize: function() {
            // Pass in our Router module and call it's initialize function
            this.router.initialize();
            Adaptive.addClass(App.config.width);
        },

        showLoading: function() {
            $('.loading').css('z-index', '1');
        },

        hideLoading: function() {
            $('.loading').css('z-index', '-1');
        }
    };

    document.addEventListener("deviceready", function() {
        if(window.plugins && window.plugins.gaPlugin) {
            var googleAnalytics = window.plugins.gaPlugin;
            googleAnalytics.init(function() {
                App.googleAnalytics = googleAnalytics;
                alert('google analytics init success');
            }, function() {
                alert('google analytics init fail');
            }, 'UA-69686656-1', 10);
        }
    }, false);


    // Global event aggregator
    App.eventAggregator = _.extend({}, Backbone.Events);

    App.addMode = new AdMode();

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