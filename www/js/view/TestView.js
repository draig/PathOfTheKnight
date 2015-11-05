define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/test.html'
], function($, _, Backbone, app, InfoTpl){

    var HeaderView = Backbone.View.extend({

        template: _.template(InfoTpl),

//        initialize: function () {},

        className: 'kp-test',

        events: {
            'click #1': 'one',
            'click #2': 'two',
            'click #3': 'three',
            'click #4': 'four',
            'click #5': 'five',
            'click #6': 'six',
            'click #7': 'seven',
            'click #8': 'eight'
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered){
                this.$el.html(this.template({}));
                this._rendered = true;
            }
            this.delegateEvents();
            return this;
        },
        
        one: function() {
            app.audio && app.audio.pause();
            app.audio = new Media('audio/way_back_home.mp3', function() {});
            app.audio.play();
        },

        two: function() {
            app.audio && app.audio.pause();
            app.audio = new Media('/android_asset/www/audio/way_back_home.mp3', function() {});
            app.audio.play();
        },

        three: function() {
            app.audio && app.audio.pause();
            app.audio = new Media('../audio/way_back_home.mp3', function() {});
            app.audio.play();
        },

        four: function() {
            app.audio && app.audio.pause();
            app.audio = new Media('../../audio/way_back_home.mp3', function() {});
            app.audio.play();
        },

        four: function() {
            app.audio && app.audio.pause();
            app.audio = new Media('/audio/way_back_home.mp3', function() {});
            app.audio.play();
        }
    });

    return HeaderView;
});
