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

    // Global event aggregator
    App.eventAggregator = _.extend({}, Backbone.Events);

    App.addMode = new AdMode();

    App.localStorage = new LocalStorage();

    var audioInit = function() {
        try {
            App.audio = audio.setConfig({
                onNewTrackPlay: function(track) {
                    if(window.plugins && window.plugins.toast){
                        window.plugins.toast.showShortBottom(track.author);
                    }
                }
            });
            App.audio.setTracks([
                {
                    url: '/audio/Adam_Selzer_-_Whistle_And_Action.mp3',
                    author: 'Adam Selzer - Whistle And Action'
                },
                {
                    url: '/audio/Dexter_Britain_-_06_-_Summers_Coming.mp3',
                    author: 'DexterBritain - Summers Coming'
                },
                {
                    url: '/audio/Kevin_MacLeod_-_Master_of_the_Feast.mp3',
                    author: 'Kevin MacLeod - Master of the Feast'
                },
                {
                    url: '/audio/Podington_Bear_-_Good_Times.mp3',
                    author: 'Podington Bear - Good Times'
                }

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

    if(!util.isMobile()) {
        audioInit();
    } else {
        document.addEventListener("deviceready", function() {
            audioInit();
        }, false);
    }

    document.addEventListener("online", function() {
        AdMode.active(true);
    }, false);

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

    document.addEventListener("pause", function () {
        App.audio.pause();
    }, false);

    document.addEventListener("resume", function () {
        if(App.localStorage.getVolume()){
            App.audio.resume();
        }
    }, false);

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

    return App;
});