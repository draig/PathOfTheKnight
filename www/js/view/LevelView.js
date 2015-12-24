define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/level.html',
    'i18n!nls/level'
], function($, _, Backbone, app, LevelTpl, locale){

    var LevelView = Backbone.View.extend({

        template: _.template(LevelTpl),

        className: 'kp-level',

        events: {
            'click .kp-back': 'back'
        },

        render: function (levels) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({levels: levels, nls: locale}));
            this.delegateEvents();
            return this;
        }

    });

    return LevelView;
});
