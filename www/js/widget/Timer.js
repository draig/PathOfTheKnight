define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var Timer = Backbone.View.extend({

        time: 0,
        startStr: '0:00',

        render: function (config) {

        },


        start: function() {
            if(this.timerId){
                clearInterval(this.timerId);
            }
            this.timerId = setInterval(function() {
                this.time++;
                var minutes = Math.floor(this.time/60),
                    seconds = this.time % 60;

                var timeStr = ( minutes + ':') + (seconds < 10 ? '0' : '') + seconds;
                this.$el.text(timeStr);
            }.bind(this), 1000)
        },

        pause: function() {
            clearInterval(this.timerId);
            this.timerId = null;
        },


        stop: function(){
            var final = this.time;
            this.time = 0;
            clearInterval(this.timerId);
            this.timerId = null;
            this.$el.text(this.startStr);
            return final;
        }

    });

    return Timer;
});