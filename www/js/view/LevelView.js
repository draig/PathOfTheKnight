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

        render: function () {
            //if(DEBUG) console.log("RENDER::", app.session.user.toJSON(), app.session.toJSON());
            app.storage.getLevels(function(levels){
                this.$el.html(this.template({levels: levels}));
                this.delegateEvents();
            }.bind(this));
            return this;
        }

    });

    return LevelView;
});
