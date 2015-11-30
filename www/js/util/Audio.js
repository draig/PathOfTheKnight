define(['jquery'], function($) {
    if(!window.Media) {
        window.Media = Audio;

        window.Media.prototype.getDuration = function() {
            return this.duration
        };

        window.Media.prototype.getCurrentPosition = function() {
            return this.currentTime
        };
    }

    var DeviceAudio = {
        media: null,
        mediaTimer: null,
        trackList: [],
        cfg: {},


        playAudio: function(rec) {
            try {
                var track = rec || this.selectTrack();

                if(track) {
                    if(window.device && device.platform === "Android") {
                        track.url = '/android_asset/www' + track.url;
                     }
                    var audioloop = function(status) {
                        if(!Media.MEDIA_STOPPED || status === Media.MEDIA_STOPPED) {
                            this.playAudio();
                        }
                    }.bind(this);
                    this.media = new Media(track.url, this.onSuccess, this.onError, audioloop);
                    $(this.media).on('ended', audioloop);
                    this.media.load && this.media.load();
                    this.media.play();
                    if(this.cfg.onNewTrackPlay) {
                        this.cfg.onNewTrackPlay(track);
                    }
                }
            } catch(e) {
                alert(e);
            }
        },

        setConfig: function(config) {
            $.extend(true, this.cfg, config);
            return this;
        },

        setTracks: function(traks) {
            if(typeof traks === "string") {
                this.trackList = [{
                    url: traks
                }];
            } else {
                this.trackList = this.shuffle(traks);
            }
        },

        pause: function() {
            if(this.media) {
                this.media.pause();
            }
        },

        resume: function() {
            if(this.media) {
                this.media.play();
            } else {
                this.playAudio();
            }
        },

        /*stopAudio: function() {
         if (this.media) {
         this.media.stop();
         }
         clearInterval(this.mediaTimer);
         this.mediaTimer = null;
         },*/

        onSuccess: function() {
            console.log("playAudio():Audio Success");
        },

        onError: function(error) {
            alert('code: ' + error.code + '\n' +
                'message: ' + error.message + '\n');
        },

        selectTrack: function() {
            var track = null;
            if(this.trackList && this.trackList.length !== 0) {
                track = this.trackList.splice(0, 1)[0];
                this.trackList.push(track);
            }
            return track;
        },

        shuffle: function(array) {
            for(var i = array.length - 1; i > 0; i--) {
                var j = Math.floor(Math.random() * (i + 1));
                var temp = array[i];
                array[i] = array[j];
                array[j] = temp;
            }
            return array;
        }

    };

    return DeviceAudio;
});