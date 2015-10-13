define([
    'jquery',
    'underscore',
    'backbone',
    'app',
    'text!../../template/level.html'
], function($, _, Backbone, app, LevelTpl){

    var LevelView = Backbone.View.extend({

        template: _.template(LevelTpl),

        className: 'kp-level',

        events: {
            'click .kp-back': 'back'
        },

        render: function (levels) {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            this.$el.html(this.template({levels: levels}));
            this.delegateEvents();
            return this;
        }

    });

    return LevelView;
});
