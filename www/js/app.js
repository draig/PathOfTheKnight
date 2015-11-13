define([
    'jquery',
    'underscore',
    'backbone',
    'util/Util',
    'util/Adaptive',
    'util/Audio',
    'storage/LocalStorage',
    'util/AdMode'
], function($, _, Backbone, util, Adaptive, audio, LocalStorage, AdMode){
    var App = {
        initialize: function() {
            // Pass in our Router module and call it's initialize function
            //this.router.initialize();
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

    App.localStorage = new LocalStorage();

    var audioInit = function() {
        try {
            //App.audio = new Media('/android_asset/www/audio/way_back_home.mp3', function() {});
            //App.audio.play();
            App.audio = audio;
            App.audio.setTracks([
                'audio/Adam_Selzer_-_Whistle_And_Action.mp3'
            ]);
            if(App.localStorage.getVolume()){
                App.audio.playAudio();
            }
            App.eventAggregator.on('volume', function(volume) {
                if(volume) {
                    App.audio.resume();
                } else {
                    App.audio.pause();
                }
            });
        } catch (e) {
            alert(e);
        }
    };

    util.isMobile() ? $(document).on('deviceready', audioInit) : audioInit();



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