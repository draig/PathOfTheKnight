define([
    'jquery',
    'underscore',
    'backbone'
], function($, _, Backbone){

    var Timer = Backbone.View.extend({


        startTime: '0.0',

        render: function (config) {

        },


        start: function() {
            this.startTime = new Date();
            this.timerId = setInterval(function() {
                var currentTime = new Date();
                this.time = new Date(currentTime - this.startTime);
                var time = (this.time.getMinutes() === 0 ? '' : this.time.getMinutes() + ':') + this.time.getSeconds()
                    + '.' +  this.time.getMilliseconds() % 10;
                this.$el.text(time);
            }.bind(this), 100)
        },

        pause: function() {
            this.pauseTime = new Date();
            clearInterval(this.timerId);
        },

        stop: function(){
            clearInterval(this.timerId);
            this.pauseTime = null;
            this.startTime = null;
            this.$el.text(this.startTime);
        }

    });

    return Timer;
});
