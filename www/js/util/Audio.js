define([], function(){
    var Audio = {
        media: null,
        mediaTimer: null,
        trackList: [],

        playAudio: function(src) {
            var track = src || this.selectTrack();

            if(track) {
                this.media = new Media(track, this.onSuccess, this.onError);

                if (this.mediaTimer !== null) {
                    clearTimeout(this.mediaTimer)
                }

                this.mediaTimer = setTimeout(function() {
                    this.playAudio();
                }.bind(this), this.media.getDuration());

                this.media.play();
            }
        },

        setTracks: function(traks) {
            if(typeof traks === "string") {
                this.trackList = [traks];
            } else {
                this.trackList = traks;
            }
        },

        /*pauseAudio: function() {
            if (this.media) {
                this.media.pause();
            }
        },*/

        stopAudio: function() {
            if (this.media) {
                this.media.stop();
            }
            clearInterval(this.mediaTimer);
            this.mediaTimer = null;
        },

        onSuccess: function() {
            console.log("playAudio():Audio Success");
        },

        onError: function(error) {
            alert('code: '    + error.code    + '\n' +
                'message: ' + error.message + '\n');
        },

        selectTrack: function() {
            var track = null;
            if(this.trackList && this.trackList.length !== 0){
                track = this.trackList.splice(0,1)[0];
                this.trackList.push(track);
            }
            return track;
        }

    };

    return Audio;
});