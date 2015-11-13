define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/menu.html',
    'i18n!nls/knightPath'
], function($, _, Backbone, app, MenuTpl, local){

    var HeaderView = Backbone.View.extend({

        template: _.template(MenuTpl),

//        initialize: function () {},

        className: 'kp-menu',

        events: {
            'click .volume-btn': 'toggleVolume'
        },

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            if(!this._rendered) {
                this.$el.html(this.template(local));
                this._volume(app.localStorage.getVolume());
                this._rendered = true;
            }
            this.delegateEvents();
            return this;
        },

        _volume: function(volume) {
            if(volume) {
                this.$el.find('.volume-btn img').prop('src', 'img/volume.png');
            } else {
                this.$el.find('.volume-btn img').prop('src', 'img/no-volume.png');
            }
            app.localStorage.setVolume(volume);
        },

        toggleVolume: function() {
            var volume = !app.localStorage.getVolume();
            this._volume(volume);
            app.eventAggregator.trigger('volume', volume);
        }
    });

    return HeaderView;
});
